import ISendMailDTO from '../dtos/ISendMailDTO';

export default interface IMailProvicer {
  sendMail(data: ISendMailDTO): Promise<void>;
}
