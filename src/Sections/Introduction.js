import { Fragment, useRef, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";
import { gsap } from "gsap";

import { hpiColorScale } from "../helper/helper";
import WGSLogo from "./assets/WGS-summit-logo.svg";

const Introduction = props => {
  const titleRef = useRef(null);
  const scrollRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const title = titleRef.current;
    const scroll = scrollRef.current;

    const title1 = title.querySelector("h1");
    const title2 = title.querySelector(".intro");
    gsap.set([title1, title2], {clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 35});
    gsap.set(scroll, {opacity: 0, y: 35});
    
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 2
      }
    });
    tl.to(title1, {clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", opacity: 1, y: 0}, 0.8)
      .to(title2, {clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", opacity: 1, y: 0}, "-=1.5")
      .to(scroll, {opacity: 1, y: 0}, "-=1");

    const map = d3.select(mapRef.current);
    map.select("svg").remove();

    const mapContainer = map
      .append("svg")
        .attr("viewBox", `0 0 928 452`)
        .style("opacity", 0);

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
        d["hpi"] = props.dataByCountry.find(c => c.country_name === relatedCountry).hpi;
      }
    });
    
    const paths = mapContainer
      .selectAll(".country-path")
      .data(countries.features)
      .join("path")
        .attr("class", d => `country-path country-path-${d.country_name.replaceAll(" ", "_")}`)
        .attr("d", d => pathGenerator(d))
        .attr("fill", d => d.hpi && d.hpi[0].hpi ? hpiColorScale(d.hpi[0].hpi) : "#F9FFFF")
        .attr("fill-opacity", d => d.hpi && d.hpi[0].hpi ? 0.75 : 0.2)
        .attr("stroke", "#F9FFFF")
        .attr("stroke-width", 0.3);

    const stepDuration = 1500;
    const yearsLoop = props.years.slice(0, -1);
    let currentIndex = 0;
    
    setTimeout(() => {
      mapContainer
        .transition()
        .duration(stepDuration)
        .ease(d3.easeCubicInOut)
          .style("opacity", 1);
    }, stepDuration);

    const timer = setInterval(() => {
      d3.selectAll(".country-path")
        .transition()
        .duration(stepDuration)
        .ease(d3.easeCubicInOut)
          .attr("fill", d => d.hpi && d.hpi[currentIndex].hpi ? hpiColorScale(d.hpi[currentIndex].hpi) : "#F9FFFF")
          .attr("fill-opacity", d => d.hpi && d.hpi[currentIndex].hpi ? 0.75 : 0.2);

      currentIndex = currentIndex === yearsLoop.length - 1 ? 0 : currentIndex + 1;
    }, stepDuration);

    return () => {
      clearInterval(timer);
    }

  }, [props.countryIds, props.dataByCountry, props.worldAtlas]);

  return (
    <Fragment>
      <div className="container">
        <div className="map-bg">
          <div ref={mapRef} className="map"></div>
        </div>
        <div className="WGS-logo">
          <img src={WGSLogo} alt="Logo of the World Government Summit" />
        </div>
        <div className="intro-color-scale">
          <div className="label-hpi">Happy Planet Index</div>
          <div className="scale-container">
            <div className="labels">
              <div className="label">24</div>
              <div className="label">65</div>
            </div>
            <div className="color-scale"></div>
          </div>
        </div>
        <div className="row">
          <div ref={titleRef} className="col-12 col-md-8">
            <h1>A decade in review</h1>
            <p className="intro">5 good (and less good) news about what happened in the world over the last 10 years.</p>
          </div>
        </div>
        <div ref={scrollRef} className="scroll">
          <div className="scroll-label">Scroll to reveal the story</div>
          <svg id="scroll-arrow-down" viewBox="0 0 21.47 33.4"><path d="M10.74,0c.66,0,1.19,.53,1.19,1.19V29.32l7.5-7.51c.47-.47,1.22-.47,1.69,0s.47,1.22,0,1.69l-9.54,9.54c-.47,.47-1.22,.47-1.69,0,0,0,0,0,0,0L.35,23.5c-.47-.47-.47-1.22,0-1.69s1.22-.47,1.69,0l7.5,7.51V1.19c0-.66,.53-1.19,1.19-1.19Z" style={{fill:"#f9ffff", fillRule:"evenodd",}}/></svg>
        </div>
      </div>
    </Fragment>
  );
};

export default Introduction;