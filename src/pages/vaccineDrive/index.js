import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { LayoutComponent } from "@components"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import Leaflet from "leaflet"
import 'leaflet/dist/leaflet.css'
import "./vaccineDriveStyles.css"

export default function VaccineDrive() {
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const center = [24.8546842, 67.0207055]

    // For My Location
    const [myCoords, setLoc] = useState([24.854600, 67.0207055])

    function location() {
        navigator.geolocation.getCurrentPosition(pos => {
            setLoc([pos.coords.latitude, pos.coords.longitude])
        })
    }

    useLayoutEffect(() => {
        location()

    }, [])
    useEffect(() => {
        map?.flyTo(myCoords, 11)


    }, [myCoords]);


    let pointer = Leaflet.icon({
        iconUrl: "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [4, -80],
    })



    const points = [
        [25.07316070640961, 67.10449218750001],
        [25.021217616954733, 67.13504791259767],
        [25.021062065689673, 67.12964057922365],
        [25.015462088877463, 25.015462088877463],
    ]

    return (
        <LayoutComponent>
            <div className="map-container">
                <MapContainer
                    center={center}
                    ref={mapRef}
                    zoom={20}
                    whenCreated={setMap}
                    className="map"
                    scrollWheelZoom={false}

                >
                    <TileLayer
                        // attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />


                    <Marker position={myCoords} icon={pointer}>
                        <Popup>
                            <div>My Location</div>

                        </Popup>
                    </Marker>

                    {
                        points?.map(item => {
                            return (
                                <Marker position={item} icon={pointer}>
                                    <Popup>
                                        <div>Worker Information will be here</div>

                                    </Popup>
                                </Marker>
                            )
                        })
                    }
                    <FullscreenControl />
                </MapContainer>
            </div>
        </LayoutComponent >
    )
}