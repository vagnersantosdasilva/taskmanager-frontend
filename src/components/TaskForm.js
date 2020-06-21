import React, { Component } from 'react';

class TaskForm extends Component {
    constructor(props){
        super(props);

        this.state ={
            task : {
                id:0,  
                description:"",
                whenToDo:""
            }
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
    }

    onSubmitHandler(event){
        event.preventDefault();  // não faz refresh quando onSubmit é chamado
    }

    onInputChangeHandler(event){
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({task :{ ...prevState.task,[field]:value}}));
        console.log(this.state.task);
    }

    render() {
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
                                    placeholder="Digite a descrição" 
                                    onChange={this.onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <labal hrmlFor="whenToDo">Data</labal>
                                <input type="date"
                                    className="form-control"
                                    name="whenToDo"
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