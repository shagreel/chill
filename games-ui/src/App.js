import './App.css';
import { Router } from '@reach/router';
import { List } from './components/list';
import BorrowModal from "./components/borrow";

function App() {
  return (
      <Router>
          <List path="/" />
      </Router>
  );
}

export default App;
