import React from 'react';
import {Button} from 'react-bootstrap';
import StudentInfo from './StudentInfo';
import { firebaseApp } from '../firebaseConfig';
import AddStudent from './AddStudent';

export default class Students extends React.Component {
    constructor(props){
        super(props);
        this.state={
            studentlist:[],
            studentyear:[],
            yearslt:new Date().getFullYear()-1
        }
        this.database = firebaseApp.database();
    }
    handleStudentYear = e => {
        this.setState({yearslt:JSON.parse(e.target.value)});
        
    }
    render() {
        const {studentlist,studentyear,yearslt}=this.state;
        let elmyear = studentyear.map((item,index)=>{
            return <option key={index} value={item}>{item}年度</option>
        })
        let elmstudent= studentlist.map((item,i)=>{
                return  <tr key={i}>
                            <th><StudentInfo item={item} key={i} /></th>
                            <td><img src={item.imageurl} width="45"/></td>
                            <td >
                                {item.namestudent}<br/>
                                {item.namefuri}
                            </td>
                            <td>
                                <ul className="list-unstyled">
                                    <li>国籍：{item.country}</li>
                                    <li>生年：{item.age}</li>
                                    <li>電話番号：{item.phonenumber}</li>
                                    <li>住所：{item.address}</li>
                                </ul>
                            </td>
                            <td>
                                <Button>EHDD</Button>
                            </td>
                        </tr>
            })
        
        return (
            <div >
                <h1>学生情報</h1>

                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">年度生</label>
                    <div className="col-sm-3">
                        <select className="form-control" value={yearslt.toString()} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                    <div className="col-sm-3 offset-sm-4">
                        <AddStudent />
                    </div>
                </div>
                <hr />
                <div className="row justify-content-between">
                    <div className="col-md-4">
                        <h3>{yearslt}/04-{yearslt+2}/03</h3>
                    </div>
                    <div className="col-sm-3">
                        <AddStudent student="12" />
                        {/* <Button variant="info" size="sm">学生追加</Button> */}
                    </div>
                </div>
                <hr />
                <div className="container t">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">学生番号</th>
                                <th scope="col">写真</th>
                                <th scope="col">名前</th>
                                <th scope="col">情報</th>
                                <th scope="col">アクション</th>
                            </tr>
                        </thead>
                        <tbody >
                            {elmstudent}
                        </tbody>
                    </table>
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
        });

        
    }
}