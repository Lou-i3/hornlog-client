import { useQuery } from "@apollo/client";
import { Fragment } from "react";
import { MY_PARTNERS_MINI_QUERY } from "../../../helpers/queries";
import Icon from "../../global/Icon";
import PictureAndName from "../profile/PictureAndName";


const PartnersMiniList = (props) => {
    const { loading, error, data } = useQuery(MY_PARTNERS_MINI_QUERY);
    const { searchTerms, selectedId, handleSelect, handleNew } = props;

    console.log("mini list searchTerms: ", searchTerms);

    const handleClick = (partner) => {
        // console.log("partner clicked, partner: ", partner);
        handleSelect(partner);
    }

    const handleClickNew = () => {
        handleNew();
    }

    return (
        <div className="partnersMiniList">
            {error && <div>Error: {error.message}</div>}
            {loading && <div>Loading...</div>}
            {
                data && data.myPartners &&
                <Fragment>
                    {
                        data.myPartners
                            .filter(partner => {
                                let name = partner.person.nickName ?
                                    partner.person.nickName :
                                    partner.person.firstName + " " + partner.person.lastName;

                                if (searchTerms) {
                                    return name.toLowerCase().includes(searchTerms.toLowerCase());
                                } else {
                                    return true;
                                }
                            })
                            .map(partner => (
                                <PictureAndName
                                    key={partner.id}
                                    partner={partner}
                                    onClick={() => handleClick(partner)}
                                    selected={selectedId === partner.id}
                                />
                            ))
                    }
                    <div className={`picAndName new ${selectedId === "new" ? "selected" : ""}`} onClick={() => handleClickNew()}>
                        New
                        <Icon type="plus" />
                    </div>
                </Fragment>
            }
        </div>
    );
}

export default PartnersMiniList;