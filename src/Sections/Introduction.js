import { Fragment, useRef, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

import { hpiColorScale } from "../helper/helper";

const Introduction = props => {
  const mapRef = useRef(null);
  const windowSizeRef = useRef([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const windowSize = windowSizeRef.current;
    const map = d3.select(mapRef.current);
    map.select("svg").remove();

    const mapContainer = map
      .append("svg")
        .attr("viewBox", `0 0 ${windowSize[0]/2} ${windowSize[1]/2}`);

    const projection = d3.geoNaturalEarth1();
    const pathGenerator = d3.geoPath()
      .projection(projection);

    const countries = topojson.feature(props.worldAtlas, props.worldAtlas.objects.countries);
    countries.features.forEach(d => {
      let relatedCountry = props.countryIds.find(c => c.iso_n3 === d.id).admin;
      switch(relatedCountry) {
        case "United States of America":
          relatedCountry = "United States";
          break;
        case "Democratic Republic of the Congo":
          relatedCountry = "Democratic Republic of Congo";
          break;
        case "United Republic of Tanzania":
          relatedCountry = "Tanzania";
          break;
        case "Equatorial Guinea":
          relatedCountry = "Guinea";
          break;
        case "Ivory Coast":
          relatedCountry = "Cote d'Ivoire";
          break;
        case "Republic of Serbia":
          relatedCountry = "Serbia";
          break;
        case "Macedonia":
          relatedCountry = "North Macedonia";
          break;
        case "Czech Republic":
          relatedCountry = "Czechia";
          break;
        case "Papua New Guinea":
          relatedCountry = "Papua New Guinea";
          break;
      };
      d.country_name = relatedCountry;
      
      if (props.dataByCountry.find(c => c.country_name === relatedCountry)) {
        d.hpi_2019 = props.dataByCountry.find(c => c.country_name === relatedCountry).happy_planet_index_2019;
      }
    });
    
    const paths = mapContainer
      .selectAll(".country-path")
      .data(countries.features)
      .join("path")
        .attr("class", d => `country-path country-path-${d.country_name.replaceAll(" ", "_")}`)
        .attr("d", d => pathGenerator(d))
        .attr("fill", d => d.hpi_2019 ? hpiColorScale(d.hpi_2019) : "#F9FFFF")
        .attr("fill-opacity", d => d.hpi_2019 ? 0.75 : 0.2);

  }, [props.countryIds, props.dataByCountry, props.worldAtlas]);

  return (
    <Fragment>
      <div className="container">
        <div className="map-bg">
          <div ref={mapRef} className="map"></div>
        </div>
        <div className="row">
          <div className="col-12 col-md-8">
            <h1>A decade in review</h1>
            <p className="intro">5 good (and less good) news about what happened in the world over the last 10 years.</p>
          </div>
        </div>
        <div className="scroll">
          <div className="scroll-label">Scroll to reveal the story</div>
          <svg id="scroll-arrow-down" viewBox="0 0 21.47 33.4"><path d="M10.74,0c.66,0,1.19,.53,1.19,1.19V29.32l7.5-7.51c.47-.47,1.22-.47,1.69,0s.47,1.22,0,1.69l-9.54,9.54c-.47,.47-1.22,.47-1.69,0,0,0,0,0,0,0L.35,23.5c-.47-.47-.47-1.22,0-1.69s1.22-.47,1.69,0l7.5,7.51V1.19c0-.66,.53-1.19,1.19-1.19Z" style={{fill:"#f9ffff", fillRule:"evenodd",}}/></svg>
        </div>
      </div>
    </Fragment>
  );
};

export default Introduction;