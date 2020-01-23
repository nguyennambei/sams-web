import React from 'react';
import {Button,Card,Table, Badge, Tabs, Tab} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';


function AttendItem({att}){
    let checkatt = () => {
        switch (att) {
            case "A":
                return <Badge variant="primary">出席</Badge>
            case "C":
                return <Badge variant="warning">遅刻</Badge>
            case "B":
                return <Badge variant="danger">欠席</Badge>
        }
    }
    
    return(
        <div>{checkatt()}</div>
    );
}

export default class Attendance extends React.Component {
    constructor(props){
        super(props);
        this.state={
            date: this.customDate(new Date()),
            yearlydata:[],
            yearslt: {},
            dataattend:[],
            period1:[],period2:[],period3:[],period4:[],
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
        this._filterdate(this.state.dataattend,date)
    }
    
    handleStudentYear = e => {
        let yearslt = JSON.parse(e.target.value)
        this.setState({yearslt:yearslt.year});
        this.getAttendance(yearslt.year);
        // this._filterdate(this.state.dataattend,date)

    }
    _filterdate = (data,date) =>{
        let period1=data.filter((item)=>((item.period===0)&&(this.customDate(item.timelate)===date)));
        let period2=data.filter((item)=>((item.period===1)&&(this.customDate(item.timelate)===date)));
        let period3=data.filter((item)=>((item.period===2)&&(this.customDate(item.timelate)===date)));
        let period4=data.filter((item)=>((item.period===3)&&(this.customDate(item.timelate)===date)));
        this.setState({period1,period2,period3,period4})

    }
    render() {
        const { yearlydata, yearslt,period1,period2,period3,period4}=this.state;
        console.log(period3)
        let elmitem1= period1.map((item,index)=>{
            return <tr key={index}>
                <th>{item.studentId}</th>
                <td>{item.callname}</td>
            </tr>
        });
        let elmitem3= period3.map((item,index)=>{
            return <tr key={index}>
                <th>{item.studentId}</th>
                <td>{item.callname}</td>
                <td><AttendItem att={item.check}/></td>
            </tr>
        });
        let elmyear = yearlydata.map((item,index)=>{
            return <option key={index} value={JSON.stringify(item)}>{item.year}年度</option>
        })
        return (
            <div>
                <h1>出席テーブル</h1>
                <div className="form-group row ">
                    <label className="col-sm-2 col-form-label">学年</label>
                    <div className="col-sm-3">
                        <select className="form-control" defaultValue={yearslt.year} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="container">
                    <div className="card shadow">
                        <div className="card-header py-3">
                            <input  style={{backgroundColor:"#F7F7F7",outline:"none",border:0}} 
                                    type="date"
                                    defaultValue={this.state.date}
                                    max={this.customDate(new Date())}
                                    onChange={this.handleDate}
                            />
                        </div>
                        <div className="card-body">
                            <Tabs defaultActiveKey="0">
                                <Tab eventKey="0" title="1限">
                                    <h3 className="py-2">1限：プログラミング</h3>
                                    <Table striped bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>学生番号</th>
                                                <th>名前</th>
                                                <th>出席情報</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {elmitem1}
                                        </tbody>
                                    </Table>
                                </Tab>                            
                                <Tab eventKey="2" title="2限">
                                    <h3>1限：プログラミング</h3>
                                    <Table striped bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>学生番号</th>
                                                <th>名前</th>
                                                <th>出席情報</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </Table>
                                </Tab>                            
                                <Tab eventKey="3" title="3限">
                                    <h3>1限：プログラミング</h3>
                                    <Table striped bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>学生番号</th>
                                                <th>名前</th>
                                                <th>出席情報</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {elmitem3}
                                        </tbody>
                                    </Table>
                                </Tab>                            
                                <Tab eventKey="4" title="4限">
                                    <h3>1限：プログラミング</h3>
                                    <Table striped bordered size="sm">
                                        <thead>
                                            <tr>
                                                <th>学生番号</th>
                                                <th>名前</th>
                                                <th>出席情報</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </Table>
                                </Tab>                            
                            </Tabs>
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
    getAttendance = (year)=>{
        this.database.ref('attendancedata').child('year'+year).on('value',snaps=>{
            let dataattend = [];
            snaps.forEach(item=>{dataattend.push(item.val())});
            this.setState({dataattend});
            this._filterdate(dataattend,this.state.date)

        })

    }
    componentDidMount(){
        this.database.ref('yearlydata').once('value',snaps=>{
            let years =[]
            snaps.forEach(item=>{years.push(item.val())})
            years.sort((x,y)=>(JSON.parse(y.year)-JSON.parse(x.year)));
            this.setState({yearlydata:years,yearslt:years[0]});
            this.getAttendance(years[0].year);
        }).then(()=>{
            this._filterdate(this.state.dataattend,this.state.date)
        })  
    }
}