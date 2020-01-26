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
    const [selectedOption , setSelectedOption ]= useState(0)

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
        if(selectedOption){
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
    let result = '';
    if(subjects[0]){
        result =
        <tbody>
            <GenSelection num={0} data={subjects[selectedOption].subjects} handleChoose={getData} />
            <GenSelection num={1} data={subjects[selectedOption].subjects} handleChoose={getData} />
            <GenSelection num={2} data={subjects[selectedOption].subjects} handleChoose={getData} />
            <GenSelection num={3} data={subjects[selectedOption].subjects} handleChoose={getData} />
        </tbody>
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
                        <div className="row px-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="nenki" value={0} defaultChecked={selectedOption===0} onChange={e=>setSelectedOption(e.target.value)}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">1年前期</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="nenki" value={1} defaultChecked={selectedOption===1} onChange={e=>setSelectedOption(e.target.value)}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">1年後期</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="nenki" value={2} defaultChecked={selectedOption===2} onChange={e=>setSelectedOption(e.target.value)}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">2年前期</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="nenki" value={3} defaultChecked={selectedOption===3} onChange={e=>setSelectedOption(e.target.value)}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">2年後期</label>
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
                        {/* <tbody>
                            <GenSelection num={0} data={    } handleChoose={getData} />
                            <GenSelection num={1} data={subjects} handleChoose={getData} />
                            <GenSelection num={2} data={subjects} handleChoose={getData} />
                            <GenSelection num={3} data={subjects} handleChoose={getData} />
                        </tbody> */}
                        {result}
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
