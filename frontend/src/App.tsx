import { MantineProvider, Autocomplete, Loader, TextInput, PasswordInput } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import './index.css';
import { auth } from '../../assets/firebase/firebase-config';
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';

export const App: React.FC = () => {
  const timeoutRef = useRef<number>(-1);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<string[]>([]);
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
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
      />
      <PasswordInput
      style={{width: 350,}}
      label="Confirm Password"
      placeholder="Confirm your password"
      />
      
    </MantineProvider>
  );
}

export default App;

