import React from 'react';
//import '../styles/user.css';
import axios from 'axios';


class AddRequest extends React.Component{
    constructor(props){
        super(props);
        this.state = {fk_username:this.props.fk_username,title:"",text:""}
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleClick = async () => {
        try{
            await axios.post("http://localhost:8080/insertRequest",this.state)
        }catch(err){
            console.log(err)

        }
    }

    render(){
        return <div className='main'>
            <div className='request'>
                <div>
                    <p>Title</p>
                    <input onChange={this.handleChange} type="text" name="title"/>
                </div>
                <div>
                    <p>Request</p>
                    <textarea onChange={this.handleChange} type="text" name="text"></textarea>
                    
                </div>
                <button onClick={this.handleClick}>Add request</button>
            </div>
        </div>
    }
}

export default AddRequest;