import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import {GoCalendar} from 'react-icons/go'
import { firebaseApp } from '../firebaseConfig';
import "./SetSubject.css"
import GenSelection from './GenSelection';

export default function SetSubject ({nendo,subjects}){
    const [show,setShow] = useState(false);
    const [day, setDay]= useState([
        {id:0,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
        {id:1,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
        {id:2,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
        {id:3,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
        {id:4,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
        {id:5,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
        {id:6,lesson:[{keyID:"",name:"",period:1,teachername:""},{keyID:"",name:"",period:2,teachername:""},{keyID:"",name:"",period:3,teachername:""},{keyID:"",name:"",period:4,teachername:""}]},
    ]);
    const [datestart,setDatestart]=useState('');
    const [dateend,setDateend]=useState('');
    const [checkclass,setCheckclass]=useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const itemRef= firebaseApp.database();
    const getData = (data) => {
        let newday = day;
        newday[data.dayId].lesson[data.genId]=data.item;
        setDay(newday);
    }
    const handleChangeStart = (e) => {
        setDatestart(e.target.value);
        setCheckclass(false);

    }
    const handleChangeEnd = (e) => {
        setDateend(e.target.value);
        setCheckclass(false);

    }
    const saveData = () =>{
        if(datestart===''||dateend===''){
            setCheckclass(true)
        }else{
            setCheckclass(false);
            const keyID = itemRef.ref().push().key;
            let update ={};
            update['/lessondata/year'+nendo+'/'+keyID]={
                keyId:keyID,
                datestart:datestart,
                dateend:dateend,
                day:day
            }
            itemRef.ref().update(update);
            setShow(false)
        }
    }
    return(
        <>
        <div>
            <Button variant="primary" onClick={handleShow}><GoCalendar />＊＊追加</Button>
        </div>
        <Modal 
          show={show} 
          size="lg"
          onHide={handleClose} >
            <Modal.Body>
                <div className="container">
                    <h2>{nendo}年度　ー　</h2>
                    <div className="form-group">
                        <label>期間：</label>
                        <div className="row">
                            <div className="col-6">
                                <input type="date" className="form-control" onChange={handleChangeStart} max={dateend}/>
                                <small className={checkclass ? "showText" : "hiddenText"}>入力して下さい</small>
                            </div>
                            <div className="col-6">
                                <input type="date" className="form-control" onChange={handleChangeEnd} min={datestart}/>
                                <small className={checkclass ? "showText" : "hiddenText"}>入力して下さい</small>
                            </div>
                        </div>
                    </div>
                    <table className="table table-bordered w-100">
                        <thead>
                            <tr>
                            <th>曜日</th>
                            <th>月</th>
                            <th>火</th>
                            <th>水</th>
                            <th>木</th>
                            <th>金</th>
                            <th>土</th>
                            <th>日</th>
                            </tr>
                        </thead>
                        <tbody>
                            <GenSelection num={0} data={subjects} handleChoose={getData} />
                            <GenSelection num={1} data={subjects} handleChoose={getData} />
                            <GenSelection num={2} data={subjects} handleChoose={getData} />
                            <GenSelection num={3} data={subjects} handleChoose={getData} />
                        </tbody>
                    </table>
                    <div className="row float-right mr-3">
                        <div>
                            <Button variant="danger" size="sm" onClick={saveData}>保存</Button>
                        </div>
                        <div className="ml-3">
                            <Button variant="outline-primary" size="sm" onClick={handleClose}>キャンセル</Button>
                        </div>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}
