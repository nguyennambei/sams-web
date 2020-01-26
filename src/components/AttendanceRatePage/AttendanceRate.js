import React from 'react';
import {Button} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';
import AttendItem from './AttendItem';

export default class AttendanceRate extends React.Component {
    constructor(props){
        super(props);
        this.state={
            studentlist:[],
            attendancedata : [],
            yearlydata:[],
            yearslt:{}
        }
        this.database = firebaseApp.database();
    }
    handleStudentYear = e => {
        let year = JSON.parse(e.target.value);
        this.setState({yearslt:year});
        this.getStudentData(year);
        this.getAttendanceData(year)
        
    }
    // kqcheck = (check)=>{
    //     console.log(check)
    //     let cA = check.filter(item=>item==='A').length;
    //     let cB = check.filter(item=>item==='B').length;
    //     let cC = check.filter(item=>item==='C').length;
    //     return(Math.round(100-(cC/3+cB)*100/check.length))
    // }
    render() {
        const {attendancedata,yearlydata,yearslt,studentlist}=this.state;
            let elmyear = yearlydata.map((item,index)=>{
            return <option key={index} value={JSON.stringify(item)}>{item.year}年度</option>
        })
            let data = [];
            let result = []
            let num = 0
            studentlist.forEach(item=>{
                data[num]=attendancedata.filter(attend => (attend.studentId === item.studentId));
                num++
            })
            num = 0
            data.forEach(item=>{
                result[num]=[]
                item.forEach(check=>{
                    result[num].push(check.check)
                    
                });num++
            })
            let elm =""
            if(result.length>0){
            }
            elm = studentlist.map((item,index)=>{
            return <AttendItem student = {item} key={index} check ={result[index]} />})
        return (
            <div >
                <h1>学生情報</h1>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">学年</label>
                    <div className="col-sm-3">
                        <select className="form-control" defautvalue={yearslt.year} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                </div>
                <hr />
                <div className="container">
                    {elm}
                </div>
            </div>
        )
    }
    getAttendanceData = (yearslt) =>{
        this.database.ref('attendancedata').child('year'+yearslt.year).on('value',snaps=>{
            let attendancedata = [];
            snaps.forEach(item=>{attendancedata.push(item.val())});
            this.setState({attendancedata})
        })
    }
    getStudentData = (yearslt) =>{
        this.database.ref('studentdata').child('year'+yearslt.year).on('value',data=>{
                let studentlist=[];
                data.forEach((item)=>{
                    studentlist.push(item.val());
                })
                this.setState({studentlist});
            });
    }
    getSubjectData = (yearslt)=>{
        this.database.ref('subjectdata').child('year'+yearslt.year).once('value',snaps=>{
            let subjectdata = [];
            snaps.forEach(item=>{subjectdata.push(item.val())});
            this.setState({subjectdata});
        })
    }
    componentDidMount(){
        this.database.ref("yearlydata").once('value',snaps=>{
            let years =[]
            snaps.forEach(item=>{years.push(item.val())})
            years.sort((x,y)=>(JSON.parse(y.year)-JSON.parse(x.year)));
            this.setState({yearlydata:years,yearslt:years[0]});
            this.getAttendanceData(years[0]);
            this.getSubjectData(years[0])
            this.getStudentData(years[0]);
        })
    }
}