import React, { Component } from 'react';
import AuthService from '../api/AuthService';
import Alert from './Alert';
import { Redirect } from 'react-router-dom';

class Login extends Component {

   constructor(props){
       super(props);
       this.state = {
           username :"",
           password:"",
           alert:null,
           processing:false,
           loggedIn:false
       }
       this.handleInputChanged=this.handleInputChanged.bind(this);
       this.handleSubmit=this.handleSubmit.bind(this);
       this.handleLoginResponse = this.handleLoginResponse.bind(this);
   }

   handleSubmit(event){
       event.preventDefault();
       AuthService.login(this.state.username,this.state.password,this.handleLoginResponse);

   }
   handleLoginResponse(success){
       if (success){
            this.setState({loggedIn:true});
       }else{
           this.setState({alert:"O login não pode ser realizado"})
       }
   }


   handleInputChanged(event){
       const field = event.target.name;
       const value = event.target.value;
       this.setState({[field]:value});

   }

    render() {

        if (this.state.loggedIn){
            return <Redirect to ="/"  />
        }
        return (
            <div>                
            <div className="container">
                <h2>Login</h2>
                {this.state.alert!==null?<Alert message={this.state.alert}/>:""}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Usuário</label>
                        <input 
                            type = "text"
                            className = "form-control"
                            onChange = {this.handleInputChanged}
                            value={this.state.username} 
                            name = "username"
                            placeholder="Digite o usuário"/>

                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input 
                            type = "password"
                            className = "form-control"
                            onChange = {this.handleInputChanged}
                            value={this.state.password} 
                            name = "password"
                            placeholder="Digite a senha"/>

                    </div>

                    <button type="submit"
                            className="btn btn-primary"
                            disabled={this.state.processing}
                            >Login
                    </button>

                     
                </form>
            </div>
            </div>
                
        );
    }
}

export default Login;