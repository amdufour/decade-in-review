import * as d3 from "d3";

import { degToRad } from "../helper/helper";

const LifeQualityOverview = props => {
  // Dimensions
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const width = 300;
  const height = 300;
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;
  const mainCircleRadius = 60;
  const guidelinesOuterRadius = 120;
  const guidelinesInnerRadius = 90;
  const externalCirclesRadius = 20;
  const improvementCircleRadius = 3;

  const categories = [
    { id: "access_to_electricity", cx: (guidelinesInnerRadius * Math.cos(degToRad(60 - 180))), cy: (guidelinesInnerRadius * Math.sin(degToRad(60 - 180))) },
    { id: "access_to_internet", cx: (guidelinesInnerRadius * Math.cos(degToRad(30 - 180))), cy: (guidelinesInnerRadius * Math.sin(degToRad(30 - 180))) },
    { id: "access_to_drinking_water", cx: 0, cy: -1 * guidelinesInnerRadius },
    { id: "access_to_safe_sanitation", cx: (guidelinesInnerRadius * Math.cos(degToRad(30 - 90))), cy: (guidelinesInnerRadius * Math.sin(degToRad(30 - 90))) },
    { id: "literacy", cx: (guidelinesInnerRadius * Math.cos(degToRad(60 - 90))), cy: (guidelinesInnerRadius * Math.sin(degToRad(60 - 90))) },
  ];


  // Scales
  const hpiColorScale = d3.scaleDiverging(d3.interpolateSpectral)
    .domain([20, 40, 62]);
  const percentageRadiusScale = d3.scaleRadial()
    .domain([0, 100])
    .range([0, externalCirclesRadius]);
  const categoriesColorScale = d3.scaleOrdinal()
    .domain(categories.map(c => c.id))
    .range(["#af7aa1", "#ff9da7", "#4e79a7", "#f28e2c", "#9c755f"]);
  const hungerScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, mainCircleRadius]);


  // Life expectancy
  const arcGeneratorLifeExpectancy = d3.arc()
    .innerRadius(mainCircleRadius - 2)
    .outerRadius(mainCircleRadius + 2)
    .cornerRadius(5); 

  const maxLifeExpectancy = 85;
  const lifeExpectancy2010 = props.data.find(d => d.id === "life_expectancy").value_2010;
  const lifeExpectancy2020 = props.data.find(d => d.id === "life_expectancy").value_2020;
  const percentageLifeExpectancy2020 = lifeExpectancy2020 / maxLifeExpectancy;
  const angleLifeExpectancy2020_rad = degToRad(percentageLifeExpectancy2020 * 360) + Math.PI;

  const lifeExpectancyPath2020 = arcGeneratorLifeExpectancy({
    startAngle: Math.PI,
    endAngle: angleLifeExpectancy2020_rad
  });


  // Guidelines
  const arcGeneratorGuideline = d3.arc()
    .innerRadius(guidelinesInnerRadius - 0.5)
    .outerRadius(guidelinesInnerRadius + 0.5)
    .cornerRadius(1);
  const guidelinePath = arcGeneratorGuideline({
    startAngle: degToRad(-1 * 80),
    endAngle: degToRad(80)
  });
    

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <defs>
        <linearGradient id="hpiGradient">
          <stop offset="0%" stopColor={hpiColorScale(props.data.find(d => d.id === "happy_planet_index").value_2010)} />
          <stop offset="100%" stopColor={hpiColorScale(props.data.find(d => d.id === "happy_planet_index").value_2020)} />
        </linearGradient>
      </defs>
      <g transform={`translate(${margin.left + innerWidth/2}, ${margin.top + innerHeight/2})`}>
        <g className="guidelines-container">
          <g
            fill="none"
            stroke="#bbb"
            strokeDasharray="6px 8px"
            strokeLinecap="round"
          >
            <line x1="0" y1={-1 * guidelinesOuterRadius} x2="0" y2="0" />
            <line x1="0" y1="0" x2={(guidelinesOuterRadius * Math.cos(degToRad(60 - 180)))} y2={guidelinesOuterRadius * Math.sin(degToRad(60 - 180))} />
            <line x1="0" y1="0" x2={(guidelinesOuterRadius * Math.cos(degToRad(30 - 180)))} y2={guidelinesOuterRadius * Math.sin(degToRad(30 - 180))} />
            <line x1="0" y1="0" x2={(guidelinesOuterRadius * Math.cos(degToRad(60 - 90)))} y2={guidelinesOuterRadius * Math.sin(degToRad(60 - 90))} />
            <line x1="0" y1="0" x2={(guidelinesOuterRadius * Math.cos(degToRad(30 - 90)))} y2={guidelinesOuterRadius * Math.sin(degToRad(30 - 90))} />
            {categories.map(c => (
              <circle
                key={`category-guideline-${c.id}`}
                cx={c.cx}
                cy={c.cy}
                r={externalCirclesRadius}
              />
            ))}
          </g>
          <path d={guidelinePath} stroke="#ddd" />
        </g>
        <circle
          cx="0"
          cy="0"
          r={mainCircleRadius}
          fill="url(#hpiGradient)"
        />
        <circle
            cx={0}
            cy={0}
            r={improvementCircleRadius}
            fill={
              props.data.find(d => d.id === "happy_planet_index").value_2020 >= props.data.find(d => d.id === "happy_planet_index").value_2010
                ? "black"
                : "white"
            }
            stroke="black"
            strokeWidth={2}
          />
        <g className="arc-container">
          <path
            d={lifeExpectancyPath2020}
            fill="#aaa"
          />
          <circle
            cx={0}
            cy={mainCircleRadius}
            r={improvementCircleRadius}
            fill={
              props.data.find(d => d.id === "life_expectancy").value_2020 >= props.data.find(d => d.id === "life_expectancy").value_2010
                ? "black"
                : "white"
            }
            stroke="black"
            strokeWidth={2}
          />
        </g>
        <g className="hunger-container">
          <line 
            x1={guidelinesInnerRadius} 
            y1="0" 
            x2={guidelinesInnerRadius}
            y2={hungerScale(100)}
            stroke="#ccc"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <line 
            x1={guidelinesInnerRadius} 
            y1="0" 
            x2={guidelinesInnerRadius}
            y2={hungerScale(props.data.find(d => d.id === "hunger").value_2020)}
            stroke="black"
            strokeWidth={4}
            strokeLinecap="round"
          />
          <circle
            cx={guidelinesInnerRadius}
            cy={-1 * 8}
            r={improvementCircleRadius}
            fill={
              props.data.find(d => d.id === "hunger").value_2020 >= props.data.find(d => d.id === "hunger").value_2010
                ? "white"
                : "black"
            }
            stroke="black"
            strokeWidth={2}
          />
        </g>
        {categories.map(c => (
          <g className={`category-container-${c.id}`} key={`category-${c.id}`}>
            <circle
              cx={c.cx}
              cy={c.cy}
              r={percentageRadiusScale(props.data.find(d => d.id === c.id).value_2020)}
              fill={categoriesColorScale(c.id)}
              fillOpacity="0.5"
            />
            <circle
              cx={c.cx}
              cy={c.cy}
              r={improvementCircleRadius}
              fill={
                props.data.find(d => d.id === c.id).value_2020 >= props.data.find(d => d.id === c.id).value_2010 
                  ? "black"
                  : "white"
              }
              stroke="black"
              strokeWidth={2}
            />
          </g>
        ))}
      </g>
    </svg>
  );
};

export default LifeQualityOverview;