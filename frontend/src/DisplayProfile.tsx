import { Modal, MantineProvider, Button} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

type UserProfile =
{
    name : string;
    email : string;
    school : string;
    major : string;
    phone : string;
    favStudySpot : string;
}

const DisplayProfile : React.FunctionComponent<UserProfile> = (props) => {
    const {name, email, school, major, phone, favStudySpot} = props;

    return (
        <MantineProvider>
            <p><b>Name: </b></p>
            <p>{name}</p>
            <br/>
            <p><b>Email:</b></p>
            <p>{email}</p>
            <br/>
            <p><b>School: </b></p>
            <p>{school}</p>
            <br/>
            <p><b>Major:</b></p>
            <p>{major}</p>
            <br/>
            <p><b>Phone number: </b></p>
            <p>{phone}</p>
            <br/>
            <p><b>Favorite study spot:</b></p>
            <p>{favStudySpot}</p>
            <br/>
            <div>
            <Button
                style={{width: "fit-content",}}
                    className='bg-purple-500 hover:bg-purple-700 margin mr-5'
                    variant='filled'
                    color="violet"
                    title='Sign Out'
                    >
                    Edit Profile
                </Button>
                <Button
                    style={{width: "fit-content",}}
                    className='bg-gray-400 hover:bg-gray-500'
                    variant='filled'
                    color="violet"
                    title='Edit Profile'
                    >
                    Sign Out
                </Button>
            </div>
        </MantineProvider>
    );
}

export default DisplayProfile;