import yargs from "yargs";
import MemoDisplay from "./display_memo.js";

class Memo {
  constructor(fileName) {
    this.fileName = fileName;
    this.displayMemo = new MemoDisplay(fileName);
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
    this.argv.l
    ? this.displayMemoList() : this.argv.r
    ? this.displayFullMemo() : this.argv.d
    ? this.deleteMemo() : this.addMemo();
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
const memoManager = new Memo(fileName);
memoManager.execute();
