import React, { Component } from 'react';
import TaskService from '../api/TaskService';
import { Redirect } from 'react-router-dom';
import AuthService from '../api/AuthService';
import Spinner from './Spinner';
import Alert from './Alert';

class TaskForm extends Component {
    constructor(props){
        super(props);

        this.state ={
            task : {
                id:0,  
                description:"",
                whenToDo:""
            },
            redirect:false,
            buttonName:"Cadastrar",
            alert:null,
            loading:false,
            saving:false
        }

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.onInputChangeHandler = this.onInputChangeHandler.bind(this);
        this.setErrorState = this.setErrorState.bind(this);
    }

    //verificar se id está na url
    componentDidMount(){
        const editId = this.props.match.params.id;
        console.log(~~editId)
        this.setState({loading:true});
       
        if (~~editId!==0){ //modo de edição
              TaskService.load( 
              ~~editId,
                task => this.setState({task:task,buttonName:"Alterar"}),
                error =>{
                    this.setErrorState(error);
                }
            );// editId convertido para inteiro
        }
        this.setState({loading:false});
        

    }

    setErrorState(error){
        this.setState({alert:error.message ,loadiong:false,saving:false});
    }

    onSubmitHandler(event){
        this.setState({saving:true});
        event.preventDefault();  // não faz refresh quando onSubmit é chamado
        TaskService.save(
            this.state.task,
            () =>this.setState({redirect:true,saving:false,alert:null}),
            error => {
                if(error.response){
                    this.setErrorState(`Erro ao carregar dados ; ${error.response}`);
                }else{
                    this.setErrorState(`Erro na requisição :${error.message}`);
                }
            }
        )
        
    }

    onInputChangeHandler(event){
        const field = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({task :{ ...prevState.task,[field]:value}}));
        console.log(this.state.task);
    }

    render() {
        if(!AuthService.isAuthenticated()){return <Redirect to="/login"/>}
        if (this.state.redirect){
           return <Redirect to="/" />
        }

        if (this.state.loading){
            return <Spinner />
        }
        
        return (
            <div>
                
                <div className="container">
                    {this.state.alert!=null? <Alert message={this.state.alert} />:""}
                    <h2>{this.state.buttonName} Tarefa </h2>    
                        <form onSubmit={this.onSubmitHandler}>
                            <div className="form-group">
                                <label description="description">Descrição</label>
                                <input type="text"
                                    className="form-control"
                                    name="description"
                                    value={this.state.task.description}
                                    placeholder="Digite a descrição" 
                                    onChange={this.onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <label data="whenToDo">Data</label>
                                <input type="date"
                                    className="form-control"
                                    name="whenToDo"
                                    value={this.state.task.whenToDo}
                                    placeholder="Informe a data do evento" 
                                    onChange={this.onInputChangeHandler}/>
                            </div>

                            <div className="form-group">
                                <button 
                                        type="submit" 
                                        className="btn btn-primary"
                                        disable={this.state.saving}>
                                            {
                                                
                                                this.state.saving?
                                                    <span className="spinner-border spinner-border-sm"
                                                        role="status" aria-hidden="true"></span>
                                                    :this.state.buttonName
                                            }
                                            

                                </button>&nbsp;&nbsp;
                                <button 
                                        type="button" 
                                        className="btn btn-primary"
                                        onClick={()=>{this.setState({redirect:true})}}
                                        >Cancelar
                                        
                                </button>
                            </div>
                            
                        </form>
                    
                </div>
            </div>
        );
    }
}

export default TaskForm;