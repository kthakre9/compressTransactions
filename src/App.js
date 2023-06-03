import "./App.css";
import Button from 'react-bootstrap/Button';

import CustomTable from './components/CustomTable';

function App() {
  return (
    <div className="App">
      <div className="transaction_list">
        <div className="paying">
          <p>Paying</p>
          <CustomTable />
        </div>
        <div className="receiving">
          <p>Receiving</p>
          <CustomTable />
        </div>
      </div>

      <div className="transaction_action">
        <Button variant="primary">Add new Transaction</Button>
        <Button variant="primary">Compress Transactions</Button>
      </div>
    </div>
  );
}

export default App;
