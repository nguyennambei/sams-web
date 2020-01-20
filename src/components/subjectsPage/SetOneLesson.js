import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';

export default function SetOneLesson ({nendo,subjects}){
    const [show,setShow] = useState(false);
    const [date,setDate] = useState('');
    const [day, setDay]= useState([
        {id:0,lesson:[{},{},{},{}]},
        {id:1,lesson:[{},{},{},{}]},
        {id:2,lesson:[{},{},{},{}]},
        {id:3,lesson:[{},{},{},{}]},
        {id:4,lesson:[{},{},{},{}]},
        {id:5,lesson:[{},{},{},{}]},
        {id:6,lesson:[{},{},{},{}]},
    ]);
    const [checkclass,setCheckclass]=useState(true);
    const itemRef= firebaseApp.database();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const getData = (data) => {
        let newday = day;
        newday[data.dayId].lesson[data.genId]=data.item;
        setDay(newday);
    }

    const handleChangeDate = (e)=>{setDate(e.target.value);setCheckclass(false)}
    const saveData = ()=>{
        if(date===''){
            setCheckclass(true)
        }else{
            setCheckclass(false);
            const keyID = itemRef.ref().push().key;
            let update ={};
            update['/lessondata/year'+nendo+'/'+keyID]={
                keyId:keyID,
                datestart:date,
                dateend:date,
                day:day
            }
            itemRef.ref().update(update);
            setDate('')
            setShow(false)
        }
    }
    let elm = (!checkclass)? <GenOneSelection num={new Date(date).getDay()} data={subjects} handleChoose={getData}/> : ""
    return(
        <>
        <div className="my-2">
            <Button variant="success" onClick={handleShow}>変更</Button>
        </div>
        <Modal
          show={show} 
          size="lg"
          onHide={handleClose} >
            <Modal.Body>
              <div className="container">
                  <h2>{nendo}年度</h2>
                  <div className="form-group">
                    <lable>年月日：</lable>
                    <input className="form-control" type="date" onChange={handleChangeDate}/>
                    <small className={checkclass ? "showText" : "hiddenText"}>入力して下さい</small>
                  </div>
                  <table className="table table-bordered w-100">
                        <thead>
                            <tr>
                            <th></th>
                            <th>{date}</th>
                            </tr>
                        </thead>
                        {elm}
                            {/* <GenOneSelection num={new Date(date).getDay()} data={subjects} handleChoose={getData}/>  */}
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

function GenOneSelection({num,data,handleChoose}){

    return(
        <tbody>
            <tr>
                <td>1限</td>
                <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:num,genId:0,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
                </td>
            </tr>
            <tr>
                <td>2限</td>
                <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:num,genId:1,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
                </td>
            </tr>
            <tr>
                <td>3限</td>
                <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:num,genId:2,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
                </td>
            </tr>
            <tr>
                <td>4限</td>
                <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:num,genId:3,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
                </td>
            </tr>
        </tbody>
    );
}