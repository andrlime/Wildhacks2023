type UserProfile =
{
    name : string;
    email : string;
    school : string;
    major : string;
    phone : string;
    favStudySpot : string;
}

const EditProfile : React.FunctionComponent<UserProfile> = (props) => {
    const {name, email, school, major, phone, favStudySpot} = props;

    return (
        <div>
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
        </div>
    );
}

export default EditProfile;