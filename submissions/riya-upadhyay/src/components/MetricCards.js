import React from "react";
import CountUp from "react-countup";
import "./MetricCards.css";
import { useNavigate } from "react-router-dom";

const MetricCards = () => {
  const navigate = useNavigate();

  // ✅ Make sure this array is inside the component
  const metrics = [
    { key: "GDP (₹ Cr)", label: "GDP (₹ Cr)", value: 800000 },
    { key: "GNI (₹ Cr)", label: "GNI (₹ Cr)", value: 720000 },
    { key: "GDP per Capita", label: "GDP per Capita", value: 250000 },
    { key: "Unemployment Rate (%)", label: "Unemployment Rate (%)", value: 6.5 },
    { key: "Inflation Rate (%)", label: "Inflation Rate (%)", value: 4.2 },
    { key: "FDI (₹ Cr)", label: "FDI (₹ Cr)", value: 150000 },
    { key: "Export/Import Ratio", label: "Export/Import Ratio", value: 1.3 },
    { key: "Public Debt % GDP", label: "Public Debt % GDP", value: 42 },
    { key: "HDI", label: "HDI", value: 0.72 },
    { key: "Life Expectancy", label: "Life Expectancy", value: 72 },
    { key: "Infant Mortality Rate", label: "Infant Mortality Rate", value: 20 },
    { key: "Literacy Rate (%)", label: "Literacy Rate (%)", value: 91 },
    { key: "Education Index", label: "Education Index", value: 0.74 },
    { key: "Gender Inequality Index", label: "Gender Inequality Index", value: 0.43 },
    { key: "Population Growth Rate (%)", label: "Population Growth Rate (%)", value: 1.6 },
    { key: "Urban Population %", label: "Urban Population %", value: 48 },
    { key: "Healthcare Expenditure per Capita", label: "Healthcare Expenditure per Capita", value: 4500 },
    { key: "Physicians per 1000", label: "Physicians per 1000", value: 1.8 },
    { key: "Hospital Beds per 1000", label: "Hospital Beds per 1000", value: 2 },
    { key: "Clean Water Access %", label: "Clean Water Access %", value: 92 },
    { key: "Vaccination Coverage %", label: "Vaccination Coverage %", value: 89 },
    { key: "CO₂ Emissions per Capita", label: "CO₂ Emissions per Capita", value: 2.5 },
    { key: "Renewable Energy %", label: "Renewable Energy %", value: 17 },
    { key: "Forest Area %", label: "Forest Area %", value: 24 },
    { key: "Air Quality Index", label: "Air Quality Index", value: 165 },
    { key: "Environmental Performance Index", label: "Environmental Performance Index", value: 62 },
    { key: "Corruption Index", label: "Corruption Index", value: 45 },
    { key: "Internet Penetration %", label: "Internet Penetration %", value: 88 },
    { key: "Mobile Subscriptions", label: "Mobile Subscriptions", value: 110 },
    { key: "Infrastructure Index", label: "Infrastructure Index", value: 74 },
    { key: "Political Stability Index", label: "Political Stability Index", value: 58 },
    { key: "Gini Coefficient", label: "Gini Coefficient", value: 0.39 },
    { key: "Poverty Rate (%)", label: "Poverty Rate (%)", value: 12 },
    { key: "Social Protection %", label: "Social Protection %", value: 60 },
  ];

  const handleCardClick = (metricKey) => {
    navigate(`/metric/${metricKey}`);
  };

  return (
    <div className="metric-cards-container">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="metric-card"
          onClick={() => handleCardClick(metric.key)}
          style={{ cursor: "pointer" }}
        >
          <div className="metric-value">
            <CountUp
              end={metric.value}
              duration={2}
              decimals={
                metric.label.includes("%") ||
                metric.label.includes("HDI") ||
                metric.label.includes("Index") ||
                metric.label.includes("Ratio") ||
                metric.label.includes("Coefficient")
                  ? 2
                  : 0
              }
            />
          </div>
          <div className="metric-label">{metric.label}</div>
        </div>
      ))}
    </div>
  );
};

export default MetricCards;
