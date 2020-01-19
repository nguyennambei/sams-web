import React from 'react'

export default function GenSelection ({num,data,handleChoose}) {
    const handleChange= (e) =>{
        
    }
    return(
        <tr>
            <td scope="row">{num+1}限目</td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:1,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:2,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:3,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:4,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:5,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:6,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>

            <td>
                <select className="form-control" onChange={(e)=>{
                    let d = e.target.value
                    d = JSON.parse(d);
                    handleChoose({dayId:0,genId:num,item:d})
                }}>
                    <option value=""></option>
                    {data.map((item,index)=>
                        <option key={index} value={JSON.stringify(item)}>{item.name}</option>
                    )}
                </select>
            </td>
            
        </tr>
    );
}