import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {firebaseApp} from '../firebaseConfig';

export default function AddSubject ({nendo,keyId,title}) {
    const [show,setShow] = useState(false);
    const [subjectname, setSubjectname]= useState('');
    const [teachername, setTeachername]= useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const itemRef= firebaseApp.database();
    const saveData = () =>{
        let newKey = itemRef.ref().push().key;
        let update={};
        update['/subjectdata/year'+nendo+"/"+keyId+"/subjects/"+newKey]={
            keyID : newKey,
            name:subjectname,
            teachername:teachername
        }
        itemRef.ref().update(update);
        setShow(false)
    }
    return(
        <>
        <Button variant="info" size="sm" onClick={handleShow}>科目追加</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <div className="container">
                    <h2>{nendo}年度 - {title}</h2>
                    <div className="form-group">
                      <label>科目名</label>
                      <input type="text" name="" className="form-control" placeholder="" onChange={(e)=>setSubjectname(e.target.value)}/>
                    </div>
                    <div className="form-group">
                      <label>教師の名前</label>
                      <input type="text" name="" className="form-control" placeholder=""  onChange={(e)=>setTeachername(e.target.value)}/>
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