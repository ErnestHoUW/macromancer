import { Menu } from "antd";
import { DatabaseOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

const items = [
  {
    label: "List of Commands",
    key: "allCommands",
    icon: <DatabaseOutlined />,
  },
  {
    label: "Create New Command",
    key: "addCommand",
    icon: <PlusOutlined />,
  },
];

const MenuList = ({ tab, setTab }) => {
  const onClick = (e) => {
    setTab(e.key);
  }

  return <StyledMenu onClick={onClick} selectedKeys={[tab]} mode="horizontal" items={items} />;
};

const StyledMenu = styled(Menu)`
  margin-bottom: 16px;
`

export default MenuList;
