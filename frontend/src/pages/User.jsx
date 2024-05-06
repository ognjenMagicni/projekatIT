import React from 'react';
import '../styles/generic.css';
import axios from 'axios';

class User extends React.Component{
    constructor(props){
        super(props);
    }


    render(){
        return <div>
            <div className="box">
                <input type="text" placeholder='Username' name='username' onChange={this.handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Sing up</button>
                <button>Sign in</button>
            </div>
        </div>
    }
}

export default Login;