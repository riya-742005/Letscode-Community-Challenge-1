import React, { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import Select from "react-select";
import cityData from "../data/timeseries.json"; // Your JSON with yearly data

const cityOptions = Object.keys(cityData).map(city => ({ value: city, label: city }));

const metricOptions = Object.keys(cityData[cityOptions[0].value][0])
  .filter(key => key !== "year")
  .map(metric => ({ value: metric, label: metric }));

function LineChartPage() {
  const [selectedCity, setSelectedCity] = useState(cityOptions[0].value);
  const [selectedMetric, setSelectedMetric] = useState(metricOptions[0].value);

  const chartData = cityData[selectedCity];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📈 City Growth Over Time</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div style={{ width: 300 }}>
          <Select
            options={cityOptions}
            value={cityOptions.find(opt => opt.value === selectedCity)}
            onChange={option => setSelectedCity(option.value)}
            placeholder="Select City"
          />
        </div>

        <div style={{ width: 300 }}>
          <Select
            options={metricOptions}
            value={metricOptions.find(opt => opt.value === selectedMetric)}
            onChange={option => setSelectedMetric(option.value)}
            placeholder="Select Metric"
          />
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={selectedMetric}
            stroke="#ff7300"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChartPage;
