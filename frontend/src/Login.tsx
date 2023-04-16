import { MantineProvider, Autocomplete, Loader, PasswordInput, Button, Text } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from './firebase/firebase-config';
import { signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import { ButtonGroup } from '@mantine/core/lib/Button/ButtonGroup/ButtonGroup';
import { FooterSimple } from './footer';
import { BrowserRouter as _, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import logo from './Components/logo.png';
import catsvg from './Components/undraw_cat_epte.svg';
import { FooterSimple } from './footer';



export const Login: React.FC = () => {
  const timeoutRef = useRef<number>(-1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [password, setPassword] = useState('');
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
  
const logIn = () => {
    if (email === '') {
      alert("Please enter an email!");
      return;
    }
    if (password === '') {
      alert("Please enter a password!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in with: ', user.email);
        setIsSignedIn(true);
        // Signed in
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
    <div className='flex justify-center flex-col items-center align-middle w-full h-screen'>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'light'}}>
        <img width={300} src={logo} alt='Clowder Logo'/>
        <div className='w-fit'>
        <div className='bg-white absolute top-4 p-2 hover:bg-gray-100 transition-all cursor-pointer ease-in-out rounded-xl left-4 font-bold text-3xl flex align-middle items-center' 
              onClick={() => navigate("/")}>&#8678;&nbsp;&nbsp;<span 
              className='text-lg'>Go Back</span></div>
          <Autocomplete
          style={{width: 350}}
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
          error={password.length < 6 && password.length !== 0 ? "Password must be at least 6 characters long" : ""}
          />
          <Button
          style={{width: "fit-content", marginTop: 15}}
          className='bg-purple-500 hover:bg-purple-700'
          variant='filled'
          color="violet"
          title='Sign Up'
          onClick={logIn}
          >
          Login
          </Button>

          <Text style={{fontSize: 13}}>
              <Link to="/signup">Don't have an account? Sign Up!</Link>
          </Text>
        </div>
          
      </MantineProvider>
      <FooterSimple links= {[{link: "", label: ""}, {link: "", label: "WildHacks2023"}] }/>
      <img className='absolute bottom-0 right-1 w-1/5 min-w-[200px]' src={catsvg} alt={"cat"}/>
    </div>
  );
}

export default Login;

