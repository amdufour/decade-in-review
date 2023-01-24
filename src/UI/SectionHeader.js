const SectionHeader = props => {

  return (
    <div className="section-header">
      <div className="row">
        <div className="col-12 col-md-8">
          <div className="section-number-container">
            <svg className="section-number-circle" viewBox="0 0 171 171">
              <path d="M165.55,56.85c3.2,8.95,4.95,18.6,4.95,28.65,0,46.94-38.06,85-85,85S.5,132.44,.5,85.5,38.56,.5,85.5,.5c10.6,0,20.74,1.94,30.09,5.48" style={{fill:"none", stroke:"#059799", strokeLinecap:"round", strokeMiterlimit:10}}/>
            </svg>
            <div className="section-number">{props.number}</div>
          </div>
          <h2>{title}</h2>
          <p className="section-intro">{intro}</p>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;