import { Dashboard } from "./components/Dashboard";
import { Typography } from "antd";
import "./App.css";

const { Title } = Typography;

const App = () => {
  return (
    <div className="App">
      <Title level={2}>Mixo Ads Dashboard</Title>
      <Dashboard />
    </div>
  );
};

export default App;
