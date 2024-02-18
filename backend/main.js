// Import required modules
import express from "express";
import { convertKeystrokes, readFile, updateFile } from "./utils.js";
import cors from 'cors'

// Create an Express application
const app = express();
const port = 3000; // Port number for the server to listen on

// Define middleware to parse JSON bodies
app.use(express.json());
app.use(cors())

const waitingCommands = [];

// Define a route handler for the root path
app.get("/command", (req, res) => {
  let command = waitingCommands.shift();

  console.log("sending", command);
  res.send(
    command
      ? JSON.stringify({ commands: command })
      : JSON.stringify({ status: "this is working" })
  );
});

app.get("/command/all", (req, res) => {
  const commands = readFile("./commands.json");

  res.header("Access-Control-Allow-Origin", "*");
  res.send(commands)
})

app.post("/command", (req, res) => {
  const { command } = req.body;

  const commands = readFile("./commands.json");

  const mappedCommand = commands[command];

  if (mappedCommand) {
    waitingCommands.push(convertKeystrokes(mappedCommand.keystrokes));
  }

  res.send("");
});

app.post("/command/create", (req, res) => {
  const { command, description, keystrokes } = req.body;

  updateFile("./commands.json", command, {
    description,
    keystrokes,
  })

  res.header("Access-Control-Allow-Origin", "*");
  res.send({ "success": true });
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
