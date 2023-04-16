import './leaflet.css';
import { MapContainer, TileLayer, useMap, Popup, Marker} from 'react-leaflet';
import L from "leaflet";
import DEMO_IMAGE from './Components/demo.png';

export default function Map() {
    const myIcon = L.icon({
        iconUrl: DEMO_IMAGE,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

    return (
        <div>
            <MapContainer className="map-container" center={[42.056, -87.675]} zoom={16} scrollWheelZoom={false}>
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