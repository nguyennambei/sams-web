import React from 'react';

export default function ColSubject({day}) {
    // const elmSub =lesson.map((item,index)=>
    //     <div key={index} >{item.name}</div>
    // )
    let elmSub = '';
    try {
        if(day.lesson){
            elmSub = day.lesson.map((item,index)=>
                <div className="text-center my-2" key={index}>{index+1}限：{item.name}</div>
            )
        }
        
    } catch (error) {
        
    }
    return(
        <td>{elmSub}</td>
        
    );
  }