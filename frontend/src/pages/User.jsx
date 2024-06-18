import React from 'react';
//import '../styles/user.css';
import axios from 'axios';
import picture from '../images/profilePic.avif';
import Account from './Account.jsx';
import Request from './Request.jsx';
import Application from './Application.jsx';
import {Navigate} from 'react-router-dom';

class User extends React.Component{
    constructor(props){
        super(props);
        this.state = {accountShow:false,requestShow:false,applicationShow:false,authentificated:true}
    }

    getUsername(){
        let urlName = window.location.href
        let tokens = urlName.split('/')
        let user = tokens[tokens.length-1]
        return user
    }

    async componentDidMount(){
        let res = await axios.get(`http://localhost:8080/getUserAfterLogin/?username=${this.getUsername()}`,{
            headers:{
                'token':localStorage.getItem('token')
            }
        })
        console.log(res.data)
        if(typeof(res.data)==typeof("")){
            console.log(res.data)
            alert("lOGIN expired")
            this.setState({authentificated:false})
        }
        else
            this.setState(res.data[0])
    }

    handleApplication = () => {
        this.setState({applicationShow:!this.state.applicationShow});
    }
    handleAccount = () => {
        this.setState({accountShow:!this.state.accountShow});
    }
    handleRequest = () => {
        this.setState({requestShow:!this.state.requestShow});
    }

    render(){
        return <div className='main'>

            <div className='profile'>
                <img className='profilePic' src={picture} alt="nonee" />
                <div className='profileInfo'>
                    <div>
                        <p>{this.state.name} </p>
                        <p>{this.state.surname}</p>
                    </div>
                    <div>
                        <p>Iznos: </p>
                        <p>{this.state.amount}</p>
                    </div>
                    
                </div>
            </div>
            <div className='options'>
                <div className='userButton'>
                    <button onClick={this.handleApplication}>Applications</button>
                    <button onClick={this.handleRequest}>Requests</button>
                    <button onClick={this.handleAccount}>Account</button>
                </div>
                <div className='userShow'>
                    <div>
                        {this.state.applicationShow && <Application username={this.state.username}/>}
                    </div>
                    <div>
                        {this.state.requestShow && <Request username={this.state.username}/>}
                    </div>
                    <div>
                        {this.state.accountShow && <Account account={this.state.id_account} />}
                    </div>
                </div>
            </div>
            <Application username={this.state.username}/>
            {!this.state.authentificated && <Navigate to='/login'/>}
        </div>
    }
}

export default User;