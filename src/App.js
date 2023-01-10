import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Layout from './Sections/Layout';

function App() {
  const [loading, setLoading] = useState(true);
  const [dataByCountry, setDataByCountry] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);

  // useEffect(() => {
  //   let mounted = true;
  //   Promise.all([
  //     d3.json("/data/data.json"),
  //     d3.csv("/data/literacy_female.csv"),
  //     d3.csv("/data/literacy_male.csv"),
  //   ]).then(data => {
  //     console.log("data", data);

  //     const fullData = data[0];
      
  //     const literacyFemale = data[1].find(d => d["Country Name"] === "World");
  //     const literacyMale = data[2].find(d => d["Country Name"] === "World");
  //     console.log(literacyFemale)
  //     console.log(literacyMale)

  //     const dataWorld = [];
  //     const literacy = { id: "literacy", timeline: [] };
  //     const years = d3.range(1976, 2021);
  //     years.forEach(y => {
  //       const yearData = { 
  //         year: y, 
  //         literacy_female: +literacyFemale[y.toString()],
  //         literacy_male: +literacyMale[y.toString()]
  //       }
  //       literacy.timeline.push(yearData)
  //     });
  //     dataWorld.push(literacy)
  //     console.log("dataWorld", dataWorld)

      
  //   });

  //   return () => mounted = false;
  // }, []);

  
  useEffect(() => {
    let mounted = true;
    Promise.all([
      d3.json("/data/data.json"),
      d3.json("/data/data_world.json"),
    ]).then(data => {
      console.log("data by country", data[0]);
      console.log("data world", data[1]);

      if (mounted) {
        setDataByCountry(data[0]);
        setDataWorld(data[1]);
        setLoading(false);
      }
    });

    return () => mounted = false;
  }, []);

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Layout dataByCountry={dataByCountry} dataWorld={dataWorld} />}
    </div>
  );
}

export default App;
