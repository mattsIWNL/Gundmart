const product = [
    {
        id: 0,
        image: '2.png',
        title: '1/100 MGEX Strike Freedom Gundam',
        price: 9999,
    },
    {
        id: 1,
        image: '3.png',
        title: '1/60 PGU RX-78-2 Gundam',
        price: 14999,
    },
    {
        id: 2,
        image: '4.png',
        title: '1/100 MG Gundam Dynames',
        price: 4399,
    },
    {
        id: 3,
        image: '5.png',
        title: '1/144 RG Hi-Nu Gundam',
        price: 3199,
    },
    {
        id: 4,
        image: '6.png',
        title: '1/144 HG Gundam Aerial Rebuild',
        price: 1299,
    },
    {
        id: 5,
        image: '7.png',
        title: '1/144 HG Gundam Calibarn',
        price: 1499
    }
];
const categories = [...new Set(product.map( (item)=>
    {return item}))]
    let i=0;
document.getElementById('root').innerHTML = categories.map((item)=>
{
    var{image, title, price} = item;
    return(
        `<div class = 'box'>
            <div class = 'img-box'>
                <img class= 'images' src=${image}></img>
            </div>
        <div class = 'bottom'>
        <p>${title}</p>
        <h2>₱ ${price}.00</h2>`+
        "<button onclick = 'addtocart(" + (i++) + ")'>Add to cart</button>"+
        `</div>
        </div>`
    )
}).join('')

var cart = [];

function addtocart(a){
    cart.push({...categories[a]});
    displaycart();
}

function delElement(a){
    cart.splice(a, 1);
    displaycart();
}

function displaycart(a){
    let j = 0, total = 0;
    document.getElementById("count").innerHTML=cart.length;
    if (cart.length == 0){
        document.getElementById('cartItem').innerHTML = "you have no items in your cart";
        document.getElementById("total").innerHTML = "₱ "+ 0 + ".00";
    }
    else{
        document.getElementById('cartItem').innerHTML = cart.map((items)=>
        {
            var {image, title, price} = items;
            total = total + price;
            document.getElementById("total").innerHTML = "₱ "+ total + ".00";
            return(
                `<div class = 'cart-item'>
                <div class = 'row-img'>
                    <img class = 'rowimg' src = ${image}>
                </div>
                <p style = 'font-size:12px;'>${title}</p>
                <h2 style = 'font-size: 15px'>₱ ${price}.00</h2> `+
                "<i class='fa-solid fa-trash' onclick = 'delElement("+(j++)+")'></i></div>"
            );
        }).join('');
    }
}

function checkout(){
    if(cart.length === 0){
        alert("Your cart is empty");
        return;
    }

    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let contact = document.getElementById('contact').value;

    if (!name || !address || !contact) {
        alert("Please fill out all customer details.");
        return;
    }

    let orderDetails = cart.map(item => `${item.title} - ₱ ${item.price}.00`).join('\n');
    let total = cart.reduce((acc, item)=> acc + item.price, 0);
    let confirmationMessage = `You have purchased:\n\n${orderDetails}\n\nTotal: ₱ ${total}.00\n\nCustomer Details:\nName: ${name}\nAddress: ${address}\nContact No: ${contact}\n\nThank you for your purchase!`;

    if(confirm(confirmationMessage)){
        cart = [];
        displaycart();
        document.getElementById('customerForm').reset();
    }
}     