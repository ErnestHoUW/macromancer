import axios from "axios";

const URL = "http://localhost:3000"

export const getCommands = async () => {
  const { data } = await axios.get(
    `${URL}/command/all`,
  );

  return Object.entries(data);
};

export const createCommand = async (newData) => {
  const { data } = await axios.post(
    `${URL}/command/create`,
    newData,
  );

  return data.success;
};

export const deleteCommand = async (command) => {
  await axios.delete(
    `${URL}/command?commandName=${command}`,
  );
}
