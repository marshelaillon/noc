import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email-service';

const fileSystemLogRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const emailService = new EmailService();

export class Server {
  public static start() {
    // Mandar email
    //const mail = '';
    //new SendEmailLogs(emailService, fileSystemLogRepository).execute(mail);
    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'http://localhost:3000';
    //   new CheckService(fileSystemLogRepository, undefined, undefined).execute(
    //     url
    //   );
    // });
  }
}
