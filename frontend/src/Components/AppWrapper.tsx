import React, { useState, useEffect } from "react";
import { TextInput, Button, SegmentedControl, Switch, Select } from '@mantine/core';
import useWebSocket, { ReadyState } from "react-use-websocket";

const FilterForm: React.FC = () => {
    const [showAdvanced, setShowAdvanced] = React.useState(false);

    return (
        <div className="w-1/5 p-4 m-4 rounded-xl border-gray-300 border-4 hidden lg:block">
            <div className="flex flex-col justify-between align-middle items-center m-1 p-1"><TextInput className="w-full" placeholder={"Search"}/></div>
            <Switch className="p-2" color="violet" checked={showAdvanced} onChange={(e) => setShowAdvanced(e.target.checked)} label={"Show advanced options?"}/>
            {showAdvanced ? <div className="m-1 mt-4 border-gray-300 border-2 rounded-xl p-4">
                <span className="font-bold text-lg">Filter</span>
                <Select label="Area" placeholder="Pick where you want to be" data={[{value: "north", label: "North Campus"}, {value: "south", label: "South Campus"},{value: "chicago", label: "Chicago Campus"}]}/>
                <Select label="Location" placeholder="What building?" data={[{value: "tech", label: "Technological Institute"}, {value: "mudd", label: "Mudd Librar"},{value: "swift", label: "Swift Hall"}]}/>
                <Select label="Subject" placeholder="Which subject are you studying?" data={[{value: "cs", label: "Computer Science"}, {value: "econ", label: "Economics"},{value: "physics", label: "Physics"}]}/>
            </div> : ""}
        </div>
    );
}

/**
- User ID: id of the user
- Class: the class the person is studying for
- Subject: subject (cs, bio, whatever)
- Location name: the physical name of where the person is (e.g. Mudd, Ford, etc.)
- School name: WCAS/MEAS/SESP
- Status: "grinding" / "solo"
- Show pin: boolean, whether the person has a pin or not on the map
- Pin lat/lon: self explanatory
- Timestamp
 */
const JoinForm: React.FC<{uuid: string}> = ({uuid}) => {
    const [className, setClassName] = React.useState("");
    const [subject, setClassSubject] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [status, setStatus] = React.useState("");
    const [displayName, setDisplayName] = React.useState("");

    const wsURI = "10.105.183.137:4000";
    const websocketUrl = `ws://${wsURI}/ws/broadcast`;
    const [messageHistory, setMessageHistory] = useState<Array<ClowderPacket>>([]);
    const { sendMessage, lastMessage, readyState } = useWebSocket(websocketUrl, {
        shouldReconnect: (closeEvent) => true,
    });

    useEffect(() => {
        if (lastMessage !== null) {
        let p = messageHistory;
        messageHistory.push(JSON.parse(lastMessage.data));
        setMessageHistory(p);
        }
    }, [lastMessage, setMessageHistory, messageHistory]);

    useEffect(() => {
        const interval = setInterval(() => {
        if(uuid !== "" && !!className && !!subject && !!location && !!status && !!displayName) handleClickSendMessage();
        }, 500);

        return () => clearInterval(interval);
    });

    const handleClickSendMessage = () => {
        try {
            sendMessage(JSON.stringify(
                {
                    "uuid": displayName, // change to uuid
                    "class": className,
                    "subject": subject,
                    "location": location,
                    "area": "Evanston Campus",
                    "school": "Northwestern",
                    "status": status,
                    "showpin": true,
                    "pinlatitude": 41,
                    "pinlongitude": -87,
                    "timestamp": new Date().valueOf(),
                    "displayname": displayName
                }
            ));
        } catch (e) {
            console.error(e); // handle errors here
        }
    };

    ////
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

    const getUniquePackets = (packets: Array<ClowderPacket>): ClowderHashMap => {
        const currentTime = new Date().valueOf(); // current time
        const filteredPackets = packets.filter(e => currentTime - e.timestamp < 60000); // 60 second time out
        const sortedPackets = filteredPackets.sort((a, b) => a.timestamp - b.timestamp); // sort from oldest to newest
    
        return sortedPackets.reduce<ClowderHashMap>((map, packet) => {
        map[packet.uuid] = packet;
        return map;
        }, {});
    }
    ////

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <div className="flex-row flex flex-wrap">
                <TextInput label="Class Name" placeholder="CS 212" value={className} onChange={(e) => setClassName(e.target.value)} className="m-1"/>
                <TextInput label="Subject" placeholder="EA" value={subject} onChange={(e) => setClassSubject(e.target.value)} className="m-1"/>
                <TextInput label="Location" placeholder="Mudd Library" value={location} onChange={(e) => setLocation(e.target.value)} className="m-1"/>
                <TextInput label="Status" placeholder="Suffering" value={status} onChange={(e) => setStatus(e.target.value)} className="m-1"/>
                <TextInput label="Your display name?" placeholder="Willie the Wildcat" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="m-1"/>
                <TextInput label="Your coordinates" placeholder="Click on the map!" className="m-1"/>
            </div>
            
            <Button color="violet" variant="light" className="m-1 bg-purple-100 hover:bg-purple-200 border-4 transition-all ease-in-out">Join</Button>
       
            {Object.keys(getUniquePackets(messageHistory)).reduce((acc, cur) => acc += " " + cur, "")}
        </div>
    );
}

export const AppWrapper: React.FC = () => {
    return (
        <div className="flex w-full h-screen">
            <FilterForm/>
            
            <div className="w-full lg:w-4/5 m-4 flex flex-col lg:ml-0">
                <div className="rounded-xl border-gray-300 border-4 p-4 h-fit">
                    <JoinForm uuid="AA"/>
                </div>

                <div className="mt-4 rounded-xl border-gray-300 border-4 p-4 h-full">
                </div>
            </div>
        </div>
    );
}

export default AppWrapper;