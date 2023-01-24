import { Fragment } from "react";

const Introduction = props => {
  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <h1>A decade in review</h1>
            <p className="intro">7 good (and less good) news about what happened in the world over the last 10 years.</p>
          </div>
        </div>
        <div className="scroll">
          <div className="scroll-label">Scroll to reveal the story</div>
          <svg id="scroll-arrow-down" viewBox="0 0 21.47 33.4"><path d="M10.74,0c.66,0,1.19,.53,1.19,1.19V29.32l7.5-7.51c.47-.47,1.22-.47,1.69,0s.47,1.22,0,1.69l-9.54,9.54c-.47,.47-1.22,.47-1.69,0,0,0,0,0,0,0L.35,23.5c-.47-.47-.47-1.22,0-1.69s1.22-.47,1.69,0l7.5,7.51V1.19c0-.66,.53-1.19,1.19-1.19Z" style={{fill:"#f9ffff", fillRule:"evenodd",}}/></svg>
        </div>
      </div>
    </Fragment>
  );
};

export default Introduction;