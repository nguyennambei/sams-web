import React, { useState } from 'react';
import {Modal,Button} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';

export default function EditStudent ({student,nendo}){

    const [show,setShow] = useState(false);
    const [name,setName] = useState(student.name);
    const [furiname,setFuriname] = useState(student.furiname);
    const [callname,setCallname] = useState(student.callname);
    const [studentId,setStudentId] = useState(student.studentId);
    const [gender,setGender] = useState(student.gender);
    const [birth,setBirth] = useState(student.birth);
    const [country,setCountry] = useState(student.country);
    const [phone,setPhone] = useState(student.phone);
    const [address,setAddress] = useState(student.address);
    const [image,setImage] = useState('');
    const [url,setUrl] = useState(student.imgurl);
    const keyId = student.keyId;
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveData = () => {
       if(image === ''){
        let student={
          name:name,
          furiname:furiname,
          callname:callname,
          studentId:studentId,
          gender:gender,
          birth:birth,
          country:country,
          phone:phone,
          address:address,
          imgurl:url,
          keyId:keyId
        }
        let updata ={}
        updata['studentdata/year'+nendo+'/'+keyId]=student;
        firebaseApp.database().ref().update(updata);
        setShow(false)
       } else {
         const uploadTask = firebaseApp.storage().ref(`student${nendo}/${image.name}`).put(image);
         uploadTask.then(
           ()=>{
             firebaseApp.storage()
              .ref(`student${nendo}`)
              .child(image.name)
              .getDownloadURL()
              .then(url=>{
                let student={
                  name:(!name)?name:student.name,
                  furiname:(!furiname)?furiname:student.furiname,
                  callname:(!callname)?callname:student.callname,
                  studentId:(!studentId)?studentId:student.studentId,
                  gender:(!gender)?gender:student.gender,
                  birth:(!birth)?birth:student.birth,
                  country:(!country)?country:student.country,
                  phone:(!phone)?phone:student.phone,
                  address:(!address)?address:student.address,
                  imgurl:url,
                  keyId:student.keyId
                }
                let updata ={}
                updata['studentdata/year'+nendo+'/'+student.keyId]=student;
                firebaseApp.database().ref().update(updata);
                setShow(false)
              })
           }
         )
       }
    }
    return(
        <>
        <Button variant="info" size="sm" onClick={handleShow}>編集</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <h4>{nendo}年度　―　{student.studentId}</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="form-group">
                      <label>名前</label>
                      <input defaultValue={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" placeholder="読売 or YOMIURI" />
                    </div>
                    <div className="form-group">
                      <label>フリガナ</label>
                      <input defaultValue={student.furiname} onChange={(e)=>{setFuriname(e.target.value)}} type="text" className="form-control" placeholder="ヨミウリ" />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-6">
                          <label>呼び名前</label>
                          <input defaultValue={student.callname} onChange={(e)=>{setCallname(e.target.value)}} type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="col-6">
                          <label>学生番号</label>
                          <input defaultValue={student.studentId} onChange={(e)=>{setStudentId(e.target.value)}} type="text" className="form-control" placeholder="0000000" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-6">
                          <label>性別</label>
                          <select className="form-control" onChange={(e)=>{setGender(e.target.value)}} name="gender" defaultValue={student.gender}>
                              <option value="null">選択</option>
                              <option value={true}>男性</option>
                              <option value={false}>女性</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <label>生年月日</label>
                          <input defaultValue={student.birth} onChange={(e)=>{setBirth(e.target.value)}} type="text" className="form-control" placeholder="0000-00-00" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                        <div className="col-6">
                          <label>国籍</label>
                          <input defaultValue={student.country} onChange={(e)=>{setCountry(e.target.value)}} type="text" className="form-control" placeholder="日本" />
                        </div>
                        <div className="col-6">
                          <label>電話番号</label>
                          <input defaultValue={student.phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" className="form-control" placeholder="" />
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                      <label>住所</label>
                      <input defaultValue={student.address} onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" placeholder="" />
                    </div>
                    <div className="form-group">
                      <label>写真</label>
                      <img src={student.imgurl} width="45"/>
                      <input  onChange={(e)=>{setImage(e.target.files[0])}} type="file" className="ml-3" placeholder="" />
                    </div>

                    <div className="form-group row justify-content-center">
                      <button className="btn btn-primary" onClick={saveData}>送信</button>
                      <button className="btn btn-outline-dark mx-3" onClick={handleClose}>キャンセル</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
        </>
    );
}