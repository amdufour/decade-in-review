import { Fragment, useRef, useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

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
    

    d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json").then(data => {
      console.log(data);

      const countries = topojson.feature(data, data.objects.countries);
      console.log(countries);

      const paths = mapContainer
        .selectAll(".country-path")
        .data(countries.features)
        .join("path")
          .attr("class", "country-path")
          .attr("d", d => pathGenerator(d))
          .attr("fill", "white");
    });

  }, []);

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