import Icon from "../global/Icon";

const HookDetails = (props) => {
    const hook = {
        createdAt: "22 Octobre 2021",
        partner: "Draco Malfoy",
        updatedAt: "12 Janvier 2022",
        hookType: "Date",
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

    return (
        <div className="hookDetails">
            <div className="title">
                <h1 className="date">{hook.date}</h1>
                <div className="icones">
                    <Icon type="apple" />
                    <Icon type="edit" />
                    <Icon type="archive" />
                </div>
            </div>

            <div className="info">
                <div className="info-item">
                    <p>at</p>
                    <p><b>{hook.time}</b></p>
                </div>
                <h3 className="hookType">{hook.hookType}</h3>

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
                    {/* <p>{hook.protectionType}</p> */}
                    <Icon type="condom" />
                    <Icon type="nocondom" />
                    <Icon type="pill" />
                </div>
                <div className="info-item">
                    <Icon type="mood" />
                    <p>{hook.mood}</p>
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
                    <p>{hook.duration}</p>
                </div>
                <div className="info-item">
                    <p>Notes</p>
                    <p>{hook.notes}</p>
                </div>
            </div>
        </div>
    );
}

export default HookDetails;