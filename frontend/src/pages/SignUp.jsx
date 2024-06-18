import React from 'react';
import axios from 'axios';
import {Navigate} from 'react-router-dom';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {username:"",name:"",surname:"",amount:"",password:"",repeatpass:"",admin:0, singup:false,userError:false,passError:false,longPassError:false,goBack:false};
    }

   handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value});
   }

   handleClick = async () => {
        this.setState({userError:false,passError:false,longPassError:false});
        if(this.state.username==""){
            console.log("Username empty");
            this.setState({userError:true});
            return;
        }
        if(this.state.password!=this.state.repeatpass){
            console.log("Password does not match");
            this.setState({passError:true});
            return;
        }
        if(this.state.password.length<8){
            this.setState({longPassError:true});
            return
        }
        try{
            await axios.post("http://localhost:8080/insertUser",this.state);
            this.setState({signup:true});
        }catch(err){
            console.log(err);
        }
   }

   handleClickGoBack = ()=>{
    this.setState({goBack:true});
   }

    render(){
        return <div className='body'>
            {this.state.goBack && <Navigate to="/login"/>}
            <div className="box">
                { <div className="signUpSucc">
                        <p className='goodPass'>You have successfully signed in. Go back to log in page</p>
                        <button className='goodPass' onClick={this.handleClickGoBack}>Go back</button>
                    </div>}
                <input type="text" placeholder='Username' name='username' onChange={this.handleChange} />
                {this.state.userError && <p className='wrongPass'>You have to insert username</p>}
                <input type="text" placeholder='Name' name='name' onChange={this.handleChange}/>
                <input type="text" placeholder='Surname' name='surname' onChange={this.handleChange}/>
                <input type="text" placeholder='Amount' name='amount' onChange={this.handleChange}/>
                <input type="password" placeholder='Password' name='password' onChange={this.handleChange}/>
                <input type='password' placeholder='Repeat password' name="repeatpass" onChange={this.handleChange}/>
                {this.state.passError && <p className='wrongPass'>Passwords are different</p>}
                {this.state.longPassError && <p className='wrongPass'>Password should have at least 8 chars!</p>}
                <button onClick={this.handleClick}>Sing up</button>
                
            </div>
        </div>
    }
}

export default SignUp;