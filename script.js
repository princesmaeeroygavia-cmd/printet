const productImages = {
  "Hotdog": "hotdog.jpg",
  "Toceno Roll": "toceno_roll.jpg",
  "Cornbeef Roll": "cornbeef_roll.jpg",
  "Pork Toceno": "pork_toceno.jpg",
  "Whole Chicken": "chicken.jpg",
  "Longanisa": "longganisa.jpg",
  "Soriso": "soriso.jpg",
  "Oil": "oil.jpg",
  "Rawrice": "rawrice.jpg",
  "Dried Fish": "dry_fish.jpg",
  "Sugar": "brown_sugar.jpg",
  "Salt": "salt.jpg"
};

let cart = [];
let total = 0;
let currentName = "";
let currentPrice = 0;
let qty = 1;

function openProduct(name, desc, priceText, price, imageSrc) {
  document.getElementById("productModal").style.display = "flex";
  document.getElementById("pName").innerText = name;
  document.getElementById("pDesc").innerText = desc;
  document.getElementById("pPrice").innerText = priceText;
  document.getElementById("pImage").src = imageSrc;

  currentName = name;
  currentPrice = price;
  qty = 1;
  document.getElementById("quantity").innerText = qty;
}

function closeModal() {
  document.getElementById("productModal").style.display = "none";
  console.log("modal closed"); // ✅ debug log
}

function plus() {
  qty++;
  document.getElementById("quantity").innerText = qty;
}

function minus() {
  if (qty > 1) {
    qty--;
    document.getElementById("quantity").innerText = qty;
  }
}

function addOrder() {
  let name = document.getElementById("pName").innerText;
  let price = parseFloat(document.getElementById("pPrice").innerText.replace('$',''));
  let qty = parseInt(document.getElementById("quantity").innerText);
  
  //get image based on product name
  let imageSrc = productImages[name];

   // check if product already exists in cart
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // update quantity and subtotal
    existingItem.qty += qty;
    existingItem.subtotal = existingItem.qty * existingItem.price;
    total += price * qty;
  } else {
    // add new product if not yet in cart
  cart.push({
    name: name,
    price: price,
    qty: qty,
    subtotal: price * qty,
    image: imageSrc // store image here
  });

  //total update
  total += price * qty;
}
  //refresh summary
  displayCart();

  // ✅ close modal after adding
  closeModal();
}

function buyNow() {
  let name = document.getElementById("pName").innerText;
  let price = parseFloat(document.getElementById("pPrice").innerText.replace('$',''));
  let qty = parseInt(document.getElementById("quantity").innerText);

  // compute total for this product only
  let subtotal = (price * qty).toFixed(2);
  alert("Thank you for buying " + name + " x" + qty + " for $" + subtotal);

  // ✅ close modal immediately
  closeModal();
}

function closeModal(){
  document.getElementById("productModal").style.display = "none";
  console.log("modal closed"); //debug log
}

function displayCart() {
  let list = document.getElementById("cartList");
  list.innerHTML = "";
  cart.forEach((item, index) => {
    list.innerHTML += `
      <div class="order-item">
        <div class="item-left">
          <img src="${item.image}" alt="${item.name}" class="cart-img">
          <div class="item-info">
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${item.price.toFixed(2)}</span>
          </div>
        </div>
      <div class="item-right">
        <div class="qty-controls">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>
        <button class="cancel" onclick="removeOrder(${index})">Cancel</button>
      </div>
    </div>`;
  });
  document.getElementById("total").innerText = "Total: $" + total.toFixed(2);
}

function increaseQty(index) {
  cart[index].qty++;
  cart[index].subtotal = cart[index].qty * cart[index].price;
  total += cart[index].price;
  displayCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty--;
    cart[index].subtotal = cart[index].qty * cart[index].price;
    total -= cart[index].price;
    displayCart();
  }
}

function removeOrder(index) {
  total -= cart[index].subtotal;
  cart.splice(index, 1);
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
  } else {
    alert("Thank you for your purchase! Total: $" + total.toFixed(2));
    cart = [];
    total = 0;
    displayCart();
  }
  // ✅ close modal after checkout
  closeModal();
}