import { MantineProvider, Autocomplete, Loader, TextInput, PasswordInput, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from '../firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';

export const SignupButton: React.FC<{email: string, password: string, confirmPassword: string}> = ({email, password, confirmPassword}) => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    const signUp = async() => {
        if (password !== confirmPassword) {
          alert("Passwords don't match!");
          return;
        }
        if (email === '') {
          alert("Please enter an email!");
          return;
        }
        if (password === '') {
          alert("Please enter a password!");
          return;
        }
        if (confirmPassword === '') {
          alert("Please confirm your password!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log('Account created with: ', user.email);
            setIsSignedIn(true);
            // Signed in
          })
          .catch((error) => {
            console.log(error);
          });
      }
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark'}}>
            <Button
                style={{width: "fit-content", marginTop: 15}}
                className='bg-purple-500 hover:bg-purple-700'
                variant='filled'
                color="violet"
                title='Sign Up'
                onClick={signUp}
                >
                Sign Up
            </Button>
        </MantineProvider>
    )
}