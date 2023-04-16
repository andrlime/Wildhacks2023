import '../leaflet.css';
import { MapContainer, TileLayer, Popup, Marker} from 'react-leaflet';
import L, { LeafletMouseEvent } from "leaflet";
import DEMO_IMAGE from './demo.png';
import React, { useEffect } from 'react';

export const Map: React.FC = () => {
    const myIcon = L.icon({
        iconUrl: DEMO_IMAGE,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

    return (
        <div>
            <MapContainer className="map-container rounded-sm" center={[42.056, -87.675]} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                />
                <Marker position={[42.056, -87.675]} icon={myIcon}>
                    <Popup>
                    CS 211. <br /> 1 person is studying here.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

function mapClicked(e : LeafletMouseEvent) {
  let latlng = e.latlng;
  console.log("you clicked: " + latlng);
}

export default Map;
