const PersonName = (props) => {
    const person = {
        displayName: "Draco Malfoy",
        picture: "/Ellipse 4.png",
    };

    return (
        <div className="personName">
            <img src={person.picture} alt="" className="profilePic" />
            <p className="name">{person.displayName}</p>
        </div>
    );
}

export default PersonName;