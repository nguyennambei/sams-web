import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { firebaseApp } from '../firebaseConfig';

export default function DeleteStudent ({nendo,student}){
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const deletedata = ()=>{
        firebaseApp.database().ref("studentdata").child('year'+nendo).child(student.keyId).remove();
        setShow(false)
    }
    return(
        <>
          <span className="mx-2">
          <Button variant="outline-danger" size="sm" onClick={handleShow}>削除</Button>
            </span>
          <Modal show={show} onHide = {handleClose}>
            <Modal.Header>
                <h4>{nendo}年度　－　{student.studentId}</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div>
                        <h4>{student.studentId}学生のデータを削除しますか？</h4>
                    </div>
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