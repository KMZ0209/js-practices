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

  async loadMemoData() {
    try {
      const fileData = await fs.readFile(this.fileName);
      this.memoData = JSON.parse(fileData);
    } catch (error) {
      console.error("データ取得に失敗しました", error);
    }
  }
  async saveMemoData() {
    try {
      await fs.writeFile(this.fileName, JSON.stringify(this.memoData));
    } catch (error) {
      console.error("データ保存に失敗しました", error);
    }
  }
  async selectMemoData() {
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
  async loadAndHandleMemoData(callback) {
    try {
      await this.loadMemoData();
      if (this.memoData.length > 0) {
        await callback();
      } else {
        console.log("メモがありません。");
      }
    } catch (error) {
      console.error("エラーが発生しました", error);
    }
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
          await this.loadMemoData();
          this.memoData.push(this.memos);
          await this.saveMemoData(this.memoData);
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
    await this.loadAndHandleMemoData.call(this, () => {
      this.memoData.forEach((memo, index) => {
        if (memo.length > 0) {
          console.log(`${index + 1} ${memo[0].substring(0, 10)}`);
        }
      });
    });
  }

  async displayFullMemo() {
    await this.loadAndHandleMemoData.call(this, async () => {
      const selectIndex = await this.selectMemoData();
      const memoNumber = parseInt(selectIndex[0].trim(), 10) - 1;
      console.log(this.memoData[memoNumber].join("\n"));
    });
  }

  async deleteMemo() {
    await this.loadAndHandleMemoData.call(this, async () => {
      const selectValue = await this.selectMemoData();
      const memoNumber = parseInt(selectValue[0].trim(), 10) - 1;
      this.memoData.splice(memoNumber, 1);
      await this.saveMemoData(this.memoData);
      console.log("選択したメモを削除しました");
    });
  }
}
