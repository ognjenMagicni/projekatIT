import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/generic.css';
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {username:"",password:""};
    }

    handleChange = (e) => {
        this.setState( {[e.target.name]:e.target.value} );
    }

    handleClick = async ()=>{
        try{
            let res = await axios.get(`http://localhost:8080/getUser/?username=${this.state.username}&password=${this.state.password}`);
            if(res.data.length==1){

            }
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return <div>
            <div className="box">
                <input type="text" placeholder='Username' name='username' onChange={this.handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={this.handleChange}/>
                <button onClick={this.handleClick}>Sing up</button>
                <button><Link to='/signup'>Sign in</Link></button>
            </div>
        </div>
    }
}

export default Login;