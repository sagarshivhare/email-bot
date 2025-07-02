import mongoose from 'mongoose';

const mailSchema = new mongoose.Schema({
  mailId: String,
  from: String,
  subject: String,
  body: String,
  receivedAt: Date
});

const Mail = mongoose.model('Mail', mailSchema);

export default Mail