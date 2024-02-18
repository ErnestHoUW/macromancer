import { Button, Table } from "antd";
import { useEffect, useState } from "react";
import { deleteCommand, getCommands } from "../../api";

const CommandList = () => {
  const [commands, setCommands] = useState([]);
  const columns = [
    {
      title: "Command Name",
      dataIndex: "commandName",
      key: "commandName",
      width: "20%",
    }, 
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
    }, 
    {
      title: "Keystrokes",
      dataIndex: "keystrokes",
      key: "keystrokes",
      width: "40%",
    },
    {
      title: "",
      key: "delete",
      align: 'center',
      render: (record) => (
        <Button danger onClick={(e) => onDelete(e, record)}>Delete</Button>
      ),
    },
  ]
  
  const onDelete = async (e, record) => {
    await deleteCommand(record.commandName);
    await fetchCommands();
  }

  const fetchCommands = async () => {
    const res = await getCommands();

    const mapped = res.map(([key, value]) => ({
      commandName: key,
      description: value.description,
      keystrokes: value.keystrokes,
    }))

    setCommands(mapped);
  };

  useEffect(() => {
    fetchCommands();
  }, []);

  return (
    <>
      <Table dataSource={commands} columns={columns} />
    </>
  )
}

export default CommandList;