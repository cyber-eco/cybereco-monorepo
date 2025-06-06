// Simple console-based logger for client/server compatibility
// Winston is not used here to avoid fs module issues in browser

type LogLevel = 'error' | 'warn' | 'info' | 'http' | 'debug';

interface LogMeta {
  [key: string]: any;
}

class SimpleLogger {
  private level: LogLevel;
  private defaultMeta: LogMeta;

  constructor(level: LogLevel = 'info', defaultMeta: LogMeta = {}) {
    this.level = level;
    this.defaultMeta = defaultMeta;
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: Record<LogLevel, number> = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };
    return levels[level] <= levels[this.level];
  }

  private formatMessage(level: LogLevel, message: string, meta?: LogMeta): string {
    const timestamp = new Date().toISOString();
    const metaString = meta ? ` ${JSON.stringify({ ...this.defaultMeta, ...meta })}` : '';
    return `${timestamp} [${level.toUpperCase()}]: ${message}${metaString}`;
  }

  error(message: string, meta?: LogMeta) {
    if (this.shouldLog('error')) {
      console.error(this.formatMessage('error', message, meta));
    }
  }

  warn(message: string, meta?: LogMeta) {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, meta));
    }
  }

  info(message: string, meta?: LogMeta) {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, meta));
    }
  }

  http(message: string, meta?: LogMeta) {
    if (this.shouldLog('http')) {
      console.log(this.formatMessage('http', message, meta));
    }
  }

  debug(message: string, meta?: LogMeta) {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, meta));
    }
  }
}

// Create the logger instance
const logger = new SimpleLogger(
  (process.env.LOG_LEVEL as LogLevel) || 'info',
  {
    service: 'cybereco-auth',
    environment: process.env.NODE_ENV || 'development',
  }
);

// Create a stream object for Morgan middleware
export const stream = {
  write: (message: string) => {
    logger.http(message.trim());
  },
};

// Export logger methods with proper typing
export const log = {
  error: (message: string, meta?: any) => logger.error(message, meta),
  warn: (message: string, meta?: any) => logger.warn(message, meta),
  info: (message: string, meta?: any) => logger.info(message, meta),
  http: (message: string, meta?: any) => logger.http(message, meta),
  debug: (message: string, meta?: any) => logger.debug(message, meta),
};

// Helper function for logging with context
export function createLogger(context: string) {
  return {
    error: (message: string, meta?: any) => logger.error(message, { ...meta, context }),
    warn: (message: string, meta?: any) => logger.warn(message, { ...meta, context }),
    info: (message: string, meta?: any) => logger.info(message, { ...meta, context }),
    http: (message: string, meta?: any) => logger.http(message, { ...meta, context }),
    debug: (message: string, meta?: any) => logger.debug(message, { ...meta, context }),
  };
}

export default logger;