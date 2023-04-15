import { MantineProvider, Autocomplete, Loader, TextInput, PasswordInput, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { redirect, useNavigate } from 'react-router-dom';


export const Home: React.FC = () => {

    const navigate = useNavigate();
    const signOut = () => {
        auth.signOut();
        setTimeout(() => navigate("/login"), 5);
    }

    return (
        <MantineProvider theme={{ colorScheme: 'light' }}>
            <Button
                style={{width: "fit-content",}}
                className='bg-purple-500 hover:bg-purple-700'
                variant='filled'
                color="violet"
                title='Sign Out'
                onClick={signOut}
                >
                Sign Out
            </Button>
        </MantineProvider>
    );
}

export default Home;

