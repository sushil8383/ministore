let cartCount = 0;
let totalAmount = 0;
let cartItems = [];

const arrayItems = [
    { id: 1, name: 'table lamp', image: 'img/product-6.jpg', price: 200.00 },
    { id: 2, name: 'Dslr camera', image: 'img/cat-2.jpg', price: 150.00 },
    { id: 3, name: 'Puma shoes', image: 'img/cat-3.jpg', price: 300.00 },
    { id: 4, name: 'Skin care', image: 'img/cat-4.jpg', price: 275.00 },
    { id: 5, name: 'Hd camera', image: 'img/product-1.jpg', price: 350.00 },
    { id: 6, name: 'T-shirt', image: 'img/product-2.jpg', price: 540.00 },
    { id: 7, name: 'Drone', image: 'img/product-5.jpg', price: 500.00 },
    { id: 8, name: 'Shoes', image: 'img/product-4.jpg', price: 530.00 }
];

function viewCart() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = "block";
    document.querySelector(".whole").style.display = "none";
    document.getElementById("items-containers").style.display = "none";
}

function displaygone() {
    document.querySelector(".sidebar").style.display = "none";
    document.querySelector(".whole").style.display = "block";
    document.getElementById("items-containers").style.display = "block";
}

function saveCart() {
    localStorage.setItem('cartCount', cartCount);
    localStorage.setItem('totalAmount', totalAmount.toFixed(2));
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    
}

function loadCart() {
    const storedCartCount = localStorage.getItem('cartCount');
    const storedTotalAmount = localStorage.getItem('totalAmount');
    const storedCartItems = localStorage.getItem('cartItems');

    if (storedCartCount) cartCount = Math.max(parseInt(storedCartCount, 10), 0);
    if (storedTotalAmount) totalAmount = Math.max(parseFloat(storedTotalAmount), 0);
    if (storedCartItems) cartItems = JSON.parse(storedCartItems) || [];

    
}

// Function to add an item to the cart
function addToCart(item) {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push({ ...item, quantity: 1 });
    }
    cartCount++;
    totalAmount += item.price;
    
    saveCart();
    updateCartDisplay();
}

// Function to remove an item from the cart
function removeFromCart(item) {
    const index = cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index !== -1) {
        const itemToRemove = cartItems[index];
        if (itemToRemove.quantity > 1) {
            itemToRemove.quantity--;
        } else {
            cartItems.splice(index, 1);
        }
        cartCount = Math.max(cartCount - 1, 0);
        totalAmount = Math.max(totalAmount - item.price, 0);

        saveCart();
        updateCartDisplay();
    }
}

function placeorder(){
   
    if(cartCount>0)
        {
            alert(`your order is successfully placed with ${cartCount} items and total amount $${totalAmount}`);
        
            window.location.replace("index.html");
        }else{
            alert("cart is empty")
        }
    

    


}

// Function to update cart display
function updateCartDisplay() {
    document.getElementById('count').innerText = cartCount;
    document.getElementById('total-amount').textContent = `$${totalAmount.toFixed(2)}`;
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = ''; // Clear previous details
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';

        const itemName = document.createElement('h4');
        itemName.innerText = item.name;
        itemDiv.appendChild(itemName);

        const itemPrice = document.createElement('p');
        itemPrice.innerText = `Price: $${item.price.toFixed(2)}`;
        itemDiv.appendChild(itemPrice);

        const itemImage = document.createElement('img');
        itemImage.src = item.image;
        itemImage.alt = item.name;
        itemImage.className = 'updatedimg';
        itemDiv.appendChild(itemImage);

        const quantityDisplay = document.createElement('span');
        quantityDisplay.innerText = `Quantity: ${item.quantity}`;
        itemDiv.appendChild(quantityDisplay);

        const addButton = document.createElement('button');
        addButton.innerText = '+';
        addButton.className = 'incre';
        addButton.onclick = function() {
            addToCart(item);
        };
        itemDiv.appendChild(addButton);

        const removeButton = document.createElement('button');
        removeButton.innerText = '-';
        removeButton.className = 'decre';
        removeButton.onclick = function() {
            removeFromCart(item);
        };
        itemDiv.appendChild(removeButton);

        cartDetails.appendChild(itemDiv);
    });
}

// Function to generate HTML items
function generatesDiv() {
    const containerDiv = document.getElementById('items-containers');
    arrayItems.forEach(item => {
        const itemdiv = document.createElement('div');
        itemdiv.className = 'divrow';

        const itemsname = document.createElement('p');
        itemsname.innerText = item.name;
        itemdiv.appendChild(itemsname);

        const imgdiv = document.createElement('img');
        imgdiv.src = item.image;
        imgdiv.alt = 'img';
        imgdiv.className = 'img-fluid';
        itemdiv.appendChild(imgdiv);

        const itemPrice = document.createElement('p');
        itemPrice.innerText = item.price;
        itemdiv.appendChild(itemPrice);

        const addButton = document.createElement('button');
        addButton.className = 'add-to-cart';
        addButton.innerText = 'Add to Cart';
        addButton.onclick = function() {
            addToCart(item);
        };
        itemdiv.appendChild(addButton);

        containerDiv.appendChild(itemdiv);
    });
}

window.onload = function() {
    loadCart();
    generatesDiv();
    updateCartDisplay();
}
