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
            let newKeyS1 = firebaseApp.database().ref().push().key;
            let newKeyS2 = firebaseApp.database().ref().push().key;
            let newKeyS3 = firebaseApp.database().ref().push().key;
            let newKeyS4 = firebaseApp.database().ref().push().key;
            let update = {};
            update['yearlydata/'+newKey]={
                action:false,keyId:newKey,year:yearly
            }
            update['subjectdata/year'+yearly+"/"+newKeyS1]={
                keyId:newKeyS1,datestart:"2020-01-01",dateend:"2020-01-02",id:0,subjects:[]
            }
            update['subjectdata/year'+yearly+"/"+newKeyS2]={
                keyId:newKeyS2,datestart:"2020-01-03",dateend:"2020-01-04",id:1,subjects:[]
            }
            update['subjectdata/year'+yearly+"/"+newKeyS3]={
                keyId:newKeyS3,datestart:"2020-01-05",dateend:"2020-01-06",id:2,subjects:[]
            }
            update['subjectdata/year'+yearly+"/"+newKeyS4]={
                keyId:newKeyS4,datestart:"2020-01-07",dateend:"2020-01-08",id:3,subjects:[]
            }
            firebaseApp.database().ref().update(update);
            handleClose();
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