import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';

export default function AddNendo ({yearlydata}) {
    const [show,setShow] = useState(false);
    const [yearly,setYearly] = useState('');
    const [checkin,setCheckin]=useState(true)
    const handleClose = () => {setShow(false);setYearly('')};
    const handleShow = () => setShow(true);
    const saveData = ()=>{
        let checkarr = yearlydata.filter((item)=>(item.year===yearly));
        console.log(yearlydata.filter((item)=>(item.year===yearly)))
        if(checkarr.length===1||yearly===''){
            setCheckin(false)
        }else{
            let newKey = firebaseApp.database().ref().push().key;
            let update = {};
            update['yearlydata/'+newKey]={
                action:false,keyId:newKey,year:yearly
            }
            firebaseApp.database().ref().update(update);
        }
    }
    let elmcheck = (checkin)?"":<small className="text-danger">年度が入っています　とか　年度が入力してください</small>
    return(
      <>
      <Button variant="info" size="sm" onClick={handleShow}>年度追加</Button>
      <Modal
        show={show} onHide={handleClose}
      >
          <Modal.Header><h4>年度追加</h4></Modal.Header>
          <Modal.Body>
              <div className="form-group">
                  <label>年度</label>
                  <input type="text" defaultValue={yearly} className="form-control" onChange={(e)=>{setYearly(e.target.value)}}/>
                  {elmcheck}
              </div>
              <div className="form-group row justify-content-center">
                <button className="btn btn-primary" onClick={saveData} >送信</button>
                <button className="btn btn-outline-dark mx-3" onClick={handleClose}>キャンセル</button>
              </div>
          </Modal.Body>
      </Modal>
      </>
    );
}