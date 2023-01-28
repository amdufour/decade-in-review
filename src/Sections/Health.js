import { Fragment } from "react";

import Mortality from "../Charts/Mortality";
import MaternalMortality from "../Charts/MaternalMortality";

const Health = props => {
  return (
    <Fragment>
      <Mortality
        number={3}
        title="Infant mortality decreased globally by 25%"
        intro="Infant mortality refers to the death of children before the age of one. Unsurprisingly, the correlation between infant mortality and low income is very strong. Infants that are born in developing countries have a much higher chance of dying before their first birthday. The leading causes of infant mortality include complications following premature birth, congenital birth defects, and diarrheal diseases."
        data={props.data}
        type="infant_mortality"
        yLabel={"Infant mortality per 1000 live births (2020)"}
        lastYear={2020}
        description={[
          "Between 2010 and 2020, infant mortality declined in 184 countries. The countries where we saw the most important diminution are Haiti (-54%), Malawi (-45%), Angola (-36%), Sierra Leone (-25%), and Somalia (-24%).",
          "But we must remain vigilant and keep taking action, especially as we witnessed an increase in infant mortality in Dominica (+49%), Saint Lucia (+27%), and Fiji (+15%)."
        ]}
        sources={[
          { label: "Mortality rate, infant: ", link: "https://data.worldbank.org/indicator/SP.DYN.IMRT.IN", linkLabel: "Worldbank"},
          { label: "Child and Infant mortality: ", link: "https://ourworldindata.org/child-mortality", linkLabel: "Our World in Data"},
        ]}
      />
      <MaternalMortality
        number={4}
        title="Maternal mortality decreased by 14% between 2010 and 2017"
        intro=""
        data={props.data}
        type="maternal_mortality"
        yLabel={"Number of maternal deaths per 10,000 people (2017)"}
        lastYear={2017}
        description={[
          // "Between 2010 and 2020, infant mortality declined in 184 countries. The countries where we saw the most important diminution are Haiti (-54%), Malawi (-45%), Angola (-36%), Sierra Leone (-25%), and Somalia (-24%).",
          // "But we must remain vigilant and keep taking action, especially as we witnessed an increase in infant mortality in Dominica (+49%), Saint Lucia (+27%), and Fiji (+15%)."
        ]}
        sources={[
          // { label: "Mortality rate, infant: ", link: "https://data.worldbank.org/indicator/SP.DYN.IMRT.IN", linkLabel: "Worldbank"},
          // { label: "Child and Infant mortality: ", link: "https://ourworldindata.org/child-mortality", linkLabel: "Our World in Data"},
        ]}
      />
    </Fragment>
  );
};

export default Health;