// Menu items with working image URLs
const menuItems = [
    { id: 1, name: "Espresso", price: 100, image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=facearea&w=160&h=160" },
    { id: 2, name: "Cappuccino", price: 120, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=facearea&w=160&h=160" },
    { id: 3, name: "Latte", price: 130, image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=facearea&w=160&h=160" },
    { id: 4, name: "Mocha", price: 140, image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=facearea&w=160&h=160" },
    { id: 5, name: "Iced Coffee", price: 110, image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=facearea&w=160&h=160" },
    { id: 6, name: "Blueberry Muffin", price: 60, image: "blueberry.jpg" },
    { id: 7, name: "Croissant", price: 50, image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=facearea&w=160&h=160" },
    { id: 8, name: "Chocolate Cake", price: 80, image: "chococake.jpg" },
    { id: 9, name: "Cheese Sandwich", price: 90, image: "sandwich.jpg" },
    { id: 10, name: "Veg Puff", price: 45, image: "puff.jpg" },
    { id: 11, name: "Lemon Iced Tea", price: 70, image: "tea.jpg" },
    { id: 12, name: "Brownie", price: 65, image: "Brownie.png" },
    { id: 13, name: "Paneer Wrap", price: 100, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=facearea&w=160&h=160" }
];

let cart = [];

// Populate menu with images and buttons
const menuListEl = document.getElementById('menu-list');
menuItems.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="menu-img" />
        <div class="menu-info">
            <span class="item-title">${item.name}</span>
            <span class="item-price">₹${item.price}</span>
        </div>
        <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
    `;
    menuListEl.appendChild(li);
});

// Cart logic
window.addToCart = function(id) {
    const found = cart.find(ci => ci.id === id);
    if (found) {
        found.qty += 1;
    } else {
        const menuItem = menuItems.find(mi => mi.id === id);
        cart.push({ ...menuItem, qty: 1 });
    }
    renderCart();
};

window.removeFromCart = function(id) {
    cart = cart.filter(ci => ci.id !== id);
    renderCart();
};

window.changeQty = function(id, delta) {
    const found = cart.find(ci => ci.id === id);
    if (found) {
        found.qty += delta;
        if (found.qty < 1) {
            removeFromCart(id);
        }
    }
    renderCart();
};

function renderCart() {
    const cartListEl = document.getElementById('cart-list');
    cartListEl.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} (x${item.qty}) - ₹${item.price * item.qty}</span>
            <span class="cart-actions">
                <button title="Decrease" onclick="changeQty(${item.id}, -1)">−</button>
                <button title="Increase" onclick="changeQty(${item.id}, 1)">+</button>
                <button title="Remove" onclick="removeFromCart(${item.id})">🗑</button>
            </span>
        `;
        cartListEl.appendChild(li);
    });
    document.getElementById('cart-summary').innerText = `Total: ₹${total}`;
}

// Initial render
renderCart();
