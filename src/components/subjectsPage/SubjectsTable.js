import React from 'react'
import { firebaseApp } from '../firebaseConfig';
import EditSubject from './EditSubject'
import DeleteSubject from './DeleteSubject';


export default class SubjectsTable extends React.Component { 
    constructor(props){
        super(props);
        this.state={
            subs:[]
        }
    }
    render() {
        const {subs}=this.state;
        return (
        <tbody>
            {subs.map((item,index)=>
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.teachername}</td>
                    <td>
                        <div  className="row">
                                <EditSubject subject={item} url={this.props.url}/>    
                                <DeleteSubject subject={item} url={this.props.url}/>
                        </div>
                    </td>
                </tr>
            )}
        </tbody>
        )
    }
    componentDidMount(){
        firebaseApp.database().ref('subjectdata').child(this.props.url).on("value",snaps=>{
            let subjects=[]
            snaps.forEach((item)=>{subjects.push(item.val())})
            this.setState({subs:subjects})
        })
    }
 }