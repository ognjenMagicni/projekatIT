import React from 'react';
import '../styles/user.css';
import axios from 'axios';


class Application1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {manufacturer:"",model:"",kmFrom:"",kmTo:"",ageFrom:"",ageTo:"",priceFrom:"",priceTo:""}
    }

    handleChange = (e) => {
        this.setState( {[e.target.name]:e.target.value} );
        console.log(this.state)
    }

    handleClick = async () => {
        try{
            await axios.post("http://localhost:8080/application/1/execution",this.state);

        }catch(err){
            console.log(err)
        }
    }

    render(){
        return <div className='main'>
            <div className='window'>
                <div className='forms'>
                    <div>
                        <p>Manufacturer</p>
                        

                        <input list="browsers" onChange={this.handleChange} name="manufacturer"/>

                        <datalist id="browsers">
                        <option value="Alfa Romeo"></option>
                                <option value="Audi"></option>
                                <option value="BMW"></option>
                                <option value="Citroen"></option>
                                <option value="Fiat"></option>
                                <option value="Ford"></option>
                                <option value="Mercedes Benz"></option>
                                <option value="Nissan"></option>
                                <option value="Opel"></option>
                                <option value="Peugeot"></option>
                                <option value="Renault"></option>
                                <option value="Seat"></option>
                                <option value="Toyota"></option>
                                <option value="Volkswagen"></option>
                                <option value="Volvo"></option>
                                <option value="Škoda"></option>

                        </datalist>

                        
                    </div>
                    
                    <div>
                        <p>Kilometerage</p>
                        <input type="text" onChange={this.handleChange} name="kmFrom"/>
                        <input type="text" onChange={this.handleChange} name="kmTo"/>
                    </div>
                    <div>
                        <p>Age</p>
                        <input type="text" onChange={this.handleChange} name="ageFrom"/>
                        <input type="text" onChange={this.handleChange} name="ageTo"/>
                    </div>
                    <div>
                        <p>Price</p>
                        <input type="text" onChange={this.handleChange} name="priceFrom"/>
                        <input type="text" onChange={this.handleChange} name="priceTo"/>
                    </div>
                    
        
                </div>
                <button onClick={this.handleClick}>Search</button>
            </div>
        </div>
    }
}

export default Application1;