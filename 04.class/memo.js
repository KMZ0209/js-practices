import yargs from "yargs";
import DisplayMemo from "./display_memo.js";

class MemoManager {
  constructor(fileName) {
    this.fileName = fileName;
    this.displayMemo = new DisplayMemo(fileName);
    this.argv = yargs(process.argv.slice(2)).options({
      l: {
        type: "boolean",
        describe: "Display list of memos",
        demandOption: false,
      },
      r: {
        type: "boolean",
        describe: "Display full memos",
        demandOption: false,
      },
      d: {
        type: "boolean",
        describe: "Delete of memos",
        demandOption: false,
      },
    }).argv;
  }
  execute() {
    if (this.argv.l) {
      this.displayMemoList();
    } else if (this.argv.r) {
      this.displayFullMemo();
    } else if (this.argv.d) {
      this.deleteMemo();
    } else {
      this.addMemo();
    }
  }
  displayMemoList() {
    this.displayMemo.displayMemoList();
  }
  displayFullMemo() {
    this.displayMemo.displayFullMemo();
  }
  deleteMemo() {
    this.displayMemo.deleteMemo();
  }
  addMemo() {
    this.displayMemo.addMemo();
  }
}
const fileName = "memo.json";
const memoManager = new MemoManager(fileName);
memoManager.execute();
