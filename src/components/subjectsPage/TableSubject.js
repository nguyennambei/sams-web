import React from 'react';
import ColSubject from './ColSubject';

export default function TableSubmit ({subjects}) {
    return (
    <div>
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
                    <ColSubject day={subjects[1]}/>
                    <ColSubject day={subjects[2]}/>
                    <ColSubject day={subjects[3]}/>
                    <ColSubject day={subjects[4]}/>
                    <ColSubject day={subjects[5]}/>
                    <ColSubject day={subjects[6]}/>
                    <ColSubject day={subjects[0]}/>
                    
                </tr>
            </tbody>
        </table>
    </div>
    );
}
