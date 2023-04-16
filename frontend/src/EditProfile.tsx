import {useState} from 'react'

import {UserProfile} from './UserProfile'
import { MantineProvider, Button} from '@mantine/core';
import './Profile.css'
import { auth } from './firebase/firebase-config';
import { error } from 'console';

interface SaveProfileFunc
{
    (user : UserProfile) : void;
}

type EditProfileProps =
{
    userProfile : UserProfile;
    saveProfileFunc : SaveProfileFunc;
}

const EditProfile : React.FunctionComponent<EditProfileProps> = (props) => {
    const [userProfile, setUserProfile] = useState(props.userProfile);
    const saveClicked = props.saveProfileFunc;

    const [name, setName] = useState(userProfile.name);
    const [email, setEmail] = useState(userProfile.email);
    const [school, setSchool] = useState(userProfile.school);
    const [major, setMajor] = useState(userProfile.major);
    const [phone, setPhone] = useState(userProfile.phone);
    const [favStudySpot, setFavStudySpot] = useState(userProfile.favStudySpot);
    const user = auth.currentUser;

    if (user) {
        console.log(user.email);
    } else {
        console.log("User is not logged in");
    }

    return (
        <MantineProvider>
            <p><b>Name: </b></p>
            <input type="text" className="longtextbox" value={name} onChange={(e) => setName(e.target.value)}/>
            <br/>
            <br/>
            <p><b>Email:</b></p>
            <p>{user?.email}</p>
            <br/><br/>
            <p><b>School: </b></p>
            <input type="text" className="longtextbox" value={school} onChange={(e) => setSchool(e.target.value)}></input>
            <br/><br/>
            <p><b>Major:</b></p>
            <input type="text" className="longtextbox" value={major} onChange={(e) => setMajor(e.target.value)}></input>
            <br/><br/>
            <p><b>Phone number: </b></p>
            <input type="text" className="longtextbox" value={phone} onChange={(e) => setPhone(e.target.value)}></input>
            <br/><br/>
            <p><b>Favorite study spot:</b></p>
            <input type="text" className="longtextbox" value={favStudySpot} onChange={(e) => setFavStudySpot(e.target.value)}></input>
            <br/><br/>
            <Button
                    style={{width: "fit-content",}}
                        className='bg-purple-500 hover:bg-purple-700 margin mr-5'
                        variant='filled'
                        color="violet"
                        title='SaveButton'
                        onClick={(e) => {
                            let newUser = new UserProfile(name, email, school, major, phone, favStudySpot);
                            saveClicked(newUser);
                        }}
                        >
                        Save
                    </Button>
        </MantineProvider>
    );
}

export default EditProfile;