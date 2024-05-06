express = require('express');
http = require('http');
mysql = require('mysql');
const crypto = require('crypto');
cors = require('cors');


class functions{
    constructor(req,res,message){
        this.req = req;
        this.res = res;
        this.message = message;
    }
    
    responseToQuery = (err,data) => {
        if(err){
            console.log(err);
            this.res.end();
        }
        console.log(this.message);
        this.res.json(data);
        
    }
}

//Hash function to hash a password
function sha256(input) {
    const hash = crypto.createHash('sha256');
    console.log("b",input);
    hash.update(input);
    return hash.digest('hex');
}

//Database connection
database = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Laptop1*",
    database:"automato",
});
database.connect((err)=>{
    if(err)
        console.log(err);
    else
        console.log("Connected to database");
});

//Setting configuration of express
app = express();
app.use(express.json());
app.use(cors());

//HTTP requests
app.post("/insertUser",(req,res)=>{
    //Inser user
    queryString = "INSERT INTO user(username,name,surname,admin) VALUES(?)";
    values = [
        req.body.username,
        req.body.name,
        req.body.surname,
        req.body.admin,
    ]
    fun = new functions(req,res,"User has been successfully added");
    database.query(queryString,[values],fun.responseToQuery);

    //Insert password
    queryString = "INSERT INTO password(fk_username,hash_password) VALUES(?)";
    
    values = [
        req.body.username,
        sha256(req.body.password)
    ]
    fun = new functions(req,res,"Password is hashed");
    database.query(queryString,[values],fun.responseToQuery);

    //Insert account
    queryString = "INSERT INTO account(fk_username,amount) VALUES(?)";
    values = [
        req.body.username,
        req.body.amount
    ]
    fun = new functions(req,res,"Password is hashed");
    database.query(queryString,[values],fun.responseToQuery);
});

app.get("/getUser",(req,res)=>{
    queryString = "SELECT * FROM automato.user INNER JOIN automato.password ON automato.user.username=automato.password.fk_username WHERE automato.user.username=? AND automato.password.hash_password=?";
    console.log("a",req.query.password);
    value = [
        req.query.username,
        sha256(req.query.password)
    ];
    fun = new functions(req,res,"User is retrieved");
    database.query(queryString,value,fun.responseToQuery);
});

app.post("/insertRequest",(req,res)=>{
    queryString = "INSERT INTO request(fk_username,title,text,stage) VALUES(?)";
    values = [
        req.body.fk_username,
        req.body.title,
        req.body.text,
        1
    ]
    fun = new functions(req,res,"Request has been successfully added");
    database.query(queryString,[values],fun.responseToQuery);
});

app.get("/getRequest",(req,res)=>{
    queryString = "SELECT * FROM automato.request WHERE id_request=?";
    value = [req.query.id_request];
    fun = new functions(req,res,"Request is retrieved");
    database.query(queryString, value, fun.responseToQuery);
});

app.get("/getAllRequest",(req,res)=>{
    queryString = "SELECT * FROM request";
    let fun = new functions(req,res,"All requests are retrieved");
    database.query(queryString, fun.responseToQuery);
});


server = http.createServer(app);
server.listen(8080,()=>{
    console.log("Connected");
});
