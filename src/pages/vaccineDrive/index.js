import React, { useEffect, useState, useRef } from "react";
import { LayoutComponent } from '@components'
import Map from 'ol/Map'
import { fromLonLat } from 'ol/proj'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import XYZ from 'ol/source/XYZ'
import { transform } from 'ol/proj'
import Point from "ol/geom/Point"
import "ol/ol.css"

import './styles.css'
import { Feature } from "ol";

export default function VaccineDrive() {

  const [loc, setLoc] = useState({
    longitude: 67.0583856,
    latitude: 24.977495
  })

  function location() {
    navigator.geolocation.getCurrentPosition(pos => {
      // setLoc({ longitude: pos.coords.longitude, latitude: pos.coords.latitude })
      setLoc({ longitude: 67.0583856, latitude: 24.977495 })
    })
  }
  useEffect(() => {
    location()
    console.log('Loc', loc)
  }, [])
  // set intial state
  const [map, setMap] = useState()
  const [featuresLayer, setFeaturesLayer] = useState()
  const [features, setFeatures] = useState([])
  const [selectedCoord, setSelectedCoord] = useState()

  // pull refs
  const mapElement = useRef()

  // create state ref that can be accessed in OpenLayers onclick callback function
  //  https://stackoverflow.com/a/60643670
  const mapRef = useRef()
  mapRef.current = map

  // initialize map on first render - logic formerly put into componentDidMount
  useEffect(() => {

    // create and add vector source layer
    const initalFeaturesLayer = new VectorLayer({
      source: new VectorSource({
        // url:'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
        // format: new GeoJSON(),
        features:[new Feature({
          geometry:new Point(fromLonLat([loc.longitude,loc.latitude]))
        })]
      }),
      background:'#fafafa'
      // style: function (feature) {
      //   const color = feature.get('COLOR') || '#eeeeee';
      //   Style.getFill().setColor(color);
      //   return style;
      // },
      
    })

    // create map
    const initialMap = new Map({
      target: mapElement.current,
      layers: [
        // Google Maps Terrain
        new TileLayer({
          source: new XYZ({
            url: 'http://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}',
          })
        }),

        initalFeaturesLayer

      ],
      view: new View({
        projection: 'EPSG:3857',
        center: fromLonLat([loc.longitude, loc.latitude]),
        zoom: 18,
        // zoomFactor:true
      }),
      controls: []
    })

    // set map onclick handler
    initialMap.on('click', handleMapClick)

    // save map and vector layer references to state
    setMap(initialMap)
    setFeaturesLayer(initalFeaturesLayer)

  }, [])

  // update map if features prop changes - logic formerly put into componentDidUpdate
  // useEffect( () => {

  //   // if (props.features.length) { // may be null on first render

  //     // set features to map
  //     featuresLayer.setSource(
  //       new VectorSource({
  //         features:features // make sure features is an array
  //       })
  //     )

  //     // fit map to feature extent (with 100px of padding)
  //     map.getView().fit(featuresLayer.getSource().getExtent(), {
  //       padding: [100,100,100,100]
  //     })

  //   // }

  // },[])

  // map click handler
  const handleMapClick = (event) => {

    // get clicked coordinate using mapRef to access current React state inside OpenLayers callback
    //  https://stackoverflow.com/a/60643670
    const clickedCoord = mapRef.current.getCoordinateFromPixel(event.pixel);

    // transform coord to EPSG 4326 standard Lat Long
    const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326')

    // set React state
    setSelectedCoord(transormedCoord)

    console.log(transormedCoord)

  }


  // useEffect(()=>{
  //   mapElement.setTarget("map15");

  //     // Déclaration of the Marker
  //   const marker = new Overlay({
  //       position: ([-43.3307, -22.9201]),
  //       positioning: "center-center",
  //       element: document.getElementById("marker"),
  //       stopEvent: false
  //     });
  //     //console.log(this.marker);

  //     // Adding to the Map Object

  //     mapElement.addOverlay(marker);
  // },[])



  return (
    <LayoutComponent>
      <div ref={mapElement} style={{ width: '100%', height: '120vh' }}>

      </div>
    </LayoutComponent>
  )
}

