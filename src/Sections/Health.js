import Timeline from "../Charts/Timeline";
import Scatterplot from "../Charts/Scatterplot";

const Health = props => {
  return (
    <section>
      <div className="container">
        <h2>Health</h2>
        <h3>Infant mortality</h3>
        <p>Mortality of children under age of 1.</p>
        <div className="row">
          <div className="col-5">
            <Timeline
              data={props.data}
              margin={props.margin}
              years={props.years}
              focus="infant_mortality"
              year={2020}
            />
          </div>
          <div className="col-5">
            <Scatterplot
              data={props.data}
              margin={props.margin}
              focus="infant_mortality"
              year={2020}
            />
          </div>
        </div>
        <h3>Maternal deaths</h3>
        <p>description</p>
        <div className="row">
          <div className="col-5">
            <Timeline
              data={props.data}
              margin={props.margin}
              years={props.years}
              focus="maternal_mortality"
              year={2017}
            />
          </div>
          <div className="col-5">
            <Scatterplot
              data={props.data}
              margin={props.margin}
              focus="maternal_mortality"
              year={2017}
            />
          </div>
        </div>
        <div>Sources: 
          <ul>
            <li>Infant mortality<a href="https://data.worldbank.org/indicator/SP.DYN.IMRT.IN">Worldbank</a></li>
            <li>GDP per capita: <a href="https://ourworldindata.org/grapher/gdp-per-capita-in-us-dollar-world-bank">Our World in Data</a></li>
            <li>Population by country: <a href="https://ourworldindata.org/world-population-growth">Our World in Data</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Health;