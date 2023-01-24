import { Fragment } from "react";

import Gap from "../Charts/Gap";
import Dots from "../Charts/Dots";
import BreakdownWomen from "../Charts/BreakdownWomen";

const Education = props => {
  const literacyData = props.dataWorld.find(d => d.id === "literacy").timeline;
  const girlsInSchoolData = props.dataWorld.find(d => d.id === "girls_high_school_enrollment").timeline;
  const womenMPData = props.dataWorld.find(d => d.id === "women_MP").timeline;

  return (
    <Fragment>
      <Gap />
    </Fragment>
  );
};

export default Education;