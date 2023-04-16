import { MantineProvider, Autocomplete, Loader, PasswordInput, Button, Text } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { BrowserRouter as _, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const Signup: React.FC = () => {
  const timeoutRef = useRef<number>(-1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignedIn, setIsSignedIn] = useState(false);

  //This code is from https://github.com/rtivital, the developer of Mantine
  const handleChange = (val: string) => {
    window.clearTimeout(timeoutRef.current);
    setEmail(val);
    setData([]);

    if (val.trim().length === 0 || val.includes('@')) {
      setLoading(false);
    } else {
      setLoading(true);
      timeoutRef.current = window.setTimeout(() => {
        setLoading(false);
        setData(['u.northwestern.edu'].map((provider) => `${val}@${provider}`));
      }, 1000);
    }
  };

//   useEffect(() => {
//     console.log(isSignedIn, "AAA");
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user){
//         return navigate("/home");
//       }
//     });
//     return unsubscribe;
//   })
  
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if(user) {
            setIsSignedIn(true);
            navigate("/home");
        }
    })
  }, [isSignedIn, navigate])

  return (
    <div className='flex justify-center items-center align-middle w-full h-screen'>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'light'}}>
          
          <div className='w-fit'>
            <Autocomplete
            style={{width: 350,}}
            value={email}
            data={data}
            onChange={handleChange}
            rightSection={loading ? <Loader size="1rem" /> : null}
            label="Email"
            placeholder="Your email"
            />
            <PasswordInput
            style={{width: 350,}}
            label="Password"
            placeholder="Your password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)}}
            error={password.length > 6 && password.length !== 0 ? "" : "Password must be at least 6 characters long"}
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

            <Text style={{fontSize: 13}}>
                <Link to="/login">Already have an account? Log in!</Link>
            </Text>
          </div>
          
      </MantineProvider>
    </div>
  );
}

export default Signup;

