import { Fragment } from "react";

const PictureAndName = (props) => {
    const { profilePic, name, partner, onlyPic, onClick, selected } = props;

    let displayedName = "";
    let displayedPic = "";
    let showName = onlyPic === true ? false : true;
    let selectedClass = selected ? "selected" : "";

    if (partner && partner.person) {
        displayedName = partner.person.nickName ?
            partner.person.nickName :
            partner.person.firstName + " " + partner.person.lastName;

        displayedPic = partner.person.picture ? partner.person.picture : "";
    }

    if (name) {
        displayedName = name;
    }
    if (profilePic) {
        displayedPic = profilePic;
    }

    return (
        <div className={`picAndName ${selectedClass}`} onClick={onClick}>
            {displayedPic !== '' ?
                <img src={displayedPic} /> :
                <Fragment>
                    <p className="noPic">
                        {
                            displayedName.split(" ").map((word, index) => {
                                return (
                                    <Fragment key={index}>
                                        {word.charAt(0)}
                                    </Fragment>
                                )
                            })
                        }
                    </p>
                </Fragment>
            }
            {showName && <p>{displayedName}</p>}
        </div>
    );
}

export default PictureAndName;