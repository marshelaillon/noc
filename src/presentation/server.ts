import { CheckService } from '../domain/use-cases/checks/check-service';
import { SendEmailLogs } from '../domain/use-cases/email/send-email-logs';
import { CronService } from './cron/cron-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { EmailService } from '../infrastructure/services/email/email-service';
import { MongoLogDataSource } from '../infrastructure/datasources/mongo-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';

const logRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new FileSystemDatasource()
  //new MongoLogDataSource()
);
const emailService = new EmailService();

export class Server {
  public static async start() {
    console.log('Server started...');

    // Mandar email
    // const mail = '';
    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(mail);

    // CronService.createJob('*/5 * * * * *', () => {
    //   const url = 'https://chatgpt.com';
    //   new CheckService(logRepository, undefined, undefined).execute(url);
    // });
  }
}
