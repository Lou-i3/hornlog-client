import { formatDateTime } from "../../helpers";
import Icon from "../global/Icon";

const Profile = (props) => {

    return (
        <div className="profile">

            <div className="header">
                <div className="column left">
                    <Icon type="edit" />
                    <div className="personHeader">
                        <img src="/Ellipse 4.png" alt="" className="profilePic" />
                        <h2 className="name">
                            {props.person.firstName + " " + props.person.lastName}
                        </h2>
                        <h3>
                            {props.person.nickName}
                        </h3>
                    </div>

                </div>

                <div className="column right">
                    {
                        props.partner ?
                            <p>Recent hooks</p> :
                            <div className="empty"></div>
                    }
                </div>

            </div>
            <div className="info">
                <div className="column left">
                    <div className="infoGroup phone">
                        <div className="infoItem">
                            <Icon type="phone" />
                            <div className="infoTexts">
                                <h4 className="label">
                                    Phone</h4>
                                    <p className="value">
                            </p>
                            </div>
                            

                        </div>
                    </div>
                    <div className="infoGroup email">
                        <div className="infoItem">
                            <Icon type="email" />
                            <div className="infoTexts">
                                <h4 className="label">
                                    Email</h4>
                                    <p className="value">
                            </p>
                            </div>
                           

                        </div>
                    </div>
                    <div className="infoGroup note">
                        <div className="infoItem">
                            <Icon type="notes" />
                            <div className="infoTexts">
                                <h4 className="label">
                                    Notes</h4>
                                    <p className="value">
                            </p>
                            </div>
                            

                        </div>
                    </div>
                    <div className="infoGroup how">
                        <div className="infoItem">
                            <Icon type="how" />
                            <div className="infoTexts">
                                <h4 className="label">
                                    How</h4>
                                    <p className="value">
                                {
                                    props.person.how
                                }
                            </p>
                            </div>
                            

                        </div>
                    </div>
                </div>
                <div className="column right">
                    <div className="info">
                        <div className="column left">
                            <div className="infoGroup identity">
                                <div className="infoItem birthday">
                                    <Icon type="birthday" />
                                    <div className="infoTexts">
                                        <h4 className="label">
                                            Birthday</h4>
                                            <p className="value">
                                        {formatDateTime(props.person.birthday, 'shortdate')}
                                    </p>
                                    </div>
                                    

                                </div>
                                <div className="infoSeparator" ></div>
                                <div className="infoItem nationality">
                                    <Icon type="nationality" />
                                    <div className="infoTexts">
                                        <h4 className="label">
                                            Nationality</h4>
                                            <p className="value">
                                        {
                                            props.person.nationality
                                        }
                                    </p>
                                    </div>
                                    

                                </div>
                            </div>
                            <div className="infoGroup social">
                                <div className="infoItem">
                                    <Icon type="snapchat" />
                                    <div className="infoTexts">
                                        <h4 className="label">
                                            Snapchat</h4>
                                    </div>
                                    <p className="value">
                                    </p>

                                </div>
                            </div>
                        </div>
                        <div className="column right">
                            <div className="infoGroup sexuality">
                                <div className="infoItem sexuality">
                                    <Icon type="" />
                                    <div className="infoTexts">
                                        <h4 className="label">Sexuality</h4>
                                        <p className="value">{props.person.sexuality}</p>
                                    </div>
                                </div>
                                <div className="infoSeparator" ></div>

                                <div className="infoItem gender">
                                    <Icon type="" />
                                    <div className="infoTexts">
                                        <h4 className="label">Gender</h4>
                                        <p className="value">{props.person.gender.label}</p>
                                    </div>
                                </div>
                                <div className="infoSeparator" ></div>

                                <div className="infoItem position">
                                    <Icon type="" />
                                    <div className="infoTexts">
                                        <h4 className="label">Position</h4>
                                        <p className="value">{props.person.sexPosition}</p>
                                    </div>
                                </div>

                            </div>
                            <div className="infoGroup grade">
                                <div className="infoItem">
                                    <div className="infoTexts">
                                        <h4 className="label">Grade</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="infoGroup location">
                    <div className="infoItem">
                                    <Icon type="" />
                                    <div className="infoTexts">
                                        <h4 className="label">Location</h4>
                                        <p className="value"></p>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>



        </div>
    );
}

export default Profile;