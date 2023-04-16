import { MantineProvider, Modal, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, { useState } from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import logo from './Components/logo.png';
import AppWrapper from './Components/AppWrapper';
import { FooterSimple } from './footer';
import {UserProfile} from './UserProfile';
import Profile from './Profile';
import About from './About';


export const Home: React.FC = () => {

    const [profileOpened, { open : openProfile, close : closeProfile }] = useDisclosure(false);
    const [aboutOpened, { open: openAbout, close: closeAbout }] = useDisclosure(false);
    const [showMapState, setShowMapState] = useState(true);

    const navigate = useNavigate();

    // const signOut = () => {
    //     auth.signOut();
    //     setTimeout(() => navigate("/login"), 5);
    // }

    const [userProfile, setUserProfile] = useState(new UserProfile("Willie Wildcat", "williewildcat2026@u.northwestern.edu", "McCormick", "IE", "123-456-7890", "Tech Atrium"));

    return (
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <div className='flex justify-between pt-4'>
                <div>
                    <img src={logo} className='pl-6 hover:cursor-pointer' alt = "Clowder Logo" width={172} onClick={() => navigate('/')}/>
                </div>
                <div className='flex flex-row'>
                    <Modal opened={profileOpened} onClose={() => {
                            closeProfile();
                            setShowMapState(true);
                        }} title="Profile" centered>
                        <Profile user={userProfile} updateUser={setUserProfile}/>
                    </Modal>    
                    <Modal opened={aboutOpened} onClose={() => {
                            closeAbout();
                            setShowMapState(true);
                        }} size="lg" title="About" centered>
                        <About/>
                    </Modal>
                    <Button
                        style={{width: "fit-content",}}
                        className='hover:bg-purple-700 self-end m-3 text-gray-500 hover:text-gray-100 transition-all ease-in-out text-xl mr-6'
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
                        className='hover:bg-purple-700 self-end m-3 text-gray-500 hover:text-gray-100 transition-all ease-in-out text-xl mr-6'
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
            <FooterSimple links= {[{link: "", label: ""}, {link: "", label: "WildHacks2023"}] }/>
        </MantineProvider>
    );
}

export default Home;