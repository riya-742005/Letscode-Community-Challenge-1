import React, { useState } from 'react';
import Select from 'react-select';
import CountUp from 'react-countup';
import { statesData } from '../data/statesData'; // adjust path as needed

const HeroSection = ({ cityOptions, onCityChange, onMetricChange }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [selectedMetrics, setSelectedMetrics] = useState([]);

  const stateOptions = statesData.map((s) => ({
    label: s.state,
    value: s.state,
  }));
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

  const currentStateData = statesData?.find(
    (s) => s.state === selectedState?.value
  );

  const getSuffix = (metric) => {
    if (metric === 'gdp') return ' ₹ L Cr';
    if (metric === 'co2') return ' Mt';
    if (['internet', 'literacy', 'unemployment'].includes(metric)) return '%';
    return '';
  };

  return (
    <div
      style={{ background: '#FDF6EC', padding: '2rem', textAlign: 'center' }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
        }}
      >
        🇮🇳 Bharat Pulse: Decoding India’s Development
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
        An AI-powered dashboard visualizing India’s growth, one state at a time.
      </p>

      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <Select
          options={stateOptions}
          onChange={setSelectedState}
          placeholder="Select State"
          styles={{ container: (base) => ({ ...base, minWidth: '200px' }) }}
        />

        <Select
          isMulti
          options={metricOptions}
          placeholder="Select Metrics"
          onChange={(options) => setSelectedMetrics(options || [])}
          styles={{ container: (base) => ({ ...base, minWidth: '300px' }) }}
        />
      </div>

      {selectedState && currentStateData && selectedMetrics.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>
            {selectedState.label} - Metrics Overview:
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1.5rem',
            }}
          >
            {selectedMetrics.map((metricObj) => (
              <div
                key={metricObj.value}
                style={{
                  background: '#ffffff',
                  padding: '1rem 2rem',
                  borderRadius: '8px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                  minWidth: '180px',
                }}
              >
                <strong>{metricObj.label}: </strong>
                <CountUp
                  end={currentStateData[metricObj.value]}
                  duration={2}
                  separator=","
                  suffix={getSuffix(metricObj.value)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroSection;

