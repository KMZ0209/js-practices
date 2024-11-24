import fs from "fs/promises";

export async function loadDataFromFile(fileName) {
  try {
    const fileData = await fs.readFile(fileName);
    return JSON.parse(fileData);
  } catch (error) {
    console.error("データ取得に失敗しました", error);
  }
}

export async function saveDataToFile(fileName, data) {
  try {
    await fs.writeFile(fileName, JSON.stringify(data));
  } catch (error) {
    console.error("データ保存に失敗しました", error);
  }
}
