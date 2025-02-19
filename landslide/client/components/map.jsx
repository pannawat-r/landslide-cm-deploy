'use client'
import * as ReactLeaflet from 'react-leaflet';
import Leaflet from 'leaflet';
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"

const { MapContainer } = ReactLeaflet;

export default function Map({ children, className, width, height, ...rest }) {
    return (

        <MapContainer style={{ width: '100%', height: '100%', aspectRatio: 1 }} {...rest}>
            {children(ReactLeaflet, Leaflet)}
        </MapContainer>
    )
}