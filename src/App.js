import "./App.css";
import Button from 'react-bootstrap/Button';

import CustomTable from './components/CustomTable';
import jsonData from '../data.json';

function App() {
  const [tableData, setTableData] = useState(jsonData);
  const [showModel, setShowModel] = useState(false);
  const [formData, setFormData] = useState({
    counterParty: "",
    amount: 0
  })

  const handleClose = () => setShowModel(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value
    });
  }

  const addNewTransaction = () => {
    let tempList = [...tableData]
    tempList.push(formData)
    setTableData(tempList)
    setShowModel(false)
  }

  return (
    <div className="App">
      <div className="transaction_list">
        <div className="paying">
          <p>Paying</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Counterparty Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length > 0 && tableData.map((data) => {
                return (
                  <tr>
                    <td>{data.counterParty}</td>
                    <td>{data.amount}</td>
                  </tr>
                )

              })}
            </tbody>
          </Table>
        </div>
        <div className="receiving">
          <p>Receiving</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Counterparty Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.length > 0 && tableData.map((data) => {
                return (
                  <tr>
                    <td>{data.counterParty}</td>
                    <td>{data.amount}</td>
                  </tr>
                )

              })}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="transaction_action">
        <Button variant="primary" onClick={() => setShowModel(true)} >Add new Transaction</Button>
        <Button variant="primary">Compress Transactions</Button>
      </div>

      <Modal size="lg" show={showModel} onHide={() => setShowModel(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add new transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label column sm="2">Counterparty</Form.Label>
            <Col sm="10">
              <Form.Control name="counterParty" type="text" onChange={handleChange} value={formData.counterParty} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label column sm="2">Tradingparty</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue="me" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label column sm="2">Amount</Form.Label>
            <Col sm="10">
              <Form.Control name="amount" type="text" onChange={handleChange} value={formData.amount} />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNewTransaction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
