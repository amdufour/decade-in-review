import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Layout from './Sections/Layout';

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   let mounted = true;
  //   Promise.all([
  //     d3.csv("/data/gdp.csv"),
  //     d3.csv("/data/population.csv"),
  //     d3.csv("/data/infant_mortality.csv"),
  //   ]).then(data => {
  //     // console.log("data", data);

  //     const countryData = data[0].filter(d => d.year === "2020" && d.country_code.length > 0);
  //     const population = data[1].filter(d => d.year === "2020");
  //     const years = d3.range(2010, 2021);
  //     countryData.forEach(d => {
  //       d.year = +d.year;
  //       d.gdp_per_capita_2015_US$ = +d.gdp_per_capita_2015_US$;
  //       d["population"] = +population.find(c => c.country_code === d.country_code).population;

  //       d["infant_mortality"] = [];
  //       const infantMortalityArray = data[2].find(c => c.country_code === d.country_code);
  //       years.forEach(year => {
  //         const mortality_rate = infantMortalityArray[year.toString()] ? +infantMortalityArray[year.toString()] : undefined;
  //         d.infant_mortality.push({ year: year, mortality_rate: mortality_rate });
  //       });
  //     });
  //     console.log(countryData);
      

  //     if (mounted) {
  //       setData(data);
  //       setLoading(false);
  //     }
  //   });

  //   return () => mounted = false;
  // }, []);

  
  useEffect(() => {
    let mounted = true;
    d3.json("data/data.json").then(data => {
      console.log("data", data);

      if (mounted) {
        setData(data);
        setLoading(false);
      }
    });

    return () => mounted = false;
  }, []);

  return (
    <div>
      {loading && <div className="loading">Loading...</div>}
      {!loading && <Layout data={data} />}
    </div>
  );
}

export default App;
