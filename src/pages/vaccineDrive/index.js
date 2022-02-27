import React, { useState, useEffect, useRef, useLayoutEffect } from "react"
import { LayoutComponent } from "@components"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { FullscreenControl } from "react-leaflet-fullscreen";
import "react-leaflet-fullscreen/dist/styles.css";
import Leaflet from "leaflet"
import { BASE_URL } from "@constants"
import { http } from "@services"
import { io } from "socket.io-client"
import HouseMarker from "../../assets/house-marker.png"
import 'leaflet/dist/leaflet.css'
import "./vaccineDriveStyles.css"

export default function VaccineDrive() {
    let socket = useRef(null)
    const [map, setMap] = useState(null)
    const mapRef = useRef(null)
    const [rejectedHouses, setRejectedHouses] = useState([])
    
    const dummyWorkers = [
        {email:'abc@gmail.com',latitude:24.9180, longitude:67.0971},
     ]

    const [workersLoc, setWorkersLoc] = useState([...dummyWorkers])
    const center = [24.9180, 67.0971]
    // Get Rejected Houses
    async function getRejectedHouses() {
        let rejHouses = []
        const url = `admin/GET/houses`;
        const response = await http(url);
        if (response?.success) {
            let houses = response?.data?.filter(item => item?.Vac_Status === 'Rejected')
            houses?.map((item) => {
                rejHouses.push({ houseNo: item?.house_no, position: [item?.latitude, item?.longitude] })
            })
            setRejectedHouses([...rejHouses])
        }
    }

    useEffect(() => {
        getRejectedHouses()
        socket.current = io("https://pacific-bastion-99540.herokuapp.com")
        console.log(socket.current)
        socket.current.on('connection', () => {
            console.log('connected')
        })

        socket.current.on('getLocation', (data) => {
            console.log('data', data)
            setWorkersLoc([...workersLoc,data])
        })
    }, [])


    let pointer = Leaflet.icon({
        iconUrl: "https://xuonginthanhpho.com/wp-content/uploads/2020/03/map-marker-icon.png",
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [4, -80],
    })
    let housePointer = Leaflet.icon({
        iconUrl: HouseMarker,
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        shadowAnchor: [4, 62],
        popupAnchor: [4, -80],
    })


    console.log('loc',workersLoc)

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
                        workersLoc?.map(item => {
                            return (
                                <Marker position={[item?.latitude, item?.longitude]} icon={pointer}>
                                    <Popup>
                                        <div>Worker Email:{item?.email ? item?.email : item?.worker_email}</div>

                                    </Popup>
                                </Marker>
                            )
                        })
                    }

                    {/* Rejected Houses */}

                    {
                        rejectedHouses?.map((item) => {
                            return (
                                <Marker position={item?.position} icon={housePointer}>
                                    <Popup>
                                        <div>House No: {item?.houseNo}</div>

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