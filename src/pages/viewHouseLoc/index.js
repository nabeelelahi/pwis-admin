import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { LayoutComponent } from "@components"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import Leaflet from "leaflet"
import 'leaflet/dist/leaflet.css'
import { useLocation } from "react-router";

export default function ViewHouseLocation() {
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const location = useLocation()?.state
    const center = [24.8546842, 67.0207055]


    console.log('loc', location)
    // For Worker Location
    const [myCoords, setLoc] = useState([location?.latitude, location?.longitude])
   

    function renderData() {
        setLoc([location?.latitude, location?.longitude])
        map?.flyTo(myCoords, 11)
    }
    useEffect(() => {
        renderData()
        console.log('run')
        // return (() => renderData())
    }, [map]);
    // setRender(true)



    let pointer = Leaflet.icon({
        iconUrl: "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [4, -80],
    })



    return (
        <LayoutComponent>
            <div className="map-container">
                <MapContainer
                    center={center}
                    ref={mapRef}
                    zoom={22}
                    minZoom={15}
                    whenCreated={setMap}
                    className="map"
                    scrollWheelZoom={false}

                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    <Marker position={myCoords} icon={pointer}>
                        <Popup>
                            <h3>House # {location?.house_no}</h3>

                        </Popup>
                    </Marker>

                    <FullscreenControl />
                </MapContainer>
            </div>
        </LayoutComponent >
    )
}