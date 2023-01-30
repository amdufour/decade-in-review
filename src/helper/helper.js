import * as d3 from "d3";

export const degToRad = (deg) => {
  return deg * Math.PI / 180;
};

export const regions = [
  { value: "africa", label: "Africa" },
  { value: "americas", label: "Americas" },
  { value: "eastern-mediterranean", label: "Eastern Mediterranean" },
  { value: "europe", label: "Europe" },
  { value: "south-east-asia", label: "South-East Asia" },
  { value: "western-pacific", label: "Western Pacific" },
];

export const hpiColorScale = d3.scaleLinear()
  .domain([24, 65])
  .range(["#ac2c5a", "#059799"]);