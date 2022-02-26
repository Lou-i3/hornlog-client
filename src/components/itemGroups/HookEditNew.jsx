import { useState } from "react";
import Icon from "../global/Icon";
import ChoicePill from "../items/ChoicePill";
import { gql, useMutation } from '@apollo/client';


// const LoginMutation = gql`
//   mutation LoginQuery($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         id
//         email
//         role
//       }
//     }
//   }
// `;

const NewHookMutation = gql`
    mutation NewHookMutation($data: HookCreateInput!) {
        addHook(data: $data) {
         
            id
        }
    }
    `;


const HookEditNew = (props) => {
    const [mutateFctNewHook, { dataNewHook, loadingNewHook, errorNewHook }] = useMutation(NewHookMutation);
    const [locationTypes, setLocationTypes] = useState([
        {
            id: 1,
            text: "My Place",
            selected: false
        },
        {
            id: 2,
            text: "Their Place",
            selected: false
        },
        {
            id: 3,
            text: "Other",
            selected: false
        }
    ]);
    // console.log(locationTypes);
    const [hookTypes, setHookTypes] = useState([
        {
            id: 1,
            text: "Date",
            enum: "Date",
            selected: false,
        },
        {
            id: 2,
            text: "One Night Stand",
            enum: "one_night_stand",
            selected: false,
        },
        {
            id: 3,
            text: "Sex Friend",
            enum: "sex_friend",
            selected: false,
        },
        {
            id: 4,
            text: "Significant Other",
            enum: "significant_other",
            selected: false,
        },
        {
            id: 5,
            text: "Self Pleasure",
            enum: "self_pleasure",
            selected: false,
        },
        {
            id: 6,
            text: "Friend",
            enum: "Friend",
            selected: false,
        },
        {
            id: 7,
            text: "Sext",
            enum: "Sext",
            selected: false,
        },
    ]);

    const handleSave = () => {
        console.log("save");

        const hookData = {
            hookType: hookTypes.filter(hookType => hookType.selected === true)[0].enum,
            dateTime: "2020-01-01T00:00:00.000Z",
            // locationType: locationTypes.filter(locationType => locationType.selected === true)[0].text.replace(" ", "_"),
            // duration: "40",
            // orgasm: "Yes",
        }
        console.log(hookData);
        mutateFctNewHook({
            variables: {
                data: hookData
            }
        }).then(res => {
            console.log(res);

        })

        props.setSelectedHook(hookData);
        props.setDisplayMode("view");

        // .catch(err => {
        //     console.log("caught error");

        //     console.log(err);
        // });
    };

    let tempArray = [];
    return (
        <div className="hookDetails">
            <div className="title">
                <h2>{props.displayMode} Hook</h2>
                <h1 className="date">Date</h1>
                <div className="icones">
                    <Icon type="save" onClick={() => handleSave()} />
                </div>
            </div>

            {errorNewHook && <p>Error: {errorNewHook.message}</p>}

            <div className="info">
                <div className="infoItem">
                    <p>at</p>
                </div>
                <div className="infoItem hookType">
                    {
                        hookTypes.map(hookType => (
                            <ChoicePill text={hookType.text} selected={hookType.selected} edit={true} onClick={() => {
                                tempArray = [...hookTypes];
                                tempArray.forEach(hookTypeLoop => {
                                    hookTypeLoop.selected = false;
                                    if (hookType.id == hookTypeLoop.id) {
                                        hookTypeLoop.selected = true;
                                    }
                                });
                                setHookTypes(tempArray);
                            }} />
                        ))
                    }
                </div>
                <div className="infoItem">
                    <p>with</p>
                    <p className="partnerItem">
                        <img src="/Ellipse 4.png" alt="" className="profile-pic" />
                        {/* <p>{hook.partner}</p> */}
                    </p>
                </div>
                <div className="infoItem">
                    <Icon type="location" />
                    <input type="address" placeholder="Location" />
                </div>
                <div className="infoItem">
                    {
                        locationTypes.map((locationType, index) => (
                            <ChoicePill text={locationType.text} selected={locationType.selected} edit={true} onClick={() => {
                                tempArray = [...locationTypes];
                                tempArray.forEach(locationTypeLoop => {
                                    locationTypeLoop.selected = false;
                                    if (locationType.text == locationTypeLoop.text) {
                                        locationTypeLoop.selected = true;
                                    }
                                });
                                setLocationTypes(tempArray);
                            }} />
                        ))
                    }
                </div>
                <div className="infoItem">
                    <p>Grade</p>
                    <input type="number" placeholder="Grade" />
                </div>
                <div className="infoItem">
                    <p>Notes</p>
                    <textarea placeholder="Notes" />
                </div>

            </div>


        </div>
    );
}

export default HookEditNew;