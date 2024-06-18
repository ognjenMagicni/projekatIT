import React from 'react';
//import '../styles/user.css';
import AddRequest from './AddReguest.jsx'
import axios from 'axios'

class Request extends React.Component{
    constructor(props){
        super(props);
        this.state = {addRequest:false,listRequest:[]}
    }

        componentDidMount = async ()=>{
            try{
                let res = await axios.get(`http://localhost:8080/getAllRequest/?fk_username=${this.props.username}`)
                this.setState({listRequest:res.data})
                console.log(res.data)
            }catch(err){
                console.log(err)
            }
        }

    handleClick= ()=>{
        this.setState({addRequest:!this.state.addRequest})
    }

    render(){
        return <div>
            <div className='request'>
                <div className='inside'>
                    {this.state.listRequest.map(item=>{
                        return(
                        <div className='requestUnit' key={item.id_request}>
                            <p>{item.title}</p>
                            {(item.stage==1)?(
                                <div className='requestBox' style={{background:'yellow'}}></div>
                                ):((item.stage==2)?(<div className='requestBox' style={{background:'blue'}}></div>):<div className='requestBox' style={{background:'green'}} ></div>)}
                            
                        </div>
                        )
                    })}
                </div>
                <button onClick={this.handleClick}>Add a request</button>
                {this.state.addRequest &&
                <AddRequest fk_username={this.props.username}/>}
            </div>
        </div>
    }
}

export default Request;