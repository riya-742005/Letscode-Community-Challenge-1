
import React from "react";
import { useParams } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import cityData from "../data/cities.json"; // or statesData

const metricDetailsMap = {
  "GDP (₹ Cr)": {
    title: "Gross Domestic Product (GDP)",
    description: "GDP measures the economic output of a city/state in crore rupees.",
    label: "GDP (₹ Cr)"
  },
  "GNI (₹ Cr)": {
    title: "Gross National Income (GNI)",
    description: "GNI includes GDP plus net income received from abroad.",
    label: "GNI (₹ Cr)"
  },
  "GDP per Capita": {
    title: "GDP per Capita",
    description: "GDP divided by the population; an average economic output per person.",
    label: "GDP per Capita"
  },
  "Unemployment Rate (%)": {
    title: "Unemployment Rate",
    description: "The percentage of the labor force that is jobless and seeking employment.",
    label: "Unemployment Rate (%)"
  },
  "Inflation Rate (%)": {
    title: "Inflation Rate",
    description: "The rate at which the general level of prices for goods and services rises.",
    label: "Inflation Rate (%)"
  },
  "FDI (₹ Cr)": {
    title: "Foreign Direct Investment",
    description: "The amount of investment coming from foreign entities into the economy.",
    label: "FDI (₹ Cr)"
  },
  "Export/Import Ratio": {
    title: "Export/Import Ratio",
    description: "The ratio of exports to imports, indicating trade balance.",
    label: "Export/Import Ratio"
  },
  "Public Debt % GDP": {
    title: "Public Debt as % of GDP",
    description: "The government's total debt expressed as a percentage of GDP.",
    label: "Public Debt % GDP"
  },
  "HDI": {
    title: "Human Development Index",
    description: "Composite index measuring health, education, and income.",
    label: "HDI"
  },
  "Life Expectancy": {
    title: "Life Expectancy",
    description: "The average number of years a person is expected to live.",
    label: "Life Expectancy"
  },
  "Infant Mortality Rate": {
    title: "Infant Mortality Rate",
    description: "The number of infant deaths per 1,000 live births.",
    label: "Infant Mortality Rate"
  },
  "Literacy Rate (%)": {
    title: "Literacy Rate",
    description: "Percentage of population over age 7 who can read and write.",
    label: "Literacy Rate (%)"
  },
  "Education Index": {
    title: "Education Index",
    description: "Index based on mean years of schooling and expected years of schooling.",
    label: "Education Index"
  },
  "Gender Inequality Index": {
    title: "Gender Inequality Index",
    description: "Measures gender disparities in reproductive health, empowerment, and labor.",
    label: "Gender Inequality Index"
  },
  "Population Growth Rate (%)": {
    title: "Population Growth Rate",
    description: "Annual increase in population as a percentage.",
    label: "Population Growth Rate (%)"
  },
  "Urban Population %": {
    title: "Urban Population %",
    description: "Percentage of population living in urban areas.",
    label: "Urban Population %"
  },
  "Healthcare Expenditure per Capita": {
    title: "Healthcare Expenditure per Capita",
    description: "Amount spent on health per person.",
    label: "Healthcare Expenditure per Capita"
  },
  "Physicians per 1000": {
    title: "Physicians per 1000",
    description: "Number of doctors available per 1,000 people.",
    label: "Physicians per 1000"
  },
  "Hospital Beds per 1000": {
    title: "Hospital Beds per 1000",
    description: "Number of hospital beds per 1,000 people.",
    label: "Hospital Beds per 1000"
  },
  "Clean Water Access %": {
    title: "Clean Water Access",
    description: "Percentage of population with access to clean water.",
    label: "Clean Water Access %"
  },
  "Vaccination Coverage %": {
    title: "Vaccination Coverage",
    description: "Percentage of population covered by essential vaccinations.",
    label: "Vaccination Coverage %"
  },
  "CO₂ Emissions per Capita": {
    title: "CO₂ Emissions per Capita",
    description: "Carbon dioxide emissions produced per person.",
    label: "CO₂ Emissions per Capita"
  },
  "Renewable Energy %": {
    title: "Renewable Energy %",
    description: "Share of renewable sources in total energy production.",
    label: "Renewable Energy %"
  },
  "Forest Area %": {
    title: "Forest Area %",
    description: "Percentage of land covered by forests.",
    label: "Forest Area %"
  },
  "Air Quality Index": {
    title: "Air Quality Index (AQI)",
    description: "Index showing the level of air pollution.",
    label: "Air Quality Index"
  },
  "Environmental Performance Index": {
    title: "Environmental Performance Index",
    description: "Composite index evaluating environmental health and ecosystem vitality.",
    label: "Environmental Performance Index"
  },
  "Corruption Index": {
    title: "Corruption Index",
    description: "Score measuring perceived levels of public sector corruption.",
    label: "Corruption Index"
  },
  "Internet Penetration %": {
    title: "Internet Penetration",
    description: "Percentage of population with access to the internet.",
    label: "Internet Penetration %"
  },
  "Mobile Subscriptions": {
    title: "Mobile Subscriptions",
    description: "Number of mobile phone subscriptions per 100 people.",
    label: "Mobile Subscriptions"
  },
  "Infrastructure Index": {
    title: "Infrastructure Index",
    description: "Measures quality and extent of infrastructure development.",
    label: "Infrastructure Index"
  },
  "Political Stability Index": {
    title: "Political Stability Index",
    description: "Measures likelihood of political instability or politically motivated violence.",
    label: "Political Stability Index"
  },
  "Gini Coefficient": {
    title: "Gini Coefficient",
    description: "Statistical measure of income inequality.",
    label: "Gini Coefficient"
  },
  "Poverty Rate (%)": {
    title: "Poverty Rate",
    description: "Percentage of population living below the poverty line.",
    label: "Poverty Rate (%)"
  },
  "Social Protection %": {
    title: "Social Protection Coverage",
    description: "Percentage of people covered by social protection programs.",
    label: "Social Protection %"
  }
};


const MetricDetails = () => {
  const { metricKey } = useParams();
  const metric = metricDetailsMap[metricKey];

  if (!metric) return <div style={{ padding: "2rem" }}>❌ Metric not found.</div>;

  const averageValue = (
    cityData.reduce((sum, city) => sum + (city[metricKey] || 0), 0) / cityData.length
  ).toFixed(2);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>{metric.title}</h2>
      <p>{metric.description}</p>
      <p><strong>National Average:</strong> {averageValue}</p>

      <div style={{ marginTop: "2rem" }}>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={cityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="city" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={+averageValue} label="Avg" stroke="red" strokeDasharray="3 3" />
            <Bar dataKey={metricKey} fill="#4f46e5" name={metric.label} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MetricDetails;
