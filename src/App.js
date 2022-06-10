import './App.css';
import Chatbutton from './components/Chatbutton';
import Dashboard from './components/Dashboard';
import Snippet from './components/Snippet';
import Login from './components/Login';
import { BrowserRouter as Router,  Routes,  Route} from 'react-router-dom';

import { createBrowserHistory } from 'history';


function App() {
  const history = createBrowserHistory();
  return (
    <>
      <Router history={history}> 
        <Routes>
          <Route exact path='/' element={<Login/>}></Route>
          <Route path='/chatwidget' element={<Chatbutton/>}></Route>
          <Route path='/dashboard/:userid' element={<Dashboard/>}></Route>
          <Route path='/snippet/:userid' element={<Snippet/>}></Route>
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
