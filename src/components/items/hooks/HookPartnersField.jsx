import { Field, FieldArray } from "formik";
import { Fragment, useEffect, useState } from "react";
import Icon from "../../global/Icon";
import PictureAndName from "../profile/PictureAndName";
import PartnersMiniList from "./PartnersMiniList";

const HookPartnersField = (props) => {
    const { values, displayMode, readOnly, setValues } = props;
    const [listForIndex, setListForIndex] = useState(null);
    const [searchTerms, setSearchTerms] = useState("");

    useEffect(() => {
        console.log('searchTerms: ', searchTerms);
    }, [searchTerms]);

    const handleClickNew = (arrayHelpers) => {
        arrayHelpers.push({
            id: null,
            name: "",
            picture: "",
        });
        console.log("new partner added");
    }

    const handleOnChangeName = (event, index) => {
        console.log("name changed");
        console.log("event target value ", event.target.value);
        console.log("index ", index);
        console.log("values ", values);

        let newValues = {
            ...values
        };
        let newPartners = [...values.partners];
        newPartners[index].name = event.target.value;
        newValues.partners = newPartners;
        setValues(newValues);

        setSearchTerms(values.partners[index].name);

        // const newName = event.target.value;
        // const newPartner = { ...values.partners[index], name: newName };
        // const newPartners = [...values.partners];
        // newPartners[index] = newPartner;
        // values.partners = newPartners;
    }

    const handleFocusChange = (event, index, e) => {
        console.log("focus changed");
        if (event === "focus") {
            console.log("focus");
            setSearchTerms(values.partners[index].name);
            console.log('partners at index: ', values.partners[index].name);
            console.log('search terms: ', searchTerms);
            setListForIndex(index);
        } else {
            // setSearchTerms("");

            // console.log('positions', e);
            // setListForIndex(null);
        }
    }

    const handleSelect = (partner, index) => {
        console.log("select");
        console.log("partner ", partner);
        console.log("index ", index);

        let newValues = {
            ...values
        };
        let newPartners = [...values.partners];
        newPartners[index].name = partner.person.nickName ?
            partner.person.nickName :
            partner.person.firstName + " " + partner.person.lastName;
        newPartners[index].id = partner.id;
        newPartners[index].picture = partner.person.picture ? partner.person.picture : "";

        newValues.partners = newPartners;
        setValues(newValues);

        setSearchTerms(values.partners[index].name);
        setListForIndex(null);
    }

    const handleSelectNew = (index) => {
        console.log("coucou");
        let newValues = {
            ...values
        };
        let newPartners = [...values.partners];
        newPartners[index].id = "new";
        newPartners[index].picture = "";

        newValues.partners = newPartners;
        setValues(newValues);

        // setSearchTerms(values.partners[index].name);
        setListForIndex(null);
    }

    return (
        <FieldArray
            name="partners"
            render={arrayHelpers => (
                <Fragment>

                    <div className="hooksPartners">
                        <h3> with</h3>
                        <div className="partnerListWrapper">
                            <div className={`partnerList ${readOnly ? "" : "edit"}`}>

                                {
                                    values.partners.map((item, index) => (
                                        <div className="partnerWrapper" key={index}>
                                            {
                                                displayMode === "view" ?
                                                    <PictureAndName
                                                        name={item.name}
                                                        profilePic={item.picture}
                                                    /> :
                                                    <Fragment>
                                                        <PictureAndName
                                                            name={item.name}
                                                            profilePic={item.picture}
                                                            onlyPic={true}
                                                        />
                                                        <Field
                                                            name={`partners.${index}.name`}
                                                            type="text"
                                                            key={"partners" + (readOnly ? "readonly" : "active") + index}
                                                            className="form-control"
                                                            placeholder="Name"
                                                            disabled={readOnly}
                                                            onChange={(e) => handleOnChangeName(e, index)}
                                                            onFocus={() => handleFocusChange('focus', index)}
                                                            onBlur={(e) => handleFocusChange('focusOut', index, e)}
                                                        />
                                                        <Icon type="bin" onClick={() => arrayHelpers.remove(index)} />

                                                        {
                                                            listForIndex === index && // ICI POUR LE TRUC QUI RESTE (0 -> listForIndex)
                                                            <PartnersMiniList
                                                                searchTerms={searchTerms}
                                                                selectedId={values.partners[index].id}
                                                                handleSelect={(partner) => handleSelect(partner, index)}
                                                                handleNew={() => handleSelectNew(index)}
                                                            />
                                                        }
                                                    </Fragment>
                                            }

                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {
                            displayMode !== "view" &&
                            <Icon type="plus" onClick={() => handleClickNew(arrayHelpers)} />
                        }
                    </div>
                </Fragment>

            )}
        />
    );
}

export default HookPartnersField;