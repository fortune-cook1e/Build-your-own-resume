import { ResumeService } from '@/resume/resume.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessage, UserWithPrivateInfo } from 'shared';
import { Request } from 'express';

@Injectable()
export class ResumeGuard implements CanActivate {
  constructor(private readonly resumeService: ResumeService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as UserWithPrivateInfo | false;

    try {
      const resume = await this.resumeService.findOneById(
        request.params.id,
        user ? user.id : undefined,
      );

      if (resume.visibility === 'public') {
        request.payload = { resume };
      }

      // if (resume.visibility === 'private') {
      //   throw new NotFoundException(ErrorMessage.ResumeIsPrivate);
      // }

      // if resume's owner is the user, still open the page
      if (resume.visibility === 'private') {
        if (user && resume.userId === user.id) {
          request.payload = { resume };
        } else {
          throw new NotFoundException(ErrorMessage.ResumeIsPrivate);
        }
      }

      return true;
    } catch (e) {
      throw new NotFoundException(e || ErrorMessage.ResumeNotFound);
    }
  }
}
