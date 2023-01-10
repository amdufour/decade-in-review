import Gap from "../Charts/Gap";
import Dots from "../Charts/Dots";
import ForceTest from "../Charts/ForceTest";

const Education = props => {
  const literacyData = props.dataWorld.find(d => d.id === "literacy").timeline;
  const girlsInSchoolData = props.dataWorld.find(d => d.id === "girls_high_school_enrollment").timeline;

  return (
    <section>
      <div className="container">
        <h2>Women's Education & Development</h2>
        <h3>Literacy (worldwide)</h3>
        <p>The gap between men's and women's literacy keeps shrinking!</p>
        <p>Percentage of women and men above age 15 that can read, write, speak and listen in a way that let them communicate effectively and make sense of the world.</p>
        <Gap data={literacyData} />
        <div className="row">
          <div className="col-5">
            <h3>% of Girls enrolled in high school (worldwide)</h3>
            <Dots
              data={girlsInSchoolData}
              type="school"
            />
            {/* <ForceTest /> */}
          </div>
          <div className="col-5">
            <h3>% of women member of Parlament (worldwide)</h3>
          </div>
        </div>
        

        <div>Sources: 
          <ul>
            <li>Literacy rate, adult female <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.FE.ZS?view=chart">Worldbank</a></li>
            <li>Literacy rate, adult male <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.MA.ZS?view=chart">Worldbank</a></li>
            <li>% of Girls enrolled in high school <a href="https://data.worldbank.org/indicator/SE.SEC.NENR.FE">Worldbank</a></li>
            <li>% of women member of Parlament<a href="https://ourworldindata.org/grapher/seats-held-by-women-in-national-parliaments?tab=table">Our World in Data</a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;