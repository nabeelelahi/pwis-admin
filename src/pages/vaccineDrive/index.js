import React, { useEffect, useState } from "react";
import { LayoutComponent } from '@components'
import {Avatar} from "antd"
import ReactMapGL, {
  Marker, Popup, NavigationControl,
 } from 'react-map-gl'
import './styles.css'

export default function VaccineDrive() {

  const [loc, setLoc] = useState({
    longitude: 67.0583856,
    latitude: 24.977495
  })

  function location() {
    navigator.geolocation.getCurrentPosition(pos => {
      setLoc({ longitude: pos.coords.longitude, latitude: pos.coords.latitude })
    })
  }
  useEffect(() => {
    location()
    console.log('Loc', loc)
  }, [])

  const liveWorkers = [
    { id: 123, lan: 67.10449218750001, lat: 25.07316070640961 },
    { id: 124, lan: 67.13504791259767, lat: 25.021217616954733 },
    { id: 125, lan: 67.12964057922365, lat: 25.021062065689673 },
    { id: 126, lan: 67.13058471679689, lat: 25.015462088877463 },
  ]

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100vh",
    latitude: loc.latitude,
    longitude: loc.longitude,
    zoom: 7,
    minZoom: 2,

  });
  const [showPopup, togglePopup] = useState(false);
  const [open, setOpen] = useState();


  return (
    <LayoutComponent>
      <div className="map-box">


        <ReactMapGL
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(viewport) => setViewport(viewport)}
          mapboxApiAccessToken=""
          className="overflow-x  map"

        >

          <Marker
            latitude={loc.latitude}
            longitude={loc.longitude}
            offsetLeft={-20}
            offsetTop={-30}
            className="marker"
          >
            <img
              onClick={() => togglePopup()}
              style={{ height: 50, width: 50 }}
              src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
            />
          </Marker>
          {
            liveWorkers?.map(item => {
              return (
                <Marker
                  latitude={item.lat}
                  longitude={item.lan}
                  offsetLeft={-20}
                  offsetTop={-30}
                  className="marker"
                >
                  <img
                    onClick={() => {
                      setOpen(item)
                      togglePopup(true)
                    }}
                    style={{ height: 50, width: 50 }}
                    src="https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png"
                  />

                </Marker>
              )
            })
          }
          {
            showPopup && <Popup
              latitude={open?.lat}
              longitude={open?.lan}
              closeButton={true}
              closeOnClick={true}
              onClose={() => togglePopup(false)}
              anchor="top-right" >
              <div className="marker-pop-box">
              <h6>Worker 1</h6>
              <Avatar src="https://joeschmoe.io/api/v1/random" size={40} />
              </div>

            </Popup>
          }

          <NavigationControl className="right-zoom" />
        </ReactMapGL>
      </div>
    </LayoutComponent >


  );

}