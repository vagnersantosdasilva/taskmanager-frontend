import React, { Component } from 'react';
import TaskService from '../api/TaskService';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import Spinner from './Spinner';
import AuthService from '../api/AuthService';
import Moment from 'react-moment';

class TaskListTable extends Component {

    constructor(props){
        super(props)
        
        this.state = {
           
            tasks:[],
            editId:0,
            loading:false,
            alert:null
        }
        this.onDeleteHandler=this.onDeleteHandler.bind(this);
        this.onStatusChangeHandler=this.onStatusChangeHandler.bind(this);
        this.onEditHandler=this.onEditHandler.bind(this);
        this.setErrorState=this.setErrorState.bind(this);
    }

    //Quando o componente estiver pronto
    componentDidMount() {
        this.listTasks();
    }

    
    listTasks(){
        //this.setState({tasks:TaskService.list()});
        if (!AuthService.isAuthenticated()){
                return <Redirect to="/login/"/> ;
        }
        this.setState({loading:true});
        TaskService.list(
            tasks =>this.setState({tasks:tasks ,loading:false}),
            error =>this.setErrorState(error)
        );
    }

    setErrorState(error){
        this.setState({alert:`Erro na requisição :${error.message}`,loading:false})
    }

    onDeleteHandler(id){
        if (window.confirm("Tem certeza que deseja excluir a tarefa ?")){
            TaskService.delete(
                id,
                () =>{ 
                    this.listTasks();
                    toast.success("Tarefa exluída" ,{position:toast.POSITION.BOTTOM_LEFT});
                },
                error=>this.setErrorState(error)
            );
            //this.listTasks();
            
        }
    }

    onStatusChangeHandler(task){
        task.done=!task.done;

        TaskService.save(task,
            ()=>this.listTasks(),
            (error => this.setErrorState(error)));

    }

    onEditHandler(id){
        this.setState({editId:id});
        
    }

    

    render() {
        
        if(!AuthService.isAuthenticated()){return <Redirect to="/login"/>}
        
        if (this.state.editId > 0)  return <Redirect to= {`/form/${this.state.editId}`}/>
        
        return (
         
            <div className="container" style={{marginTop:20}}>
                <h3>Lista de Tarefas</h3>
                {this.state.alert!=null ? <Alert message ={this.state.alert} />:""}
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
                        {task.done ? <s><Moment format="DD/MM/YYYY">{task.whenToDo}</Moment></s> : 
                        <Moment format="DD/MM/YYYY">{task.whenToDo}</Moment> }
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