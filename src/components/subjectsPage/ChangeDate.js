import React,{useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';



export default function ChangeDate ({url,datestart,dateend}) { 
    const [show,setShow]= useState(false);
    const [dateS,setDateS] = useState('');
    const [dateE,setDateE] = useState('');
    const handleShow = () => setShow(true);
    const handleClose =() =>{setShow(false)}
    const saveData = ()=>{
        let updates = {};
        updates[url+"datestart"]=(dateS)?dateS:datestart;
        updates[url+"dateend"]=dateE?dateE:dateend;
        firebaseApp.database().ref().update(updates);
        setShow(false)
    }
    return(
        <>
            <Button variant="outline-primary" size="sm"  onClick={handleShow}>変更</Button>
            <Modal  show={show} onHide={handleClose}>
                <Modal.Header>
                    <h4>期間変更</h4>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="form-group">
                            <label>期間：</label>
                            <div className="row">
                                <div className="col-6">
                                    <input type="date" className="form-control" onChange={e=>{setDateS(e.target.value)}} defaultValue={datestart}/>
                                </div>
                                <div className="col-6">
                                    <input type="date" className="form-control" onChange={e=>{setDateE(e.target.value)}} defaultValue={dateend}/>
                                </div>
                            </div>
                        </div>
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