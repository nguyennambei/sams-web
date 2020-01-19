import React from 'react';

export default function TableSubmit ({subjects}) {
    
    return (
    <div>
        <h3>
            2018-04-06 ~ 2018-06-06
        </h3>
        <table className="table table-bordered">
            <thead>
                <tr>
                <th>月曜日</th>
                <th>火曜日</th>
                <th>水曜日</th>
                <th>木曜日</th>
                <th>金曜日</th>
                <th>土曜日</th>
                <th>日曜日</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        <ColSubject lesson={subjects[1]}/>
                    </td>
                    <td>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p>
                    </td>
                    <td>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p>
                    </td>
                    <td>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p>
                    </td>
                    <td>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p>
                    </td>
                    <td>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p>
                    </td>
                    <td>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p><br/>
                        <p className="badge badge-primary">プログラミング演習</p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    );
}

function ColSubject({lesson}) {
    // let elmSub =lesson.map((item,index)=>
    //     <p className="badge badge-primary">{item.name}</p>
    // )
    console.log(lesson)
    return(
        // {elmSub}
        <h1>ad</h1>
    );
  }