import React, { useContext, useState} from 'react';
import { Redirect } from 'react-router-dom';
import Alert from './Alert';
import {AuthContext} from "../hooks/useAuth";
import {useTasks} from "../hooks/useTasks";

const TaskForm  =() => {
    const auth = useContext(AuthContext);
    const [ task , setTask ] = useState({id:0,description:"",whenToDo:""});
    const [ redirect , setRedirect] = useState(false);
    const tasks = useTasks();


    const onSubmitHandler =(event)=>{
        event.preventDefault();  // não faz refresh quando onSubmit é chamado
        tasks.save(task);
    }

    const onInputChangeHandler = (event)=>{
        const field = event.target.name;
        const value = event.target.value;
        setTask({...task,[field]:value});
    }

    if(!auth.isAuthenticated()){return <Redirect to="/login"/>}

    if (redirect  || tasks.taskUodated){
       return <Redirect to="/" />
    }

    return (
            <div>
                
                <div className="container">
                    {tasks.error && <Alert message={tasks.error} />}
                    <h2>{task.id!==0?"Alterar ":"Nova "} Tarefa </h2>
                        <form onSubmit={onSubmitHandler}>
                            <div className="form-group">
                                <label >Descrição</label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    value={task.description}
                                    placeholder="Digite a descrição" 
                                    onChange={onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <label>Data</label>
                                <input type="date"
                                    className="form-control"
                                    name="whenToDo"
                                    value={task.whenToDo}
                                    placeholder="Informe a data do evento" 
                                    onChange={onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disabled={tasks.processing}>
                                            {
                                                tasks.processing?
                                                    <span className="spinner-border spinner-border-sm"
                                                        role="status" aria-hidden="true"></span>
                                                    :task.id===0 ? "Gravar" : "Alterar"
                                            }
                                </button>&nbsp;&nbsp;
                                <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        disabled ={tasks.processing}
                                        onClick={()=>setRedirect(true)}
                                        >Cancelar
                                        
                                </button>
                            </div>
                            
                        </form>
                    
                </div>
            </div>
    );

}

export default TaskForm;