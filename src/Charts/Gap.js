import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "../Animations/DrawSVGPlugin";
// gsap.registerPlugin(ScrollTrigger);
// gsap.registerPlugin(DrawSVGPlugin);

import SectionHeader from "../UI/SectionHeader";

const Gap = props => {
  const description1Ref = useRef(null);
  const description2Ref = useRef(null);
  const description3Ref = useRef(null);
  const lineWomenEarlyRef = useRef(null);
  const lineMenEarlyRef = useRef(null);
  const lineWomenDecadeRef = useRef(null);
  const lineMenDecadeRef = useRef(null);
  const year1976Ref = useRef(null);
  const year2010Ref = useRef(null);
  const year2020Ref = useRef(null);
  const perc1976Ref = useRef(null);
  const perc2010Ref = useRef(null);
  const perc2020Ref = useRef(null);
  const arrowLine1976Ref = useRef(null);
  const arrowTop1976Ref = useRef(null);
  const arrowBottom1976Ref = useRef(null);
  const arrowLine2010Ref = useRef(null);
  const arrowTop2010Ref = useRef(null);
  const arrowBottom2010Ref = useRef(null);
  const arrowLine2020Ref = useRef(null);
  const arrowTop2020Ref = useRef(null);
  const arrowBottom2020Ref = useRef(null);

  useEffect(() => {
    const description1 = description1Ref.current;
    const description2 = description2Ref.current;
    const description3 = description3Ref.current;
    const lineWomenEarly = lineWomenEarlyRef.current;
    const lineMenEarly = lineMenEarlyRef.current;
    const lineWomenDecade = lineWomenDecadeRef.current;
    const lineMenDecade = lineMenDecadeRef.current;
    const year1976 = year1976Ref.current;
    const year2010 = year2010Ref.current;
    const year2020 = year2020Ref.current;
    const perc1976 = perc1976Ref.current;
    const perc2010 = perc2010Ref.current;
    const perc2020 = perc2020Ref.current;
    const arrowLine1976 = arrowLine1976Ref.current;
    const arrowTop1976 = arrowTop1976Ref.current;
    const arrowBottom1976 = arrowBottom1976Ref.current;
    const arrowLine2010 = arrowLine2010Ref.current;
    const arrowTop2010 = arrowTop2010Ref.current;
    const arrowBottom2010 = arrowBottom2010Ref.current;
    const arrowLine2020 = arrowLine2020Ref.current;
    const arrowTop2020 = arrowTop2020Ref.current;
    const arrowBottom2020 = arrowBottom2020Ref.current;
    

    gsap.set([description1, description2, description3], {opacity: 0, x: -50});
    gsap.set([lineWomenEarly, lineMenEarly, lineWomenDecade, lineMenDecade], {drawSVG:"0%"})
    gsap.set([year1976, year2010, year2020], {opacity: 0});
    gsap.set([perc1976, perc2010, perc2020], {opacity: 0, x: -10, clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"});
    gsap.set([arrowLine1976, arrowLine2010, arrowLine2020], {drawSVG: "50% 50%", opacity: 0});
    gsap.set([arrowTop1976, arrowTop2010, arrowTop2020], {opacity: 0, y: "-=10"});
    gsap.set([arrowBottom1976, arrowBottom2010, arrowBottom2020], {opacity: 0, y: "+=10"});

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 0.5
      },
      scrollTrigger: {
        trigger: description1
      }
    });
    tl.to(description1, {opacity:1, x: "+=50", duration: 1.5}, 2)
      .to(year1976, {opacity: 1, duration: 1}, 2)
      .to([lineWomenEarly, lineMenEarly], {drawSVG:"100%", stagger: 0.5, duration: 1}, "-=1.5")
      .to(arrowLine1976, {drawSVG: "0% 100%", opacity: 100}, "-=1")
      .to(arrowTop1976, {opacity: 1, y: 0}, "-=1")
      .to(arrowBottom1976, {opacity: 1, y: 0}, "-=1")
      .to(perc1976, {opacity: 1, x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1}, "-=0.5")
      
      .to(description2, {opacity:1, x: 0, duration: 1.5})
      .to(year2010, {opacity: 1, duration: 1}, "-=1")
      .to(arrowLine2010, {drawSVG: "0% 100%", opacity: 100}, "-=1")
      .to(arrowTop2010, {opacity: 1, y: 0}, "-=1")
      .to(arrowBottom2010, {opacity: 1, y: 0}, "-=1")
      .to(perc2010, {opacity: 1, x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1}, "-=0.5")
      
      .to(description3, {opacity:1, x: 0, duration: 1.5})
      .to(year2020, {opacity: 1, duration: 1}, "-=1")
      .to([lineWomenDecade, lineMenDecade], {drawSVG:"100%", stagger: 0.5, duration: 1}, "-=1.5")
      .to(arrowLine2020, {drawSVG: "0% 100%", opacity: 100}, "-=1")
      .to(arrowTop2020, {opacity: 1, y: 0}, "-=1")
      .to(arrowBottom2020, {opacity: 1, y: 0}, "-=1")
      .to(perc2020, {opacity: 1, x: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1}, "-=0.5");
      
  }, []);

  return (
    <section>
      <div className="container">
        <SectionHeader
          number={1}
          title="The gap between men's and women's literacy levels keeps shrinking"
          intro="“ Literacy is the ability to read, write, speak and listen in a way that lets us communicate 
          effectively and make sense of the world. ”"
        />
        <div className="row">
          <div className="offset-md-1 col-11">
            <div id="gap-chart">
              <svg data-name="sct 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1467.03 325.22">
                <g>
                  <path ref={lineWomenEarlyRef} d="M53.77,277.3s20.13-.53,30.16-1.56c10.08-1.04,20.1-3.15,30.16-4.68,10.05-1.53,20.09-3.26,30.16-4.51,10.04-1.24,20.14-1.49,30.16-2.97,10.09-1.49,20.09-4.19,30.16-5.95,10.03-1.76,20.12-2.94,30.16-4.64,10.07-1.71,20.11-3.74,30.16-5.59,10.05-1.86,20.1-3.82,30.16-5.56,10.04-1.74,20.1-3.32,30.16-4.88,10.05-1.56,20.12-2.78,30.16-4.47,10.07-1.7,20.39-2.15,30.16-5.73,10.38-3.8,19.76-13.48,30.16-17.06,9.75-3.35,20.09-3.29,30.16-4.49,10.03-1.2,20.14-1.28,30.16-2.72,10.09-1.45,20.08-4.3,30.16-5.96,10.03-1.66,20.11-2.69,30.16-4.01,10.05-1.32,20.11-2.53,30.16-3.91,10.06-1.39,20.11-2.93,30.16-4.4s20.11-2.92,30.16-4.39c10.05-1.47,20.63-.3,30.16-4.44,10.72-4.66,19.56-18.37,30.16-24.08,9.6-5.17,20-7.55,30.16-9.78,9.95-2.19,20.09-2.77,30.16-3.62,10.04-.84,20.12-.6,30.16-1.45,10.07-.86,20.1-2.49,30.16-3.69,10.05-1.19,20.12-2.08,30.16-3.47,10.07-1.4,20.1-3.41,30.16-4.9,10.04-1.49,20.09-3.51,30.16-4.03,10.03-.52,20.14,1.56,30.16,.89,10.09-.67,20.08-3.66,30.16-4.96,10.03-1.29,20.12-1.64,30.16-2.82,10.07-1.19,20.1-2.97,30.16-4.28,10.05-1.3,20.14-1.93,30.16-3.55,10.09-1.63,30.16-6.22,30.16-6.22" style={{fill: "none", stroke: "#aaafaf", strokeLinecap: "round", strokeWidth: 3}}/>
                  <path ref={lineMenEarlyRef} d="M53.77,134.44s20.12-.68,30.16-1.45c10.06-.76,20.11-2.12,30.16-3.14,10.05-1.02,20.1-2.19,30.16-2.97,10.04-.78,20.12-.89,30.16-1.71,10.06-.83,20.11-2.09,30.16-3.25,10.06-1.16,20.1-2.54,30.16-3.7,10.05-1.16,20.11-2.19,30.16-3.28s20.1-2.23,30.16-3.26c10.05-1.04,20.11-2,30.16-2.96,10.05-.96,20.12-1.63,30.16-2.77,10.07-1.15,20.24-1.61,30.16-4.11,10.2-2.57,19.94-9,30.16-11.32,9.9-2.25,20.1-2.08,30.16-2.63,10.04-.55,20.12-.02,30.16-.69,10.07-.68,20.11-2.15,30.16-3.36,10.06-1.21,20.1-2.73,30.16-3.92,10.05-1.18,20.1-2.22,30.16-3.17,10.05-.96,20.1-1.74,30.16-2.56,10.05-.82,20.11-1.56,30.16-2.36,10.05-.8,20.24-.33,30.16-2.42,10.19-2.15,20.1-7.02,30.16-10.5,10.05-3.47,19.97-8.31,30.16-10.35,9.92-1.99,20.1-1.52,30.16-1.96,10.05-.45,20.11-.35,30.16-.72,10.05-.37,20.11-.77,30.16-1.51,10.06-.74,20.11-1.79,30.16-2.92,10.06-1.14,20.1-2.78,30.16-3.89,10.04-1.11,20.1-2.33,30.16-2.79,10.04-.46,20.11,0,30.16,0s20.11,.24,30.16,.05c10.05-.2,20.12-.4,30.16-1.21,10.07-.82,20.09-2.81,30.16-3.69,10.04-.88,20.1-1.24,30.16-1.59,10.05-.35,30.16-.52,30.16-.52" style={{fill: "none", stroke: "#aaafaf", strokeLinecap: "round", strokeWidth: 3}}/>
                  <path ref={lineWomenDecadeRef} d="M1079.18,99.41s20.11-1.97,30.16-3.13c10.06-1.16,20.09-2.87,30.16-3.83,10.04-.96,20.13-.84,30.16-1.93,10.08-1.1,20.08-3.52,30.16-4.69,10.03-1.16,20.13-1.15,30.16-2.31,10.07-1.16,20.09-3.4,30.16-4.66,10.03-1.25,20.1-2.17,30.16-2.85,10.04-.67,20.12-.36,30.16-1.18,10.07-.83,20.09-2.86,30.16-3.79,10.04-.93,30.16-1.82,30.16-1.82" style={{fill: "none", stroke: "#c38d9d", strokeLinecap: "round", strokeWidth: 10}}/>
                  <path ref={lineMenDecadeRef} d="M1079.18,27.81s20.12-.03,30.16-.73c10.07-.7,20.09-2.69,30.16-3.47,10.04-.78,20.11-.65,30.16-1.21,10.06-.57,20.1-1.62,30.16-2.19,10.05-.58,20.12-.55,30.16-1.27,10.06-.72,20.09-2.36,30.16-3.06,10.04-.69,20.1-.97,30.16-1.1,10.05-.13,20.11,.67,30.16,.31,10.06-.36,20.1-1.93,30.16-2.46,10.05-.53,30.16-.73,30.16-.73" style={{fill: "none", stroke: "#e27d5f", strokeLinecap: "round", strokeWidth: 10}}/>
                </g>
                <g>
                  <text ref={year1976Ref} transform="translate(33.42, 318.51)" style={{fill: "#021e1e", fontSize: "21px"}}>1976</text>
                  <g>
                    <g>
                      <line ref={arrowLine1976Ref} x1="55.15" y1="138.64" x2="55.15" y2="273.3" style={{fill: "none", stroke: "#80c8bd", strokeLinecap: "round", strokeWidth: 2}}/>
                      <polygon ref={arrowTop1976Ref} points="46.97 145.27 48.44 146.63 55.15 139.41 61.86 146.63 63.33 145.27 55.15 136.47 46.97 145.27" style={{fill: "#80c8bd"}}/>
                      <polygon ref={arrowBottom1976Ref} points="46.97 266.67 48.44 265.31 55.15 272.53 61.86 265.31 63.33 266.67 55.15 275.47 46.97 266.67" style={{fill: "#80c8bd"}}/>
                    </g>
                    <text ref={perc1976Ref} transform="translate(0 212.62)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}>17%</text>
                  </g>
                </g>
                <g>
                  <text ref={year2010Ref} transform="translate(1058.85 138.09)" style={{fill: "#021e1e", fontSize: "21px"}}>2010</text>
                  <g>
                    <g>
                      <line ref={arrowLine2010Ref} x1="1078.77" y1="36.64" x2="1078.77" y2="91.3" style={{fill: "none", stroke: "#80c8bd", strokeLinecap: "round", strokeWidth: 2}}/>
                      <polygon ref={arrowTop2010Ref} points="1070.59 43.27 1072.06 44.63 1078.77 37.41 1085.49 44.63 1086.95 43.27 1078.77 34.47 1070.59 43.27" style={{fill: "#80c8bd"}}/>
                      <polygon ref={arrowBottom2010Ref} points="1070.59 84.67 1072.06 83.31 1078.77 90.53 1085.49 83.31 1086.95 84.67 1078.77 93.47 1070.59 84.67" style={{fill: "#80c8bd"}}/>
                    </g>
                    <text ref={perc2010Ref} transform="translate(1030.62 72.62)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}>8%</text>
                  </g>
                </g>
                <g>
                  <text ref={year2020Ref} transform="translate(1358.09 109.09)" style={{fill: "#021e1e", fontSize: "21px"}}>2020</text>
                  <g>
                    <g>
                      <line ref={arrowLine2020Ref} x1="1379.77" y1="20.64" x2="1379.77" y2="60.3" style={{fill: "none", stroke: "#80c8bd", strokeLinecap: "round", strokeWidth: 2}}/>
                      <polygon ref={arrowTop2020Ref} points="1371.59 27.27 1373.06 28.63 1379.77 21.41 1386.49 28.63 1387.95 27.27 1379.77 18.47 1371.59 27.27" style={{fill: "#80c8bd"}}/>
                      <polygon ref={arrowBottom2020Ref} points="1371.59 53.67 1373.06 52.31 1379.77 59.53 1386.49 52.31 1387.95 53.67 1379.77 62.47 1371.59 53.67" style={{fill: "#80c8bd"}}/>
                    </g>
                    <text ref={perc2020Ref} transform="translate(1335.62 48.62)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}>7%</text>
                  </g>
                </g>
                <g>
                  <text transform="translate(1392.87 18.14)" style={{fill: "#021e1e", fontSize: "21px"}}>Men</text>
                  <text transform="translate(1392.87 75.14)" style={{fill: "#021e1e", fontSize: "21px"}}>Women</text>
                </g>
              </svg>
            </div>
          </div>
        </div>
        <div className="description-container description-container-gap">
          <div className="row">
            <div className="offset-md-1 col-9">
              <div className="description description-gap">
                <ul>
                  <li ref={description1Ref}>In 1976, only 59% of women above the age of 15 worldwide were literate, compared to 76% of men, a gap of 17%.</li>
                  <li ref={description2Ref}>In 2010, women's literacy reached 80% and 88% for men. The gap was only 8%.</li>
                  <li ref={description3Ref}>In the following decade, the gap kept shrinking to 7%. In 2020, 83% of women and 90% of men can read and write.</li>
                </ul>
              </div>
              <div className="section-sources section-sources-gap">
                <div>Sources:</div>
                <ul>
                  <li><a href="https://literacytrust.org.uk/information/what-is-literacy/">National Literacy Trust</a></li>
                  <li>Literacy rate, adult female: <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.FE.ZS">Worldbank</a></li>
                  <li>Literacy rate, adult male: <a href="https://data.worldbank.org/indicator/SE.ADT.LITR.MA.ZS">Worldbank</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gap;