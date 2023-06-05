import './App.css';
import { Router } from '@reach/router';
import { List } from './components/list';

function App() {
  return (
      <Router>
          <List path="/" />
      </Router>
  );
}

export default App;
