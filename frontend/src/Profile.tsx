import {useState} from 'react'
import { UserProfile } from './UserProfile';

import DisplayProfile from './DisplayProfile'
import EditProfile from './EditProfile';

export default function Profile() {
    const [userProfile, setUserProfile] = useState(new UserProfile("Hello", "", "", "", "", ""));
    const [displayingProfile, setDisplayingProfile] = useState(true);

    if(displayingProfile)
    {
        return(
            <DisplayProfile userProfile={userProfile} onClick={() => {setDisplayingProfile(!displayingProfile)}}></DisplayProfile>
        );
    }
    
    return(
        <EditProfile userProfile={userProfile} onClick={() => {setDisplayingProfile(!displayingProfile)}}></EditProfile>
    );
}