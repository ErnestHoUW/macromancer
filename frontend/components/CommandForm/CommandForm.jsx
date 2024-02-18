import { Alert, Button, Form, Input, List } from "antd";
import { useState } from "react";
import { createCommand } from "../../api";
import styled from "styled-components";

const data = [
  "For keys pressed simultaneously please connect them using " + "",
  "Please use \"ctrl\" for the Control Key. Type out the full key for all other keys",
  "If you have a sequence of keys, seperate them using |.",
  "Ex. ctrl+k+d | ctrl+s | s (everything before the | will be executed first, then the second, and so on and so forth.)",
];

const CommandForm = () => {
  const [form] = Form.useForm();
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const onFinish = async (values) => {
    const success = await createCommand({
      command: values.commandName,
      description: values.description,
      keystrokes: values.keystrokes,
    });

    if (success) {
      setSuccess(true);
      setFailure(false);
      form.resetFields();
    } else {
      setSuccess(false);
      setFailure(true);
    }
  };

  return (
    <Wrapper>
      <div className="fields">
        {success && (
          <Alert
            message="Successfully Created New Command"
            type="success"
            showIcon
          />
        )}{" "}
        {failure && (
          <Alert
            message="Failed To Create New Command"
            type="error"
            showIcon
          />
        )}
        <Form onFinish={onFinish} form={form} layout="vertical">
          <Form.Item
            rules={[{ required: true }]}
            label="Command Name"
            name="commandName"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Description"
            name="description"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            label="Keystrokes"
            name="keystrokes"
            required
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div className="rules">
        <h3>Rules for inputting keystrokes:</h3>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  gap: 36px;
  max-width: 1000px;

  .fields {
    flex: 1 1 40%;
  }

  .ant-alert {
    margin-bottom: 10px;
  }

  .rules {
    flex: 1 1 60%;
  }
`;

export default CommandForm;
