import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "../Animations/DrawSVGPlugin";

import SectionHeader from "../UI/SectionHeader";

const SchoolAndparliaments = props => {
  const schoolToFill1Ref = useRef(null);
  const schoolToFill2Ref = useRef(null);
  const schoolToFill3Ref = useRef(null);
  const schoolToFill4Ref = useRef(null);
  const mpToFill1Ref = useRef(null);
  const mpToFill2Ref = useRef(null);
  const mpToFill3Ref = useRef(null);
  const mpToFill4Ref = useRef(null);
  const mpToFill5Ref = useRef(null);
  const mpToFill6Ref = useRef(null);
  const mpToFill7Ref = useRef(null);
  const tlSchoolRef = useRef(null);
  const tlMpRef = useRef(null);
  const percSchoolRef = useRef(null);
  const percMpRef = useRef(null);
  
  useEffect(() => {
    const schoolToFill1 = schoolToFill1Ref.current;
    const schoolToFill2 = schoolToFill2Ref.current;
    const schoolToFill3 = schoolToFill3Ref.current;
    const schoolToFill4 = schoolToFill4Ref.current;
    const mpToFill1 = mpToFill1Ref.current;
    const mpToFill2 = mpToFill2Ref.current;
    const mpToFill3 = mpToFill3Ref.current;
    const mpToFill4 = mpToFill4Ref.current;
    const mpToFill5 = mpToFill5Ref.current;
    const mpToFill6 = mpToFill6Ref.current;
    const mpToFill7 = mpToFill7Ref.current;
    const tlSchool = tlSchoolRef.current;
    const tlMp = tlMpRef.current;
    const percSchool = percSchoolRef.current;
    const percMp = percMpRef.current;

    gsap.set([schoolToFill1, schoolToFill2, schoolToFill3, schoolToFill4], {fill: "transparent", stroke: "#ac2c5a"});
    gsap.set([mpToFill1, mpToFill2, mpToFill3, mpToFill4, mpToFill5, mpToFill6, mpToFill7], {fill: "#85CDCA", stroke: "transparent"});
    gsap.set([tlSchool, tlMp], {drawSVG: "0%"});
    gsap.set([percSchool, percMp], {clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", opacity: 0, x: 230});
    
    const tl = gsap.timeline({
      defaults: {
        ease: "power4.inOut",
        duration: 0.5
      },
      scrollTrigger: {
        trigger: schoolToFill1
      }
    });
    tl.to(tlSchool, {drawSVG: "100%", duration: 2}, 2)
      .to(percSchool, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, x: 240.72, duration: 1.5}, "-=1")
      .to([schoolToFill1, schoolToFill2, schoolToFill3, schoolToFill4], {fill: "#ac2c5a", stroke: "#021E1E", duration: 1.5, stagger: 0.3}, "-=2")
        
      .to(tlMp, {drawSVG: "100%", duration: 2}, 5)
      .to(percMp, {clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1, x: 240.9, duration: 1.5}, "-=1")
      .to([mpToFill1, mpToFill2, mpToFill3, mpToFill4, mpToFill5, mpToFill6, mpToFill7], {fill: "#ac2c5a", stroke: "#021E1E", duration: 1.5, stagger: 0.3}, "-=2")
      
      .to([schoolToFill1, schoolToFill2, schoolToFill3, schoolToFill4], {stroke: "transparent", duration: 1.5}, "+=1")
      .to([mpToFill1, mpToFill2, mpToFill3, mpToFill4, mpToFill5, mpToFill6, mpToFill7], {stroke: "transparent", duration: 1.5}, "-=1");
  
    }, []);

  return (
    <section>
      <div className="container">
        <SectionHeader
          number={2}
          title="More girls are enrolled in high school..."
          title2="...And there are more women in parliaments"
        />
        <div className="row">
          <div className="col-12 col-md-5 offset-md-1">
            <div className="timeline">
              <svg id="timeline-school" viewBox="0 0 333.26 151.58">
                <path ref={tlSchoolRef} d="M54.9,24.05s14.65-2.72,22-3.56c7.31-.84,14.68-.74,22-1.48,7.35-.74,14.66-2.03,22-2.97,7.33-.94,14.65-2.18,22-2.67,7.32-.49,14.67-.25,22-.3,7.33-.05,14.67,.25,22,0,7.34-.25,14.66-1.24,22-1.49,7.33-.25,22,0,22,0" style={{fill: "transparent", stroke: "#aaafaf", strokeLinecap: "round", strokeWidth: 3}}/>
                <text transform="translate(0 61.38)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2010</tspan></text>
                <text transform="translate(240.03 45.67)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2018</tspan></text>
                <text transform="translate(.69 33.67)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">62%</tspan></text>
                <text ref={percSchoolRef} transform="translate(240.72 18.14)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}>66%</text>
              </svg>
            </div>
            <div className="dots">
              <svg id="dots-school" viewBox="0 0 193 192.5">
                <circle cx="6.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="6.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="6.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="6.5" cy="66.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="26.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="26.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="26.5" cy="66.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="26.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="46.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="46.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="46.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle ref={schoolToFill1Ref} cx="46.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="46.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="46.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="46.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="46.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="46.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="46.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="66.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="66.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="66.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle ref={schoolToFill2Ref} cx="66.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="66.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="66.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="66.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="66.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="66.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="66.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="86.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="86.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="86.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle ref={schoolToFill3Ref} cx="86.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="86.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="86.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="86.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="86.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="86.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="86.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="106.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="106.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="106.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle ref={schoolToFill4Ref} cx="106.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="106.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="106.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="106.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="106.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="106.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="106.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="126.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="126.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="126.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="126.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="126.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="126.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="126.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="126.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="126.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="126.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="146.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="146.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="146.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="146.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="146.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="146.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="146.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="146.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="146.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="146.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="166.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="166.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="166.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="166.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="166.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="166.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="166.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="166.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="166.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="166.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="186.5" cy="6.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="186.5" cy="26.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="186.5" cy="46.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="186.5" cy="66.5" r="6" style={{fill: "transparent", stroke: "#ac2c5a"}}/>
                <circle cx="186.5" cy="86.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="186.5" cy="106.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="186.5" cy="126.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="186.5" cy="146.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="186.5" cy="166.5" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="186.5" cy="186.5" r="6" style={{fill: "#ac2c5a"}}/>
              </svg>
            </div>
            <ul className="legend legend-dots">
              <li><span className="dot dot-girl-enrolled"></span><span className="label">Girl enrolled in high school</span></li>
              <li><span className="dot dot-girl-not-enrolled"></span><span className="label">Girl not enrolled in high school</span></li>
              <li><span className="label no-dot">Each dot represents 1% of girls</span></li>
            </ul>
          </div>
          <div className="col-12 col-md-5 offset-md-1">
            <div className="timeline">
              <svg id="timeline-mp" viewBox="0 0 291.89 182.86">
                <path ref={tlMpRef} d="M55.1,140s11.74-1.2,17.6-1.99c5.87-.79,11.74-1.8,17.6-2.76,5.87-.96,11.72-2.32,17.6-3.03,5.86-.7,11.74-.69,17.6-1.22,5.87-.53,11.73-1.51,17.6-1.96,5.86-.45,11.74-.37,17.6-.74,5.87-.37,11.73-.99,17.6-1.48,5.87-.5,11.73-.97,17.6-1.49,5.87-.51,11.74-.87,17.6-1.6,5.87-.73,17.6-2.79,17.6-2.79" style={{fill: "transparent", stroke: "#aaafaf", strokeLinecap: "round", strokeWidth: 3}}/>
                <text transform="translate(0 176.15)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2010</tspan></text>
                <text transform="translate(240.22 153.15)" style={{fill: "#021e1e", fontSize: "21px"}}><tspan x="0" y="0">2020</tspan></text>
                <text transform="translate(.58 148.34)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">19%</tspan></text>
                <text ref={percMpRef} transform="translate(240.9 124.85)" style={{fill: "#059799", fontSize: "21px", fontWeight: 700}}><tspan x="0" y="0">26%</tspan></text>
              </svg>
            </div>
            <div className="dots">
              <svg id="dots-mp" viewBox="0 0 423.35 209.2">
                <circle cx="74.86" cy="203.2" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="57.65" cy="202.11" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="40.43" cy="201.02" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="23.22" cy="199.93" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="6" cy="198.85" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="77.9" cy="181.9" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="61.07" cy="178.13" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="44.23" cy="174.36" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="27.4" cy="170.59" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="10.57" cy="166.83" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="84.32" cy="161.13" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="68.29" cy="154.74" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="52.27" cy="148.36" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="36.24" cy="141.97" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="20.22" cy="135.59" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="93.74" cy="141.69" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="78.92" cy="132.86" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="64.1" cy="124.03" r="6" style={{fill: "#ac2c5a"}}/>
                <circle cx="49.28" cy="115.2" r="6" style={{fill: "#ac2c5a"}}/>
                <circle ref={mpToFill1Ref} cx="34.46" cy="106.37" r="6" style={{fill: "#85CDCA"}}/>
                <circle ref={mpToFill2Ref} cx="106.11" cy="123.96" r="6" style={{fill: "#85CDCA"}}/>
                <circle ref={mpToFill3Ref} cx="92.87" cy="112.91" r="6" style={{fill: "#85CDCA"}}/>
                <circle ref={mpToFill4Ref} cx="79.63" cy="101.85" r="6" style={{fill: "#85CDCA"}}/>
                <circle ref={mpToFill5Ref} cx="66.38" cy="90.8" r="6" style={{fill: "#85CDCA"}}/>
                <circle ref={mpToFill6Ref} cx="53.14" cy="79.74" r="6" style={{fill: "#85CDCA"}}/>
                <circle ref={mpToFill7Ref} cx="121.17" cy="108.53" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="109.83" cy="95.54" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="98.48" cy="82.54" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="87.13" cy="69.55" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="75.78" cy="56.56" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="138.32" cy="95.62" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="129.14" cy="81.01" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="119.97" cy="66.4" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="110.8" cy="51.79" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="101.63" cy="37.18" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="157.86" cy="85.39" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="151.14" cy="69.5" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="144.42" cy="53.61" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="137.71" cy="37.72" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="130.99" cy="21.83" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="178.52" cy="78.48" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="174.4" cy="61.73" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="170.28" cy="44.98" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="166.16" cy="28.23" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="162.04" cy="11.48" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="199.9" cy="74.94" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="198.46" cy="57.75" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="197.03" cy="40.56" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="195.59" cy="23.37" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="194.16" cy="6.18" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="221.58" cy="74.81" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="222.87" cy="57.61" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="224.15" cy="40.4" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="225.44" cy="23.2" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="226.73" cy="6" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="243.04" cy="78.09" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="247.02" cy="61.31" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="251" cy="44.52" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="254.98" cy="27.74" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="258.96" cy="10.95" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="263.59" cy="84.66" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="270.15" cy="68.71" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="276.7" cy="52.76" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="283.26" cy="36.8" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="289.82" cy="20.85" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="282.96" cy="94.44" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="291.95" cy="79.71" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="300.94" cy="64.99" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="309.93" cy="50.27" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="318.92" cy="35.55" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="300.69" cy="107.26" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="311.91" cy="94.15" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="323.12" cy="81.04" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="334.33" cy="67.93" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="345.55" cy="54.83" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="316.15" cy="122.71" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="329.3" cy="111.55" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="342.45" cy="100.39" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="355.6" cy="89.22" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="368.75" cy="78.06" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="328.82" cy="140.43" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="343.57" cy="131.49" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="358.33" cy="122.56" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="373.09" cy="113.62" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="387.84" cy="104.69" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="338.66" cy="159.93" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="354.65" cy="153.45" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="370.63" cy="146.97" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="386.62" cy="140.49" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="402.61" cy="134.01" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="345.28" cy="180.72" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="362.09" cy="176.86" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="378.9" cy="173" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="395.71" cy="169.13" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="412.53" cy="165.27" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="348.51" cy="202.19" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="365.72" cy="201.03" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="382.93" cy="199.86" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="400.14" cy="198.7" r="6" style={{fill: "#85CDCA"}}/>
                <circle cx="417.35" cy="197.53" r="6" style={{fill: "#85CDCA"}}/>
              </svg>
            </div>
            <ul className="legend legend-dots">
              <li><span className="dot dot-women-mp"></span><span className="label">Parliament seat occupied by a women</span></li>
              <li><span className="dot dot-men-mp"></span><span className="label">Parliament seat occupied by a men</span></li>
              <li><span className="label no-dot">Each dot represents 1% of parliament seats</span></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="offset-md-1 col-9">
            <div className="section-sources section-sources-gap">
              <div>Sources:</div>
              <ul>
                <li>Girls secondary school enrollement: <a href="https://data.worldbank.org/indicator/SE.SEC.NENR.FE">Worldbank</a></li>
                <li>Women members of parliaments: <a href="https://ourworldindata.org/grapher/seats-held-by-women-in-national-parliaments?tab=table">Our World in Data</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolAndparliaments;