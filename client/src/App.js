import React, { useState, useEffect } from 'react';
import "./App.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { saveAs } from 'file-saver';
import { v4 as uuid } from 'uuid';

function App() {
  const [showModel, setShowModel] = useState(false);
  const [payTableData, setPayTableData] = useState([]);
  const [receiveTableData, setReceiveTableData] = useState([]);
  const [formData, setFormData] = useState({
    counterParty: "",
    amount: 0
  })

  const groupTransactions = (data) => {
    let payingTable = []
    let receivingTable = []

    data.forEach((item) => {
      if (item.amount < 0) {
        payingTable.push(item)
      } else {
        receivingTable.push(item)
      }
    })
    setReceiveTableData(receivingTable)
    setPayTableData(payingTable)

  }

  useEffect(() => {
    fetch("/allTransactions")
      .then((res) => res.json())
      .then((data) => {
        groupTransactions(data)
      });
  }, []);

  const handleClose = () => setShowModel(false);

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormData({
      ...formData,
      [evt.target.name]: value
    });
  }

  const compressTransactions = () => {
    const transactions = [...payTableData, ...receiveTableData]
    let totalCount = {};

    transactions.forEach(({ counterParty, amount }) => {
      if (counterParty in totalCount) {
        totalCount[counterParty] = parseInt(totalCount[counterParty]) + parseInt(amount)
      } else {
        totalCount[counterParty] = parseInt(amount)
      }
    })

    const cvsData = Object.assign({ 'CounterParty': "Amount" }, totalCount);
    const printData = Object.entries(cvsData).map(entry => entry.join(',')).join('\n');

    const blob = new Blob([printData], { type: 'text/csv' });
    saveAs(blob)
  }

  const addNewTransaction = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
    fetch('/newTransaction', requestOptions)
      .then(response => response.json())
      .then(data => {
        groupTransactions(data)
        setShowModel(false)
        setFormData({
          counterParty: "",
          amount: 0
        })
      });
  }

  return (
    <div className="App">
      <h2>Transactions</h2>
      <div className="transaction_list">
        <div className="paying">
          <p>Paying</p>
          <Table className="paying_table" bordered hover responsive>
            <thead>
              <tr key="paying_heading">
                <th>Counterparty Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payTableData && payTableData.length > 0 && payTableData.map(({ counterParty, amount }) => {
                return (
                  <tr key={`${uuid()}_paying`}>
                    <td>{counterParty}</td>
                    <td>{amount}</td>
                  </tr>
                )

              })}
            </tbody>
          </Table>
        </div>
        <div className="receiving">
          <p>Receiving</p>
          <Table className="receiving_table" bordered hover responsive>
            <thead>
              <tr key="receiving_header">
                <th>Counterparty Name</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {receiveTableData && receiveTableData.length > 0 && receiveTableData.map(({ counterParty, amount }) => {
                return (
                  <tr key={`${uuid()}_receiving`}>
                    <td>{counterParty}</td>
                    <td>{amount}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="transaction_action">
        <Button variant="primary" onClick={() => setShowModel(true)}>Add new Transaction</Button>
        <Button variant="primary" onClick={compressTransactions}>Compress Transactions</Button>
      </div>

      <Modal size="lg" show={showModel} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group as={Row} className="mb-3" id="Counterparty">
            <Form.Label column sm="2">Counterparty</Form.Label>
            <Col sm="10">
              <Form.Control name="counterParty" type="text" onChange={handleChange} value={formData.counterParty} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" id="Tradingparty">
            <Form.Label column sm="2">Tradingparty</Form.Label>
            <Col sm="10">
              <Form.Control plaintext readOnly defaultValue="me" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" id="Amount">
            <Form.Label column sm="2">Amount</Form.Label>
            <Col sm="10">
              <Form.Control name="amount" type="number" onChange={handleChange} value={formData.amount} />
            </Col>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" id="cancel" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={!formData.counterParty && !formData.amount} id="saveTransaction" onClick={addNewTransaction}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
