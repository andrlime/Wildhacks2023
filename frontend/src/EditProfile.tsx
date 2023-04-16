import {useState} from 'react'

import {UserProfile} from './UserProfile'
import { Modal, MantineProvider, Button} from '@mantine/core';
import './Profile.css'

type EditProfileProps =
{
    userProfile : UserProfile;
    (user : UserProfile) : void;
}

const EditProfile : React.FunctionComponent<EditProfileProps> = (props) => {
    const [userProfile, setUserProfile] = useState(props.userProfile);
    const saveClicked = props.arguments[1];

    const changeName = (newName : string) => {
        setUserProfile(new UserProfile(newName, userProfile.email, userProfile.school, userProfile.major, userProfile.phone, userProfile.favStudySpot));
    }

    return (
        <MantineProvider>
            <p><b>Name: </b></p>
            <input type="text" className="longtextbox" value={userProfile.name} onChange={() => changeName(value)}/>
            <br/>
            <br/>
            <p><b>Email:</b></p>
            <input type="text" className="longtextbox" value={userProfile.email}></input>
            <br/><br/>
            <p><b>School: </b></p>
            <input type="text" className="longtextbox" value={userProfile.school}></input>
            <br/><br/>
            <p><b>Major:</b></p>
            <input type="text" className="longtextbox" value={userProfile.major}></input>
            <br/><br/>
            <p><b>Phone number: </b></p>
            <input type="text" className="longtextbox" value={userProfile.major}></input>
            <br/><br/>
            <p><b>Favorite study spot:</b></p>
            <input type="text" className="longtextbox" value={userProfile.favStudySpot}></input>
            <br/><br/>
            <Button
                    style={{width: "fit-content",}}
                        className='bg-purple-500 hover:bg-purple-700 margin mr-5'
                        variant='filled'
                        color="violet"
                        title='SaveButton'
                        onClick={(e) => {
                            saveClicked()
                        }}
                        >
                        Save
                    </Button>
        </MantineProvider>
    );
}

export default EditProfile;