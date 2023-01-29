import { useState, useEffect } from 'react';
import * as d3 from 'd3';

import Loader from './UI/Loader';
import Layout from './Sections/Layout';

function App() {
  const [loading, setLoading] = useState(true);
  const [dataByCountry, setDataByCountry] = useState([]);
  const [dataWorld, setDataWorld] = useState([]);

  useEffect(() => {
    let mounted = true;
    Promise.all([
      d3.json("/data/data.json"),
      d3.json("/data/data_world.json"),
    ]).then(data => {
      const dataByCountry = data[0];
      const dataWorld = data[1];
      console.log("data by country", dataByCountry);
      console.log("data world", dataWorld);

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

      // dataByCountry.forEach(d => {
      //   const data2019 = newData.find(c => c["ISO"] === d.country_code);
      //   if (data2019) {
      //     d["happy_planet_index_2019"] = +data2019["HPI"].replace(",", ".");
      //   } else {
      //     d["has_missing_life_quality_data"] = true;
      //   }
      // })

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
