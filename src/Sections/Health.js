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
        title="The number of maternal deaths decreases by 14% between 2010 and 2017"
        intro="The rate of maternal death is much lower today than just a few generations ago, thanks to improvements in healthcare, nutrition, and hygiene. But still, the risk for a woman to die while giving birth is exponentially higher in countries with low income."
        data={props.data}
        type="maternal_mortality"
        yLabel={"Number of maternal deaths per 10,000 births (2017)"}
        lastYear={2017}
        description={[
          "Between 2010 and 2017, maternal mortality declined in 136 countries. We saw the most important diminution in Afghanistan (-24%), Bangladesh (-27%), and Ethiopia (-19%).",
          "We must keep taking action in Chad, Nigeria, Algeria, and Iraq, where an increase in maternal deaths occurred. We also saw a rise in rich countries, like the United States, where the maternal mortality rate is exceptionally high for Black women. The major complications that account for nearly 75% of all maternal deaths are severe bleeding, infections, high blood pressure during pregnancy, complications from delivery, and unsafe abortion."
        ]}
        sources={[
          { label: "Number of maternal deaths: ", link: "https://data.worldbank.org/indicator/SH.MMR.DTHS?view=chart", linkLabel: "Worldbank"},
          { label: "Birth rate, crude (per 1,000 people): ", link: "https://data.worldbank.org/indicator/SP.DYN.CBRT.IN?locations=IM", linkLabel: "Worldbank"},
          { label: "Maternal mortality: ", link: "https://ourworldindata.org/maternal-mortality", linkLabel: "Our World in Data"},
          { label: "The U.S. Maternal Mortality Crisis Continues to Worsen: An International Comparison: ", link: "https://www.commonwealthfund.org/blog/2022/us-maternal-mortality-crisis-continues-worsen-international-comparison", linkLabel: "The Commonwealth Fund"},
          { label: "Maternal mortality: ", link: "https://www.who.int/news-room/fact-sheets/detail/maternal-mortality", linkLabel: "World Health Organization"},
        ]}
      />
    </Fragment>
  );
};

export default Health;