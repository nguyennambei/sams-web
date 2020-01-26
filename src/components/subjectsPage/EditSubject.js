import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {firebaseApp} from '../firebaseConfig';

export default function EditSubject ({url,subject}) {
    const [show,setShow] = useState(false);
    const [subjectname, setSubjectname]= useState('');
    const [teachername, setTeachername]= useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const itemRef= firebaseApp.database();
    const saveData = () =>{
        let keyID = subject.keyID;
        let update={};
        update["subjectdata/"+url+"/"+keyID]={
            keyID : keyID,
            name:(subjectname==="")?subject.name:subjectname,
            teachername:(teachername==="")?subject.teachername:teachername
        }
        itemRef.ref().update(update);
        setShow(false)
    }
    return(
        <>
        <div className="mx-1">
        <Button variant="outline-primary" size="sm" onClick={handleShow}>編集</Button>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="container">
                    <h2>科目編集</h2>
                    <div className="form-group">
                      <label>科目名</label>
                      <input type="text" name="" defaultValue={subject.name} className="form-control"　onChange={(e)=>setSubjectname(e.target.value)}/>
                    </div>
                    <div className="form-group">
                      <label>教師の名前</label>
                      <input type="text" name=""  defaultValue={subject.teachername} className="form-control" onChange={(e)=>setTeachername(e.target.value)}/>
                    </div>
                    <div className="row float-right mr-3">
                        <div>
                            <Button variant="success" size="sm" onClick={saveData}>保存</Button>
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