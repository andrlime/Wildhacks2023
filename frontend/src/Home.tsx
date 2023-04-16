import { MantineProvider, Modal, Group, TextInput, PasswordInput, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';


export const Home: React.FC = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const navigate = useNavigate();
    const signOut = () => {
        auth.signOut();
        setTimeout(() => navigate("/login"), 5);
    }

    return (
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <Modal opened={opened} onClose={close} title="Profile" centered>
                {/*Modal Content*/}
            </Modal>
            <Button
                style={{width: "fit-content",}}
                className='bg-purple-500 hover:bg-purple-700'
                variant='filled'
                color="violet"
                title='Sign Out'
                onClick={open}
                >
                Profile
            </Button>
        </MantineProvider>
    );
}

export default Home;

