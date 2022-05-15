import React, { useEffect, useState } from "react";
// openlayers
import GeoJSON from "ol/format/GeoJSON";
import Feature from "ol/Feature";
import Mapper from "../Components/Map/Mapper";
import "./Location.css";
import SampleData from "../Assets/Mock/mock-geojson-api.json";
const Location = () => {
  // set intial state
  const [features, setFeatures] = useState([]);
  const wktOptions = {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  };
  // initialization - retrieve GeoJSON features from Mock JSON API get features from mock
  //  GeoJson API (read from flat .json file in public directory)
  useEffect(() => {
    const parsedFeatures = new GeoJSON().readFeatures(SampleData, wktOptions);
    console.log("parsedFeatures", parsedFeatures);
    // set features into state (which will be passed into OpenLayers
    //  map component as props)
    setFeatures(parsedFeatures);
  }, []);

  return (
    <div className="App">
      <div className="app-label">
        <p>React Functional Components with OpenLayers Example</p>
        <p>Click the map to reveal location coordinate via React State</p>
      </div>

      <Mapper features={features} />
    </div>
  );
};

export default Location;
