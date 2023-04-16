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
    const navigate = useNavigate();
    const signOut = () => {
        auth.signOut();
        setTimeout(() => navigate("/login"), 5);
    }

    return (
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <div className='flex justify-between pt-4'>
                <div>
                    <img src={logo} className='pl-6' alt = "Clowder Logo" width={172} onClick={() => navigate('/')}/>
                </div>
                <div>
                    <Modal opened={profileOpened} onClose={closeProfile} title="Profile" centered>
                        {/*Modal Content*/}
                    </Modal>
                    <Modal opened={aboutOpened} onClose={closeAbout} title="About" centered>
                        {/*Modal Content*/}
                    </Modal>
                    <Button
                        style={{width: "fit-content",}}
                        className='hover:bg-purple-700 self-end m-4 text-gray-500 hover:text-gray-100 transition-all ease-in-out text-2xl mr-8'
                        variant='filled'
                        color="violet"
                        title='Sign Out'
                        onClick={openAbout}
                        >
                        About
                    </Button>
                    <Button
                        style={{width: "fit-content",}}
                        className='hover:bg-purple-700 self-end m-4 text-gray-500 hover:text-gray-100 transition-all ease-in-out text-2xl mr-8'
                        variant='filled'
                        color="violet"
                        title='Sign Out'
                        onClick={openProfile}
                        >
                        Profile
                    </Button>
                </div>
            </div>
            <AppWrapper/>
        </MantineProvider>
    );
}

export default Home;

