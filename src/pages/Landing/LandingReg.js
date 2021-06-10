import React, { Component } from 'react';
import { connect } from 'react-redux';
import {authOperations} from '../../redux/auth';
import LandingClasses from  './Landing.css';

class LandingReg extends Component {
    state = {
        email: '',
        password: '',  
       };
    
       handleChange = ({target: {name, value}}) => {
           this.setState({[name]: value});
       };
    
       handleSubmit = e => {
           e.preventDefault();

           this.props.onRegister(this.state);
    
           this.setState({ email: '', password: ''});
       }
    
    render() {
        const { email, password } = this.state;

        return (
            <div>
                <section className="page">
                <div className="Box">
                <div className="logo">Questify</div>

                <h1 className="title">Questify will turn your life into <br/>
                    a thrilling game full of amazing<br/>
                    quests and exciting challenges.</h1>
                <h2 className="appeal">Write your email address to register</h2>
                  
                <form 
                onSubmit={this.handleSubmit}
                autoComplete="off">
                
                  <input 
                  type="email"
                  name="email" 
                  value={email}
                  onChange={this.handleChange}
                  placeholder='Email' 
                  className="inputEmail"/>

                  <input 
                  type="password" 
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                  placeholder='Password' 
                  className="inputPassword"/>

                  <button 
                  type="submit" 
                  className="button">go!</button>
                  </form>
                  </div>
                  </section>
            </div>
        );
    }
}

//const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
    onRegister: authOperations.register,
}

export default connect(null, mapDispatchToProps)(LandingReg);