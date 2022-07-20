const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment } = require('./controller');
const {getFortune} = require('./controller');
const {getCustomers} = require('./controller');
const {deleteCustomer} = require('./controller')
const {createCustomer} = require('./controller');
const {updateCustomer} = require('./controller');


app.get("/api/compliment", getCompliment);
app.get("/api/fortune", getFortune);
app.get("/api/customers", getCustomers);
app.delete('/api/customers/:id', deleteCustomer);
app.post("/api/customers", createCustomer);
app.put('/api/customers/:id', updateCustomer);


app.listen(4000, () => console.log("Server running on 4000"));
