import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Graph from "./Components/Graph/Graph";
import NewCon from "./Components/NewCon/NewCon";
import Edit from "./Components/Edit/Edit";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/graph" element={<Graph />} />
          <Route path="/new" element={<NewCon />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;
