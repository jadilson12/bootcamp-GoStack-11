export default interface IStoragesProvider {
  saveFile(filePath: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
