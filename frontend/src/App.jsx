import { useState } from "react";
import MenuList from "../components/MenuList/MenuList";
import CommandList from "../components/CommandList/CommandList";
import CommandForm from "../components/CommandForm/CommandForm";
import styled from "styled-components";

const App = () => {
  const [currentTab, setCurrentTab] = useState("allCommands");

  const handleTabChange = (key) => {
    setCurrentTab(key);
  };

  return (
    <Wrapper>
      <h1>macromancer</h1>
      <MenuList tab={currentTab} setTab={handleTabChange} />
      {currentTab === "allCommands" && <CommandList />}
      {currentTab === "addCommand" && <CommandForm />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: calc(95vw - 40px);
  height: 100vh;
`

export default App;
