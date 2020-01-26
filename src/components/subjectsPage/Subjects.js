import React, { useState } from 'react';
import {Button, Tabs, Tab} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';
import AddSubject from './AddSubject';
import EditSubject from './EditSubject';
import DeleteSubject from './DeleteSubject';
import TableSubmit from './TableSubject';
import SetSubject from './SetSubject';
import LessonTable from './LessonTable';
import SetOneLesson from './SetOneLesson';
import SubjectsTable from './SubjectsTable';
import ChangeDate from './ChangeDate';

export default class Subjects extends React.Component {
    constructor(props){
        super(props);
        this.state={
            yearlydata:[],
            yearslt:{},
            subjectdata:[],
            lessondata:[],
            subjects:[]
        }
        this.database = firebaseApp.database();
    }
    handleStudentYear = e => {
        let year = JSON.parse(e.target.value);
        this.setState({yearslt:year});
        this.getSubjectData(year.year);
        this.getLessonData(year.year)
    }
    render() {
        const {yearlydata,yearslt,subjectdata}=this.state;
        let elmyear = yearlydata.map((item,index)=>{
            return <option key={index} value={JSON.stringify(item)}>{item.year}年度</option>
        })
        let nendo = Math.floor(yearslt.year);
        const nameki=['1年前期','1年後期','2年前期','2年後期'];
        console.log(subjectdata)
        return (
            <div>
                <h1>科目</h1>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">学年</label>
                    <div className="col-sm-3">
                        <select className="form-control" defautValue={yearslt.year} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                </div>
                <hr />

                <div className="container-fluid">
                    <div className="row"> 
                        <div className="col">
                            <LessonTable lessondata={this.state.lessondata} deletefunc = {this.deleteLessonData}/>
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-xl-5">
                            <div className="card shadow mb-4">
                                <div className="card-header py-3">
                                    科目
                                </div>
                                <div className="card-body">
                                    <Tabs defaultActiveKey='0'>
                                        {subjectdata.map((item,index)=>
                                            <Tab eventKey={index} key={index} title={nameki[index]}>
                                                <div className="row my-2">
                                                <h4 className="col-sm-10">期間：{item.datestart} ~ {item.dateend}</h4>
                                                    <ChangeDate url={`subjectdata/year${nendo}/${item.keyId}/`} datestart={item.datestart} dateend={item.dateend} />
                                                </div>
                                                <div>
                                                    <AddSubject nendo={nendo} keyId = {item.keyId} title={nameki[index]}/>
                                                    <table className="mt-3 table table-striped  ">
                                                        <thead className="thead-inverse">
                                                            <tr>
                                                                <th>#</th>
                                                                <th>科目名</th>
                                                                <th>教師</th>
                                                                <th></th>
                                                            </tr>
                                                            </thead>
                                                                {   
                                                                    <SubjectsTable url={`year${nendo}/${item.keyId}/subjects`} />
                                                                }
                                                    </table>
                                                </div>
                                            </Tab>
                                        )}
                                    </Tabs>
                                {/* <AddSubject nendo={this.state.yearslt}/>
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
                                                    <EditSubject subject={item} nendo={yearslt.year}/>
                                                    <DeleteSubject subject={item} nendo={yearslt.year}/>
                                                </td>
                                            </tr>
                                        )
                                    }
                                        
                                    </tbody>
                                    </table> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-5">
                            <div className="card shadow mb-4">
                              <div className="card-header py-3">

                              </div>
                              <div className="card-body">
                                <SetSubject nendo={yearslt.year} subjects = {subjectdata}/>
                                <SetOneLesson nendo={yearslt.year} subjects = {this.state.subjectdata} />
                              </div>
                            </div>
                        </div>
                    </div>
                    

                </div>
            </div>
        )
    }
    deleteLessonData = (keyId) => {
        this.database.ref('lessondata').child('year'+this.state.yearslt.year).child(keyId).remove();
    }
    getSubjectData = (year) => {
        this.database.ref('subjectdata').child('year'+year).on('value',snaps=>{
            let subjectdata = [];
            snaps.forEach(item=>{subjectdata.push(item.val())});
            this.setState({subjectdata})
            console.log(subjectdata)
        })
    }
    getLessonData = (year)=>{
        this.database.ref('lessondata').child('year'+year).on('value',snaps=>{
            let lessons = [];
            snaps.forEach(item=>{lessons.push(item.val())});
            this.setState({lessondata:lessons})
        })
    }
    componentDidMount(){
        this.database.ref('yearlydata').once('value',snaps=>{
            let years =[]
            snaps.forEach(item=>{years.push(item.val())})
            years.sort((x,y)=>(JSON.parse(y.year)-JSON.parse(x.year)));
            this.setState({yearlydata:years,yearslt:years[0]});
        }).then(()=>{this.getSubjectData(this.state.yearslt.year);this.getLessonData(this.state.yearslt.year)});
    }
}