import React, { useEffect, useRef, useState } from "react";
// -----Main-css
import "./Mapper.css";
// -----ol-Map
import Map from "ol/Map";
// -----ol-View
import View from "ol/View";
// -----ol-Layer
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
// -----ol-Source
import VectorSource from "ol/source/Vector";
import XYZ from "ol/source/XYZ";
// -----ol-proj
import { transform } from "ol/proj";
import { toStringXY } from "ol/coordinate";
import { Fill, Stroke, Style } from "ol/style";

let globalSelectedCode = "A";

const redPolygonStyle = new Style({
  stroke: new Stroke({
    color: "rgba(0, 0, 0, 0.4)",
    width: 0,
  }),
  fill: new Fill({
    color: "rgba(228, 31, 24, 0.7)",
  }),
});
const yellowPolygonStyle = new Style({
  stroke: new Stroke({
    color: "rgba(0, 0, 0, 0.4)",
    width: 0,
  }),
  fill: new Fill({
    color: "rgba(255, 217, 35, 0.7)",
  }),
});
const Mapper = (props) => {
  // set intial state
  const [map, setMap] = useState();
  const [featuresLayer, setFeaturesLayer] = useState();
  const [selectedCode, setSelectedCode] = useState(globalSelectedCode);
  const [coordinate, setCoordinate] = useState();

  function getPolygonStyle(feature) {
    console.log("feature", feature);
    const code = feature.get("code");
    if (code === globalSelectedCode) {
      return redPolygonStyle;
    }
    return yellowPolygonStyle;
  }

  // pull refs
  const mapElement = useRef();

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef();
  mapRef.current = map;

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {
    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource(),
      style: getPolygonStyle,
    });

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // USGS Topo
        new TileLayer({
          source: new XYZ({
            url: "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
          }),
        }),

        initalFeaturesLayer,
      ],
      view: new View({
        projection: "EPSG:3857",
        center: [0, 0],
        zoom: 2,
      }),
      controls: [],
    });
    // set map onclick handler
    initialMap.on("click", handleMapClick);
    // save map and vector layer references to state
    setMap(initialMap);
    setFeaturesLayer(initalFeaturesLayer);
  }, []);
  // map click handler
  const handleMapClick = (event) => {
    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, "EPSG:3857", "EPSG:4326");

    // set React state
    setCoordinate(transormedCoord);
  };
  // update map if features prop changes - logic formerly put into componentDidUpdate
  useEffect(() => {
    if (props.features.length) {
      // may be null on first render

      // set features to map
      featuresLayer.setSource(
        new VectorSource({
          features: props.features, // make sure features is an array
        })
      );

      // fit map to feature extent (with 100px of padding)
      map.getView().fit(featuresLayer.getSource().getExtent(), {
        padding: [100, 100, 100, 100],
      });
    }
  }, [props.features]);

  useEffect(() => {
    globalSelectedCode = selectedCode;
    if (featuresLayer) {
      featuresLayer.changed();
    }
  }, [featuresLayer, selectedCode]);

  const handleChange = (event) => {
    setSelectedCode(event.target.value);
  };
  // render component
  return (
    <div>
      <div ref={mapElement} className="map-container"></div>

      <div className="clicked-coord-label">
        <form>
          <label>
            Select a polygoncode:
            <select value={selectedCode} onChange={handleChange}>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>
        </form>
        <p>{selectedCode ? selectedCode : "No selection"}</p>
        <p>{coordinate ? toStringXY(coordinate, 5) : ""}</p>
      </div>
    </div>
  );
};

export default Mapper;
