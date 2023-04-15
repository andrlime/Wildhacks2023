import { MantineProvider, Autocomplete, Loader, TextInput, PasswordInput, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef, createContext, useContext} from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import EmailForm from './components/EmailForm';

export const EmailContext = createContext({});
const PasswordContext = createContext({});
const ConfirmPasswordContext = createContext({});

export const Login: React.FC = () => {
  const timeoutRef = useRef<number>(-1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  const [alertMsg, setAlertMsg] = useState('');

  //This code for handleChange is from https://github.com/rtivital, the developer of Mantine
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
        <EmailContext.Provider value={{email, setEmail}}>
            <EmailForm />
        </EmailContext.Provider>    
        <PasswordInput
        style={{width: 350,}}
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)}}
        error={password.length > 6 ? "" : "Password must be at least 6 characters long"}
        />
        <PasswordInput
        style={{width: 350,}}
        label="Confirm Password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => {setConfirmPassword(e.target.value)}}
        error={confirmPassword === password ? "" : "Passwords don't match"}
        />
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
  );
}

export default Login;

