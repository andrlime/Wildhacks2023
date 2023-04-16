import './About.css'

export default function About()
{
    return (
        <div>
            <img className="center" src={require("./logo.png")}></img>
            <p>
                Clowder is an app that enables students to browse a live map of campus and see what everyone's up to. 
                This app can be used for students to find other students currently studying for the same upcoming midterm, 
                or maybe to find students to go to the gym together!
            </p>
            <br/>
            <p><b>Technologies we used:</b></p>
            <br/>
            <p>Backend: We used an Elixir websocket to host the website We also used Firebase to authenticate users & store user information.</p>
            <br/>
            <p>Frontend: We created the frontend using React. We also used Mantine for nicer UI components, as well as Leaflet for the interactive map interface. For a wider range of graphics, we borrowed images from the unDraw database.</p>
        </div>
    );
}