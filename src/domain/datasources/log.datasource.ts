// Envía métodos al repositorio
// Reglas de negocio

import { LogEntity, LogSeverityLevel } from '../entities/log.entity';

export abstract class LogDatasource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
