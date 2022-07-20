let customers = require('./db.json');
let globalID=1;

module.exports = {
    getCustomers:(req,res) => {
        res.status(200).send(customers)
    },

    deleteCustomer:(req,res) => {
        let index = customers.findIndex(elem => elem.id === +req.params.id)
        customers.splice(index, 1); 
        res.status(200).send(customers)
    },
//where were we suppose to console.log all 3 params query, body?
    createCustomer: (req, res) => {
        //console.log(req.body)
        const {name,email, bagTotal } =req.body;//what does this do
        let newCustomer ={
            id:globalID,
            name,
            email, 
            bagTotal: +bagTotal,
        } 
        if (!name|| !email || !bagTotal){
            res.status(400).send("Missing some information") 
        } else {
        customers.push(newCustomer);
        globalID++;
        res.status(200).send("Customer successfully added")
        }
    },

    updateCustomer: (req, res)=> {
        const {type}= req.body; //what is type
        let index = customers.findIndex(elem => elem.id === +req.params.id);
        if (type === 'minus' && customers[index].bagTotal>0){
            customers[index].bagTotal -=1;
        } else if (type ==='plus'){
            customers[index].bagTotal +=1; 
            res.status(200).send(customers);
            res.status(400).send ('Invalid');
        }
    },


    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        // choose random compliment
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes= ["Adventure can be real happiness.","Every flower blooms in its own sweet time.", "Help! I am being held prisoner in a chinese bakery!", "Po Says: Pandas like eating bamboo, but I prefer mine dipped in chocolate.", "You are soon going to change your present line of work.", "Now is the time to try something new"];

     let randomIndex = Math.floor(Math.random() * fortunes.length);
        let randomFortune = fortunes[randomIndex];
      
        res.status(200).send(randomFortune);
    },
}