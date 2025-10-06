import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import { LogDatasource } from '../../domain/datasources/log.datasource';
import { LogRepository } from '../../domain/repositories/log.repository';

export class LogRepositoryImpl implements LogRepository {
  // Fácilmente se puede cambiar por otro datasource (MongoDB, PostgreSQL, etc.)
  constructor(private readonly logDatasource: LogDatasource) {}

  async saveLog(log: LogEntity): Promise<void> {
    this.logDatasource.saveLog(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return this.logDatasource.getLogs(severityLevel);
  }
}
