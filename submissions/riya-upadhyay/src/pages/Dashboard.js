import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import data from '../data/cities.json';
import Select from 'react-select';
import HeroSection from '../components/HeroSection';
import MetricCards from '../components/MetricCards';
import CityComparison from '../components/CityComparison';
import TimelineMap from '../components/TimelineMap';
import "./Dashboard.css";


const metricOptions = [
  { value: "GDP (₹ Cr)", label: "GDP (₹ Cr)" },
  { value: "GNI (₹ Cr)", label: "GNI (₹ Cr)" },
  { value: "GDP per Capita", label: "GDP per Capita" },
  { value: "Unemployment Rate (%)", label: "Unemployment Rate (%)" },
  { value: "Inflation Rate (%)", label: "Inflation Rate (%)" },
  { value: "FDI (₹ Cr)", label: "FDI (₹ Cr)" },
  { value: "Export/Import Ratio", label: "Export/Import Ratio" },
  { value: "Public Debt % GDP", label: "Public Debt % GDP" },
  { value: "HDI", label: "HDI" },
  { value: "Life Expectancy", label: "Life Expectancy" },
  { value: "Infant Mortality Rate", label: "Infant Mortality Rate" },
  { value: "Literacy Rate (%)", label: "Literacy Rate (%)" },
  { value: "Education Index", label: "Education Index" },
  { value: "Gender Inequality Index", label: "Gender Inequality Index" },
  { value: "Population Growth Rate (%)", label: "Population Growth Rate (%)" },
  { value: "Urban Population %", label: "Urban Population %" },
  { value: "Healthcare Expenditure per Capita", label: "Healthcare Expenditure per Capita" },
  { value: "Physicians per 1000", label: "Physicians per 1000" },
  { value: "Hospital Beds per 1000", label: "Hospital Beds per 1000" },
  { value: "Clean Water Access %", label: "Clean Water Access %" },
  { value: "Vaccination Coverage %", label: "Vaccination Coverage %" },
  { value: "CO₂ Emissions per Capita", label: "CO₂ Emissions per Capita" },
  { value: "Renewable Energy %", label: "Renewable Energy %" },
  { value: "Forest Area %", label: "Forest Area %" },
  { value: "Air Quality Index", label: "Air Quality Index" },
  { value: "Environmental Performance Index", label: "Environmental Performance Index" },
  { value: "Corruption Index", label: "Corruption Index" },
  { value: "Internet Penetration %", label: "Internet Penetration %" },
  { value: "Mobile Subscriptions", label: "Mobile Subscriptions" },
  { value: "Infrastructure Index", label: "Infrastructure Index" },
  { value: "Political Stability Index", label: "Political Stability Index" },
  { value: "Gini Coefficient", label: "Gini Coefficient" },
  { value: "Poverty Rate (%)", label: "Poverty Rate (%)" },
  { value: "Social Protection %", label: "Social Protection %" },
];


function Dashboard() {
  const [selectedMetric, setSelectedMetric] = useState(metricOptions[0]);

  return (
    <div style={{ padding:'20px' }}>
      <HeroSection />
      <MetricCards />
      <CityComparison />
      <TimelineMap />

      <h2>📊 City-wise Growth Metrics</h2>
      <div style={{ width: 300, marginBottom: 20 }}>
        <Select
          options={metricOptions}
          value={selectedMetric}
          onChange={setSelectedMetric}
          placeholder="Select Metric"
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="city" />
          <YAxis />
          <Tooltip />
          <Bar dataKey={selectedMetric.value} fill="#00bcd4" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Dashboard;
