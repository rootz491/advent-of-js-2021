const menuItems = [
    {
        name: 'French Fries with Ketchup',
        price: 223,
        image: 'plate__french-fries.png',
        alt: 'French Fries',
        count: 2
    },
    {
        name: 'Salmon and Vegetables',
        price: 512,
        image: 'plate__salmon-vegetables.png',
        alt: 'Salmon and Vegetables',
        count: 0
    },
    {
        name: 'Spaghetti Meat Sauce',
        price: 423,
        image: 'plate__spaghetti-meat-sauce.png',
        alt: 'Spaghetti with Meat Sauce',
        count: 1
    },
    {
        name: 'Bacon, Eggs, and Toast',
        price: 599,
        image: 'plate__bacon-eggs.png',
        alt: 'Bacon, Eggs, and Toast',
        count: 1
    },
    {
        name: 'Chicken Salad with Parmesan',
        price: 698,
        image: 'plate__chicken-salad.png',
        alt: 'Chicken Salad with Parmesan',
        count: 0
    },
    {
        name: 'Fish Sticks and Fries',
        price: 634,
        image: 'plate__fish-sticks-fries.png',
        alt: 'Fish Sticks and Fries',
        count: 0
    }
];

let finalSubtotal = 0;
let finalTax = 0;
let finalTotal = 0;

const $ = name => document.querySelector(name);

const cartSummary = $('.cart-summary');
const cartItemTemplate = $('#summary-item');

// return the total count of the cart items
const getAllCounts = () => {
    let count = 0;
    menuItems.forEach(item => {
        count += item.count;
    })
    return count;
}

// update cart summary
const updateCartSummary = () => {
    if (getAllCounts() === 0) {
        cartSummary.innerHTML = `<li class="empty">Your cart is empty</li>`
    } else {
        let price = 0;
        menuItems.forEach(item => {
            if (item.count > 0) {
                price += item.price * item.count;
                addItemToCart(item);
            }
            updateCartTotal(price);
        });
        
    }
}

const addItemToCart = (item) => {
    let content = cartItemTemplate.content;
    let clone = content.cloneNode(true);
    // update cloned template values
    clone.querySelector('#plateImg').src = `images/${item.image}`;
    clone.querySelector('#plateImg').alt = item.alt;
    clone.querySelector('.menu-item').innerText = item.name;
    updateQuantityOfCartItem(clone, item.count);
    // console.log(clone);
    updatePriceOfCartItem(clone, item.price, item.count);
    itemIncrementListener(clone, item);
    // add clone to cart summary list
    cartSummary.appendChild(clone);
}

// update item quantity of cart item
const updateQuantityOfCartItem = (item, count) => {
    let quantities = item.querySelectorAll('.quantity');
    quantities.forEach(quantity => {
        // console.log(quantity);
        quantity.innerText = count;
    });
}

// update item price of cart item
const updatePriceOfCartItem = (item, price, count) => {
    item.querySelector('.price').innerText = `$${price}`;
    item.querySelector('.subtotal').innerText = `$${price * count}`;
}

// update cart total
const updateCartTotal = price => {
    finalSubtotal = price;
    finalTax = finalSubtotal * 0.0975;
    finalTotal = finalSubtotal + finalTax;
    $('#subtotal-amount').innerText = `$${finalSubtotal}`;
    $('#tax-amount').innerText = `$${finalTax}`;
    $('#total-amount').innerText = `$${finalTotal}`;
}

const itemIncrementListener = (element, item) => {
    let btn = element.querySelector('.increase');
    btn.addEventListener('click', () => {
        menuItems.forEach(menuItem => {
            if (menuItem.name === item.name) {
                menuItem.count += 1;
                updateQuantityOfCartItem(element, menuItem.count);
                // updatePriceOfCartItem(element, menuItem.price, menuItem.count);
                updateCartTotal(finalSubtotal + menuItem.price);
            }
        });
    });
}

updateCartSummary();