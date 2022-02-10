import { useState } from "react";
import { FaEnvelope, FaBirthdayCake, FaSnapchatGhost, FaInstagram } from 'react-icons/fa';
import { TiPhoneOutline } from "react-icons/ti";



const PartnerProfile = () => {
    const [profile, setProfile] = useState({
        name: "Nazli",
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
            <h1 className="name">
                {profile.name}
            </h1>

            <div className="info">
                <div className="info-item">
                    <TiPhoneOutline className="icon"/>
                    <h2>{profile.phone}</h2>
                </div>

                {
                    profile.emails.map((email, index) => (

                        <div className="info-item">
                            <FaEnvelope className="icon"/>
                            <h2 key={index}>{email.value}</h2>
                        </div>
                    ))
                }

                <div className="info-item">
                    <FaBirthdayCake className="icon"/>
                    <h2>{profile.birthday}</h2>
                </div>

                <div className="info-item">
                    <FaSnapchatGhost className="icon"/>
                    <h2>{profile.snapchat}</h2>
                </div>

                <div className="info-item">
                    <FaInstagram className="icon"/>
                    <h2>{profile.instagram}</h2>
                </div>

                <div className="info-item">
                    <h2>Grade</h2>
                </div>

                <div className="info-item">
                    <h2>Notes</h2>
                    <p></p>
                </div>
            </div>

        </div>
    );
}

export default PartnerProfile;