import { useState, useEffect, Fragment } from "react";
import Select from 'react-select';
import * as d3 from "d3";

import Heatmap from "./Heatmap";
import ChartContainer from "../ChartComponents.js/ChartContainer";
import Axis from "../ChartComponents.js/Axis";
import { regions, colorScale } from "../helper/helper";

// Data
const topics = [
  { value: "literacy_women", label: "Women's literacy" },
  { value: "secondary_school_enrollment_girls", label: "Girls enrolled in high school" },
  { value: "women_MP_seats", label: "Parliament seats occupied by women" },
];

const BreakdownWomen = props => {
  const breakpoint = 576;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint ? true : false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoint && !isMobile) {
        setIsMobile(true);
      } else if (window.innerWidth > breakpoint && isMobile) {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
  }, [isMobile]);

  const defaultTopic = "women_MP_seats";
  const defaultRegionLabel = "Eastern Mediterranean";
  const defaultData = props.data.filter(c => c.region === defaultRegionLabel);

  const sortData = (d) => {
    d.sort((a, b) => {
      if (a.country_name < b.country_name) return -1;
      if (a.country_name > b.country_name) return 1;
      return 0;
    });
  };
  sortData(defaultData);

  const [topic, setTopic] = useState(defaultTopic);
  const [data, setData] = useState(defaultData);

  const handleTopicSelection = (selection) => {
    setTopic(selection.value);
  };

  const handleRegionSelection = (selection) => {
    const filteredData = props.data.filter(c => c.region === selection.label);
    setData(filteredData);
  };


  // Dimensions
  const margin = { top: 0, right: 10, bottom: 0, left: 0 };
  const width = 1200;
  const height = 40;
  const innerWidth = width - margin.right - margin.left;
  const innerHeight = height - margin.top - margin.bottom;


  // Scales
  const xScale = d3.scaleBand()
    .domain(props.years)
    .range([0, innerWidth])
    .paddingOuter(0.1);
  const colorScale = d3.scaleLinear()
    .domain([0, 100])
    .range(["#F9FFFF", "#ac2c5a"]);

  return (
    <section className="section-explore">
      <div className="container">
        <h2>Explore data about women's education & development</h2>
        <div className="row">
          <div className="col-12 col-lg-7">
            <div className="selectors">
              <h3>Customize the heatmap</h3>
              <Select
                className="select select-topic"
                classNamePrefix="select"
                defaultValue={topics.find(t => t.value === defaultTopic)}
                isSearchable={true}
                name="topic"
                options={topics}
                onChange={handleTopicSelection}
              />
              <span>in</span>
              <Select
                className="select select-region"
                classNamePrefix="select"
                defaultValue={regions.find(r => r.label === defaultRegionLabel)}
                isSearchable={true}
                name="region"
                options={regions}
                onChange={handleRegionSelection}
              />
            </div>
          </div>
          <div className="col-12 col-lg-5">
            <div className="legend">
              <h3>Color legend</h3>
              <div className="color-legend">
                <div className="colors"></div>
                <div className="labels">
                  <div className="label">0%</div>
                  <div className="label">50%</div>
                  <div className="label">100%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-help">Pass your cursor over a section to reveal the numbers.</div>
        {!isMobile &&
          <Fragment>
            <div className="heatmap-axis">
              <ChartContainer
                width={width}
                height={30}
                margin={margin}
              >
                <Axis
                  type="bandBottom"
                  ticks={props.years}
                  scale={xScale}
                  innerWidth={innerWidth}
                  innerHeight={innerHeight}
                  labelsPosition="above"
                />
              </ChartContainer>
            </div>
            <div className="heatmap-container">
              {data.map((d, i) => (
                <Heatmap
                  key={`heatmap-${d.country_name}-${topic}`}
                  data={d}
                  margin={margin}
                  width={width}
                  height={height}
                  bandScale={xScale}
                  colorScale={colorScale}
                  topic={topic}
                />
              ))}
            </div>
            <div className="heatmap-axis">
              <ChartContainer
                width={width}
                height={30}
                margin={margin}
              >
                <Axis
                  type="bandBottom"
                  ticks={props.years}
                  scale={xScale}
                  innerWidth={innerWidth}
                  innerHeight={innerHeight}
                />
              </ChartContainer>
            </div> 
          </Fragment>
        }
        {isMobile &&
          <div className="heatmap-mobile-container">
            <div className="years years-top">
              <div className="year">2010</div>
              <div className="year">2020</div>
            </div>
            {data.map((d, i) => (
              <div
                key={`heatmap-${d.country_name}-${topic}`}
                className="heatmap-mobile-section"
              >
                <h4>{d.country_name}</h4>
                <div className="map">
                  <div 
                    className="heatmap-color"
                    style={{ backgroundColor: d[topic].find(y => y.year === 2010).percentage ? colorScale(+d[topic].find(y => y.year === 2010).percentage) : "#059799" }}
                  ></div>
                  <div 
                    className="heatmap-color"
                    style={{ backgroundColor: d[topic].find(y => y.year === 2020).percentage ? colorScale(+d[topic].find(y => y.year === 2010).percentage) : "#059799" }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="years years-bottom">
              <div className="year">2010</div>
              <div className="year">2020</div>
            </div>
          </div>
        } 
        <div className="section-sources section-sources-gap">
          <div>Sources:</div>
          <ul>
            <li>Literacy rate, adult female: <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.FE.ZS">Worldbank</a></li>
            <li>Girls secondary school enrollement: <a href="https://data.worldbank.org/indicator/SE.SEC.NENR.FE">Worldbank</a></li>
            <li>Women members of parliaments: <a href="https://ourworldindata.org/grapher/seats-held-by-women-in-national-parliaments?tab=table">Our World in Data</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BreakdownWomen;