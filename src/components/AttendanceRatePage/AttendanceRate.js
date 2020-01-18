import React from 'react';
import {Button} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';

export default class AttendanceRate extends React.Component {
    constructor(props){
        super(props);
        this.state={
            studentlist:[],
            studentyear:[],
            data : [],
            yearslt:new Date().getFullYear()
        }
        this.database = firebaseApp.database();
    }
    handleStudentYear = e => {
        this.setState({yearslt:JSON.parse(e.target.value)});
        this.getDataStudent(JSON.parse(e.target.value));
        
    }
    getDataStudent = (year) =>{
        this.database.ref('studentdata').child(`year${year}`).child('students').on('value',snaps=>{
            let data = []
            snaps.forEach(item=>{data.push(item.val())})
            this.setState({data});
        })
    }
    render() {
        const {studentlist,studentyear,yearslt,data}=this.state;
        let elmyear = studentyear.map((item,index)=>{
            return <option key={index} value={item}>{item}-04</option>
        })
        
        return (
            <div >
                <h1>学生情報</h1>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">学年</label>
                    <div className="col-sm-3">
                        <select className="form-control" value={yearslt.toString()} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <h3>{yearslt}/04-{yearslt+2}/03</h3>
                    </div>
                </div>
                <hr />
                    <Button className="mr-3">月</Button>
                    <Button className="mr-3">半年</Button>
                    <Button className="mr-3">年</Button>
                    <Button className="mr-3">2年</Button>
                <hr />
                <div className="container">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">出席率の</label>
                    <div className="col-sm-3">
                        <select className="form-control">
                            <option value={yearslt+'-04'}>{yearslt}-04</option>        
                            <option value={yearslt+'-05'}>{yearslt}-05</option>        
                            <option value={yearslt+'-06'}>{yearslt}-06</option>        
                            <option value={yearslt+'-07'}>{yearslt}-07</option>        
                            <option value={yearslt+'-08'}>{yearslt}-08</option>        
                            <option value={yearslt+'-09'}>{yearslt}-09</option>        
                            <option value={yearslt+'-10'}>{yearslt}-10</option>        
                            <option value={yearslt+'-11'}>{yearslt}-11</option>        
                            <option value={yearslt+'-12'}>{yearslt}-12</option>        
                            <option value={yearslt+1+'-01'}>{yearslt+1}-01</option>        
                            <option value={yearslt+1+'-02'}>{yearslt+1}-02</option>        
                            <option value={yearslt+1+'-03'}>{yearslt+1}-03</option>
                            <option value={yearslt+1+'-04'}>{yearslt+1}-04</option>        
                            <option value={yearslt+1+'-05'}>{yearslt+1}-05</option>        
                            <option value={yearslt+1+'-06'}>{yearslt+1}-06</option>        
                            <option value={yearslt+1+'-07'}>{yearslt+1}-07</option>        
                            <option value={yearslt+1+'-08'}>{yearslt+1}-08</option>        
                            <option value={yearslt+1+'-09'}>{yearslt+1}-09</option>        
                            <option value={yearslt+1+'-10'}>{yearslt+1}-10</option>        
                            <option value={yearslt+1+'-11'}>{yearslt+1}-11</option>        
                            <option value={yearslt+1+'-12'}>{yearslt+1}-12</option>        
                            <option value={yearslt+2+'-01'}>{yearslt+2}-01</option>        
                            <option value={yearslt+2+'-02'}>{yearslt+2}-02</option>        
                            <option value={yearslt+2+'-03'}>{yearslt+2}-03</option>                
                        </select>
                    </div>
                </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        this.database.ref('student_data').on('value',data=>{
            let studentlist=[];
            data.forEach((item,index)=>{
                studentlist.push(item.val());
            })
            this.setState({studentlist});
        });
        this.database.ref('studentyear').on('value',snaps=>{
            let year=[];
            snaps.forEach(item=>{year.push(item.key)})
            this.setState({studentyear:year.sort().reverse()})
            this.setState({yearslt:JSON.parse(year.sort().reverse()[0])})
            this.getDataStudent(JSON.parse(year.sort().reverse()[0]));
        });
        
    }
}