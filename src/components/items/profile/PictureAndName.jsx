import { Fragment } from "react";

const PictureAndName = (props) => {
    // const { profilePic, name, partner, onlyPic, onClick, selected } = props;
    const { partner, partners, showPic = true, showName = true, showFullName = false, selected, onClick } = props;

    let inputData = [];
    if (partner) {
        inputData = [partner];
    }
    else if (partners) {
        inputData = partners;
    }

    let data = [];
    inputData.forEach((item, index) => {
        if (item.person) {
            let person = item.person;
            let itemData = {
                key: index,
                profilePic: person.picture ? person.picture : "",
                name: person.nickName ? person.nickName : person.firstName,
                fullName: person.firstName ? person.firstName + " " + person.lastName : person.nickName,
            };
            data.push(itemData);
        }
    });

    let selectedClass = selected ? "selected" : "";

    // console.log("partner", partner);
    // console.log("data", data);

    let buildPic = (item) => (
        <>
            {
                showPic &&
                    item.profilePic !== '' ?
                    <img src={item.profilePic} key={item.key} /> :
                    <Fragment>
                        <p className="noPic" key={item.key}>
                            {
                                item.fullName.split(" ").map((word, index) => {
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
        </>
    );



    return (
        <div className={`picAndName ${selectedClass}`} onClick={onClick}>
            {
                data.length > 0 &&
                    data.length === 1 ?
                    // Only one partner
                    <>
                        {
                            buildPic(data[0])
                        }
                        {
                            (showName || showFullName) &&
                            <div className="namesWrapper">
                                {
                                    showName &&
                                    <h3>{data[0].name}</h3>
                                }
                                {
                                    showFullName &&
                                    <h4>{data[0].fullName}</h4>
                                }
                            </div>
                        }
                    </>
                    :
                    // Multiple partners
                    <>
                        <div className="picsWrapper">
                            {
                                showPic &&
                                data.map((item, index) => (
                                    <Fragment key={index}>
                                        {
                                            buildPic(item)
                                        }
                                    </Fragment>
                                ))
                            }
                        </div>
                        <div className="namesWrapper">
                            <h3>
                            {
                                showName &&
                                data.map((item, index) => (
                                    <Fragment key={index}>
                                    {item.name}
                                    { index < data.length - 2 ? ", " : "" }
                                    { index === data.length - 2 ? " & " : "" }
                                    </Fragment>
                                ))
                            }
                            </h3>
                        </div>
                    </>

            }
        </div >
    );
}

export default PictureAndName;