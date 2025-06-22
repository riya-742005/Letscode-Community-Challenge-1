import React, { useState } from "react";
import Select from "react-select";
import "./InsightPanel.css";
import { FaLightbulb, FaGlobeAsia } from "react-icons/fa";


const defaultOptions = [
  { value: "Mumbai", label: "Mumbai" },
  { value: "Pune", label: "Pune" },
  { value: "Nashik", label: "Nashik" },
  { value: "Nagpur", label: "Nagpur" },
  { value: "Delhi", label: "Delhi" },
  { value: "Bangalore", label: "Bangalore" },
  { value: "Hyderabad", label: "Hyderabad" },
  { value: "Kolkata", label: "Kolkata" },
  { value: "Ahmedabad", label: "Ahmedabad" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Kerala", label: "Kerala" },
  { value: "Rajasthan", label: "Rajasthan" },
];

// 🧠 Insights for each city/state
const insightsMap = {
  Mumbai: {
    insight: "Major financial hub with severe housing shortage and traffic congestion.",
    policy: "Develop satellite towns with high-speed rail to reduce core pressure.",
    sdg: "SDG 11 – Sustainable Cities and Communities",
  },
  Pune: {
    insight: "Growing tech and education hub with increasing urban sprawl.",
    policy: "Promote mixed-use zoning and green public transport.",
    sdg: "SDG 9 – Industry, Innovation, and Infrastructure",
  },
  Nashik: {
    insight: "Emerging smart city with strong agricultural base.",
    policy: "Invest in agri-tech and cold chain infrastructure.",
    sdg: "SDG 2 – Zero Hunger",
  },
  Nagpur: {
    insight: "Centrally located logistics hub with metro development.",
    policy: "Establish Nagpur as a multimodal logistics corridor.",
    sdg: "SDG 8 – Decent Work and Economic Growth",
  },
  Delhi: {
    insight: "Capital city with serious air pollution and population pressure.",
    policy: "Mandate cleaner fuels, EVs, and vertical green walls.",
    sdg: "SDG 13 – Climate Action",
  },
  Bangalore: {
    insight: "India's tech capital, but facing infrastructure saturation.",
    policy: "Adopt de-centralized tech parks and smart mobility.",
    sdg: "SDG 9 – Industry, Innovation, and Infrastructure",
  },
  Hyderabad: {
    insight: "Growing IT and pharma sectors with good urban planning.",
    policy: "Replicate HITEC City model in outskirts with metro links.",
    sdg: "SDG 8 – Decent Work and Economic Growth",
  },
  Kolkata: {
    insight: "Rich cultural heritage, needs modernization of transport and drainage.",
    policy: "Modernize old infrastructure with PPP model.",
    sdg: "SDG 11 – Sustainable Cities and Communities",
  },
  Ahmedabad: {
    insight: "Fast-growing industrial city with riverfront development.",
    policy: "Focus on circular economy in textile and chemicals.",
    sdg: "SDG 12 – Responsible Consumption and Production",
  },
  Maharashtra: {
    insight: "Economic powerhouse with both urban and agrarian challenges.",
    policy: "Implement balanced regional development plans.",
    sdg: "SDG 10 – Reduced Inequalities",
  },
  UttarPradesh: {
    insight: "Most populous state with improving infrastructure.",
    policy: "Strengthen education and MSME support in rural areas.",
    sdg: "SDG 4 – Quality Education",
  },
  TamilNadu: {
    insight: "Industrial leader with strong healthcare and manufacturing.",
    policy: "Encourage renewable energy in coastal districts.",
    sdg: "SDG 7 – Affordable and Clean Energy",
  },
  Kerala: {
    insight: "High social indicators, facing migration and unemployment.",
    policy: "Foster local entrepreneurship and tourism tech.",
    sdg: "SDG 3 – Good Health and Well-being",
  },
  Rajasthan: {
    insight: "Vast desert state with water scarcity issues.",
    policy: "Promote desert agriculture and solar parks.",
    sdg: "SDG 6 – Clean Water and Sanitation",
  },
};

const InsightPanel = ({ options }) => {
  const [selectedCity, setSelectedCity] = useState(null);

  const selectedInsight = selectedCity?.value
    ? insightsMap[selectedCity.value]
    : null;

  return (
    <div className="insight-panel">
      <h2>📍 Development Insight Panel</h2>

      <Select
        options={options || defaultOptions}
        value={selectedCity}
        onChange={setSelectedCity}
        placeholder="Select city/state..."
        styles={{
          container: (base) => ({
            ...base,
            maxWidth: "400px",
            marginBottom: "1rem",
          }),
        }}
      />
      
      {selectedInsight && (
        <div className="flip-card">
          <div className="flip-card-inner">
            <div className="flip-card-front">
            <img src="/insight.jpg" alt="metrics doodle" style={{
  width: '40px',
  opacity: 0.2,
  position: 'absolute',
  top: '10px',
  right: '10px'
}} />

              <h3>{selectedCity.label}</h3>
              <FaLightbulb size={40} color="#FFD700" />
              <p>Click to view insight</p>
            </div>
            <div className="flip-card-back">
              <p><strong>Insight:</strong> {selectedInsight.insight}</p>
              <p><strong>Policy Suggestion:</strong> {selectedInsight.policy}</p>
              <p><strong>SDG:</strong> {selectedInsight.sdg}</p>
              <FaGlobeAsia size={30} color="#2e7d32" style={{ marginTop: 10 }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InsightPanel;

