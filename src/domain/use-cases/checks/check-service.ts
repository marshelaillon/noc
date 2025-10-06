import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repositories/log.repository';
import { LogEntityOptions } from '../../entities/log.entity';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  async execute(url: string): Promise<boolean> {
    const origin = 'check-service.ts';
    try {
      const req = await fetch(url);
      if (!req.ok) throw new Error(`Error on check service ${url}`);
      const options: LogEntityOptions = {
        message: `Service: ${url} IS WORKING`,
        level: LogSeverityLevel.low,
        createdAt: new Date(),
        origin,
      };
      const log = new LogEntity(options);

      this.logRepository.saveLog(log);
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${url} IS NOT OK: ${error}`;
      const options: LogEntityOptions = {
        message: errorMessage,
        level: LogSeverityLevel.high,
        createdAt: new Date(),
        origin,
      };
      const log = new LogEntity(options);
      this.logRepository.saveLog(log);
      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
