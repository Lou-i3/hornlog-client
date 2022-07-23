
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
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [localSearchTerms, setLocalSearchTerms] = useState("");
    const { selectedPartner, setSelectedPartner, setTotalPartners, filters, setDisplayMode, searchTerms } = props;


    // console.log("myPartners");
    // console.log(data);

    const handleClick = (partner) => {
        setSelectedPartner(partner);
        setDisplayMode("view");
        console.log("handleClick", partner);
    }

    useEffect(() => {
        console.log("useEffect myPartners");
        // const { loading, error, data } = useQuery(MY_HOOKS_QUERY);
        setLoading((data && data.myPartners) ? false : true);

        console.log("data: ", data);
        console.log("selectedPartner: ", selectedPartner);
        if (data && selectedPartner) {
            const selectedPartnerIndex = data.myPartners.findIndex(x => x.id === selectedPartner.id);
            console.log("bwe: ", data.myPartners[0].id);
            console.log("selectedPartnerIndex", selectedPartnerIndex);
            if (selectedPartnerIndex || selectedPartnerIndex === 0) {
                console.log("selectedPartner in data.myPartners");
                setSelectedPartner(data.myPartners[selectedPartnerIndex]);
            }
        }

        if (data && data.myPartners) {
            getData(filters.sortColumn, filters.sortType);
        }
        // setTotalPartners(tableData ? tableData.length : 0);
    }, [selectedPartner, data, loadingQuery]);

    useEffect(() => {
        console.log("searchTerms: ", searchTerms);
        if (searchTerms !== localSearchTerms) {
            getData(filters.sortColumn, filters.sortType);
            setLocalSearchTerms(searchTerms);
        }
    }, [searchTerms]);

    useEffect(() => {
        getData(filters.sortColumn, filters.sortType);
    }, [filters]);

    const getHooksInfo = (hooks, firstLast, dateType) => {
        let infoOut = "";

        if (hooks && hooks.length > 0) {
            let localHooks = hooks;
            // let theHook;
            // console.log("localHooks: ", localHooks);

            let theHook = localHooks[0];
            localHooks.forEach(hook => {
                let hookDate = (new Date(hook.dateTime)).getTime();
                let theHookDate = (new Date(theHook.dateTime)).getTime();
                if (firstLast === "first") {
                    if (hookDate < theHookDate) {
                        theHook = hook;
                    }
                } else if (firstLast === "last") {
                    if (hookDate > theHookDate) {
                        theHook = hook;
                    }
                }
            });

            // console.log("theHook: ", theHook);

            infoOut = dateType === "date" ? theHook.dateTime : theHook.hookType;

        } else {
            infoOut = dateType === "date" ? "" : "Never";
        }

        return infoOut;
    }

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
                    lastHook: getHooksInfo(partner.hooks, "last", "date"),
                    lastHookType: getHooksInfo(partner.hooks, "last", "type"),
                    firstHook: getHooksInfo(partner.hooks, "first", "date"),
                    firstHookType: getHooksInfo(partner.hooks, "first", "type"),
                });
            });
            console.log("JAZODJAOJDOAZ tableDataLocal: ", tableDataLocal);
            console.log("sortColumn", sortColumnLocal);
            console.log("sortType", sortTypeLocal);
            if (sortColumnLocal && sortTypeLocal) {
                // console.log("sortColumn", sortColumnLocal);
                // console.log("sortType", sortType);
                // console.log("tableDataLocal", tableDataLocal);

                // const sortedData = [...tableDataLocal];


                let lastValueDate = sortTypeLocal === "most recent" ? 0 : new Date("01/01/3000").getTime();
                tableDataLocal = tableDataLocal.sort((a, b) => {
                    let x = a[sortColumnLocal];
                    let y = b[sortColumnLocal];

                    if (sortColumnLocal === 'firstHook' || sortColumnLocal === 'lastHook') {
                        x = (new Date(x)).getTime() || lastValueDate;
                        y = (new Date(y)).getTime() || lastValueDate;
                        // console.log("x: ", x);
                        // console.log("y: ", y);
                    }

                    let reverse = false;
                    if (typeof x === 'string' && typeof y === 'string') {
                        reverse = true;
                    }
                    // console.log("reverse: ", reverse);

                    if (typeof x === 'string') {
                        x = x.charCodeAt();
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt();
                    }

                    if (sortTypeLocal === 'most recent') {
                        // console.log("y - x: ", x - y);
                        return reverse ? x - y : y - x;
                    } else {
                        // console.log("x - y: ", x - y);
                        return reverse ? y - x : x - y;
                    }
                });
                // tableDataLocal = output;
                // console.log("output", output);
                // setTableData(output);
                // console.log("sorted Data: ", tableDataLocal);
            }
            if (searchTerms !== "") {
                let filteredData = [...tableDataLocal];

                filteredData = tableDataLocal.filter(x => {
                    // console.log("search: ", searchTerms);
                    // console.log("x.name: ", x.name);
                    // console.log("includes: ", x.name.toLowerCase().includes(searchTerms.toLowerCase()));
                    let output = false;
                    if (x.name.toLowerCase().includes(searchTerms.toLowerCase())) {
                        output = true;
                    } else if (x.lastHook.toLowerCase().includes(searchTerms.toLowerCase())) {
                        output = true;
                    }
                    return output;
                });
                // console.log("filteredData", filteredData);
                tableDataLocal = filteredData;
                // return filteredData;
            }
            setTableData(tableDataLocal);
            
            
            setLoading(false);
            
        }
        setTotalPartners(tableDataLocal ? tableDataLocal.length : 0);
        setTableData(tableDataLocal);
    };

    // const handleSortColumn = (sortColumn, sortType) => {
    //     console.log("handlesortColumn");
    //     console.log("sortColumn", sortColumn);
    //     console.log("sortType", sortType);

    //     setSortColumn(sortColumn);
    //     setSortType(sortType);
    //     setLoading(true);
    //     getData(sortColumn, sortType);
    //     setTimeout(() => {
    //         setLoading(false);
    //         setSortColumn(sortColumn);
    //         setSortType(sortType);
    //     }, 500);
    // };

    return (
        <div className="myPartners cardsList">
            {/* {loadingQuery ?
                <p>Loading...</p> : */
                error ?
                    console.log(error) &&
                    <p>Error: {error.message}</p> :
                    <Fragment>
                        {/* <div onClick={() => {getHooksInfo()}}>Coucou</div> */}
                        {
                            loading ?
                                <div className="loading">Loading</div>
                                :
                                <div className="partnersWrapper cardsWrapper">
                                    {tableData && tableData.map((partner, index) => {
                                        let rowClass = partner && selectedPartner && partner["id"] === selectedPartner.id ? "selected" : "";
                                        let rowHookDate = filters.hookDate === "last" ?
                                            enumLabel(partner.lastHook) :
                                            enumLabel(partner.firstHook);
                                        let rowHookType = filters.hookDate === "last" ?
                                            enumLabel(partner.lastHookType) :
                                            enumLabel(partner.firstHookType);
                                        // console.log("rowHookDate: ", rowHookDate);
                                        return (
                                            <div
                                                className={`partnerContainer card ${rowClass}`}
                                                onClick={() => {
                                                    console.log({ partner });
                                                    // const hook = data;
                                                    handleClick(partner)
                                                }}
                                                key={index}
                                            >

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
                                                        <p>{rowHookDate && formatDateTime(rowHookDate, "date")}</p>

                                                        {
                                                            // rowHookType !== "Never" &&
                                                            <Pill
                                                                text={rowHookType}
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