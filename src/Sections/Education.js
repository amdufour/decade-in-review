import { Fragment } from "react";

import Gap from "../Charts/Gap";
import SchoolAndParlaments from "../Charts/SchoolAndParlaments";

const Education = props => {
  const literacyData = props.dataWorld.find(d => d.id === "literacy").timeline;
  const girlsInSchoolData = props.dataWorld.find(d => d.id === "girls_high_school_enrollment").timeline;
  const womenMPData = props.dataWorld.find(d => d.id === "women_MP").timeline;

  return (
    <Fragment>
      <Gap />
      <SchoolAndParlaments 
        years={props.years}
        dataSchool={girlsInSchoolData}
        dataMP={womenMPData}
      />
    </Fragment>
  );
};

export default Education;