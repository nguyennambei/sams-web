import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import TableSubmit from './TableSubject';
import { firebaseApp } from '../firebaseConfig';

const itemRef = firebaseApp.database().ref('lessondata');
export default function LessonTable ({nendo}){
    const [lessondata, setLessondata ] = useState([]);
    itemRef.child('year'+nendo).once('value',snaps=>{
        let lessons = [];
        snaps.forEach(item=>{lessons.push(item.val())})
        setLessondata(lessons)
    })
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
            </div>
            <div className="card-body">
            <Tabs defaultActiveKey="0">
                {lessondata.map((item,index)=>{
                    return <Tab key={index} eventKey={index.toString()} title={item.datestart+"~"+item.dateend}>
                        <TableSubmit subjects = {item.day}/>
                    </Tab>
                })}
                
            </Tabs>
            </div>
        </div>
    )
}