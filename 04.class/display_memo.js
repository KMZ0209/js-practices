import HandleFile from "./handle_files.js";
import enquirer from "enquirer";
const { Select } = enquirer;
import readline from "readline";

export default class DisplayMemo extends HandleFile {
  constructor(fileName) {
    super(fileName);
    this.memos = [];
    this.memoData = [];
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
        const choices = this.memoData.map((memo, index) => ({
          name: `${index + 1} ${memo[0].substring(0, 10)}`,
          value: index,
        }));
        const prompt = new Select({
          name: "memo",
          message: "MemoList",
          choices: choices,
        });
        const selectIndex = await prompt.run();
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
        const choices = this.memoData.map((memo, index) => ({
          name: `${index + 1} ${memo[0].substring(0, 10)}`,
          value: index,
        }));
        const prompt = new Select({
          name: "memo",
          message: "MemoList",
          choices: choices,
        });
        const selectValue = await prompt.run();
        const memoNumber = parseInt(selectValue[0].trim(), 10) - 1;
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
