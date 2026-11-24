
let foods = [];
let cart = [];

async function loadFoods() {
    const res = await fetch('http://localhost:5000/foods');
    foods = await res.json();

    document.getElementById('menu').innerHTML = '';

    foods.forEach(food => {
        document.getElementById('menu').innerHTML += `
            <p>
                ${food.name} - Rs.${food.price}
                <button onclick="addToCart(${food.id})">
                    Add
                </button>
            </p>
        `;
    });
}

async function addFood() {
    const name = document.getElementById('name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;

    if (!name || !category || price === '' || Number(price) <= 0) {
        alert('Enter valid food details');
        return;
    }

    await fetch('http://localhost:5000/foods', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, category, price})
    });

    alert('Food Added Successfully');

    loadFoods();
}

function addToCart(id) {
    const food = foods.find(f => f.id === id);

    cart.push(food);

    alert(food.name + ' added to bill');
}

function generateBill() {
    let total = 0;

    document.getElementById('bill').innerHTML = '';

    cart.forEach(food => {
        document.getElementById('bill').innerHTML +=
            `<p>${food.name} - Rs.${food.price}</p>`;

        total += food.price;
    });

    document.getElementById('total').innerText =
        'Total: Rs. ' + total;
}

loadFoods();
