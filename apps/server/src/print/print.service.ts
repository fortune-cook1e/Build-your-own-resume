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

@Injectable()
export class PrintService {
  private readonly logger = new Logger(PrintService.name);

  private browserURL: string;

  constructor(
    private readonly configService: ConfigService<Config>,
    private readonly utilsService: UtilsService,
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
      return await connect({
        browserWSEndpoint: this.browserURL,
      });
    } catch (error: any) {
      this.logger.error(error.message);
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
      let webAppUrl = 'http://localhost:8080';

      const isDev = process.env.NODE_ENV === 'development';

      // for development, puppeteer is running in a docker container
      if (isDev) {
        webAppUrl = webAppUrl.replace('localhost', 'host.docker.internal');
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

      await page.goto(`${webAppUrl}/resume-generator-board/builder`, {
        waitUntil: 'networkidle0',
      });

      // await page.goto(`${webAppUrl}/resume-generator/login`, {
      //   waitUntil: 'networkidle2',
      // });

      await page.pdf({
        path: 'hn.pdf',
      });

      await browser.close();
    } catch (error) {
      this.logger.error(error);
    }
  }
}
