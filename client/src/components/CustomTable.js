
import Table from 'react-bootstrap/Table';

export default function CustomTable(tableData) {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Counterparty Name</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {tableData && tableData.length > 0 && tableData.map((data) => {
                    console.log(data)
                    return (
                        <tr>
                            <td>{data.name}</td>
                            <td>{data.amount}</td>
                        </tr>
                    )

                })}
            </tbody>
        </Table>
    );
}