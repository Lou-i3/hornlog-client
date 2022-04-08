const PictureAndName = (props) => {
    const { profilePic, name, partner } = props;

    let displayedName = "";
    let displayedPic = "";

    if (partner && partner.person) {
        displayedName = partner.person.nickName ?
            partner.person.nickName :
            partner.person.firstName + " " + partner.person.lastName;

        displayedPic = partner.person.picture ? partner.person.picture : "/Ellipse 4.png";
    } 
    
    if (name) {
        displayedName = name;
    }
    if (profilePic) {
        displayedPic = profilePic;
    }

    return (
        <div className='picAndName'>
            <img src={displayedPic} />
            <p>{displayedName}</p>
        </div>
    );
}

export default PictureAndName;