import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "../Animations/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

const SectionHeader = props => {
  const sectionCircleRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const circle = sectionCircleRef.current;
    const title = titleRef.current;
    
    gsap.set(circle, {drawSVG:"0%"});
    gsap.set(title, {y: 20, opacity: 0});

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: circle
      }
    });
    tl.to(circle, {drawSVG:'100%', duration:2, ease: "power3.out"}, 0.8)
      .to(title, {y: 0, opacity: 1, duration: 1, ease: "power3.out"}, "-=1");
  }, []);

  return (
    <div className="section-header">
      <div className="row">
        <div className="col-1">
          <div className="section-number-container">
            <svg className="section-number-circle" viewBox="0 0 171 171">
              <path ref={sectionCircleRef} d="M165.55,56.85c3.2,8.95,4.95,18.6,4.95,28.65,0,46.94-38.06,85-85,85S.5,132.44,.5,85.5,38.56,.5,85.5,.5c10.6,0,20.74,1.94,30.09,5.48" style={{fill:"none", stroke:"#059799", strokeLinecap:"round", strokeMiterlimit:10}}/>
            </svg>
            <div className="section-number">{props.number}</div>
          </div>
        </div>
        <div className="col-9">
          <h2 ref={titleRef}>{props.title}</h2>
        </div>
        <div className="row">
          <div className="col-9 offset-md-1">
            <p className="section-intro">{props.intro}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHeader;