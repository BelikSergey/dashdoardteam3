import React, { Component } from 'react';
import LandingClasses from  './Landing.css';

export default class LandingReg extends Component {
    render() {
        return (
            <div>
                <section className="page">
                <div className="Box">
                <div className="logo">Questify</div>

                <h1 className="title">Questify will turn your life into <br/>
                    a thrilling game full of amazing<br/>
                    quests and exciting challenges.</h1>
                <h2 className="appeal">Write your email address to register</h2>
                  
                <form autoComplete="off">
                <label>
                  <input 
                  type="email"
                  name="email" 
                  placeholder='Email' 
                  className="inputEmail"/>
                  </label>

                  <label>
                  <input 
                  type="password" 
                  name="password"
                  placeholder='Password' 
                  className="inputPassword"/>
                  </label>

                  <button 
                  type="submit" 
                  className="button">go!</button>
                  </form>
                  </div>
                  </section>
            </div>
        )
    }
}