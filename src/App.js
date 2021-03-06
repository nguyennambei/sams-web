import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom'
import Attendance from './components/AttendancePage/Attendance';
import Students from './components/studentsPage/Students';
import Subjects from './components/subjectsPage/Subjects';
import AttendanceRate from './components/AttendanceRatePage/AttendanceRate';

const routes = [
  {path:"/",exact:true,main:()=><Attendance />},
  {path:"/students",exact:true,main:()=><Students />},
  {path:"/attendance-rate",exact:true,main:()=><AttendanceRate />},
  {path:"/subjects",exact:true,main:()=><Subjects />},
];
function App() {
  return (
    <Router>
      <div className="d-flex">
        <div className="p-2 bg-primary vh-100">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <NavLink to="/" exact activeClassName="sidebar-item-active">Attendance</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/students" exact activeClassName="sidebar-item-active">Students</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/attendance-rate" exact activeClassName="sidebar-item-active">出席率</NavLink>
            </li>
            <li className="list-group-item">
              <NavLink to="/subjects" exact activeClassName="sidebar-item-active">科目</NavLink>
            </li>
          </ul>
        </div>

        <div className="p-4" style={{flex:1,height:"100vh",overflow:'auto'}}>
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
