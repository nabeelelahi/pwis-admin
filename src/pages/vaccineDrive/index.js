import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { LayoutComponent } from "@components"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import Leaflet from "leaflet"
import { BASE_URL } from "@constants"
import { http } from "@services"
import { io } from "socket.io-client"
import 'leaflet/dist/leaflet.css'
import "./vaccineDriveStyles.css"

export default function VaccineDrive() {
    let socket = useRef(null)
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const center = [24.8546842, 67.0207055]
    const [rejectedHouses, setRejectdHouses] = useState([])
    const [points, setPoints] = useState([])
    // Get Rejected Houses
    async function getRejectedHouses() {
        let rejHouses = []
        const url = `admin/GET/houses`;
        const response = await http(url);
        if (response?.success) {
            setRejectdHouses(response?.data?.filter(item => item?.Vac_Status === 'Rejected'))
            rejectedHouses?.map((item) => {
                rejHouses.push({ latitude: item?.latitude, longitude: item?.longitude })
            })
            setPoints([...rejectedHouses])


        }
    }



    // For My Location
    const [myCoords, setLoc] = useState([24.854600, 67.0207055])

    function location() {
        navigator.geolocation.getCurrentPosition(pos => {
            setLoc([pos.coords.latitude, pos.coords.longitude])
        })
    }

    useEffect(() => {
        getRejectedHouses()
        socket.current = io("https://pacific-bastion-99540.herokuapp.com"
            , {
                transports: ['websocket']
            }
        )
        socket.current.on('connection', () => {
            console.log('Socket', socket.current?.connected)

            socket.current.on('getWorker', (data) => {
                console.log('data', data)
            })
        })
    }, [])

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



    // const points = [
    //     [25.07316070640961, 67.10449218750001],
    //     [25.021217616954733, 67.13504791259767],
    //     [25.021062065689673, 67.12964057922365],
    //     [25.015462088877463, 25.015462088877463],
    // ]

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