import React from 'react';
import { useContext } from 'react';
import { useTable } from 'react-table'
import CostModelContext from '../../store/cost-model-context';

function FullView() {

    const costModelCtx = useContext(CostModelContext);
    const { name, services, totalCost } = costModelCtx;
    let content = [];

    const costModelRemoveHandler = id => {
        costModelCtx.removeService(id)
    };

    let data = []
    for (const key in services) {
        data.push(
            {
                name: services[key].service,
                region: services[key].region,
                price: services[key].price,
            }
        )
        for (const k in services[key]) {
            if (k !== 'id' && k !== 'service' && k != 'price' && k !== 'name' && k !== 'region') {
                console.log(k, services[key][k])
                data.push({
                    details: [
                        k + ": " +  services[key][k]
                    ]
                })
            }
        }
    }




        // console.log(content);
        // const data = React.useMemo(
        //     () => [

        //         {
        //             name: 'Hello',
        //             col2: 'World',
        //         },
        //         {
        //             col1: 'react-table',
        //             col2: 'rocks',
        //         },
        //         {
        //             col1: 'whatever',
        //             col2: 'you want',
        //         },
        //     ],
        //     []
        // )

        const columns = React.useMemo(
            () => [
                {
                    Header: 'Name',
                    accessor: 'name', // accessor is the "key" in the data
                },
                {
                    Header: 'Region',
                    accessor: 'region',
                },
                {
                    Header: 'Config details',
                    accessor: 'details',
                },
                {
                    Header: 'Price',
                    accessor: 'price',
                },
                {
                    Header: 'Actions',
                    accessor: 'actions',
                },
            ],
            []
        )

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            rows,
            prepareRow,
        } = useTable({ columns, data })

        return (
            <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th
                                    {...column.getHeaderProps()}
                                    style={{
                                        borderBottom: 'solid 3px red',
                                        background: 'aliceblue',
                                        color: 'black',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            style={{
                                                padding: '10px',
                                                border: 'solid 1px gray',
                                                background: 'papayawhip',
                                            }}
                                        >
                                            {cell.render('Cell')}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    export default FullView;