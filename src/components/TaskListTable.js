import React, {Component, useContext, useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import Spinner from './Spinner';
import Moment from 'react-moment';
import {useTasks} from "../hooks/useTasks";
import {AuthContext} from "../hooks/useAuth";


const TaskListTable =()=> {
   const auth = useContext(AuthContext);
   const tasks = useTasks();

   useEffect(() => {
       if (auth.credentials.username!==null){
            tasks.list();
       }
   },[auth.credentials]);

   useEffect(()=>{
        if(tasks.taskRemoved !==null ){
            toast.success("Tarefa excluída" , {position:toast.POSITION.BOTTOM_LEFT});
            tasks.clearTaskRemoved();
        }
   },[tasks.taskRemoved]);

   const onDeleteHandler = (taskToDelete)=>{
       if (window.confirm("Você está certo disso ?")){
           tasks.remove(taskToDelete);
           //tasks.clearTaskRemoved();

       }
   }

   const onStatusChangeHandle = (taskToUpdate)=>{
       taskToUpdate.done = !taskToUpdate.done;
       tasks.save(taskToUpdate,true);
   }

    if(!auth.isAuthenticated()){return <Redirect to="/login"/>}


    return (

        <div className="container" style={{marginTop:20}}>
            <h3>Lista de Tarefas</h3>
            {tasks.error && <Alert message ={tasks.error} />}
            {tasks.processing ? <Spinner/> :
                 <table className="table table-striped">
                     <thead className="thead-dark">
                     <tr>
                         <th scope="col">Status</th>
                         <th scope="col">Descrição</th>
                         <th scope="col">Data</th>
                         <th scope="col">Ações</th>
                     </tr>
                     </thead>
                     {tasks.taskList.length === 0 ? (
                             <tbody className="thead-dark">
                             <tr>

                             </tr>
                             </tbody>
                         ):
                         (
                             <tbody>
                                    {tasks.taskList.map(task =>
                                        <tr key={task.id}>
                                            <td>
                                                <input type="checkbox"
                                                       checked={task.done}
                                                       onChange={()=>onStatusChangeHandle(task)}
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
                                                    onClick={()=>false}
                                                />&nbsp;
                                                <input
                                                    type="button"
                                                    value="Excluir"
                                                    className="btn btn-danger"
                                                    onClick={() => onDeleteHandler(task)}
                                                />
                                            </td>
                                        </tr>
                                    )}
                             </tbody>
                         )
                     }
                 </table>
            }
            <ToastContainer autoClose={2000}/>
        </div>
    );
}
export default TaskListTable;
