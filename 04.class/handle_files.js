import fs from "fs";

export default class HandleFile {
  constructor() {
    this.fileName = "memo.json";
    this.memoData = [];
    this.loadmemoData();
  }
  async loadmemoData() {
    try {
      const fileData = await fs.promises.readFile(this.fileName);
      this.memoData = JSON.parse(fileData);
    } catch (error) {
      console.error("データ取得に失敗しました", error);
    }
  }
  async savememoData(data) {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify(data));
    } catch (error) {
      console.error("データ保存に失敗しました", error);
    }
  }
}
