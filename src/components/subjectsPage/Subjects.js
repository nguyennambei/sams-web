import React from 'react';
import {Button} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';
import AddSubject from './AddSubject';
import EditSubject from './EditSubject';
import DeleteSubject from './DeleteSubject';

export default class Subjects extends React.Component {
    constructor(props){
        super(props);
        this.state={
            studentyear:[],
            yearslt:0,
            subjectdata:[]
        }
        this.database = firebaseApp.database();
    }
    render() {
        const {studentlist,studentyear,yearslt}=this.state;
        let elmyear = studentyear.map((item,index)=>{
            return <option key={index} value={item}>{item}年度</option>
        })
        
        return (
            <div>
                <h1>科目</h1>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">学年</label>
                    <div className="col-sm-3">
                        <select className="form-control" defaultValue={yearslt.toString()} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                </div>
                <hr />

                <div className="container-fluid">
                    
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    科目
                                </div>
                                <div className="card-body">
                                <AddSubject nendo={this.state.yearslt}/>
                                <table className="table table-striped mt-3">
                                    <thead>
                                        <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">科目名</th>
                                        <th scope="col">教師</th>
                                        <th scope="col">ファンクション</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.subjectdata.map((item,index)=>
                                            <tr key={index}>
                                                <th scope="row">{index+1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.teachername}</td>
                                                <td className="d-flex">
                                                    <EditSubject subject={item} nendo={yearslt}/>
                                                    
                                                    <DeleteSubject subject={item} nendo={yearslt}/>
                                                </td>
                                            </tr>
                                        )
                                    }
                                        
                                    </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                </div>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
    getSubjectData = (year) => {
        this.database.ref('subjectdata').child('year'+year).on('value',snaps=>{
            let subjectdata = [];
            snaps.forEach(item=>{subjectdata.push(item.val())});
            this.setState({subjectdata})
        })
    }
    componentDidMount(){
        this.database.ref('studentyear').once('value',snaps=>{
            let year=[];
            snaps.forEach(item=>{year.push(item.key)})
            this.setState({studentyear:year.sort().reverse()})
            this.setState({yearslt:JSON.parse(year.sort().reverse()[0])})
        }).then(()=>{this.getSubjectData(this.state.yearslt)});

        
    }
}