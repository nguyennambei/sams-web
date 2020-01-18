import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {firebaseApp} from '../firebaseConfig';

export default function DeleteSubject ({nendo,subject}) {
    const [show,setShow] = useState(false);
    const [subjectname, setSubjectname]= useState('');
    const [teachername, setTeachername]= useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const itemRef= firebaseApp.database();
    const deleteData = () =>{
        let keyID = subject.keyID;
        itemRef.ref('subjectdata').child('year'+nendo).child(keyID).remove();
        setShow(false)
    }
    return(
        <>
        <div className="mx-1">
        <Button variant="outline-danger" size="sm" onClick={handleShow}>削除</Button>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="container">
                    <h2>{nendo}年度　ー　科目削除</h2>
                    <h4>科目名：{subject.name}</h4>
                    <h4>教師名前：{subject.teachername}</h4>
                    <div className="row float-right mr-3">
                        <div>
                            <Button variant="danger" size="sm" onClick={deleteData}>削除</Button>
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