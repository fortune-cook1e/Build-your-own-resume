import { Config } from '@/config/schema';
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ErrorMessage, Resume } from 'shared';
import { connect } from 'puppeteer';
import { UtilsService } from '@/utils/utils.service';
import { PDFDocument } from 'pdf-lib';
import { OssService } from '@/oss/oss.service';
@Injectable()
export class PrintService {
  private readonly logger = new Logger(PrintService.name);

  private browserURL: string;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly utilsService: UtilsService,
    private readonly ossService: OssService,
  ) {
    const chromeUrl = this.configService.getOrThrow('CHROME_URL');
    const chromeToken = this.configService.getOrThrow('CHROME_TOKEN');
    this.browserURL = `${chromeUrl}?token=${chromeToken}`;
  }

  async printResume() {
    console.log('print resume.');
  }

  private async getBrowser() {
    try {
      this.logger.debug('browserless connect url', this.browserURL);
      return await connect({
        browserWSEndpoint: this.browserURL,
      });
    } catch (error: any) {
      this.logger.error(error);
      throw new InternalServerErrorException(
        ErrorMessage.InvalidBrowserConnection,
        error.message,
      );
    }
  }

  async generateResume(resume: Resume) {
    try {
      const browser = await this.getBrowser();
      const page = await browser.newPage();
      let rootDomain = this.utilsService.getRootDomain();

      const isDev = process.env.NODE_ENV === 'development';

      // for development, puppeteer is running in a docker container
      if (isDev) {
        rootDomain = rootDomain.replace('localhost', 'host.docker.internal');
        // await page.setRequestInterception(true);
        // page.on('request', (request) => {
        //   const modifiedUrl = request
        //     .url()
        //     .replace('localhost', `host.docker.internal`);
        //   request.continue({ url: modifiedUrl });
        // });
      }

      await page.evaluateOnNewDocument((data) => {
        window.localStorage.setItem('resume', JSON.stringify(data));
      }, resume.data);

      await page.goto(`${rootDomain}/resume-generator-board/preview`, {
        waitUntil: 'networkidle0',
      });

      const pageBuffer: Buffer[] = [];

      const processPage = async () => {
        const pageElement = await page.$('#page');
        const width =
          (await (
            await pageElement?.getProperty('scrollWidth')
          )?.jsonValue()) ?? 0;
        const height =
          (await (
            await pageElement?.getProperty('scrollHeight')
          )?.jsonValue()) ?? 0;

        const tempHtml = await page.evaluate((element: any) => {
          const clonedElement = element.cloneNode(true) as HTMLDivElement;
          const tempHtml = document.body.innerHTML;
          document.body.innerHTML = `${clonedElement.outerHTML}`;
          return tempHtml;
        }, pageElement);

        pageBuffer.push(
          await page.pdf({ width, height, printBackground: true }),
        );

        await page.evaluate((tempHtml: string) => {
          document.body.innerHTML = tempHtml;
        }, tempHtml);
      };

      await processPage();

      const pdf = await PDFDocument.create();
      const pdfPage = await PDFDocument.load(pageBuffer[0]);
      const [copiedPage] = await pdf.copyPages(pdfPage, [0]);
      pdf.addPage(copiedPage);

      const buffer = Buffer.from(await pdf.save());

      const resumeUrl = await this.ossService.uploadBuffer(
        resume.userId,
        buffer,
        'print',
      );

      await page.close();
      browser.disconnect();
      return resumeUrl;
    } catch (error: any) {
      this.logger.error(error);
      this.logger.debug('error url', this.browserURL);
      throw new InternalServerErrorException(error);
    }
  }
}
