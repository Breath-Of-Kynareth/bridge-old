import { createLogger, transports, format } from "winston";

export const logger = createLogger({
  transports: [new transports.Console(

  ), 
  new transports.File({
    dirname: 'logs', 
    filename: 'Bridge_Logs.log',
    format: format.combine(
      format.timestamp({ format: 'YYYY-MM-DD hh:mm a' }),
      format.printf((({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;}))
      )
  }),
  new transports.Console({
    format: format.combine(
      format.colorize(),
      format.timestamp({ format: 'YYYY-MM-DD hh:mm a' }),
      format.printf(({ timestamp, level, message }) => {
        return `[${timestamp}] ${level}: ${message}`;
      })
    )
  })
],
});
