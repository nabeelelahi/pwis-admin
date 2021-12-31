import React from "react";
import { LayoutComponent } from '@components'
import GoogleMapReact from 'google-map-react'

export default function VaccineDrive() {

    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
    };

    const initialPosition = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    }

    return (
        <LayoutComponent>

            <div>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyBFunsUmQ7N12nT29zMLRFg_srdOdtHSUo' }}
                    defaultCenter={initialPosition.center}
                    defaultZoom={initialPosition.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
                >
                    <div
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        </LayoutComponent>
    )
}