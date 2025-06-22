import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Heatmap from "./pages/Heatmap";
import LineChart from "./pages/LineChartPage";
import Navbar from "./components/Navbar";
import Rankings from "./pages/Rankings";
import InsightPanel from "./components/InsightPanel";
import cityData from "./data/cities.json";
import HeroSection from "./components/HeroSection";
import MetricDetails from "./pages/MetricDetails";
import InsightPage from "./components/InsightPanel";
import { statesData as yourCityData } from "./data/statesData"; // adjust path if it's elsewhere



import './App.css';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCities, setSelectedCities] = useState([]);
  
  const [selectedMetric, setSelectedMetric] = useState("gdp"); // default

  const cityOptions = cityData.map((city) => ({
    value: city.city,
    label: city.city,
  }));
  return (
    <Router>
      

      <div style={{ background: darkMode ? "#121212" : "#fff", color: darkMode ? "#eee" : "#000", minHeight: "100vh" }}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/heatmap" element={<Heatmap />} />
          <Route path="/linechart" element={<LineChart />} />
          <Route path="/rankings" element={<Rankings />} />
          <Route path="/metric/:metricKey" element={<MetricDetails />} />
          <Route path="/insights" element={
  <InsightPage cityData={yourCityData} selectedCities={["Nashik", "Pune"]} />
} />
        </Routes>
        
      </div>
    </Router>
    
   
);

}

export default App;




