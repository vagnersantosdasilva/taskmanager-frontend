import React, { Component } from 'react';

class TaskListTable extends Component {
    render() {
        return (
            <div className="container">
                <table className="table">
                    <TableHeader></TableHeader>
                    <TableBody></TableBody>
                </table>
            </div>
        );
    }
}

const TableHeader = () =>{
    return (
        <thead>
            <tr>
                <th>Status</th>
                <th>Descrição</th>
                <th>Data</th>
                <th>Acões</th>
            </tr>
        </thead>
    )
}

const TableBody =() =>{
return (
    <tr> 
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>4</td>
    </tr>
)
}

export default TaskListTable;