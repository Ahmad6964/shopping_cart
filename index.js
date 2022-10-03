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
  database: "db1",
});
const a = (err) => {
  if (!err) console.log("DB connection succeeded.");
  else
    console.log(
      "DB connection is failed \n Error : " + JSON.stringify(err, undefined, 2)
    );
};
mysqlConnection.connect(a);

// CART CRUD ------------------------>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

// post in cart
app.post("/cart", (req, res) => {
  const data = {
    user_id: req.body.user_id,
    pro_id: req.body.pro_id,
    pro_qty: req.body.pro_qty,
    status: req.body.status,
  };
  mysqlConnection.query(
    `INSERT INTO cart (user_id,pro_id,pro_qty,status) VALUES (${data.user_id},${data.pro_id},${data.pro_qty},${data.status})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// insert into cart By user id
app.post("/cart/user/:user_id", (req, res) => {
  const data = {
    pro_id: req.body.pro_id,
    pro_qty: req.body.pro_qty,
    status: req.body.status,
  };
  mysqlConnection.query(
    `INSERT INTO cart (user_id,pro_id,pro_qty,status) VALUES (${req.params.user_id},${data.pro_id},${data.pro_qty},${data.status})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// Get All cart

app.get("/cart", (req, res) => {
  mysqlConnection.query("SELECT cart.cart_id, cart.user_id, users.user_name, cart.pro_id, products.pro_name, cart.pro_qty, cart.status FROM cart JOIN products ON products.pro_id = cart.pro_id JOIN users ON cart.user_id = users.user_id;", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log("succeed");
    } else console.log(err);
  });
});


// Get cart Data of dpacific user id
app.get("/cart/user/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT cart.cart_id, cart.user_id, users.user_name, cart.pro_id, products.pro_name, cart.pro_qty, cart.status FROM cart JOIN products ON products.pro_id = cart.pro_id JOIN users ON cart.user_id = users.user_id WHERE cart.user_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// Get cart Data of Spacific cart id
app.get("/cart/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM cart WHERE cart_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// Delete cart data by user id
app.delete("/cart/user/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE  FROM cart WHERE user_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// Delate cart data by cart id

app.delete("/cart/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE  FROM cart WHERE cart_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// put data by user id

app.put("/cart/:id", (req, res) => {
  const data = {
    pro_id: req.body.pro_id,
    pro_qty: req.body.pro_qty,
    status: req.body.status,
  };
  mysqlConnection.query(
    `UPDATE cart SET pro_id=${data.pro_id},pro_qty=${data.pro_qty},status=${data.status} WHERE cart_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// Orders CRUD ------------------------------>

// Get All Order

app.get("/orders", (req, res) => {
  mysqlConnection.query(`SELECT * FROM orders`, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log("succeed");
    } else console.log(err);
  });
});

// Get order  data by specific order_id

app.get("/orders/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM orders WHERE order_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// put product by order_id

app.put("/orders/order/:id", (req, res) => {
  const data = {
    user_id: req.body.user_id,
    order_status: req.body.order_status,
    order_address: req.body.order_address,
    order_amount: req.body.order_amount,
  };
  mysqlConnection.query(
    `UPDATE orders SET user_id=${data.user_id},order_status=${data.order_status},order_address="${data.order_address}",order_amount=${data.order_amount} WHERE order_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// insert into orders By user id
app.post("/orders", (req, res) => {
  const data = {
    user_id: req.body.user_id,
    order_status: req.body.order_status,
    order_address: req.body.order_address,
    order_amount: req.body.order_amount,
  };
  mysqlConnection.query(
    `INSERT INTO orders ( user_id, order_status,order_address, order_amount) VALUES (${data.user_id},${data.order_status},"${data.order_address}",${data.order_amount})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// Products Crud---------------------->

// Get All Products data

app.get("/products", (req, res) => {
  mysqlConnection.query(`SELECT * FROM products`, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log("succeed");
    } else console.log(err);
  });
});

// Get Products data by Spacific id
app.get("/products/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM products WHERE pro_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// Delate cart data by cart id

app.delete("/products/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE  FROM products WHERE pro_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// insert or post into orders
app.post("/products", (req, res) => {
  const data = {
    pro_name: req.body.pro_name,
    pro_price: req.body.pro_price,
  };
  mysqlConnection.query(
    `INSERT INTO products ( pro_name,pro_price) VALUES ("${data.pro_name}",${data.pro_price})`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// put product by order_id

app.put("/products/:id", (req, res) => {
  const data = {
    pro_name: req.body.pro_name,
    pro_price: req.body.pro_price,
  };
  mysqlConnection.query(
    `UPDATE products SET pro_name='${data.pro_name}',pro_price=${data.pro_price} WHERE pro_id=${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// Users Crud ------------------------>

// Get All Users from Users Table

app.get("/users", (req, res) => {
  mysqlConnection.query(`SELECT * FROM users`, (err, rows, fields) => {
    if (!err) {
      res.send(rows);
      console.log("succeed");
    } else console.log(err);
  });
});

// Get Products data by Spacific id
app.get("/users/:id", (req, res) => {
  mysqlConnection.query(
    `SELECT * FROM users WHERE user_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

// insert Or Post Data to users table
app.post("/users", (req, res) => {
  const data = {
    user_name: req.body.user_name,
  };
  mysqlConnection.query(
    `INSERT INTO users (user_name) VALUES ("${data.user_name}")`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// Update or Put Data in Users Table

app.put("/users/:id", (req, res) => {
  const data = {
    user_name: req.body.user_name,
  };
  mysqlConnection.query(
    `UPDATE users SET user_name='${data.user_name}' WHERE user_id=${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        console.log("succeed");
        res.send(rows);
      } else console.log(err, "errerrrrrrrrrr");
    }
  );
});

// Delate users data by user_id

app.delete("/users/:id", (req, res) => {
  mysqlConnection.query(
    `DELETE  FROM users WHERE user_id = ${req.params.id}`,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
        console.log("succeed");
      } else console.log(err);
    }
  );
});

app.listen(4000, console.log("Express server is running at port no: 4000"));
