import { keycodes } from "./keycodeMapper.js";
import fs from "fs";

export const readFile = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export const updateFile = (filePath, commandName, newCommand) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const jsonData = JSON.parse(data);

    jsonData[commandName] = newCommand;

    const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument is for indentation (optional)

    fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }

      console.log("Data appended to the JSON file successfully.");
    });
  });
};

export const deleteFromFile = (filePath, commandName, newCommand) => {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }

    const jsonData = JSON.parse(data);

    jsonData[commandName] = undefined;
    delete jsonData[commandName]

    const updatedJsonData = JSON.stringify(jsonData, null, 2); // The third argument is for indentation (optional)

    fs.writeFile(filePath, updatedJsonData, "utf8", (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
        return;
      }

      console.log("Data appended to the JSON file successfully.");
    });
  });
};

export const convertKeystrokes = (keystrokes) => {
  const splitString = keystrokes.split("|")
  const formattedString = []

  splitString.forEach((str) => {
    const pressed = str.split("+")

    if (pressed.length > 1) {
      const keys = []
      pressed.forEach((key) => {
        keys.push(keycodes[key.toLowerCase()])
      })

      formattedString.push(keys)
    } else {
      formattedString.push(keycodes[str.toLowerCase()])
    }
  })

  return formattedString
}
