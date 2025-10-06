import { EmailService } from '../../../presentation/email/email-service';
import {
  LogEntity,
  LogEntityOptions,
  LogSeverityLevel,
} from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';

interface SendLogEmailUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository
  ) {}

  async execute(to: string | string[]) {
    const origin = 'send-email-logs.ts';
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) throw new Error('Email log not sent');

      const options: LogEntityOptions = {
        message: `Log email sent successfully`,
        level: LogSeverityLevel.low,
        origin,
      };
      const log = new LogEntity(options);
      this.logRepository.saveLog(log);
      return true;
    } catch (error) {
      const options: LogEntityOptions = {
        message: `${error}`,
        level: LogSeverityLevel.high,
        origin,
      };
      const log = new LogEntity(options);
      this.logRepository.saveLog(log);
      return false;
    }
  }
}
