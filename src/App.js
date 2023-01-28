import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Loader from './UI/Loader';
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
      const dataByCountry = data[0];
      const dataWorld = data[1];
      const birthRate = data[2];
      console.log("data by country", dataByCountry);
      console.log("data world", dataWorld);

      if (mounted) {
        setTimeout(() => {
          setDataByCountry(dataByCountry);
          setDataWorld(dataWorld);
          setLoading(false);
        }, 2000);
      }
    });

    return () => mounted = false;
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && <Layout dataByCountry={dataByCountry} dataWorld={dataWorld} />}
    </div>
  );
}

export default App;
