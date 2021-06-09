import React, { Component } from 'react';
import LandingClasses from  './Landing.css';

export default class Landing extends Component {
    render() {
        return (
            <div>
                <section className="page">
                <div className="Box">
                <div className="logo">Questify</div>

                <h1 className="title">Questify will turn your life into <br/>
                    a thrilling game full of amazing<br/>
                    quests and exciting challenges.</h1>
                <h2 className="appeal">Write your email address to log in</h2>
                  
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

                  <a href="/reg" className="registration">registration</a>

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