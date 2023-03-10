import * as d3 from "d3";

import Introduction from "./Introduction";
import Health from "./Health";
import Education from "./Education";
import QualityOfLife from "./QualityOfLife";
import Footer from "./Footer";
import Warning from "../UI/Warning";

const Layout = props => {
  const margin = {top: 30, right: 20, bottom: 50, left: 60};
  const years = d3.range(2010, 2021);

  return (
    <div className="project-container">
      <header>
        <Introduction 
          worldAtlas={props.worldAtlas}
          countryIds={props.countryIds}
          dataByCountry={props.dataByCountry}
          years={years}
        />
      </header>
      <main>
        <Education 
          dataByCountry={props.dataByCountry}
          dataWorld={props.dataWorld}
          margin={margin}
          years={years}
        />
        <Health 
          data={props.dataByCountry}
          margin={margin}
          years={years}
        />
        <QualityOfLife
          dataByCountry={props.dataByCountry}
          dataWorld={props.dataWorld}
        />
      </main>
      <Footer />
      <Warning />
    </div>
  );
};

export default Layout;