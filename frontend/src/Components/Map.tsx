import '../leaflet.css';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from "leaflet";
import DEMO_IMAGE from './demo.png';
import React, { useEffect } from 'react';

interface ClowderPacket {
    uuid: string; // User ID
    class: string; // Class number
    subject: string; // CS, Bio, etc.
    location: string; // Building name / name of the tree they are on
    area: string; // NE, N, Center, SW, S
    school: string; // WCAS or MEAS
    status: string; // grinding? solo?
    showpin: boolean; // whether user has a pin
    pinlatitude: string; // latitude of user's pin
    pinlongitude: string; // longitude of user's pin
    timestamp: number; // unix timestamp
    displayname: string; // the user's name
}

type ClowderHashMap = Record<string, ClowderPacket>;

const OutsideMapComponent: React.FC<{c: Function}> = ({c}) => {
    useMapEvents({
        click: (e) => {
          c({lat: e.latlng.lat, lon: e.latlng.lng});
        },
      })

    return <></>;
}

export const Map: React.FC<{s: any, cb: Function, cloud: ClowderHashMap | null}> = ({s, cb, cloud}) => {
    const myIcon = L.icon({
        iconUrl: DEMO_IMAGE,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });

    console.log(cloud);

    if(s.showMap) {
        return (
            <div>
                <MapContainer className="map-container rounded-sm" center={[42.056, -87.675]} zoom={16} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {cloud ? <>
                        {Object.keys(cloud).map(e => (
                            <Marker position={[parseFloat(cloud[e].pinlatitude + ""), parseFloat(cloud[e].pinlongitude + "")]} icon={myIcon}>
                                <Popup>
                                CS 211. <br /> 1 person is studying here.
                                </Popup>
                            </Marker>
                        ))}
                    </> : ""}
                    <OutsideMapComponent c={cb}/>
                </MapContainer>
            </div>
        );
    } else {
        return <></>;
    }
}

export default Map;
