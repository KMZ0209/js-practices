import fs from "fs/promises";
import enquirer from "enquirer";
const { Select } = enquirer;
import readline from "readline";

export default class MemoDisplayer {
  constructor(fileName) {
    this.fileName = fileName;
    this.memos = [];
    this.memoData = [];
  }

  async loadmemoData() {
    try {
      const fileData = await fs.readFile(this.fileName);
      this.memoData = JSON.parse(fileData);
    } catch (error) {
      console.error("データ取得に失敗しました", error);
    }
  }
  async savememoData(data) {
    try {
      await fs.writeFile(this.fileName, JSON.stringify(data));
    } catch (error) {
      console.error("データ保存に失敗しました", error);
    }
  }
  async selectmemoData(){
    const choices = this.memoData.map((memo, index) => ({
    name: `${index + 1} ${memo[0].substring(0, 10)}`,
    value: index,
    }));
    const prompt = new Select({
    name: "memo",
    message: "MemoList",
    choices: choices,
    });
    return await prompt.run();
  }

  addMemo() {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    reader.on("line", (line) => {
      this.memos.push(line);
    });
    reader.on("close", async () => {
      if (this.memos.length > 0) {
        try {
          await this.loadmemoData();
          this.memoData.push(this.memos);
          await this.savememoData(this.memoData);
          console.log("メモが追加されました。");
        } catch (error) {
          console.error("メモの追加に失敗しました:", error);
        }
        this.memos = [];
      }
      reader.close();
    });
  }

  async displayMemoList() {
    try {
      await this.loadmemoData();
      console.log("入力されたメモリスト");
      if (this.memoData.length > 0) {
        this.memoData.forEach((memo, index) => {
          if (memo.length > 0) {
            console.log(`${index + 1} ${memo[0].substring(0, 10)}`);
          }
        });
      } else {
        console.log("メモがありません。");
      }
    } catch (error) {
      console.error("メモリストの表示に失敗しました:", error);
    }
  }

  async displayFullMemo() {
    try {
      await this.loadmemoData();
      if (this.memoData.length > 0) {
        const selectIndex = await this.selectmemoData();
        const memoNumber = parseInt(selectIndex[0].trim(), 10) - 1;
        console.log(this.memoData[memoNumber].join("\n"));
      } else {
        console.log("メモがありません。");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  }

  async deleteMemo() {
    try {
      await this.loadmemoData();
      if (this.memoData.length > 0) {
        const selectIndex = await this.selectmemoData();
        const memoNumber = parseInt(selectIndex[0].trim(), 10) - 1;
        this.memoData.splice(memoNumber, 1);
        await this.savememoData(this.memoData);
        console.log("選択したメモを削除しました");
      } else {
        console.log("削除するメモがありません。");
      }
    } catch (error) {
      console.error("エラーが発生しました:", error);
    }
  }
}
