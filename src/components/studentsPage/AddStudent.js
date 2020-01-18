import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {firebaseApp} from '../firebaseConfig';

export default function AddStudent ({student}) {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
        <Button variant="info" size="sm" onClick={handleShow}>学生追加</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="container">
                    <div class="form-group">
                      <label>名前</label>
                      <input type="text" name="" class="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div class="form-group">
                      <label>フリガナ</label>
                      <input type="text" name="" class="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                    <div class="form-group">
                      <label>名前</label>
                      <input type="text" name="" class="form-control" placeholder="" aria-describedby="helpId" />
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}