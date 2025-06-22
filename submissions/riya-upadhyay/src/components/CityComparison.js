import React, { useState, useRef } from "react";
import { cityData } from "../data/cityData";
import CountUp from "react-countup";
import "./CityComparison.css";
import Select from "react-select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const CityComparison = () => {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [selectedMetrics, setSelectedMetrics] = useState([]);
  const pdfRef = useRef();

  const handleSelect = (e, setter) => setter(e.target.value);

  const allMetrics = Array.from(
    new Set([
      ...Object.keys(cityData[city1]?.metrics || {}),
      ...Object.keys(cityData[city2]?.metrics || {})
    ])
  ).map((metric) => ({ label: metric, value: metric }));

  const exportPDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("city_comparison.pdf");
    });
  };

  const getFilteredMetrics = () => {
    const selected = selectedMetrics.map((m) => m.value);
    const metrics1 = cityData[city1]?.metrics || {};
    const metrics2 = cityData[city2]?.metrics || {};

    return selected.map((key) => ({
      metric: key,
      value1: metrics1[key] || 0,
      value2: metrics2[key] || 0,
      diff: Math.abs((metrics1[key] || 0) - (metrics2[key] || 0))
    }));
  };

  const renderComparisonBarChart = () => {
    const chartData = getFilteredMetrics().map((item) => ({
      metric: item.metric,
      [city1]: item.value1,
      [city2]: item.value2
    }));

    return (
      <div className="comparison-chart">
        <h3>Metric Comparison Chart</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="metric" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey={city1} fill="#007bff" />
            <Bar dataKey={city2} fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="comparison-container">
      <h2>Compare Two Cities</h2>
      <div className="dropdowns">
        <select onChange={(e) => handleSelect(e, setCity1)} value={city1}>
          <option value="">Select City 1</option>
          {Object.keys(cityData).map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
        <select onChange={(e) => handleSelect(e, setCity2)} value={city2}>
          <option value="">Select City 2</option>
          {Object.keys(cityData).map((city) => (
            <option key={city}>{city}</option>
          ))}
        </select>
      </div>

      {city1 && city2 && (
        <>
          <div className="metric-select">
            <h4>Select Metrics to Compare</h4>
            <Select
              isMulti
              options={allMetrics}
              value={selectedMetrics}
              onChange={setSelectedMetrics}
              placeholder="Select metrics..."
            />
          </div>

          {selectedMetrics.length > 0 && (
            <>
              <div ref={pdfRef}>
                <div className="comparison-card">
                  <h3>{city1} vs {city2}</h3>
                  <div className="comparison-table">
                    <div className="comparison-header">
                      <span>Metric</span>
                      <span>{city1}</span>
                      <span>{city2}</span>
                    </div>
                    {getFilteredMetrics().map(({ metric, value1, value2 }) => (
                      <div className="comparison-row" key={metric}>
                        <span>{metric}</span>
                        <span><CountUp end={value1} duration={1.5} /></span>
                        <span><CountUp end={value2} duration={1.5} /></span>
                      </div>
                    ))}
                  </div>
                </div>
                {renderComparisonBarChart()}
              </div>
              <button className="export-btn" onClick={exportPDF}>Export as PDF</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CityComparison;








