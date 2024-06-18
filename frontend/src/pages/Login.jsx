import React from 'react';
import {Link, Navigate} from 'react-router-dom';
import '../styles/user.css';
import axios from 'axios';

class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {username:"",password:"",loginFail:false,loginSucc:false};
    }

    handleChange = (e) => {
        this.setState( {[e.target.name]:e.target.value} );
    }

    handleClick = async ()=>{
        try{
            let res = await axios.get(`http://localhost:8080/getUser/?username=${this.state.username}&password=${this.state.password}`);
            console.log(res)
            if(res.data.auth){
                this.setState({username:res.data.result.username,loginSucc:true})
                localStorage.setItem("token",res.data.token)
           
            }
            else
                this.setState({loginFail:true})
        }catch(err){
            console.log(err);
        }
    }

    render(){
        return <div className="body">
            {this.state.loginSucc && <Navigate to={`/user/${this.state.username}`}/> }
            
            <div className="box">
                <input type="text" placeholder='Username' name='username' onChange={this.handleChange} />
                <input type="password" placeholder='Password' name='password' onChange={this.handleChange}/>
                {this.state.loginFail && <p className='wrongPass'>Wrong email or password</p>}
                <button onClick={this.handleClick}>Sing up</button>
                <button><Link to='/signup'>Sign in</Link></button>
            </div>
        </div>
    }
}

export default Login;