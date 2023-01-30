import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Loader from './UI/Loader';
import Layout from './Sections/Layout';

function App() {
  const [loading, setLoading] = useState(true);
  const [dataByCountry, setDataByCountry] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);
  const [worldAtlas, setWorldAtlas] = useState([]);
  const [countryIds, setCountryIds] = useState([]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      d3.json("./data/data.json"),
      d3.json("./data/data_world.json"),
      d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json"),
      d3.tsv("./data/country_ids.tsv"),
    ]).then(data => {
      const dataByCountry = data[0];
      const dataWorld = data[1];
      const worldAtlas = data[2];
      const countryIds = data[3];
      // console.log("data by country", dataByCountry);
      // console.log("data world", dataWorld);

      // dataByCountry.forEach(d => {
      //   console.log(d.country_code)
      //   if (d.country_code === "HKG" || d.country_code === "MAC" || d.country_code === "GUM" || d.country_code === "ASM") {
      //     d.region = "Western Pacific";
      //   } else if (d.country_code === "PSE") {
      //     d.region = "Eastern Mediterranean";
      //   } else if (d.country_code === "PRI" || d.country_code === "CUW" || d.country_code === "CYM" || d.country_code === "BMU" || d.country_code === "TCA") {
      //     d.region = "Americas";
      //   } else if (d.country_code === "XKX") {
      //     d.region = "Europe";
      //   } else {
      //     const relatedData = regions.find(r => r["Code"] === d.country_code);
      //     d.region = relatedData["WHO region"]
      //   }
      // })

      // dataByCountry.forEach(d => {
      //   const relatedData = newData.find(c => c["Country Code"] === d.country_code);
      //   const access = {
      //     "2010": +relatedData["2010"],
      //     "2020": +relatedData["2020"],
      //     has_improved: +relatedData["2020"] > +relatedData["2010"] 
      //       ? "positive" 
      //       : +relatedData["2020"] < +relatedData["2010"]
      //         ? "negative"
      //         : "equal"
      //   };
      //   d["literacy_adult"] = access;


      //   if (access["2020"] === 0) {
      //     d["has_missing_life_quality_data"] = true;
      //   }
      // });

      // dataByCountry.forEach(d => {
      //   const data2010 = newData.find(c => c["Code"] === d.country_code && c["Year"] === "2010");
      //   const data2017 = newData.find(c => c["Code"] === d.country_code && c["Year"] === "2017");
      //   if (data2010 && data2017) {
      //     const access = {
      //       "2010": +data2010.population_exposed_to_levels_exceeding_WHO_guideline,
      //       "2017": +data2017.population_exposed_to_levels_exceeding_WHO_guideline,
      //       has_improved: +data2017.population_exposed_to_levels_exceeding_WHO_guideline > +data2010.population_exposed_to_levels_exceeding_WHO_guideline 
      //         ? "negative" 
      //         : +data2017.population_exposed_to_levels_exceeding_WHO_guideline < +data2010.population_exposed_to_levels_exceeding_WHO_guideline
      //           ? "positive"
      //           : "equal"
      //     };
      //     d["population_exposed_to_levels_exceeding_WHO_guideline"] = access;
      //   } else {
      //     d["has_missing_life_quality_data"] = true;
      //   }
      // })

      // const hpi = data[4];
      // dataByCountry.forEach(d => {
      //   const newHpi = hpi.find(c => c["ISO"] === d.country_code);
      //   let hpiValue;
      //   if (newHpi) {
      //     hpiValue = +newHpi["HPI"].replace(",", ".");
      //   } else {
      //     hpiValue = null
      //   }

      //   d.hpi.push({ year: 2019, hpi: hpiValue })
      // })

      if (mounted) {
        setTimeout(() => {
          setDataByCountry(dataByCountry);
          setDataWorld(dataWorld);
          setWorldAtlas(worldAtlas);
          setCountryIds(countryIds);
          setLoading(false);
        }, 2000);
      }
    });

    return () => mounted = false;
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {!loading && 
        <Layout 
          dataByCountry={dataByCountry} 
          dataWorld={dataWorld} 
          worldAtlas={worldAtlas}
          countryIds={countryIds}
        />}
    </div>
  );
}

export default App;
