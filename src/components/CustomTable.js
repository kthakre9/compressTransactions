import Table from 'react-bootstrap/Table';

export default function CustomTable() {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Counterparty Name</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Counterparty 1</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>Counterparty 2</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>Counterparty 3</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>Counterparty 4</td>
                    <td>$100</td>
                </tr>
                <tr>
                    <td>Counterparty 5</td>
                    <td>$100</td>
                </tr>
            </tbody>
        </Table>
    );
}