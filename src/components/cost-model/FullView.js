import React from 'react';
import { useContext } from 'react';
import { useTable } from 'react-table'
import CostModelContext from '../../store/cost-model-context';

function FullView() {

    const costModelCtx = useContext(CostModelContext);
    const { services, totalCost } = costModelCtx;

    const costModelRemoveHandler = id => {
        costModelCtx.removeService(id)
    };

    let data = []
    let removeButton = ""

    // const removeButton = <button>Remove</button>
    for (const key in services) {
        let configDetails = []
        for (const k in services[key]) {
            if (k !== '_id' && k !== 'service' && k != 'price' && k !== 'name' && k !== 'region' && k != 'total cost') {
                console.log(k, services[key][k])
                configDetails.push(k + ": " + services[key][k] + ",\n");
                removeButton = <button onClick={costModelRemoveHandler.bind(null, services[key]._id)}>Remove</button>
            }
        }
        data.push(
            {
                name: services[key].service,
                region: services[key].region,
                price: services[key].price,
                details: configDetails,
                actions: removeButton
            }
        )
    }

    data.push({ total: totalCost.toFixed(2) });

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
            {
                Header: 'Total',
                accessor: 'total',
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

    const noContent = <p style={{ marginTop: '10rem', marginLeft: '30em' }}>No content to display. Add services to your cost model using the config components</p>

    const tableContent = (
        <div style={{ height: '38rem', width: '80rem', marginTop: '2rem', marginLeft: '7.5rem'}}>
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
        </div>
    )

    console.log(data);
    const displayContent = data.length === 0 || totalCost <= 0 ? noContent : tableContent;

    return (
        displayContent
    )
}

export default FullView;