import Mail from '../models/Mail.js'

export async function saveMail(mail){
    return await Mail.create(mail);
}