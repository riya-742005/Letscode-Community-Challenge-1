import React, { useState } from 'react';
import stateMetrics from '../data/stateMetrics.json';
import { scaleLinear } from 'd3-scale';
import { interpolateBlues } from 'd3-scale-chromatic';

const metricOptions = [
  { value: "GDP (₹ Cr)", label: "GDP (₹ Cr)" },
  { value: "HDI", label: "HDI" },
  { value: "CO₂ Emissions per Capita", label: "CO₂ Emissions per Capita" },
  { value: "Literacy Rate (%)", label: "Literacy Rate (%)" },
  { value: "Unemployment Rate (%)", label: "Unemployment Rate (%)" },
  { value: "Internet Penetration %", label: "Internet Penetration (%)" },
  { value: "Life Expectancy", label: "Life Expectancy" },
  { value: "Gini Coefficient", label: "Gini Coefficient" },
  { value: "Population Growth Rate (%)", label: "Population Growth Rate (%)" },
  { value: "Healthcare Expenditure per Capita", label: "Healthcare Expenditure per Capita" },
];

function Rankings() {
  const [selectedMetric, setSelectedMetric] = useState(metricOptions[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = stateMetrics.filter((entry) => {
    const name = entry.state || entry.city || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const sortedData = [...filteredData].sort(
    (a, b) => b[selectedMetric.value] - a[selectedMetric.value]
  );

  const values = filteredData.map((e) => e[selectedMetric.value]).filter(v => typeof v === 'number');
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const colorScale = scaleLinear()
    .domain([minVal, maxVal])
    .range([0.2, 1]); // normalized input to interpolateBlues

  return (
    <div style={{ padding: '2rem', overflowX: 'auto' }}>
      <h2>📈 State/City Rankings</h2>

      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <select
          value={selectedMetric.value}
          onChange={(e) =>
            setSelectedMetric(
              metricOptions.find((m) => m.value === e.target.value)
            )
          }
          style={{ padding: '8px' }}
        >
          {metricOptions.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search state or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px' }}
        />
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6' }}>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>State/City</th>
            <th style={thStyle}>{selectedMetric.label}</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry, index) => {
            const value = entry[selectedMetric.value];
            const intensity = typeof value === 'number' ? colorScale(value) : 0;
            const bgColor = interpolateBlues(intensity);

            return (
              <tr key={entry.state || entry.city} style={{ backgroundColor: bgColor }}>
                <td style={tdStyle}>
                  {index + 1}
                  {index === 0
                    ? ' 🥇'
                    : index === 1
                    ? ' 🥈'
                    : index === 2
                    ? ' 🥉'
                    : ''}
                </td>
                <td style={tdStyle}>{entry.state || entry.city}</td>
                <td style={tdStyle}>{value ?? 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: '10px',
  textAlign: 'left',
  borderBottom: '2px solid #ddd',
};

const tdStyle = {
  padding: '10px',
};

export default Rankings;


