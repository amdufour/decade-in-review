import LifeQualityOverview from "../Charts/LifeQualityOverview";

const QualityOfLife = props => {
  return (
    <section className="section-quality-life">
      <div className="container">
        <h2>Quality of life</h2>
        <h3>In the world...</h3>
        <div className="row">
          <div className="col-4 offset-md-3">
            <LifeQualityOverview
              data={props.dataWorld}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QualityOfLife;