import React, { useState } from 'react';
import { Button, Collapse } from 'react-bootstrap';

export default function AttendItem ({student,check}){
    const [open,setOpen]= useState(false)
    const [txt,setTxt]=useState(false)
    console.log(check)
    let cA = check.filter(item=>item==='A').length;
    let cB = check.filter(item=>item==='B').length;
    let cC = check.filter(item=>item==='C').length;
    let kqcheck = (Math.round(100-(cC/3+cB)*100/check.length))
    
    return(
        <>
        <div>
        <Button
          onClick={()=>{setOpen(!open);setTxt(!txt)}}
          aria-controls="check01"
          aria-expanded={open}
        >{txt?"X":"V"}</Button>
        {student.studentId} - {student.callname}---------{kqcheck}%
        </div>
        <Collapse in={open}>
            <div id="check01">
                console.log();
                
            </div>
        </Collapse>
        </>
    );
}