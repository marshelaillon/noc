import {
  FileSystemDatasource,
  MongoLogDataSource,
  PostgresLogDataSource,
} from '../infrastructure/datasources/';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';
import { CronService } from './cron/cron-service';

const fsLogRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new FileSystemDatasource()
);
const mongoLogRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new MongoLogDataSource()
);
const postgresLogRepository: LogRepositoryImpl = new LogRepositoryImpl(
  new PostgresLogDataSource()
);

const repositories = [
  fsLogRepository,
  mongoLogRepository,
  postgresLogRepository,
];

export class Server {
  public static async start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', () => {
      const url = 'https://chatgpt.com';
      new CheckServiceMultiple(repositories, undefined, undefined).execute(url);
    });
  }
}
