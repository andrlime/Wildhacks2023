import '../leaflet.css';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';
import L, { LeafletMouseEvent } from "leaflet";
import PIN from './pin.png';
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
    displayname: string; // the user's name,
    message: string;
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
        iconUrl: PIN,
        iconSize: [55, 55],
    });

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
                                    <div className='font-bold'>{cloud[e].displayname} - {cloud[e].class}</div>
                                    <div>{cloud[e].message}</div>
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
