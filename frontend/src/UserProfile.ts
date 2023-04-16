export class UserProfile
{
    name : string;
    email : string;
    school : string;
    major : string;
    phone : string;
    favStudySpot : string;

    constructor(name : string, email : string, school : string, major : string, phone : string, favStudySpot : string)
    {
        this.name = name;
        this.email = email;
        this.school = school;
        this.major = major;
        this.phone = phone;
        this.favStudySpot = favStudySpot;
    }
}