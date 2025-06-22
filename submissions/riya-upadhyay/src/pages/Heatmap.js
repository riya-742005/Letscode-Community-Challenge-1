import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import indiaGeo from "../data/states.json";
import stateMetrics from "../data/stateMetrics.json";
import { scaleLinear } from "d3-scale";

const metricOptions = [
  { value: "GDP (₹ Cr)", label: "GDP (₹ Cr)" },
  { value: "HDI", label: "HDI" },
  { value: "CO₂ Emissions per Capita", label: "CO₂ Emissions per Capita" },
  { value: "Literacy Rate (%)", label: "Literacy Rate (%)" },
  { value: "Unemployment Rate (%)", label: "Unemployment Rate (%)" },
  { value: "Internet Penetration %", label: "Internet Penetration (%)" },
  { value: "Life Expectancy", label: "Life Expectancy" },
  { value: "Gini Coefficient", label: "Gini Coefficient" },
];

function Heatmap() {
  const [selectedMetric, setSelectedMetric] = useState(metricOptions[0].value);

  const getMetricRange = (metric) => {
    const values = stateMetrics.map((state) => state[metric]).filter((v) => typeof v === "number");
    return [Math.min(...values), Math.max(...values)];
  };

  const [minVal, maxVal] = getMetricRange(selectedMetric);
  const colorScale = scaleLinear().domain([minVal, maxVal]).range(["#E077FA", "#00838F"]);

  const getStyle = (feature) => {
    const stateName = feature.properties?.st_nm;
    if (!stateName) return {};

    const metricData = stateMetrics.find(
      (s) => (s.state || s.city || "").toLowerCase() === stateName.toLowerCase()
    );

    const fillValue = metricData ? metricData[selectedMetric] : 0;

    return {
      fillColor: colorScale(fillValue),
      weight: 1,
      color: "#fff",
      fillOpacity: 0.8,
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties?.st_nm;
    const data = stateMetrics.find(
      (s) => (s.state || s.city || "").toLowerCase() === stateName.toLowerCase()
    );

    if (data) {
      const popupContent = `
        <strong>${stateName}</strong><br/>
        ${metricOptions.map((m) => `${m.label}: ${data[m.value] ?? "N/A"}`).join("<br/>")}
      `;
      layer.bindPopup(popupContent);
    } else {
      layer.bindPopup(`<strong>${stateName}</strong><br/>No data available.`);
    }
  };

  return (
    <div style={{ height: "100vh", padding: "1rem" }}>
      <h2>🗺️ India Growth Heatmap</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="metric">Select Metric: </label>
        <select
          id="metric"
          value={selectedMetric}
          onChange={(e) => setSelectedMetric(e.target.value)}
          style={{ padding: "5px", fontSize: "1rem" }}
        >
          {metricOptions.map((m) => (
            <option key={m.value} value={m.value}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <MapContainer center={[22.9734, 78.6569]} zoom={5} style={{ height: "80vh", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON data={indiaGeo} style={getStyle} onEachFeature={onEachFeature} />
      </MapContainer>
    </div>
  );
}

export default Heatmap;
