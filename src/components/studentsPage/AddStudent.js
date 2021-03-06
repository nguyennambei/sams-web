import React,{useState} from 'react';
import {Modal,Button} from 'react-bootstrap';
import {firebaseApp} from '../firebaseConfig';

export default function AddStudent ({student,nendo}) {
    const [show,setShow] = useState(false);
    const [name,setName] = useState('');
    const [furiname,setFuriname] = useState('');
    const [callname,setCallname] = useState('');
    const [studentId,setStudentId] = useState('');
    const [gender,setGender] = useState('');
    const [birth,setBirth] = useState('');
    const [country,setCountry] = useState('');
    const [phone,setPhone] = useState('');
    const [address,setAddress] = useState('');
    const [image,setImage] = useState('');
    const [url,setUrl] = useState('');

    const [checkImg,setCheckImg]= useState(true)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveData = () => {
       if(image === ''){
         setCheckImg(false)
       } else {
         const uploadTask = firebaseApp.storage().ref(`student${nendo}/${image.name}`).put(image);
         uploadTask.then(
           ()=>{
             firebaseApp.storage()
              .ref(`student${nendo}`)
              .child(image.name)
              .getDownloadURL()
              .then(url=>{
                setUrl(url);
                const newKeyId = firebaseApp.database().ref().push().key;
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
                  keyId:newKeyId
                }
                let updata ={}
                updata['studentdata/year'+nendo+'/'+newKeyId]=student;
                firebaseApp.database().ref().update(updata);
                setShow(false)
              })
           }
         )
       }
    }
    return(
        <>
        <Button variant="info" size="sm" onClick={handleShow}>学生追加</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
              <h4>{nendo}年度　―　学生追加</h4>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="form-group">
                      <label>名前</label>
                      <input onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" placeholder="読売 or YOMIURI" />
                    </div>
                    <div className="form-group">
                      <label>フリガナ</label>
                      <input onChange={(e)=>{setFuriname(e.target.value)}} type="text" className="form-control" placeholder="ヨミウリ" />
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-6">
                          <label>呼び名前</label>
                          <input onChange={(e)=>{setCallname(e.target.value)}} type="text" className="form-control" placeholder="" />
                        </div>
                        <div className="col-6">
                          <label>学生番号</label>
                          <input onChange={(e)=>{setStudentId(e.target.value)}} type="text" className="form-control" placeholder="0000000" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-6">
                          <label>性別</label>
                          <select className="form-control" onChange={(e)=>{setGender(e.target.value)}} name="gender">
                              <option value="null">選択</option>
                              <option value={true}>男性</option>
                              <option value={false}>女性</option>
                          </select>
                        </div>
                        <div className="col-6">
                          <label>生年月日</label>
                          <input onChange={(e)=>{setBirth(e.target.value)}} type="text" className="form-control" placeholder="0000-00-00" />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                    <div className="row">
                        <div className="col-6">
                          <label>国籍</label>
                          <input onChange={(e)=>{setCountry(e.target.value)}} type="text" className="form-control" placeholder="日本" />
                        </div>
                        <div className="col-6">
                          <label>電話番号</label>
                          <input onChange={(e)=>{setPhone(e.target.value)}} type="text" className="form-control" placeholder="" />
                        </div>
                        </div>
                    </div>
                    <div className="form-group">
                      <label>住所</label>
                      <input onChange={(e)=>{setAddress(e.target.value)}} type="text" className="form-control" placeholder="" />
                    </div>
                    <div class="form-group">
                      <label>写真</label>
                      <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" className="ml-3" placeholder="" />
                      {checkImg?'':<small className="text-danger">学生の写真をアップロードしてください</small>}
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