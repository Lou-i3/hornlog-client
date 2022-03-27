import Icon from "../../global/Icon"

import { gql, useQuery, useMutation } from '@apollo/client';
import { Fragment, useEffect, useState } from "react";

const MY_GENDERS_QUERY = gql`
    query MY_GENDERS_QUERY {
        myGenders {
            id
            label
            hasPeople
        }
    }
`;

const APP_GENDERS_QUERY = gql`
    query APP_GENDERS_QUERY {
        appGenders {
            id
            label
            hasPeople
        }
    }
`;

const NewAppGenderMutation = gql`
    mutation NewGenderMutation($data: GenderInput!) {
        addAppGender(data: $data) {
            id
            label
        }
    }
    `;

const NewUserGenderMutation = gql`
    mutation NewGenderMutation($data: GenderInput!) {
        addUserGender(data: $data) {
            id
            label
        }
    }
    `;

const EditGenderMutation = gql`
    mutation EditGenderMutation($id: Int!, $data: GenderInput!) {
        editGender(id: $id, data: $data) {
            id
            label
        }
    }
    `;

const DeleteGenderMutation = gql`
    mutation DeleteGenderMutation($id: Int!) {
        deleteGender(id: $id) {
            id
        }
    }
    `;

const GendersEdit = (props) => {
    const QUERY = props.type === "app" ? APP_GENDERS_QUERY : MY_GENDERS_QUERY;
    const MUTATION = props.type === "app" ? NewAppGenderMutation : NewUserGenderMutation;

    const { loading, error, data } = useQuery(QUERY);
    const [mutateFctNewGender, { dataNewGender, loadingNewGender, errorNewGender }] = useMutation(MUTATION, { refetchQueries: [{ query: QUERY }] });
    const [mutateFctEditGender, { dataEditGender, loadingEditGender, errorEditGender }] = useMutation(EditGenderMutation, { refetchQueries: [{ query: QUERY }] });
    const [mutateFctDeleteGender, { dataDeleteGender, loadingDeleteGender, errorDeleteGender }] = useMutation(DeleteGenderMutation, { refetchQueries: [{ query: QUERY }] });

    const [displayMode, setDisplayMode] = useState("view");
    const [readOnly, setReadOnly] = useState(true);
    const [newData, setNewData] = useState(null);

    const handleClickEdit = () => {
        setDisplayMode("edit");
        console.log((props.type === "app" ? data.appGenders : data.myGenders).length === 0);
    }

    const handleClickSave = () => {
        setDisplayMode("view");

        // Save New Genders
        document.querySelectorAll(`input.newGender.${props.type}`).forEach(input => {
            // console.log(input.value);
            mutateFctNewGender({
                variables: {
                    data: {
                        label: input.value
                    }
                }
            }).then(res => {
                console.log(res);

            })
        });

        // Save modifed genders 
        const oldData = props.type === "app" ? data.appGenders : data.myGenders;

        document.querySelectorAll(`input.existingGender.${props.type}`).forEach(input => {
            // console.log("input: ", input.value);
            // console.log("input: ", input.getAttribute("genderid"));
            let currentOld = oldData.find(
                old => old.id === input.getAttribute("genderid")
            );
            // console.log("oldData: ", currentOld);
            input.value === currentOld.label ?
                console.log("same") :
                mutateFctEditGender({
                    variables: {
                        id: parseInt(input.getAttribute("genderid")),
                        data: {

                            label: input.value
                        }
                    }
                }).then(res => {
                    console.log(res);

                });

        })


        setNewData(null);

    }

    const handleClickDelete = (id) => {

        console.log("deleting, ", id);
        mutateFctDeleteGender({
            variables: {
                id: parseInt(id)
            }
        }).then(res => {
            console.log(res);
        });
    }

    const handleClickNew = () => {
        setNewData(
            newData === null ?
                [{ label: "" }] :
                [...newData, { label: "" }]
        );
    }

    useEffect(() => {
        displayMode === "edit" ? setReadOnly(false) : setReadOnly(true);

    }, [displayMode]);

    console.log("GendersEdit Rendering")
    return (
        <div className="settingsBlock">
            <div className="settingsBlockHeader">
                <div className="title">
                    <Icon type="genders" />

                    <p>Genders</p>

                </div>
                {
                    displayMode === "view" ?
                        <div className="iconAction"><Icon type="edit" onClick={() => handleClickEdit()} /></div> :
                        <div className="iconAction"><Icon type="save" onClick={() => handleClickSave()} /></div>

                }

            </div>

            <div className="settingsBlockContent">


                <div className="genderList">
                    {
                        loading ?
                            <p>Loading...</p> :
                            error ?
                                <p>Error: {error.message}</p> :
                                <Fragment>
                                    {
                                        (props.type === "app" ?
                                            data.appGenders :
                                            data.myGenders).map(gender => (
                                                <Fragment key={gender.id}>
                                                    {console.log("testounet, ",gender)}
                                                    <div className="itemContainer">
                                                        <input type="text" className={`gender existingGender ${props.type}`} key={gender.id} genderid={gender.id} defaultValue={gender.label} disabled={readOnly} />
                                                        {displayMode === "edit" && !gender.hasPeople ? <Icon type="bin" onClick={() => handleClickDelete(gender.id)} /> : null}

                                                    </div>


                                                    <div className="separator"></div>
                                                </Fragment>
                                            ))
                                    }
                                    {
                                        displayMode === "view" && ((props.type === "app" ? data.appGenders : data.myGenders).length === 0) ?
                                            <p>Nothing here...</p> :
                                            null
                                    }
                                </Fragment>

                    }
                    {
                        newData ?
                            newData.map((gender, index) => (
                                <Fragment key={"new" + index}>
                                    <div className="itemContainer">
                                        <input type="text" className={`gender newGender ${props.type}`} key={"new" + index}></input>
                                    </div>
                                    <div className="separator"></div>
                                </Fragment>
                            ))
                            :
                            null
                    }
                </div>

                {
                    displayMode === "edit" ?

                        <div className="newGender" onClick={() => handleClickNew()}>
                            <p>New</p>
                            <Icon type="plus" />
                        </div> :
                        null
                }



            </div>

        </div>
    );
}

export default GendersEdit;