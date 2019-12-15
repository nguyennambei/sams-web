import React from 'react';
import {Button} from 'react-bootstrap';

export default class Students extends React.Component {

    render() {
        return (
            <div >
                <h1>学生情報</h1>
                <Button>学生追加</Button>
                <hr />
                <div className="container">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">学生番号</th>
                                <th scope="col">写真</th>
                                <th scope="col">名前</th>
                                <th scope="col">情報</th>
                                <th scope="col">アクション</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">181000</th>
                                <td>ABCD ADD</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                <td>
                                    <Button>編集</Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}