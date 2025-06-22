import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { scaleLinear } from "d3-scale";
import indiaGeo from "../data/india-geo.json";
import cityYearData from "../data/cities-by-year.json";

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

// Sample coordinates for cities (you can expand this list or make it dynamic)
const cityCoordinates = {
  Maharashtra: [72.8777, 19.076],
  Gujarat: [72.5714, 23.0225],
  Karnataka: [77.5946, 12.9716],
  TamilNadu: [80.2707, 13.0827],
  Delhi: [77.1025, 28.7041],
  Bangalore:[77.594566, 12.971599],
  Hyderabad: [78.491684, 17.387140],
  Chennai:[80.237617,13.067439],
  Pune:[73.856744,18.520430],
  Ahmedabad:[72.571365 ,23.022505],
  Jaipur:[75.787270,26.912434],
  Lucknow:[80.946166,26.846694],
  Bhopal:[77.412617,23.259933],
  Patna:[85.137566,25.594095]

};

const TimelineMap = () => {
  const [year, setYear] = useState(2015);
  const [metric, setMetric] = useState("gdp");
  const [playing, setPlaying] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  const getMetricRange = () => {
    const dataForAllYears = Object.values(cityYearData).flat();
    const values = dataForAllYears.map((d) => d[metric]).filter((v) => typeof v === "number");
    return [Math.min(...values), Math.max(...values)];
  };

  const colorScale = scaleLinear()
    .domain(getMetricRange())
    .range(["#c7e9f1", "#08306b"]);

  useEffect(() => {
    if (playing) {
      const id = setInterval(() => {
        setYear((prev) => (prev < 2023 ? prev + 1 : 2015));
      }, 1500);
      return () => clearInterval(id);
    }
  }, [playing]);

  const currentYearData = cityYearData[year] || [];

  return (
    <div style={{ padding: "1.5rem", maxWidth: "100%", overflowX: "auto" }}>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        🗺️ Timeline-Based Growth Map
      </h2>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "center" }}>
        
        <span><strong>Year:</strong> {year}</span>
        <button onClick={() => setPlaying((p) => !p)}>
          {playing ? "Pause" : "Play"}
        </button>
      </div>

      <div style={{ display: "flex", gap: "2rem" }}>
        {/* Map */}
        <div style={{ width: "100%", maxWidth: "1000px", height: "800px" }}>
          <ComposableMap
            projection="geoMercator"
            width={1000}
            height={800}
            projectionConfig={{
              scale: 1200,
              center: [82.8, 22.5], // center India
            }}
          >
            <Geographies geography={indiaGeo}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const stateName = geo.properties.name;
                  const cityData = currentYearData.find(
                    (c) =>
                      c.city &&
                      stateName &&
                      c.city.toLowerCase() === stateName.toLowerCase()
                  );
                  const value = cityData ? cityData[metric] : 0;
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={cityData ? colorScale(value) : "#B2BEB5"}
                      stroke="#FFF"
                      style={{
                        default: { outline: "none" },
                        hover: { fill: "#f59e0b", outline: "none" },
                        pressed: { outline: "none" },
                      }}
                    />
                  );
                })
              }
            </Geographies>

            {/* Circles for cities */}
            {currentYearData.map((city) => {
              const coords = cityCoordinates[city.city];
              if (!coords) return null;
              return (
                <Marker key={city.city} coordinates={coords}>
                  <circle
                    r={6}
                    fill={colorScale(city[metric])}
                    stroke="#222"
                    strokeWidth={0.5}
                    onClick={() => setSelectedCity(city.city)}
                    style={{ cursor: "pointer" }}
                  />
                </Marker>
              );
            })}
          </ComposableMap>
        </div>

        {/* Selected City Stats */}
        <div
          style={{
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "8px",
            minWidth: "250px",
            maxWidth: "150px",
            background: "#f8fafc",
            fontSize: "0.95rem",
          }}
        >
          <h3 style={{ fontWeight: "bold", marginBottom: "1rem" }}>📊 Selected Stats</h3>
          <p><strong>Year:</strong> {year}</p>
          <p><strong>Metric:</strong> {metricOptions.find(m => m.value === metric)?.label}</p>
          {selectedCity ? 
          <>
            <p><strong>City:</strong> {selectedCity}</p>
            <p><strong>GDP (₹ Cr):</strong> {currentYearData.find(c => c.city === selectedCity)?.["GDP (₹ Cr)"]}</p>
            <p><strong>HDI:</strong> {currentYearData.find(c => c.city === selectedCity)?.["HDI"]}</p>
            <p><strong>CO₂ Emissions per Capita:</strong> {currentYearData.find(c => c.city === selectedCity)?.["CO₂ Emissions per Capita"]}</p>
            <p><strong>GNI (₹ Cr)</strong> {currentYearData.find(c => c.city === selectedCity)?.["GNI (₹ Cr)"]}</p>
            <p><strong>Unemployment Rate (%)</strong> {currentYearData.find(c => c.city === selectedCity)?.["Unemployment Rate (%)"]}</p>
            <p><strong>Inflation Rate (%)</strong> {currentYearData.find(c => c.city === selectedCity)?.["Inflation Rate (%)"]}</p>
            <p><strong>FDI (₹ Cr)</strong> {currentYearData.find(c => c.city === selectedCity)?.["FDI (₹ Cr)"]}</p>
            <p><strong>Export/Import Ratio</strong> {currentYearData.find(c => c.city === selectedCity)?.["Export/Import Ratio"]}</p>
            <p><strong>Public Debt % GDP</strong> {currentYearData.find(c => c.city === selectedCity)?.["Public Debt % GDP"]}</p>
            <p><strong>Life Expectancy</strong> {currentYearData.find(c => c.city === selectedCity)?.["Life Expectancy"]}</p>
            <p><strong>Infant Mortality Rate</strong> {currentYearData.find(c => c.city === selectedCity)?.["Infant Mortality Rate"]}</p>
            <p><strong>Literacy Rate (%)</strong> {currentYearData.find(c => c.city === selectedCity)?.["Literacy Rate (%)"]}</p>
            <p><strong>Education Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Education Index"]}</p>
            <p><strong>Gender Inequality Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Gender Inequality Index"]}</p>
            <p><strong>Population Growth Rate (%)</strong> {currentYearData.find(c => c.city === selectedCity)?.["Urban Population %"]}</p>
            <p><strong>Urban Population %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Urban Population %"]}</p>
            <p><strong>Healthcare Expenditure per Capita</strong> {currentYearData.find(c => c.city === selectedCity)?.["Healthcare Expenditure per Capital"]}</p>
            <p><strong>Physicians per 1000</strong> {currentYearData.find(c => c.city === selectedCity)?.["Physicians per 1000"]}</p>
            <p><strong>Hospital Beds per 1000</strong> {currentYearData.find(c => c.city === selectedCity)?.["Hospital Beds per 1000"]}</p>
            <p><strong>Clean Water Access %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Clean Water Access %"]}</p>
            <p><strong>Vaccination Coverage %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Vaccination Coverage %"]}</p>
            <p><strong>CO₂ Emissions per Capita</strong> {currentYearData.find(c => c.city === selectedCity)?.["CO₂ Emissions per Capita"]}</p>
            <p><strong>Renewable Energy %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Renewable Energy %"]}</p>
            <p><strong>Forest Area %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Forest Area %"]}</p>
            <p><strong>Air Quality Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Air Quality Index"]}</p>
            <p><strong>Environmental Performance Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Environmental Performance Index"]}</p>
            <p><strong>Corruption Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Corruption Index"]}</p>
            <p><strong>Internet Penetration %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Internet Penetration %"]}</p>
            <p><strong>Mobile Subscriptions</strong> {currentYearData.find(c => c.city === selectedCity)?.["Mobile Subscriptions"]}</p>
            <p><strong>Infrastructure Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Infrastructure Index"]}</p>
            <p><strong>Political Stability Index</strong> {currentYearData.find(c => c.city === selectedCity)?.["Political Stability Index"]}</p>
            <p><strong>Gini Coefficient</strong> {currentYearData.find(c => c.city === selectedCity)?.["Gini Coefficient"]}</p>
            <p><strong>Poverty Rate (%)</strong> {currentYearData.find(c => c.city === selectedCity)?.["Poverty Rate (%)"]}</p>
            <p><strong>Social Protection %</strong> {currentYearData.find(c => c.city === selectedCity)?.["Social Protection %"]}</p>
            </>
           : (
            <p style={{ fontStyle: "italic", color: "#666" }}>Click on a city circle to view stats.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineMap;
