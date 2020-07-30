import IStoragesProvider from '../models/IStorageProvider';

export default class FakeStarageProvider implements IStoragesProvider {
  private starage: string[] = [];
  public async saveFile(file: string): Promise<string> {
    this.starage.push(file);

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const findIndex = this.starage.findIndex(storages => storages === file);

    this.starage.splice(findIndex, 1);
  }
}
