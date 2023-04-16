import React, { useState, useEffect } from "react";
import { TextInput, Button, Select, Textarea } from '@mantine/core';
import useWebSocket from "react-use-websocket";
import { buildings, subjects } from "./data";
//import { auth } from "../firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Map from "./Map";

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
    message: string;
    contact: string;
}

type ClowderHashMap = Record<string, ClowderPacket>;

type Position = {lat: number, lon: number};

const FilterForm: React.FC<{uuid: string, callback: Function, position: Position | null, setFilter: Function}> = ({uuid, callback, position, setFilter}) => {
    const [className, setClassName] = React.useState("");
    const [subject, setClassSubject] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [displayName, setDisplayName] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [contactMethod, setContactMethod] = React.useState("");

    const wsURI = "10.105.183.137:4000"; // Is this my IP? Sorta, it's my Eduroam IP
    const websocketUrl = `ws://${wsURI}/ws/broadcast`;
    const [messageHistory, setMessageHistory] = useState<Array<ClowderPacket>>([]);
    const { sendMessage, lastMessage } = useWebSocket(websocketUrl, {
        shouldReconnect: (closeEvent) => true,
    });

    const [joined, setJoined] = useState(false);

    useEffect(() => {
        if (lastMessage !== null) {
            let p = messageHistory;
            messageHistory.push(JSON.parse(lastMessage.data));
            setMessageHistory(p);
            let packets = getUniquePackets(p);
            callback(packets);
        }
    }, [lastMessage]);

    useEffect(() => {
        if(joined) {
            const interval = setInterval(() => {
                if(uuid !== "" && !!className && !!subject && !!location && !!displayName && !!position) handleClickSendMessage();
            }, 1000);
    
            return () => clearInterval(interval);
        }
    });

    const handleClickSendMessage = (a?: number) => {
        if(a === 1) {
            setJoined(false);
            return;
        } else if(uuid !== "" && !!className && !!subject && !!location && !!displayName && !!position) {
            setJoined(true);
            try {
                sendMessage(JSON.stringify(
                    {
                        "uuid": uuid, // change to uuid
                        "class": className,
                        "subject": subject,
                        "location": location,
                        "area": "Evanston Campus",
                        "school": "Northwestern",
                        "status": status,
                        "showpin": true,
                        "pinlatitude": position?.lat,
                        "pinlongitude": position?.lon,
                        "timestamp": new Date().valueOf(),
                        "displayname": displayName,
                        "message": message,
                        "contact": contactMethod
                    }
                ));
            } catch (e) {
                console.error(e); // handle errors here
            }
        }
    };

    ////

    const getUniquePackets = (packets: Array<ClowderPacket>): ClowderHashMap => {
        const currentTime = new Date().valueOf(); // current time
        const filteredPackets = packets.filter(e => currentTime - e.timestamp < 60000); // 60 second time out
        const sortedPackets = filteredPackets.sort((a, b) => a.timestamp - b.timestamp); // sort from oldest to newest
    
        return sortedPackets.reduce<ClowderHashMap>((map, packet) => {
            map[packet.uuid] = packet;
            return map;
        }, {});
    }

    // const connectionStatus = {
    //     [ReadyState.CONNECTING]: 'Connecting',
    //     [ReadyState.OPEN]: 'Open',
    //     [ReadyState.CLOSING]: 'Closing',
    //     [ReadyState.CLOSED]: 'Closed',
    //     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    // }[readyState];

    const [filter_b, set_f_b] = useState("");
    const [filter_s, set_f_s] = useState("");
    const [filter_c, set_f_c] = useState("");
    
    

    return (
        <div className="lg:w-1/5 w-full p-4 lg:m-4 rounded-xl border-gray-300 border-4 overflow-scroll">
            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"/>
            {/* <div className="flex flex-col justify-between align-middle items-center m-1 p-1"><TextInput className="w-full" placeholder={"Search"}/></div> */}
            <div className="m-1 mt-4 border-gray-300 border-2 rounded-xl p-4">
                <div className="flex flex-row justify-between"><span className="font-bold text-lg">Filter</span><span className="hover:cursor-pointer" onClick={() => {
                    set_f_b("");
                    set_f_s("");
                    set_f_c("");
                }}>Reset</span></div>
                {/* <Select label="Area" placeholder="Pick a campus" data={[{value: "north", label: "North Campus"}, {value: "south", label: "South Campus"},{value: "chicago", label: "Chicago Campus"}]}/> */}
                <div className="flex flex-row align-middle items-end">
                    <Select label="Department" placeholder="Pick a subject" data={subjects} value={filter_s} onChange={(e) => {
                        set_f_s(e + "");
                        setFilter(filter_b, e + "", filter_c);
                    }} /> <i className="material-icons hover:cursor-pointer" onClick={() => {
                        set_f_s("");
                    }} style={{fontSize: "16pt", padding: "0.1rem"}}>refresh</i>
                </div>
                <div className="flex flex-row align-middle items-end">
                    <TextInput label="Class Name" placeholder="Type a class name" value={filter_c} onChange={(e) => {
                        set_f_c(e.target.value + "");
                        setFilter(filter_b, filter_s, e + "");
                    }}/> <i className="material-icons hover:cursor-pointer" onClick={() => {
                        set_f_c("");
                    }} style={{fontSize: "16pt", padding: "0.1rem"}}>refresh</i>
                </div>
                <div className="flex flex-row align-middle items-end">
                    <Select label="Building" placeholder="Pick a building" data={buildings} value={filter_b} onChange={(e) => {
                        set_f_b(e + "");
                        setFilter(e + "", filter_s, filter_c);
                    }} /> <i className="material-icons hover:cursor-pointer" onClick={() => {
                        set_f_b("");
                    }} style={{fontSize: "16pt", padding: "0.1rem"}}>refresh</i>
                </div>
            </div>
            <div className="m-1 mt-4 border-gray-300 border-2 rounded-xl p-4">
                <span className="font-bold text-lg">Join the clowd!</span>
                <Select required error={!subject ? "Enter a subject" : ""} label="Department" placeholder="EA" value={subject} onChange={(e) => setClassSubject(e + "")} className="m-1" data={subjects}/>
                <TextInput required error={!className ? "Enter a class name" : ""} label="Class Name" placeholder="CS 212" value={className} onChange={(e) => setClassName(e.target.value)} className="m-1"/>
                <Select required error={!location ? "Enter a location" : ""} label="Building" placeholder="Mudd Library" value={location} onChange={(e) => setLocation(e + "")} className="m-1" data={buildings}/>
                <TextInput required error={!displayName ? "Enter a display name" : ""} label="Your display name?" placeholder="Willie the Wildcat" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="m-1"/>
                <TextInput required error={!contactMethod ? "Type a contact method" : ""} value={contactMethod} label="Your contact" placeholder="example@northwestern.edu" onChange={(e) => setContactMethod(e.target.value)} className="m-1"/>
                
                <TextInput required error={!position ? "Click on the map!" : ""} disabled value={position ? `${position.lat} ${position.lon}` : ""} label="Your coordinates" placeholder="Click on the map!" className="m-1"/>
                <TextInput label="Status" placeholder="Suffering" value={status} onChange={(e) => setStatus(e.target.value)} className="m-1"/>
                <Textarea label="Your message" placeholder="Your message goes here!" value={message} onChange={(e) => setMessage(e.target.value)}/>
                <Button onClick={() => handleClickSendMessage(joined ? 1 : 0)} color="violet" variant="light" className="m-1 bg-purple-100 hover:bg-purple-200 border-4 transition-all ease-in-out w-full">{joined ? "Leave" : "Join"}</Button>
            </div>
        </div>
    );
}

