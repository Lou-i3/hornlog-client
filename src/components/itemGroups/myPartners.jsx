
import { useQuery } from '@apollo/client';
import { Fragment, useEffect, useState } from 'react';
import { enumLabel, formatDateTime } from '../../helpers/helpers';
// import Icon from '../global/Icon';
// import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
import { MY_PARTNERS_QUERY } from '../../helpers/queries';
import Pill from '../items/Pill';
import PictureAndName from '../items/profile/PictureAndName';
// import firebase from 'firebase/app';




const MyPartners = (props) => {
    const { loading: loadingQuery, error, data } = useQuery(MY_PARTNERS_QUERY);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { selectedPartner, setTotalPartners } = props;

    // console.log("myPartners");
    // console.log(data);

    const handleClick = (partner) => {
        props.setSelectedPartner(partner);
        props.setDisplayMode("view");
        console.log("handleClick", partner);
    }

    useEffect(() => {
        console.log("useEffect myPartners");
        // const { loading, error, data } = useQuery(MY_HOOKS_QUERY);
        setLoading((data && data.myPartners) ? false : true);

        console.log(data);
        console.log(props.selectedPartner);
        if (data && props.selectedPartner) {
            const selectedPartnerIndex = data.myPartners.findIndex(x => x.id === props.selectedPartner.id);
            console.log("bwe: ", data.myPartners[0].id);
            console.log("selectedPartnerIndex", selectedPartnerIndex);
            if (selectedPartnerIndex || selectedPartnerIndex === 0) {
                console.log("selectedPartner in data.myPartners");
                props.setSelectedPartner(data.myPartners[selectedPartnerIndex]);
            }
        }

        getData();
        setTotalPartners(data ? data.myPartners.length : 0);
    }, [props.selectedPartner, data, loadingQuery, props]);

    useEffect(() => {
        console.log("searchTerms: ", props.searchTerms);
        getData();
    }, [props.searchTerms]);

    const getData = (sortColumnLocal, sortTypeLocal) => {
        console.log("getData");
        setLoading(true);
        let tableDataLocal = [];

        if (data && data.myPartners) {
            console.log("found Data");
            data.myPartners.forEach(partner => {
                tableDataLocal.push({
                    id: partner.id,
                    name: partner.person.nickName ?
                        partner.person.nickName :
                        partner.person.firstName + " " + partner.person.lastName,
                    partner: partner,
                    lastHook: partner.hooks[0] ?
                        formatDateTime(partner.hooks[0].dateTime, 'date') :
                        "Never",
                    lastHookType: partner.hooks[0] ? partner.hooks[0].hookType : "",
                });
            });
            console.log("sortColumn", sortColumnLocal);
            console.log("sortType", sortTypeLocal);
            if (sortColumnLocal && sortTypeLocal) {
                console.log("sortColumn", sortColumnLocal);
                // console.log("sortType", sortType);

                // const sortedData = [...tableDataLocal];

                tableDataLocal = tableDataLocal.sort((a, b) => {
                    let x = a[sortColumnLocal];
                    let y = b[sortColumnLocal];

                    if (typeof x === 'string') {
                        x = x.charCodeAt();
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt();
                    }
                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                });
                // tableDataLocal = output;
                // console.log("output", output);
                // setTableData(output);
            }
            if (props.searchTerms !== "") {
                let filteredData = [...tableDataLocal];

                filteredData = tableDataLocal.filter(x => {
                    // console.log("search: ", props.searchTerms);
                    // console.log("x.name: ", x.name);
                    // console.log("includes: ", x.name.toLowerCase().includes(props.searchTerms.toLowerCase()));
                    let output = false;
                    if (x.name.toLowerCase().includes(props.searchTerms.toLowerCase())) {
                        output = true;
                    } else if (x.lastHook.toLowerCase().includes(props.searchTerms.toLowerCase())) {
                        output = true;
                    }
                    return output;
                });
                console.log("filteredData", filteredData);
                tableDataLocal = filteredData;
                // return filteredData;
            }
            setTableData(tableDataLocal);

            setLoading(false);

        }
        setTableData(tableDataLocal);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        console.log("handlesortColumn");
        console.log("sortColumn", sortColumn);
        console.log("sortType", sortType);

        setSortColumn(sortColumn);
        setSortType(sortType);
        setLoading(true);
        getData(sortColumn, sortType);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const dev = true;
    return (
        <div className="myPartners cardsList">
            {/* {loadingQuery ?
                <p>Loading...</p> : */
                error ?
                    console.log(error) &&
                    <p>Error: {error.message}</p> :
                    <Fragment>
                        {/* <div onClick={() => {console.log(error)}}>Coucou</div> */}
                        {
                            loading ?
                                <div className="loading">Loading</div>
                                :
                                <div className="partnersWrapper cardsWrapper">
                                    {tableData && tableData.map((partner, index) => {
                                        let rowClass = partner && selectedPartner && partner["id"] === selectedPartner.id ? "selected" : "";

                                        return (
                                            <div className={`partnerContainer card ${rowClass}`} onClick={() => {
                                                console.log({ partner });
                                                // const hook = data;
                                                handleClick(partner)
                                            }}>

                                                <div className="firstLine line">
                                                    <div className="column name">
                                                        {
                                                            <PictureAndName
                                                                partner={partner.partner}
                                                                showFullName={true}
                                                            />
                                                        }
                                                    </div>
                                                    <div className="column lastHook">
                                                        <p>{partner.lastHook}</p>

                                                        {
                                                            partner.lastHook !== "Never" &&
                                                            <Pill
                                                                text={enumLabel(partner.lastHookType)}
                                                                selected
                                                            />
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                    }
                                </div>
                        }
                    </Fragment>
            }
        </div >
    );
}

export default MyPartners;