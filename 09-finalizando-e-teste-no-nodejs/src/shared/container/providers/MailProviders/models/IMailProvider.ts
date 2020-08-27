export default interface IMailProvicer {
  sendMail(to: string, body: string): Promise<void>;
}
