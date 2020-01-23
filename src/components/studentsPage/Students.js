import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import StudentInfo from './StudentInfo';
import { firebaseApp } from '../firebaseConfig';
import AddStudent from './AddStudent';
import AddNendo from './AddNendo';
import StudentList from './StudentList';
import EditStudent from './EditStudent';
import DeleteStudent from './DeleteStudent';

export default class Students extends React.Component {
    constructor(props){
        super(props);
        this.state={
            studentlist:[],
            yearlydata:[],
            yearslt:{}
        }
        this.database = firebaseApp.database();
    }
    handleStudentYear = e => {
        let year = JSON.parse(e.target.value);
        this.setState({yearslt:year});
        this.database.ref('studentdata').child('year'+year.year).on('value',data=>{
            let studentlist=[];
            data.forEach((item)=>{
                studentlist.push(item.val());
            })
            this.setState({studentlist});
            console.log(studentlist)
        });
    }
    render() {
        const {studentlist,yearlydata,yearslt}=this.state;
        let elmyear = yearlydata.map((item,index)=>{
            return <option key={index} value={JSON.stringify(item)}>{item.year}年度</option>
        })
        let elmstudent= studentlist.map((item,i)=>{
                return  <tr key={i}>
                            <th><StudentInfo item={item} key={item.studentId} />{item.studentId}</th>
                            <td><img src={item.imgurl} width="45"/></td>
                            <td >
                                {item.name}<br/>
                                {item.furiname}<br/>
                                {item.callname}
                            </td>
                            <td>
                                <ul className="list-unstyled">
                                    <li>国籍：{item.country}</li>
                                    <li>生年：{item.birth}</li>
                                    <li>電話番号：{item.phone}</li>
                                    <li>住所：{item.address}</li>
                                </ul>
                            </td>
                            <td>
                                <EditStudent student={item} nendo={yearslt.year}/>
                                <DeleteStudent student={item} nendo={yearslt.year}/>
                            </td>
                        </tr>
            })
        
        return (
            <div >
                <h1>学生情報</h1>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">年度生</label>
                    <div className="col-sm-3">
                        <select className="form-control" defautValue={yearslt.year} onChange={this.handleStudentYear} >
                            {elmyear}
                        </select>
                    </div>
                    <div className="col-sm-3 offset-sm-4">
                        <AddNendo yearlydata={yearlydata}/>
                    </div>
                </div>
                <hr />
                <div className="row justify-content-between">
                    <div className="col-md-4">
                        <h3>{yearslt.year}年度</h3>
                    </div>
                    <div className="col-sm-3">
                        <AddStudent nendo={yearslt.year} />
                        <YearlyAction nendo = {yearslt}/>
                        <YearlyDelete yearly = {yearslt} />
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
        this.database.ref("yearlydata").on('value',snaps=>{
            let years =[]
            snaps.forEach(item=>{years.push(item.val())})
            years.sort((x,y)=>(JSON.parse(y.year)-JSON.parse(x.year)));
            this.setState({yearlydata:years,yearslt:years[0]});
            this.database.ref('studentdata').child('year'+years[0].year).on('value',data=>{
                let studentlist=[];
                data.forEach((item)=>{
                    studentlist.push(item.val());
                })
                this.setState({studentlist});
            });
        })
        

        
    }
}

function YearlyAction({nendo}){
    
    const handleChange = ()=>{
        let update = {}
        update['yearlydata/'+nendo.keyId+"/action"]=!nendo.action;
        firebaseApp.database().ref().update(update);
    }
    return(
        <div style={{'fontSize':"12px"}}>アプリに入り：
        <Button variant={nendo.action?"primary":"outline-primary"} size="sm" onClick={handleChange}> {nendo.action?'ON':'OFF'}</Button>
        </div>
    );
}
function YearlyDelete({yearly}){
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deletedata = () => {
        firebaseApp.database().ref('yearlydata').child(yearly.keyId).remove();
        setShow(false)
    }
    return(
        <>
        <Button variant="outline-danger" size="sm" onClick={handleShow}>削除</Button>

        <Modal show={show} onHide = {handleClose}>
            <Modal.Body>
                <div className="container">
                    <h4>{`${yearly.year}年度のデータを削除しますか？`}</h4>
                    <div className="form-group row justify-content-center">
                      <button className="btn btn-danger" onClick={deletedata}>削除</button>
                      <button className="btn btn-outline-dark mx-3" onClick={handleClose}>キャンセル</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}