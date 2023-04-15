import { MantineProvider, Autocomplete, Loader, TextInput, PasswordInput, Button } from '@mantine/core'; // Mantine is a React UI library from https://github.com/rtivital
import React, {useState, useEffect, useRef} from 'react';
import '../index.css';


export default function EmailForm() {
    const timeoutRef = useRef<number>(-1);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string[]>([]);
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
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark'}}>
            <Autocomplete
            style={{width: 350,}}
            value={email}
            data={data}
            onChange={handleChange}
            rightSection={loading ? <Loader size="1rem" /> : null}
            label="Email"
            placeholder="Your email"
            />
        </MantineProvider>
    );
}