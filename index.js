import "dotenv/config";
import { connect as mongoDbConnect } from "./config/db.js";
import client from "./imap.js";
import extractor from "./utils/mailDataExtractor.js";
import { simpleParser } from "mailparser";
import { saveMail } from "./services/mail.service.js";
import { forwardEmail } from "./mailer.js";
import "./logging.js";

async function main() {
  await mongoDbConnect();

  await client.connect();
  console.log("imap client is connected");

  await client.getMailboxLock("INBOX", { readOnly: true });

  client.on("exists", async () => {
    console.log("Received a new Mail!");
    for await (let msg of client.fetch("*", { source: true })) {
      console.log("Processing the new mail...");

      const mail = await simpleParser(msg.source);

      const parsedMail = {
        mailId: mail.messageId,
        from: mail.from.text,
        subject: mail.subject,
        body: mail.html,
        receiveAt: mail.date,
      };

      await saveMail(parsedMail);
      await forwardEmail(extractor(parsedMail));
      console.log("Email is forwareded!");
    }
  });
  await client.idle();
}

try{
  main();
}catch(ex){
  console.log(ex);
}
