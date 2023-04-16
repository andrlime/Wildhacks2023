import { Modal, MantineProvider, Button} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import {UserProfile} from './UserProfile'
import { auth } from './firebase/firebase-config';

type DisplayProfileProps =
{
    userProfile : UserProfile;
    onClick : React.MouseEventHandler<HTMLButtonElement>;
}

const DisplayProfile : React.FunctionComponent<DisplayProfileProps> = (props) => {
    const userProfile = props.userProfile;
    const editProfileFunc = props.onClick;
    const navigate = useNavigate();

    const signOut = () => {
        auth.signOut()
          .then(() => {
            console.log('User signed out!');
          })
          .catch((error) => {
            console.log(error);
          })
        navigate("/LandingPage");
      }

    return (
            <MantineProvider>
                <p><b>Name: </b></p>
                <p>{userProfile.name}</p>
                <br/>
                <p><b>Email:</b></p>
                <p>{userProfile.email}</p>
                <br/>
                <p><b>School: </b></p>
                <p>{userProfile.school}</p>
                <br/>
                <p><b>Major:</b></p>
                <p>{userProfile.major}</p>
                <br/>
                <p><b>Phone number: </b></p>
                <p>{userProfile.phone}</p>
                <br/>
                <p><b>Favorite study spot:</b></p>
                <p>{userProfile.favStudySpot}</p>
                <br/>
                <div>
                <Button
                    style={{width: "fit-content",}}
                        className='bg-purple-500 hover:bg-purple-700 margin mr-5'
                        variant='filled'
                        color="violet"
                        title='Edit Profile'
                        onClick={editProfileFunc}
                        >
                        Edit Profile
                    </Button>
                    <Button
                        style={{width: "fit-content",}}
                        className='bg-gray-400 hover:bg-gray-500'
                        variant='filled'
                        color="violet"
                        title='Sign Out'
                        onClick={signOut}
                        >
                        Sign Out
                    </Button>
                </div>
            </MantineProvider>
        );
};

export default DisplayProfile;

// export default function DisplayProfile({userProfile}){

//     const navigate = useNavigate();

//     return (
//         <MantineProvider>
//             <p><b>Name: </b></p>
//             <p>{userProfile.name}</p>
//             <br/>
//             <p><b>Email:</b></p>
//             <p>{userProfile.email}</p>
//             <br/>
//             <p><b>School: </b></p>
//             <p>{userProfile.school}</p>
//             <br/>
//             <p><b>Major:</b></p>
//             <p>{userProfile.major}</p>
//             <br/>
//             <p><b>Phone number: </b></p>
//             <p>{userProfile.phone}</p>
//             <br/>
//             <p><b>Favorite study spot:</b></p>
//             <p>{userProfile.favStudySpot}</p>
//             <br/>
//             <div>
//             <Button
//                 style={{width: "fit-content",}}
//                     className='bg-purple-500 hover:bg-purple-700 margin mr-5'
//                     variant='filled'
//                     color="violet"
//                     title='Edit Profile'
//                     >
//                     Edit Profile
//                 </Button>
//                 <Button
//                     style={{width: "fit-content",}}
//                     className='bg-gray-400 hover:bg-gray-500'
//                     variant='filled'
//                     color="violet"
//                     title='Sign Out'
//                     onClick={() => navigate("/LandingPage")}
//                     >
//                     Sign Out
//                 </Button>
//             </div>
//         </MantineProvider>
//     );
// }