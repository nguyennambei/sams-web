import React from 'react';
import {Button,Card,Table, Badge} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';


function AttendItem({att}){
    let checkatt = () => {
        switch (att.check) {
            case "A":
                return <Badge variant="primary">出席</Badge>
            case "B":
                return <Badge variant="warning">遅刻 {checktimelate()}</Badge>
            case "C":
                return <Badge variant="danger">欠席</Badge>
        }
    }
    let checktimelate = () =>{
        const timelate = new Date(att.timelate);
        return timelate.getMinutes()+'分'
    }
    return(
        <div>{att.id}限：{checkatt()}</div>
    );
}

export default class Attendance extends React.Component {
    constructor(props){
        super(props);
        this.state={
            date: this.customDate(new Date()),
            studentyear:[],
            yearslt: new Date().getFullYear()-1,
            dataattend:[]
        };
        this.database = firebaseApp.database();
        
    }

    customDate = (date)=>{
        let newdate = new Date(date);
        let m = ((newdate.getMonth()+1)<=9) ? '0'+(newdate.getMonth()+1) : (newdate.getMonth()+1);
        let d = ((newdate.getDate())<=9) ? '0'+(newdate.getDate()) : (newdate.getDate());
        return newdate.getFullYear()+"-"+m+"-"+d;
    }
    addData = () => {
        this.database.ref('check').update({})
    }
    handleDate = (e) => {
        const date = e.target.value;
        this.setState({date});
    }
    
    handleStudentYear = e => {
        this.setState({yearslt:e.target.value});
        this.getAttendance(e.target.value);
    }
    _filterdate = () =>{
        
    }
    render() {
        const {list, studentyear, yearslt}=this.state;
        let elmitem=<tr><td colSpan="3">NOT DATA</td></tr>;
        let elmyear = studentyear.map((item,index)=>{
            return <option key={index} value={item}>{item}年度</option>
        })
        return (
            <div>
                <h1>出席テーブル</h1>
                <div className="form-group row ">
                    <label className="col-sm-2 col-form-label">学年</label>
                    <div className="col-sm-3">
                        <select className="form-control" value={yearslt} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <Card>
                        <Card.Header>
                            <input  style={{backgroundColor:"#F7F7F7",outline:"none",border:0}} 
                                    type="date"
                                    defaultValue={this.state.date}
                                    max={this.customDate(new Date())}
                                    onChange={this.handleDate}
                                    />
                        </Card.Header>
                        <Card.Body>
                        <Table striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th>学生番号</th>
                                    <th>名前</th>
                                    <th>出席情報</th>
                                </tr>
                            </thead>
                            <tbody>
                                {elmitem}
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
                    <Button onClick={this.addData}>Add Data</Button>
                </div>
            </div>
        );
    }
    getAttendance = (year)=>{
        this.database.ref('attendancedata').child('year'+year).on('value',snaps=>{
            let dataattend = [];
            snaps.forEach(item=>{dataattend.push(item.val())});
            this.setState({dataattend});
        })
    }
    componentDidMount(){
        this.database.ref('studentyear').on('value',snaps=>{
            let year=[];
            snaps.forEach(item=>{year.push(item.key)})
            this.setState({studentyear:year.sort().reverse()})
            this.getAttendance(year.sort().reverse()[0]);
        })
    }
}