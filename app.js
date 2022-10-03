const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

var app = express();
const bodyparser = require("body-parser");
const { request } = require("express");
app.use(bodyparser.json());
app.use(cors());
// Localhost 3000

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});
const a = (err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
};
mysqlConnection.connect(a);

// Get All Products From Products Table
app.get("/", function (req, res) {
    mysqlConnection.query("SELECT * FROM products", (err, result) => {
        res.send(result);
    });
});

app.post("/createUser", function (req, res) {

    const data = {user_id:req.body.user_id,user_name:req.body.user_name}
    mysqlConnection.query(`INSERT INTO cart (user_id) VALUES (${data.user_id})`,(err,result,field)=>{
            if(!err){
                res.send(result);
            }else{
                res.send(err);
            }

        }
    );
});

//Get All Products With Category Name
app.get("/products", function (req, res) {
    mysqlConnection.query("SELECT products.pro_id,products.pro_name,products.cat_id,products.pro_price,category.cat_name FROM products JOIN category ON products.cat_id = category.cat_id;", (err, result) => {
        if(!err){
            res.send(result);
        }else{
            res.send(err);
        }
    });
});

// Get Cart Items of Spacific User id
app.get('/cartItems/:id',(req,res)=>{
    mysqlConnection.query(`SELECT users.user_name,users.user_id,cart_items.item_id,cart_items.pro_id,cart_items.cart_id,cart_items.pro_qty,products.pro_name,
    category.cat_name From cart_items
    JOIN products ON cart_items.pro_id = products.pro_id
    JOIN category ON products.cat_id = category.cat_id
    JOIN cart ON cart_items.cart_id = cart.cart_id
    JOIN users ON cart.user_id = users.user_id
    WHERE users.user_id = ?`,[req.params.id],(err,result)=>{
        if(!err){
           res.send(result);
        }else{
            res.send(err);
        }
    })
})

// Get All users data and cart id

app.get('/users', (req,res)=>{
    mysqlConnection.query('SELECT users.user_id,users.user_name,cart.cart_id FROM cart JOIN users ON users.user_id = cart.user_id;',(err,result)=>{
        if(!err){
            res.send(result);
         }else{
             res.send(err);
         }
    })
})


// -------------------------------------------------->

app.listen(3000, console.log("Express server is running at port no: 3000"));