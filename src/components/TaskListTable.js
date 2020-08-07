import React, { Component } from 'react';
import TaskService from '../api/TaskService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import Spinner from './Spinner';

class TaskListTable extends Component {

    constructor(props){
        super(props)
        
        this.state = {
            tasks:[],
            editId:0,
            loading:true
        }
        this.onDeleteHandler=this.onDeleteHandler.bind(this);
        this.onStatusChangeHandler=this.onStatusChangeHandler.bind(this);
        this.onEditHandler=this.onEditHandler.bind(this);
    }

    //Quando o componente estiver pronto
    componentDidMount() {
        this.listTasks();
    }

    
    listTasks(){
        this.setState({tasks:TaskService.list()});
    }

    onDeleteHandler(id){
        if (window.confirm("Tem certeza que deseja excluir a tarefa ?")){
            TaskService.delete(id);
            this.listTasks();
            toast.success("Tarefa exluída" ,{position:toast.POSITION.BOTTOM_LEFT});
        }
    }

    onStatusChangeHandler(task){
        task.done=!task.done;
        TaskService.save(task);
        this.listTasks();
    }

    onEditHandler(id){
        this.setState({editId:id});
        
    }

    render() {
        
        
        if (this.state.editId > 0)  return <Redirect to= {`/form/${this.state.editId}`}/>
        
        return (
            
            <div className="container" style={{marginTop:20}}>
                {this.state.loading ?<Spinner/> :
                    <table className="table table-striped">
                        <TableHeader/>
                        {this.state.tasks.length > 0 ?
                            <TableBody 
                                tasks={this.state.tasks}
                                onDelete={this.onDeleteHandler}
                                onStatusChange ={this.onStatusChangeHandler}
                                onEdit={this.onEditHandler}
                            />
                            :
                            <EmptyTableBody/>
                        }
                    </table>
                }
                <ToastContainer autoClose={1500}/>
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
                    <td>
                        <input type="checkbox" 
                            checked={task.done} 
                            onChange={()=>props.onStatusChange(task)}
                        />
                    </td>
                    <td>
                        {task.done ? <s>{task.description}</s> : task.description }
                    </td>
                    <td>
                        {task.done ? <s>{task.whenToDo}</s> : task.whenToDo }
                    </td>
                    <td>
                        <input 
                            type="button" 
                            value="Editar" 
                            className="btn btn-primary"
                            onClick={()=>props.onEdit(task.id)}
                        />&nbsp;
                        <input 
                            type="button" 
                            value="Excluir" 
                            className="btn btn-danger"
                            onClick={() => props.onDelete(task.id)}
                        />
                    </td>
                </tr>    
            )}
        </tbody>            
    )
}

const EmptyTableBody = (props) =>{
    return (
        <tbody>
            <tr><td colSpan="4">Nenhuma tarefa no momento</td></tr>
        </tbody>
    )
}

export default TaskListTable;