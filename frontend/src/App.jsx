import { Button, Form, Input } from "antd";
import { createCommand, getCommands } from "../api";
import { useEffect, useState } from "react";

const App = () => {
  const [form] = Form.useForm();
  const [commands, setCommands] = useState([])
  const [success, setSuccess] = useState(false)

  const fetchCommands = async () => {
    const res = await getCommands();
    setCommands(res)
  }
 
  useEffect(() => {
    fetchCommands();
  }, [])

  const onFinish = async (values) => {
    console.log(values)
    const success = await createCommand({
      command: values.commandName,
      description: values.description,
      keystrokes: values.keystrokes,
    })

    setSuccess(success)
    fetchCommands();

    form.resetFields();
  }

  return (
    <>
      <Form
        onFinish={onFinish}
        form={form}
      >
        <Form.Item
          label="Command Name"
          name="commandName"
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          required
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Keystrokes"
          name="keystrokes"
          required
        >
          <Input  />
          
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div>Rules for inputting keystrokes:</div>
          <ul>
            <li>
              For keys pressed simultaneously please connect them using "+".
            </li>
            <li>
              Please use "ctrl" for the Control Key.
            </li>
            <li>
              If you have a sequence of keys, seperate them using |.
            </li>
            <li>
              Ex. ctrl+k+d | ctrl+s | s (everything before the | will be executed first, then the second, and so on and so forth.)
            </li>
          </ul>
      {success && <div>Successfully added command!</div>}
      <div>
        {commands.map(([key, value]) => 
        <ul key={key}>
          <li style={{ fontWeight: 600 }}>{key}</li>
          <li>{value.description}</li>
          <li>{value.keystrokes}</li>
        
        </ul>)}
      </div>
    </>
  );
};

export default App;
