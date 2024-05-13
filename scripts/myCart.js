const doc = document;

const checkoutItems = JSON.parse(sessionStorage.getItem('userCart'));
const userData = JSON.parse(sessionStorage.getItem('loggedInUser'));
const itemList = doc.getElementById('items-list');
const bill = doc.getElementById('checkout-list');
const total = doc.getElementById('total-amt');
const checkoutBtn = doc.getElementById('checkout-btn');

let totalCost = 0;

function renderData(){
    for(let obj of checkoutItems){
        createData(obj);
    }
    if(itemList.childElementCount === 0) itemList.innerHTML = "No items in the cart";
    total.innerHTML = `$${totalCost.toFixed(2)}/-`;
}

function createData(item){
    const div = doc.createElement('div');
    const billItem = doc.createElement('div');
    

    div.className = 'item';
    div.id = `item_${item.id}`
    div.innerHTML = `
        <div class="item-img">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="details">
            <div class="title">
                <b>Title:</b> ${item.title}
            </div>
            <div class="price">
                <b>Price:</b> $${item.price}
            </div>
        </div>
        <button type="button" onclick="removeItem(${item.id}, ${item.price})" id="remove-item">Remove From Cart</button>
    `

    billItem.className = 'checkout-item'
    billItem.id = `checkout_${item.id}`;
    billItem.innerHTML = `
        <div class="item-title">${item.title}</div>
        <div class="item-price">$${item.price}</div>
    `
    totalCost += item.price;
    bill.appendChild(billItem);
    itemList.appendChild(div);
}


function removeItem(id, price){
    const item = doc.getElementById(`item_${id}`);
    const checkoutItem = doc.getElementById(`checkout_${id}`);
    const cartItems = JSON.parse(sessionStorage.getItem('userCart'));

    for(let i in cartItems){
        if(cartItems[i].id === id){
            cartItems.splice(i, 1);
        }
    }
    sessionStorage.setItem('userCart', JSON.stringify(cartItems));
    totalCost -= Number(price);
    totalCost = Math.round(totalCost);
    total.innerHTML = `$${totalCost}/-`;
    item.remove();
    checkoutItem.remove();
}

renderData();


document.getElementById("checkout-btn").onclick = function (e) {
    var options = {
      key: "rzp_test_xV39ZNbgU1Du4V", // Enter the Key ID generated from the Dashboard
      amount: Math.round(totalCost)*100 ,//check this out if this is paisa or INR // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "USD",
      name: "MeShop",
      description: "This is your order", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      theme: {
        color: "#00ff",
      },
      image: "https://cdn-icons-png.flaticon.com/128/891/891419.png",
      handler: function () { // run a function when your payment is successfull
        alert("Items purchased");
        location.href = "./shop.html";
      },
      options: {
        checkout: {
          method: {
            netbanking: 0,
            card: 0,
            upi: 1,
            wallet: 0,
          },
        },
      },
    };
  
    var rzpy1 = new Razorpay(options);
    rzpy1.open();
    // clear mycart - localStorage
    sessionStorage.removeItem('userCart');
    e.preventDefault();
    alert("Items purchased!!");
  };
