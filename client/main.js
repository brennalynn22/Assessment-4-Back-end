


const form = document.querySelector('form')


const baseURL = "http://localhost:4000/api/customers"

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")
const errCallback= err => console.log(err.response.data)
const customerCallback = ({data:customers})=> displayCustomers(customers)
const getCustomers = () => axios.get(baseURL).then(customerCallback).catch(errCallback)

const createCustomer = body => axios.post(baseURL, body).then
const deleteCustomer = id => axios.delete(`${baseURL}/${id}`).then(customerCallback).catch(errCallback)
const updateCustomer = (id, type) => axios.put (`${baseURL}/${id}`, {type}).then(customerCallback).catch(errCallback)

//Question to ask: what is the customer callback doing? ie data:custoers and wha tis the errcallback doing

function submitCustomer(e) {
    e.preventDefault()
    let name = document.querySelector('#id')
    let email= document.querySelector('#email')
    let bagTotal = document.querySelector('#bagNumber')

    let bodyOBJ ={
        name: name.value,
        email: email.value,
        bagTotl: bagTotal.value
    }

    createCustomer(bodyObj)

    name.value = ''
    email.value = ''
    bagTotal.value = ''

}

const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data)
    });
};

complimentBtn.addEventListener('click', getCompliment);


const getFortune =() => {
    axios.get('http://localhost:4000/api/fortune/')
    .then(res => {
        const data = res.data;
            alert(data);
        
    }); 
};
fortuneBtn.addEventListener('click', getFortune);

function displayCustomers (arr) {
    customerContainer.innerHTML = ``
    for (let i=0; i< arr.length; i++){
        createCustomerCard(arr[i])
    }
}

form.addEventListener('submit', submitCustomer)