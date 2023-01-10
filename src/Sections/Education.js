import Gap from "../Charts/Gap";

const Education = props => {
  const literacyData = props.dataWorld.find(d => d.id === "literacy").timeline;

  return (
    <section>
      <div className="container">
        <h2>Education & Development</h2>
        <h3>Literacy</h3>
        <p>The gap between men's and women's literacy keeps shrinking!</p>
        <p>Percentage of women and men above age 15 that can read, write, speak and listen in a way that let them communicate effectively and make sense of the world.</p>
        <Gap data={literacyData} />
        <div>Sources: 
          <ul>
            <li>Literacy rate, adult female <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.FE.ZS?view=chart">Worldbank</a></li>
            <li>Literacy rate, adult male <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.MA.ZS?view=chart">Worldbank</a></li>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Education;