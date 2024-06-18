import React from 'react';
//import '../styles/user.css';
import axios from 'axios';

class Account extends React.Component{
    constructor(props){
        super(props);
        this.state = {fetchData:false}
    }

    async componentDidMount(){
        try{
            let res = await axios.get(`http://localhost:8080/getAccount/?account=${this.props.account}`)
            this.setState(res.data[0])
            this.setState({fetchData:true})
        }catch(ex){
            console.log(ex)
        }
    }

    handleUpdate = async () => {
        try{
            await axios.put("http://localhost:8080/updateAccount",this.state)
            this.componentDidMount()
            
        }
        catch(err){
            console.log(err)
        }

    }
    handleChange = (e) => {
        this.setState({[e.target.name]:e.target.value})
       
    }
    render(){
        return <div className='account'>
            <h3>Account</h3>
            <div>
                <p>No. account</p>
                <p>{this.state.id_account}</p>
            </div>
            <div>
                <p>Amount</p>
                
                <p>{this.state.amount}</p>
            </div>
            <div>
                <p>Top up</p>
                <input onChange={this.handleChange} type="number" name="addVal" />
            </div>
            <button onClick={()=>{this.handleUpdate()}}>Upload</button>
        </div>
    }
}

export default Account;