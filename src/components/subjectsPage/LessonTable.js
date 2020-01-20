import React, { useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import TableSubmit from './TableSubject';

export default function LessonTable ({lessondata,deletefunc}){
    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
            </div>
            <div className="card-body">
            <Tabs defaultActiveKey="0">
                {lessondata.map((item,index)=>{
                    return <Tab key={index} eventKey={index.toString()} title={(item.datestart===item.dateend)?item.datestart:item.datestart+"~"+item.dateend}>
                        <h3>{(item.datestart===item.dateend)?item.datestart:item.datestart+"~"+item.dateend}</h3>
                        <div className="my-2">
                            <Button variant="outline-danger" onClick={()=>deletefunc(item.keyId)}>削除</Button>
                        </div>
                        <TableSubmit subjects = {item.day}/>
                    </Tab>
                })}
                
            </Tabs>
            </div>
        </div>
    )
}