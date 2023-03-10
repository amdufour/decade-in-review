import { useEffect, useRef, Fragment } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "../Animations/DrawSVGPlugin";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(DrawSVGPlugin);

const SectionHeader = props => {
  const sectionCircleRef = useRef(null);
  const titleRef = useRef(null);
  const title2Ref = useRef(null);

  useEffect(() => {
    const circle = sectionCircleRef.current;
    const title = titleRef.current;
    const title2 = title2Ref.current;
    
    gsap.set(circle, {drawSVG:"0%"});
    gsap.set([title, title2], {clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)", opacity: 0, y: 35});

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut"
      },
      scrollTrigger: {
        trigger: circle
      }
    });
    tl.to(circle, {drawSVG:'100%', duration:1.5}, 0.8)
      .to(title, {clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", opacity: 1, y: 0, duration: 1.5}, "-=1");
    
    if (props.title2) {
      tl.to(title2, {clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)", opacity: 1, y: 0, duration: 1.5}, 5);
    }
  }, [props.title2]);

  return (
    <div className="section-header">
      <div className="row">
        <div className="col-12 col-lg-1">
          {props.number &&
            <div className="section-number-container">
              <svg className="section-number-circle" viewBox="0 0 171 171">
                <path ref={sectionCircleRef} d="M165.55,56.85c3.2,8.95,4.95,18.6,4.95,28.65,0,46.94-38.06,85-85,85S.5,132.44,.5,85.5,38.56,.5,85.5,.5c10.6,0,20.74,1.94,30.09,5.48" style={{fill:"none", stroke:"#059799", strokeLinecap:"round", strokeMiterlimit:10}}/>
              </svg>
              <div className="section-number">{props.number}</div>
            </div>
          }
        </div>
        {!props.title2 &&
          <div className="col-12 col-md-9">
            <h2 ref={titleRef}>{props.title}</h2>
          </div>
        }
        {props.title2 &&
          <Fragment>
            <div className="col-9 col-md-5">
              <h2 ref={titleRef}>{props.title}</h2>
            </div>
            <div className="col-9 col-md-5 offset-md-1">
              <h2 ref={title2Ref}>{props.title2}</h2>
            </div>
          </Fragment>
        }
        {props.intro &&
          <div className="row">
            <div className="col-12 col-lg-9 offset-lg-1">
              <p className="section-intro">{props.intro}</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default SectionHeader;