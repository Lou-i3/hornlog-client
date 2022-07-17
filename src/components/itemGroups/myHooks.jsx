
import { useQuery } from '@apollo/client';
import { Fragment, useEffect, useState } from 'react';
// import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import { enumLabel, formatDateTime } from '../../helpers/helpers';
import { MY_HOOKS_QUERY } from '../../helpers/queries';

import Pill from '../items/Pill';
import PictureAndName from '../items/profile/PictureAndName';

const MyHooks = (props) => {
    const { setTotalHooks } = props;
    // eslint-disable-next-line
    const { loading: loadingQuery, error, data } = useQuery(MY_HOOKS_QUERY);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [localSearchTerms, setLocalSearchTerms] = useState("");
    const { filters, selectedHook, setSelectedHook, searchTerms } = props;

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const handleClick = (hook) => {
        // setSelectedHook(hook);
        // if (hook.id in data.myHooks) { 
        console.log("selectedHook in data.myHooks");
        setSelectedHook(data.myHooks.filter((hookItem) => hookItem.id === hook.id)[0]);
        // }

        console.log("handleClick, selectedHook: ", selectedHook);
    }

    useEffect(() => {
        console.log("useEffect myHooks");
        // const { loading, error, data } = useQuery(MY_HOOKS_QUERY);

        // console.log(data);
        if (data && selectedHook) {
            //     if (selectedHook.id in data.myHooks) { 
            //         console.log("selectedHook in data.myHooks"); 
            //         setSelectedHook(data.myHooks.filter((value, index, self) => self.id === selectedHook.id)[0]);
            //     }
        }
        if (data && data.myHooks) {
            getData(filters.sortColumn, filters.sortType);
        }
        setTotalHooks(data ? data.myHooks.length : 0);
        // eslint-disable-next-line
    }, [selectedHook, data]);

    // Use effet for Search 
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

    const getData = (sortColumnLocal, sortTypeLocal) => {
        console.log("getData");
        setLoading(true);
        let tableDataLocal = [];

        if (data && data.myHooks) {
            tableDataLocal = [];

            console.log("found Data");
            console.log(data.myHooks);
            data.myHooks.forEach(hook => {
                tableDataLocal.push({
                    id: hook.id,
                    date: hook.dateTime,
                    hookType: hook.hookType,
                    partners: hook.partners,
                    sex: hook.sex,
                    penetration: hook.penetration,
                    orgasm: hook.orgasm,
                    protection: hook.protection,
                    porn: hook.porn,
                    pill: hook.pill,
                    // name: hook.partners && hook.partners[0] ?
                    //     hook.partners[0].person && hook.partners[0].person.nickName ?
                    //         hook.partners[0].person.nickName
                    //         : hook.partners[0].person.firstName + " " + hook.partners[0].person.lastName
                    //     : "",
                });
            });
            console.log("tableDataLocal", tableDataLocal);
            console.log("sortColumn", sortColumnLocal);
            console.log("sortType", sortTypeLocal);
            if (sortColumnLocal && sortTypeLocal) {

                // const sortedData = [...tableDataLocal];

                tableDataLocal = tableDataLocal.sort((a, b) => {
                    let x = a[sortColumnLocal];
                    let y = b[sortColumnLocal];

                    if (sortColumnLocal === 'date') {
                        x = (new Date(x)).getTime();
                        y = (new Date(y)).getTime();
                    }
                    if (typeof x === 'string') {
                        x = x.charCodeAt();
                    }
                    if (typeof y === 'string') {
                        y = y.charCodeAt();
                    }

                    if (sortTypeLocal === 'most recent') {
                        return y - x;
                    } else {
                        return x - y;
                    }
                });
                // tableDataLocal = output;
                console.log("sortedData", tableDataLocal);
                // setTableData(output);
            }
            // Search filter
            if (searchTerms !== "") {
                let filteredData = [...tableDataLocal];

                filteredData = tableDataLocal.filter(x => {
                    // console.log("search: ", searchTerms);
                    // console.log("x.name: ", x.name);
                    // console.log("includes: ", x.name.toLowerCase().includes(searchTerms.toLowerCase()));
                    let output = false;
                    if (x.name.toLowerCase().includes(searchTerms.toLowerCase())) {
                        output = true;
                    } else if (x.date.toLowerCase().includes(searchTerms.toLowerCase())) {
                        output = true;
                    } else if (x.hookType.toLowerCase().includes(searchTerms.toLowerCase())) {
                        output = true;
                    }
                    return output;
                });
                console.log("filteredData", filteredData);
                tableDataLocal = filteredData;
                // return filteredData;
            }
            const filterBools = (field, filterName) => {
                if (filters[filterName] !== null) {
                    let filteredData = [...tableDataLocal];

                    filteredData = tableDataLocal.filter(x => {
                        return x[field] === filters[filterName];
                    });
                    // console.log("filteredData", filteredData);
                    tableDataLocal = filteredData;
                }
            }
            filterBools("protection", "filterProtection");
            filterBools("pill", "filterPill");
            filterBools("sex", "filterSex");
            filterBools("penetration", "filterPenetration");

            setTableData(tableDataLocal);
            setLoading(false);

        }
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
        <div className="myHooks cardsList">
            {
                error ?
                    <p>Error: {error.message}{console.log(error)}</p> :
                    <Fragment>
                        {/* <div onClick={() => setLoading(true)} >Coucou</div> */}
                        {
                            loading ?
                                <div className="loading">Loading</div>
                                :
                                <div className="hooksWrapper cardsWrapper">
                                    {tableData && tableData.map((hook, index) => {
                                        let rowClass = hook && selectedHook && hook["id"] === selectedHook.id ? "selected" : "";

                                        return (
                                            <div
                                                className={`hookContainer card ${rowClass}`}
                                                onClick={() => {
                                                    console.log({ hook });
                                                    // const hook = data;
                                                    handleClick(hook)
                                                }}
                                                key={index}
                                            >

                                                <div className="firstLine line">
                                                    <div className="column partners">
                                                        {
                                                            <PictureAndName
                                                                partners={hook.partners}
                                                            />
                                                        }
                                                    </div>
                                                    <div className="column date">
                                                        {formatDateTime(hook.date, 'date')}
                                                    </div>
                                                </div>
                                                <div className="secondLine line">
                                                    <div className="column type">
                                                        <Pill
                                                            text={enumLabel(hook.hookType)}
                                                            selected
                                                        />
                                                    </div>
                                                    <div className="column icons">
                                                        {
                                                            (hook.sex !== null
                                                                || hook.penetration !== null
                                                                || hook.orgasm !== null
                                                                || hook.protection !== null
                                                                || hook.pill !== null)
                                                                ?
                                                                <>
                                                                    <Pill
                                                                        type="sex"
                                                                        icon="iconOnly"
                                                                        values={hook}
                                                                    />
                                                                    <Pill
                                                                        type="penetration"
                                                                        icon="iconOnly"
                                                                        values={hook}
                                                                    />
                                                                    <Pill
                                                                        type="orgasm"
                                                                        icon="iconOnly"
                                                                        values={hook}
                                                                    />
                                                                    <Pill
                                                                        type="protection"
                                                                        icon="iconOnly"
                                                                        values={hook}
                                                                    />
                                                                    <Pill
                                                                        type="pill"
                                                                        icon="iconOnly"
                                                                        values={hook}
                                                                    />
                                                                </>
                                                                :
                                                                <h4>That's all</h4>
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
        </div>
    );
}

export default MyHooks;