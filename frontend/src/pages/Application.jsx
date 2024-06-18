import React from 'react';
//import '../styles/user.css';
import AddRequest from './AddReguest.jsx'
import axios from 'axios'
import {Link,Navigate} from 'react-router-dom'

class Application extends React.Component{
    constructor(props){
        super(props);
        this.state = {listApplication:[]}
    }

        componentDidMount = async ()=>{
            try{
                let res = await axios.get(`http://localhost:8080/getAllApplication/?fk_username=${this.props.username}`)
                this.setState({listApplication:res.data})
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }

   

    render(){
        return <div className='main'>
            <div className='request'>
                <div className='inside'>
                    {this.state.listApplication.map(item => {
                        return(
                            <div className='requestUnit'>
                                <p>{item.name}</p>
                                <p>{item.title}</p>
                                <Link to={item.http_endpoint}>Open</Link>
                            </div>
                        )
                        
                    })}
                </div>
                
            </div>
        </div>
    }
}

export default Application;