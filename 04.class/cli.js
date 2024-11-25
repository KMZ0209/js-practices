import readline from "readline";
import enquirer from "enquirer";
const { Select } = enquirer;

export function getUserInput() {
  return new Promise((resolve) => {
    const reader = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const lines = [];
    reader.on('line', (line) => {
      lines.push(line);
    });
    reader.on('close', () => {
      resolve(lines);
      reader.close();
    });
  });
}
export async function selectMemoFromList(memoData) {
  const choices = memoData.map((memo, index) => ({
    name: `${index + 1} ${memo[0].substring(0, 10)}`,
    value: index,
  }));
  const prompt = new Select({
    name: 'memo',
    message: 'Memo List',
    choices: choices,
  });
  return await prompt.run();
}
