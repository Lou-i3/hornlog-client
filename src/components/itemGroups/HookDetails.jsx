import Icon from "../global/Icon";

const HookDetails = (props) => {
    const hook = {
        createdAt: "22 Octobre 2021",
        partner: "Draco Malfoy",
        updatedAt: "12 Janvier 2022",
        hookType: "One Night Stand",
        date: "22 Octobre 2021",
        time: "10:04 am",
        duration: "40 mins",
        orgasm: "Yes",
        porn: "Yes",
        notes: "Sooooo Gooooood",
        grade: "",
        locationType: "Their Place",
        location: "97 place Stanislas, Nancy, 54000 France",
        protectionType: "Condom",
        addToAppleHealth: "Yes",
        mood: "Good",
        archived: "Yes",
    }
    let iconType;

    if (props.hook) {
        switch (props.hook.protectionType) {
            case "Protected":
                iconType = "condom"
            case "Unprotected":
                iconType = "nocondom"
            case "not_required":
                iconType = "pill"
            default:
                break;
        }
    }

    if(props.hook) return (

        <div className="hookDetails">
            <div className="title">
                <h1 className="date">{props.hook.dateTime}</h1>
                <div className="icones">
                    <Icon type="apple" />
                    <Icon type="edit" />
                    <Icon type="archive" />
                </div>
            </div>

            <div className="info">
                <div className="info-item">
                    <p>at</p>
                    <p><b>{props.hook.dateTime}</b></p>
                </div>
                <h3 className="hookType">{props.hook.hookType}</h3>

                <div className="info-item">
                    <p> with</p>
                    <div className="partner-item">
                        <img src="/Ellipse 4.png" alt="" className="profile-pic" />
                        <p>{hook.partner}</p>
                    </div>
                    <p> at</p>
                    <div className="location">
                        <p>{hook.locationType}</p>
                    </div>
                </div>

                <div className="info-item">
                    <Icon type="location" />
                    <p>{hook.location}</p>
                </div>
                <div className="info-item">
                    <p>Protection Type</p>
                    <Icon type={iconType} />
                </div>
                <div className="info-item">
                    <Icon type="mood" />
                    <p>{props.hook.mood}</p>
                </div>
                <div className="info-item">
                    <p>Grade</p>
                    <div className="icones">
                        <Icon type="star" />
                        <Icon type="star" />
                        <Icon type="star" />
                        <Icon type="star" />
                        <Icon type="star" />
                    </div>
                </div>
                <div className="info-item">
                    <Icon type="duration" />
                    <p>{props.hook.duration}</p>
                </div>
                <div className="info-item">
                    <p>Notes</p>
                    <p>{props.hook.notes}</p>
                </div>
            </div>
        </div>


    );
    else return <p>No Hook Selected</p>;
}

export default HookDetails;