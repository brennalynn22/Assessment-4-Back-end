

const customerContainer = document.querySelector('#customer-container')
const form = document.querySelector('form')


const baseURL = "http://localhost:4000/api/customers"

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const customerCallback = ({data:customers})=> displayCustomers(customers)
const errCallback= err => console.log(err.response.data)

const getAllCustomers = () => axios.get(baseURL).then(customerCallback).catch(errCallback)
const createCustomer = body => axios.post(baseURL, body).then(customerCallback).catch(errCallback)
const deleteCustomer = id => axios.delete(`${baseURL}/${id}`).then(customerCallback).catch(errCallback)
const updateCustomer = (id, type) => axios.put (`${baseURL}/${id}`, {type}).then(customerCallback).catch(errCallback)

//Question to ask: what is the customer callback doing? ie data:custoers and wha tis the errcallback doing

function submitHandler(e) {
    e.preventDefault()
    let name = document.querySelector('#name')
    let email= document.querySelector('#email')
    let bagTotal = document.querySelector('#bagNumber')

    let bodyObj={
        name: name.value,
        email: email.value,
        bagTotal: bagTotal.value
    }

    createCustomer(bodyObj)

    name.value = ''
    email.value = ''
    bagTotal.value = ''

}

function createCustomerCard(customer) {
    const customerCard=document.createElement('div')
    customerCard.classList.add('customer-card')

    customerCard.innerHTML =`<p class="name">${customer.name}</p>
    <p class="email">${customer.email}</p>
    <div class="btns-container">
        <button onclick="updateCustomer(${customer.id}, 'minus')">-</button>
        <p class="bag-total">${customer.bagTotal}</p>
        <button onclick="updateCustomer(${customer.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteCustomer(${customer.id})">delete</button>
     `

     customerContainer.appendChild(customerCard)

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

form.addEventListener('submit', submitHandler)

getAllCustomers()

