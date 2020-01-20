import React, { useState } from 'react';
import { firebaseApp } from '../firebaseConfig';

export default function StudentList({nendo}){
    const [studentlist , setStudentlist] = useState([]);
    firebaseApp.database().ref('studentdata').child('year'+nendo).on('value',snaps=>{
        snaps.forEach(item=>{
            
        })
    })
    return(
        <div></div>
    );
}