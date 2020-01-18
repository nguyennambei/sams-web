import React,{useState} from 'react';
import {Modal} from 'react-bootstrap';
import {firebaseApp} from '../firebaseConfig';

export default function StudentInfo ({item}) {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return(
        <>
            <button className="btn btn-link" onClick={handleShow}>{item.idstudent}</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div className="container">
                        <div className="text-center">
                            <img src={item.imageurl} className="rounded"/>
                            <h5>{item.namestudent}</h5>
                            <p>{item.namefuri}</p>
                            <hr />
                            <h5>12月の出席率</h5>
                            <div className="progress">
                                <div className="progress-bar" role="progressbar" style={{width: "15%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                                <div className="progress-bar bg-warning" role="progressbar" style={{width: "30%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                                <div className="progress-bar bg-danger" role="progressbar" style={{width: "20%"}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                        </div>
                        
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}