import { MantineProvider, Modal, Group, TextInput, PasswordInput, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import logo from './Components/logo.png';
import AppWrapper from './Components/AppWrapper';


export const Home: React.FC = () => {

    const [profileOpened, { open : openProfile, close : closeProfile }] = useDisclosure(false);
    const [aboutOpened, { open: openAbout, close: closeAbout }] = useDisclosure(false);
    const [showMapState, setShowMapState] = useState(true);

    const navigate = useNavigate();
    const signOut = () => {
        auth.signOut();
        setTimeout(() => navigate("/login"), 5);
    }

    return (
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <div className='flex justify-between pt-4'>
                <div>
                    <img src={logo} className='pl-6 hover:cursor-pointer' alt = "Clowder Logo" width={172} onClick={() => navigate('/')}/>
                </div>
                <div>
                    <Modal opened={profileOpened} onClose={() => {
                            closeProfile();
                            setShowMapState(true);
                        }} title="Profile" centered>
                        {/*Modal Content*/}
                    </Modal>
                    <Modal opened={aboutOpened} onClose={() => {
                            closeAbout();
                            setShowMapState(true);
                        }} title="About" centered>
                        {/*Modal Content*/}
                    </Modal>
                    <Button
                        style={{width: "fit-content",}}
                        className='hover:bg-purple-700 self-end m-4 text-gray-500 hover:text-gray-100 transition-all ease-in-out text-2xl mr-8'
                        variant='filled'
                        color="violet"
                        title='About'
                        onClick={() => {
                            openAbout();
                            setShowMapState(false);
                            console.log("HIDE");
                        }}
                        >
                        About
                    </Button>
                    <Button
                        style={{width: "fit-content",}}
                        className='hover:bg-purple-700 self-end m-4 text-gray-500 hover:text-gray-100 transition-all ease-in-out text-2xl mr-8'
                        variant='filled'
                        color="violet"
                        title='Profile'
                        onClick={() => {
                            openProfile();
                            setShowMapState(false);
                            console.log("HIDE");
                        }}
                        >
                        Profile
                    </Button>
                </div>
            </div>
            <AppWrapper showMap={showMapState}/>
        </MantineProvider>
    );
}

export default Home;