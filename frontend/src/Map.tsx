import './leaflet.css';
import { MapContainer, TileLayer, useMap , Popup, Marker} from 'react-leaflet'

export default function Map()
{
    return (
        <div>
            <MapContainer className="map-container" center={[42.056, -87.675]} zoom={16} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
            />
            <Marker position={[42.056, -87.675]}>
                <Popup>
                CS 211. <br /> 1 person is studying here.
                </Popup>
            </Marker>
            </MapContainer>
        </div>
    );
}