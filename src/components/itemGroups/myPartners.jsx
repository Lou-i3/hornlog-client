
import { gql, useQuery } from '@apollo/client';
import { Fragment, useEffect, useState } from 'react';
import { formatDateTime } from '../../helpers';
import Icon from '../global/Icon';
import PersonName from '../items/PersonName';
import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
// import { Column } from 'rsuite/Table/Column';
// import { Column, HeaderCell, Cell } from 'rsuite';
// import firebase from 'firebase/app';

export const MY_PARTNERS_QUERY = gql`
    query MY_PARTNERS_QUERY {
        myPartners {
            id
            person {
                id
                firstName
                lastName
                nickName
                how
                notes
                picture
                gender {
                    id
                    label
                }
                birthday
                nationality
                sexuality
                sexPosition
            }
            hooks {
                id
                dateTime
            }
            
        }
    }
`;

const MyPartners = (props) => {
    const { loadingQuery, error, data } = useQuery(MY_PARTNERS_QUERY);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();
    const [loading, setLoading] = useState(true);

    // console.log("myPartners");
    // console.log(data);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error.message}</p>;

    const handleClick = (partner) => {
        props.setSelectedPartner(partner);
        props.setDisplayMode("view");
        // console.log("handleClick", partner);
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
    }, [props.selectedPartner, data, loadingQuery]);

    const getData = () => {
        // console.log("getData");
        let tableData = [];

        if (data && data.myPartners) {
            data.myPartners.forEach(partner => {
                tableData.push({
                    id: partner.id,
                    name: partner.person.nickName ?
                        partner.person.nickName :
                        partner.person.firstName + " " + partner.person.lastName,
                    lastHook: partner.hooks[0] ?
                        formatDateTime(partner.hooks[0].dateTime, 'date') :
                        "Never",
                });
            });
            if (sortColumn && sortType) {
                // console.log("sortColumn", sortColumn);
                // console.log("sortType", sortType);

                const sortedData = [...tableData];


                const output = sortedData.sort((a, b) => {
                    let x = a[sortColumn];
                    let y = b[sortColumn];

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
                console.log("output", output);
                return output;

            }
            return tableData;
        }
        return tableData;

    };

    const handleSortColumn = (sortColumn, sortType) => {
        console.log("handlesortColumn");
        setSortColumn(sortColumn);
        setSortType(sortType);
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };


    return (
        <div className="myPartners">
            {/* {fireToken && <pstyle="">FireToken: {fireToken}</p>} */}
            {loadingQuery ?
                <p>Loading...</p> :
                error ?
                    console.log(error) &&
                    <p>Error: {error.message}</p> :
                    // <table className="list">
                    <Table
                        // virtualized
                        data={getData()}
                        sortColumn={sortColumn}
                        sortType={sortType}
                        id="table"
                        bordered={false}
                        // width={auto}
                        // height={"100%"}
                        // autoHeight={true}
                        onSortColumn={handleSortColumn}
                        loading={loading}
                        rowClassName={(rowData) => (rowData && props.selectedPartner && rowData["id"] === props.selectedPartner.id ? "selected" : "")}
                        onRowClick={data => {
                            console.log(data);
                            const partner = data;
                            handleClick(partner)
                        }}
                    >


                        <Column 
                        // resizable
                        width={100}
                        flexGrow={1} 
                        sortable
                        align='center'>
                            <HeaderCell >
                                Name
                            </HeaderCell>
                            <Cell dataKey="name" color='white'> 
                                {/* <img src="/Ellipse 4.png" alt="" width="30px" className="profilePic" /> */}
                                {
                                    rowdata => <p>{
                                        rowdata.name
                                    }</p>
                                }
                            </Cell>
                        </Column>
                        <Column 
                        flexGrow={1} 
                        sortable
                        align='center'
                        >
                            <HeaderCell>
                                Last Hook
                            </HeaderCell>
                            <Cell dataKey='lastHook'>{rowData => rowData.lastHook}
                            </Cell>
                        </Column>

                        {/* <tr className={`listItem ${props.selectedPartner && props.selectedPartner.id === partner.id ? "selected" : ""}`} key={partner.id} onClick={() => handleClick(partner)}>

                                        
                                    </tr> */}


                    </Table>

            }
        </div >
    );
}

export default MyPartners;