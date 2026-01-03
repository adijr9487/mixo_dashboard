import { Dashboard } from "./components/Dashboard";
import { Typography } from "antd";
import "./App.css";

const { Title, Text } = Typography;

const App = () => {
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <Title level={2}>Mixo Ads Dashboard</Title>
        <Text italic>by Aditya</Text>
      </div>
      <Dashboard />
    </div>
  );
};

export default App;