export const AppWrapper: React.FC<{showMap: boolean}> = (showMap) => {
    const [clowd, setClowd] = useState<ClowderHashMap | null>();
    const [uuid, setUuid] = useState("ERROR");
    const auth = getAuth();
    const navigate = useNavigate();
    const [posn, setPosn] = useState<Position | null>();

    const setClowdCallback = (hashmap: ClowderHashMap) => {
        setClowd(hashmap);
    }

    const setPosnCallback = (position: Position) => {
        setPosn(position);
    }

    const [filter, setFilter] = useState<[string, string, string]>();
    
    useEffect(() => {
        const user = auth.currentUser;
        const user_id = user?.uid || "ERROR";

        if(user_id === "ERROR") {
            console.log("???");
            navigate("/login");
        }

        setUuid(user_id);
    },[auth, navigate]);

    return (
        <div className="flex flex-col lg:flex-row w-full h-screen">
            <FilterForm position={posn ? posn : null} uuid={uuid} callback={setClowdCallback} setFilter={(building: string, subject: string, classN: string) => {
                setFilter([building, subject, classN]);
            }}/>
            
            <div className="w-full lg:w-4/5 lg:m-4 mt-2 flex flex-col">
                <div className="rounded-xl border-gray-300 border-4 h-[50vh] lg:h-screen relative">
                    <Map cb={setPosnCallback} s={showMap} cloud={clowd || null} filter={filter || ["", "", ""]}/>
                </div>
            </div>
        </div>
    );
}

export default AppWrapper;