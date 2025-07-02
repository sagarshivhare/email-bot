import winston from "winston";

// process.on('uncaughtException', (ex)=>{
//   winston.error(ex.message, ex);
//   process.exit(1);
// });
winston.exceptions.handle(
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }),
  new winston.transports.File({ filename: "uncaughtException.log" })
);
process.on("unhandledRejection", (ex) => {
  throw ex;
});