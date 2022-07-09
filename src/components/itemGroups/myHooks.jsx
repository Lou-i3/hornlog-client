
import { useQuery } from '@apollo/client';
import { Fragment, useEffect, useState } from 'react';
import { Cell, Column, HeaderCell, Table } from 'rsuite-table';
import { enumLabel, formatDateTime } from '../../helpers/helpers';
import { MY_HOOKS_QUERY } from '../../helpers/queries';

import ChoicePill from '../items/ChoicePill';
import PictureAndName from '../items/profile/PictureAndName';

const MyHooks = (props) => {
    // eslint-disable-next-line
    const { loading: loadingQuery, error, data } = useQuery(MY_HOOKS_QUERY);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWindowWidth(window.innerWidth);
        });
    }, []);

    const handleClick = (hook) => {
        // props.setSelectedHook(hook);
        // if (hook.id in data.myHooks) { 
        console.log("selectedHook in data.myHooks");
        props.setSelectedHook(data.myHooks.filter((hookItem) => hookItem.id === hook.id)[0]);
        // }

        console.log("handleClick, selectedHook: ", props.selectedHook);
    }

    useEffect(() => {
        console.log("useEffect myHooks");
        // const { loading, error, data } = useQuery(MY_HOOKS_QUERY);

        // console.log(data);
        if (data && props.selectedHook) {
            //     if (props.selectedHook.id in data.myHooks) { 
            //         console.log("selectedHook in data.myHooks"); 
            //         props.setSelectedHook(data.myHooks.filter((value, index, self) => self.id === props.selectedHook.id)[0]);
            //     }
        }
        getData();
        // eslint-disable-next-line
    }, [props.selectedHook, data]);

    // Use effet for Search 
    useEffect(() => {
        console.log("searchTerms: ", props.searchTerms);
        getData();
        // eslint-disable-next-line
    }, [props.searchTerms]);


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
                    name: hook.partners && hook.partners[0] ?
                        hook.partners[0].person && hook.partners[0].person.nickName ?
                            hook.partners[0].person.nickName
                            : hook.partners[0].person.firstName + " " + hook.partners[0].person.lastName
                        : "",
                });
            });
            console.log("tableDataLocal", tableDataLocal);
            console.log("sortColumn", sortColumnLocal);
            console.log("sortType", sortTypeLocal);
            if (sortColumnLocal && sortTypeLocal) {
                console.log("sortColumn", sortColumnLocal);
                console.log("sortType", sortType);

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

                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                });
                // tableDataLocal = output;
                // console.log("output", output);
                // setTableData(output);
            } else {
                tableDataLocal = tableDataLocal.sort((a, b) => {
                    let x = a["date"];
                    let y = b["date"];


                    x = (new Date(x)).getTime();
                    y = (new Date(y)).getTime();

                    if (sortType === 'asc') {
                        return x - y;
                    } else {
                        return y - x;
                    }
                });
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
                    } else if (x.date.toLowerCase().includes(props.searchTerms.toLowerCase())) {
                        output = true;
                    } else if (x.hookType.toLowerCase().includes(props.searchTerms.toLowerCase())) {
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

    return (
        <div className="myHooks">
            {/* {fireToken && <pstyle="">FireToken: {fireToken}</p>} */}
            {/* {loadingQuery ?
                <p>Loading...</p> : */
                error ?
                    <p>Error: {error.message}{console.log(error)}</p> :
                    <Fragment>
                        {/* <div onClick={() => setLoading(true)} >Coucou</div> */}
                        <Table
                            data={tableData}
                            sortColumn={sortColumn}
                            sortType={sortType}
                            id="table"
                            bordered={false}
                            onSortColumn={handleSortColumn}
                            loading={loading}
                            rowClassName={(rowData) => (rowData && props.selectedHook && rowData["id"] === props.selectedHook.id ? "selected" : "")}
                            onRowClick={data => {
                                console.log(data);
                                const hook = data;
                                handleClick(hook)
                            }}
                            rowHeight={55}
                        >


                            <Column
                                flexGrow={1}
                                sortable
                                align='center'>
                                <HeaderCell >
                                    Date
                                </HeaderCell>
                                <Cell dataKey="date" color='white'>
                                    {
                                        rowdata => <p>{formatDateTime(rowdata.date, 'date')}</p>

                                    }
                                </Cell>
                            </Column>
                            <Column
                                // resizable
                                // width={80}
                                flexGrow={1}
                                sortable
                                align='center'>
                                <HeaderCell >
                                    Who
                                </HeaderCell>
                                <Cell dataKey="partners" color='white'>
                                    {
                                        rowdata =>
                                            rowdata.partners.map((partner, index) =>
                                                <PictureAndName
                                                    key={index}
                                                    partner={partner}
                                                    onlyPic={rowdata.partners.length > 1 || windowWidth < 767}
                                                />
                                            )

                                    }
                                </Cell>
                            </Column>
                            <Column
                                flexGrow={1}
                                // sortable
                                align='center'
                            >
                                <HeaderCell>
                                    Type
                                </HeaderCell>
                                <Cell dataKey='hookType'>{
                                    rowData =>
                                        <ChoicePill
                                            text={enumLabel(rowData.hookType)}
                                        />
                                }
                                </Cell>
                            </Column>


                        </Table>
                    </Fragment>

            }
        </div>
    );
}

export default MyHooks;