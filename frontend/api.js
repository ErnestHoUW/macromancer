import axios from "axios";

const URL = import.meta.env.VITE_PORKBUN_URL;

const apiClient = axios.create({
  baseURL: URL,
})

export const getCommands = async () => {
  const { data } = await apiClient.get(
    `/command/all`,
  );

  return Object.entries(data);
};

export const createCommand = async (newData) => {
  const { data } = await apiClient.post(
    `/command/create`,
    newData,
  );

  return data.success;
};

export const deleteCommand = async (command) => {
  await apiClient.delete(
    `/command?commandName=${command}`,
  );
}
