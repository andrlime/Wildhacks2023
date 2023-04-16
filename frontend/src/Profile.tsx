import {useState} from 'react'
import { UserProfile } from './UserProfile';

import DisplayProfile from './DisplayProfile'
import EditProfile from './EditProfile';

interface updateUserFunc 
{
    (newUser : UserProfile) : void;
}

type ProfileProps = {
    user : UserProfile;
    updateUser : updateUserFunc;
}

const Profile : React.FunctionComponent<ProfileProps> = (props) => {
    
    const [userProfile, setUserProfile] = useState(props.user);
    const [displayingProfile, setDisplayingProfile] = useState(true);

    if(displayingProfile)
    {
        return(
            <DisplayProfile userProfile={userProfile} onClick={() => {setDisplayingProfile(!displayingProfile)}}></DisplayProfile>
        );
    }
    
    return(
        <EditProfile userProfile={userProfile} saveProfileFunc={(newUser : UserProfile) => {
            setDisplayingProfile(!displayingProfile)
            setUserProfile(newUser);
            props.updateUser(newUser);
        }}></EditProfile>
    );
}

export default Profile;