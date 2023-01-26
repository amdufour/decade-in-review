import { Fragment } from "react";

import Gap from "../Charts/Gap";
import SchoolAndparliaments from "../Charts/SchoolAndParlaments";
import BreakdownWomen from "../Charts/BreakdownWomen";

const Education = props => {
  const literacyData = props.dataWorld.find(d => d.id === "literacy").timeline;
  const girlsInSchoolData = props.dataWorld.find(d => d.id === "girls_high_school_enrollment").timeline;
  const womenMPData = props.dataWorld.find(d => d.id === "women_MP").timeline;

  return (
    <Fragment>
      <Gap />
      <SchoolAndparliaments 
        years={props.years}
        dataSchool={girlsInSchoolData}
        dataMP={womenMPData}
      />
      <BreakdownWomen
        years={props.years}
        data={props.dataByCountry}
      />
    </Fragment>
  );
};

export default Education;