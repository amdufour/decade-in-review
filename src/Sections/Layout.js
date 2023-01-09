import { Fragment } from "react";
import * as d3 from "d3";

import Introduction from "./Introduction";
import Health from "./Health";

const Layout = props => {
  const margin = {top: 30, right: 20, bottom: 50, left: 60};
  const years = d3.range(2010, 2021);

  return (
    <Fragment>
      <header>
        <Introduction />
      </header>
      <main>
        <Health 
          data={props.data}
          margin={margin}
          years={years}
        />
      </main>
    </Fragment>
  );
};

export default Layout;