import React, { Component } from 'react';
import TaskService from '../api/TaskService';
import { Redirect } from 'react-router-dom';

class TaskForm extends Component {
    constructor(props){
        super(props);

        this.state ={
            task : {
                id:0,  
                description:"",
                whenToDo:""
            },
            redirect:false
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    //verificar se id está na url
    componentDidMount(){
        const editId = this.props.match.params.id;
        
        
        if (editId){ //modo de edição
            const task  = TaskService.load(~~editId)// editId convertido para inteiro
            this.setState ({task :task} );
            console.log("task carregada :"+task.description +" / "+task.whenToDo); 
        }

    }

    onSubmitHandler(event){
        event.preventDefault();  // não faz refresh quando onSubmit é chamado
        TaskService.save(this.state.task)
        this.setState({redirect:true})
    }

    onInputChangeHandler(event){
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({task :{ ...prevState.task,[field]:value}}));
        console.log(this.state.task);
    }

    render() {
        if (this.state.redirect){
           return <Redirect to="/" />
        }
        
        return (
            <div>
                
                <div className="container">
                    <h2>Cadastrar Tarefa </h2>    
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <labal hrmlFor="description">Descrição</labal>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    value={this.state.task.description}
                                    placeholder="Digite a descrição" 
                                    onChange={this.onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <labal hrmlFor="whenToDo">Data</labal>
                                <input type="date"
                                    className="form-control"
                                    name="whenToDo"
                                    value={this.state.task.whenToDo}
                                    placeholder="Informe a data do evento" 
                                    onChange={this.onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>&nbsp;&nbsp;
                                <button type="button" className="btn btn-danger">Cancelar</button>
                            </div>
                            
                        </form>
                    
                </div>
            </div>
        );
    }
}

export default TaskForm;