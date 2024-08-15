import fs from "fs";
import readline from "readline";

export default class HandleFile {
  constructor() {
    this.reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    this.fileName = "memo.json";
    this.jsonData = [];
    this.loadJsonData();
  }
  async loadJsonData() {
    try {
      const fileData = await fs.promises.readFile(this.fileName);
      this.jsonData = JSON.parse(fileData);
    } catch (error) {
      console.error("データ取得に失敗しました", error);
    }
  }
  async saveJsonData(data) {
    try {
      await fs.promises.writeFile(this.fileName, JSON.stringify(data));
    } catch (error) {
      console.error("データ保存に失敗しました", error);
    }
  }
}
