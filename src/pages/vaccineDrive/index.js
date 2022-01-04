import React, { useEffect, useState } from "react";
import { LayoutComponent } from '@components'
import GoogleMap, { Feature, Layer, ZoomControl, Popup } from 'react-mapbox-gl'
import { GeolocateControl, NavigationControl } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import './styles.css'

export default function VaccineDrive() {

    const [loc, setLoc] = useState({
        longitude: null,
        latitude: null
    })

    function location() {
        navigator.geolocation.getCurrentPosition(pos => {
            setLoc({ longitude: pos.coords.longitude, latitude: pos.coords.latitude })
        })
    }

    const Map = GoogleMap({
        accessToken:
            'pk.eyJ1IjoibXVoYW1tYWRyYW1peiIsImEiOiJja3h1bWR1MmIxZDNuMnZvMDV5anA1dWo5In0.lvSf-RwHi8ayqE5Ya8Ytjw',
        container: 'map',
    });
    useEffect(() => {
        location()

    }, [])


    const coordinates = [
        [67.00994, 24.86146],
        [loc.longitude, loc.latitude],
    ]

    const onMapLoad = map => {

        map.addControl(new GeolocateControl({
            trackUserLocation: true,
            showUserLocation: true,

            positionOptions: {
                enableHighAccuracy: true
            },
            showUserHeading: true,
        }));
        map.addControl(new NavigationControl(), 'bottom-right')


    };
    return (
        <LayoutComponent>

            <Map
                style="mapbox://styles/mapbox/light-v10"
                containerStyle={{
                    height: '700px',
                    width: '100%'
                }}
                onStyleLoad={onMapLoad}
                center={[loc.longitude, loc.latitude]}

            >

                <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}  >

                    <NavigationControl />
                    {
                        coordinates.map((item, index) => {
                            return (
                                <>
                                    <Feature key={index} coordinates={[item[0], item[1]]} />
                                    <Popup key={index} coordinates={[item[0], item[1]]} offset={{
                                        'bottom-left': [12, -38], 'bottom': [0, -38], 'bottom-right': [-12, -38]
                                    }}>
                                        <h1>Hello World</h1>
                                    </Popup>

                                </>
                            )
                        })
                    }
                    <Feature coordinates={[coordinates[0][0].longitude, coordinates[0][1].latitude]} />


                    <ZoomControl />

                </Layer>
            </Map>
        </LayoutComponent>
    )
}

