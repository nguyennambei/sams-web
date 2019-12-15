import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import Attendance from './components/AttendancePage/Attendance';
import Students from './components/studentsPage/Students';

const routes = [
  {path:"/",exact:true,main:()=><Attendance />},
  {path:"/students",exact:true,main:()=><Students />}
];
function App() {
  return (
    <Router>
      <div className="d-flex">
        <div className="w-auto p-2 bg-primary vh-100">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <NavLink to="/" exact activeClassName="sidebar-item-active">Attendance</NavLink>
            </li>
            <li className="list-group-item">
            <NavLink to="/students" exact activeClassName="sidebar-item-active">Students</NavLink>
            </li>
            <li className="list-group-item"></li>
          </ul>
        </div>

        <div className="p-4" style={{flex:1}}>
          <Switch>
            {routes.map((route,index)=>(
              <Route 
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
