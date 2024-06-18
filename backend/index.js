express = require('express');
http = require('http');
mysql = require('mysql');
const crypto = require('crypto');
cors = require('cors');
const {execFile} = require("child_process");
jwt = require("jsonwebtoken")

//CONSTANTS
JWTPassword = "password"

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

verifyJWT = (req,res,next) => {
    console.log("VerifyJWT se pokrenulo")
    const token = req.headers["token"]
    console.log(token)
    if(!token){
        res.send("Token does not exist")
        
    }
    else{
        jwt.verify(token,JWTPassword,(err,decode)=>{
            if(err){
                console.log(err)
                res.send("Crror occured while verifying")
                return
            }
            console.log("pass")
            next()
            
        })
    }
}

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
    value = [
        req.query.username,
        sha256(req.query.password)
    ];
    fun = new functions(req,res,"User is retrieved");
    database.query(queryString,value,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
            return;
        }
        if(!data[0]){
            res.json({auth:false})
            res.end()
            return
        }
        user = data[0].name
        token = jwt.sign( {user}, JWTPassword,{expiresIn:300} )
        res.json({auth:true,token:token,result:data[0]})
        res.end()
    });
});

app.get("/getUserAfterLogin",verifyJWT,(req,res)=>{
    queryString = "SELECT * FROM automato.user INNER JOIN automato.account ON automato.user.username=automato.account.fk_username WHERE automato.user.username=?";
    
    value = [
        req.query.username
    ];
    fun = new functions(req,res,"User is retrieved");
    database.query(queryString,value,fun.responseToQuery);
});

app.post("/insertRequest",(req,res)=>{
    queryString = "INSERT INTO automato.request(fk_username,title,text,stage) VALUES(?)";
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
    queryString = "SELECT * FROM request WHERE automato.request.fk_username = ?";
    value = [req.query.fk_username]
    let fun = new functions(req,res,"All requests are retrieved");
    database.query(queryString, value ,fun.responseToQuery);
});

app.get("/getAllApplication",(req,res)=>{
    queryString = "SELECT * FROM automato.application INNER JOIN automato.request ON automato.application.fk_request=automato.request.id_request WHERE automato.request.fk_username = ?";
    value = [req.query.fk_username]
    let fun = new functions(req,res,"All applications are retrieved");
    database.query(queryString, value ,fun.responseToQuery);
});

app.get("/getAccount",(req,res)=>{
    stringQuery = "SELECT * FROM automato.account WHERE id_account = ?";
    value = [req.query.account]
    fun = new functions(req,res,"Account is retrieved");
    database.query(stringQuery,[value],fun.responseToQuery);
});

app.put("/updateAccount",(req,res)=>{
    newValAcc = parseFloat(req.body.amount) + parseFloat(req.body.addVal);
    stringQuery = "UPDATE automato.account SET automato.account.amount=? WHERE automato.account.id_account=?"
    values = [newValAcc, req.body.id_account];
    fun = new functions(req,res,"You update account successfully");
    database.query(stringQuery,values,fun.responseToQuery);
});

app.post("/application/1/execution",(req,res)=>{
    ageFrom = req.body.ageFrom;
    ageTo = req.body.ageTo;
    kmFrom = req.body.kmFrom;
    kmTo = req.body.kmTo;
    manufacturer = req.body.manufacturer;
    priceFrom = req.body.priceFrom;
    priceTo = req.body.priceTo;

    pythonPath = "C:\\Users\\Asus\\AppData\\Local\\Programs\\Python\\Python311\\python.exe";
    scriptPath = "C:\\Users\\Asus\\Desktop\\Ognjen\\Python\\putovanja\\apkForIT.py";
    argument = [manufacturer ,ageFrom, ageTo, kmFrom, kmTo, priceFrom, priceTo ]


    execFile( pythonPath, [scriptPath, ...argument], (error,stdout,stderr)=>{
        if(error){
            console.log("Error has occured",error);
            return ;
        }
        if(stderr){
            console.log("Inside file an error has occured",stderr);
            return ;
        }
        console.log("Everything works fine",stdout);
    } )
});

server = http.createServer(app);
server.listen(8080,()=>{
    console.log("Connected");
});
