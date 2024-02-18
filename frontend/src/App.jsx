import { Button, Form, Input } from "antd";

const App = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log(values)

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
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default App;
