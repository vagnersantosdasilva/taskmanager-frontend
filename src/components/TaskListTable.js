import React, { Component } from 'react';
import TaskService from '../api/TaskService';

class TaskListTable extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            tasks:[]
        }
    }

    //Quando o componente estiver pronto
    componentDidMount() {
        this.listTasks();
    }

    //TODO:pegar a lista de tarefas do servico e colocar no  state local
    listTasks(){
        this.setState({tasks:TaskService.list()});
    }

    render() {
        return (
            <div className="container" style={{marginTop:20}}>
                <table className="table table-striped">
                    <TableHeader/>
                    <TableBody tasks={this.state.tasks}/>
                </table>
            </div>
        );
    }
}




const TableHeader = () =>{
    return (
        <thead className="thead-dark">
            <tr>
                <th scope="col">Status</th>
                <th scope="col">Descrição</th>
                <th scope="col">Data</th>
                <th scope="col">Ações</th>
            </tr>
        </thead>
    )
}

const TableBody =(props) =>{
    
    return (
        <tbody>
            {props.tasks.map(task => 
                <tr key={task.id}> 
                    <td><input type="checkbox" checked={task.done}/></td>
                    <td>{task.description}</td>
                    <td>{task.whenToDo}</td>
                    <td>
                        <input type="button" value="Editar" className="btn btn-primary"/>&nbsp;
                        <input type="button" value="Excluir" className="btn btn-danger"/>
                    </td>
                </tr>    
            )}
        </tbody>            
    )
}

export default TaskListTable;