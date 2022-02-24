import { useState } from "react";
import { FaEnvelope, FaBirthdayCake, FaSnapchatGhost, FaInstagram } from 'react-icons/fa';
import { TiPhoneOutline } from "react-icons/ti";

const PartnerProfile = () => {
    const [profile, setProfile] = useState({
        name: "Harry Potter",
        phone: "+33 08 04 05 48 92",
        emails: [
            { id: 1, type: "school", value: "harry.potter@griff.hogwards.com" },
            { id: 2, type: "perso", value: "h.potter@gmail.com" }
        ],
        birthday: "26 January 1997",
        instagram: "@harry.priv",
        snapchat: "@harry.priv",
    })

    return (
        <div className="partnerProfile">

            <img src="/Ellipse 4.png" alt="" className="profile-pic" />
            <h2 className="name">
                {profile.name}
            </h2>

            <div className="info">
                <div className="info-item">
                    <TiPhoneOutline className="icon"/>
                    <p>{profile.phone}</p>
                </div>

                {
                    profile.emails.map((email, index) => (

                        <div className="info-item" key={index}>
                            <FaEnvelope className="icon"/>
                            <p key={index}>{email.value}</p>
                        </div>
                    ))
                }

                <div className="info-item">
                    <FaBirthdayCake className="icon"/>
                    <p>{profile.birthday}</p>
                </div>

                <div className="info-item">
                    <FaSnapchatGhost className="icon"/>
                    <p>{profile.snapchat}</p>
                </div>

                <div className="info-item">
                    <FaInstagram className="icon"/>
                    <p>{profile.instagram}</p>
                </div>

                <div className="info-item">
                    <p>Grade</p>
                </div>

                <div className="info-item">
                    <p>Notes</p>
                    <p></p>
                </div>
            </div>

        </div>
    );
}

export default PartnerProfile;