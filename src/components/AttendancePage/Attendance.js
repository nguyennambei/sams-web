import React from 'react';
import {Button,Card,Table} from 'react-bootstrap';
import { firebaseApp } from '../firebaseConfig';

export default class Attendance extends React.Component {
    constructor(props){
        super(props);
        this.state={
            date: this.getNowDate()
        };
        this.database = firebaseApp.database().ref('attendance_data')
        
    }
    getNowDate() {
        const date = new Date();
            let y = date.getFullYear();
            let m = (date.getMonth()+1);
                m = (m<=9) ? '0'+m : m;
            let d = (date.getDate());
                d = (d<=9) ? '0'+d : d;
        return y+"-"+m+"-"+d;
    }
    addData = () => {
        // this.database.child('2019-12-14').update([
        //     {id_student:181001,name_student:"Aghedo",date:"2019-12-16",
        //         check1:0,reason1:null,timelate1:this.getNowDate(),
        //         check2:1,reason2:3,timelate2:this.getNowDate(),
        //         check3:0,reason3:null,timelate3:this.getNowDate(),
        //     },
        //     {id_student:181002,name_student:"Thien",date:"2019-12-16",
        //         check1:0,reason1:null,timelate1:this.getNowDate(),
        //         check2:1,reason2:3,timelate2:this.getNowDate(),
        //         check3:0,reason3:null,timelate3:this.getNowDate(),
        //     },
        // ])
    }
    handleDate = (e) => {
        const date = e.target.value;
        console.log(date)
        this.setState({date});
    }
    render() {
        const {list}=this.state;
        let filterList="";
        try{
            filterList = list.filter((item)=>(
               item.id_student===181001&&item.date==="2019-12-14"
            ));
            console.log(filterList)
        }catch(e){
            
        }
        return (
            <div>
                <h1>出席テーブル</h1>
                <hr />
                <div className="container">
                    <Card>
                        <Card.Header>
                            <input  style={{backgroundColor:"#F7F7F7",outline:"none",border:0}} 
                                    type="date"
                                    defaultValue={this.state.date}
                                    max={this.getNowDate()}
                                    onChange={this.handleDate}
                                    />
                        </Card.Header>
                        <Card.Body>
                        <Table striped bordered size="sm">
                            <thead>
                                <tr>
                                    <th>学生番号</th>
                                    <th>名前</th>
                                    <th>出席情報</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                </tr>
                            </tbody>
                        </Table>
                        </Card.Body>
                    </Card>
                    <Button onClick={this.addData}>Add Data</Button>
                </div>
            </div>
        );
    }
    componentDidMount(){
        let list = [];
        var newlist = this.database;
        newlist.once('value',snapshot=>{
            snapshot.forEach((item)=>{
                list = list.concat(item.val());
            });
            this.setState({list})
        })
    }
}