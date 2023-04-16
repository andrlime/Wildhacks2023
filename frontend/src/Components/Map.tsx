import '../leaflet.css';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents } from 'react-leaflet';
import L from "leaflet";
import PIN from './pin.png';
import React, { useEffect } from 'react';
import { getBuildingName } from './data';

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
    contact: string
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

export const Map: React.FC<{s: any, cb: Function, cloud: ClowderHashMap | null, filter: [string, string, string]}> = ({s, cb, cloud, filter}) => {
    const myIcon = L.icon({
        iconUrl: PIN,
        iconSize: [55, 55],
    });

    const [blocked, setBlocked] = React.useState([""]);

    useEffect(() => {
        console.log(blocked);
    },[blocked]);

    if(s.showMap) {
        return (
            <div>
                <MapContainer className="map-container rounded-sm" center={[42.056, -87.675]} zoom={16} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                    />
                    {cloud ? <>
                        {Object.keys(cloud).filter(e => {
                            if(blocked.includes(e)) return false;
                            if(filter[0] === "" && filter[1] === "" && filter[2] === "") return true;

                            let buildingMatch = cloud[e].location === filter[0];
                            let subjectMatch = cloud[e].subject === filter[1];
                            let genericTextMatch = ((cloud[e].class.toLowerCase().includes(filter[2].toLowerCase()) || cloud[e].message.toLowerCase().includes(filter[2].toLowerCase()))) && filter[2] !== "";

                            return (buildingMatch || subjectMatch || genericTextMatch)
                        }).map(e => (
                            <Marker position={[parseFloat(cloud[e].pinlatitude + ""), parseFloat(cloud[e].pinlongitude + "")]} icon={myIcon}>
                                <Popup>
                                    <div className='font-bold flex flex-row'>
                                        <span>{cloud[e].displayname} - {cloud[e].class} at {(getBuildingName(cloud[e].location))}</span>
                                    </div>
                                    <div>Status: {cloud[e].status}</div>
                                    <div>Message: {cloud[e].message}</div>
                                    <div>Contact: {cloud[e].contact}</div>
                                    <div><span onClick={() => {
                                        setBlocked([...blocked, e]);
                                    }} className='font-bold hover:cursor-pointer'>⚠️ Report User</span></div>
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
