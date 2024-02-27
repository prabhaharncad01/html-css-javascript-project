let iconcart = document.querySelector('.iconcart');

let cart= document.querySelector('.cart');

let container = document.querySelector('.container');
let Close = document.querySelector('.close');

iconcart.addEventListener('click', ()=>{
    if(cart.style.right == '-100%'){
        cart.style.right='0';
        container.style.transform = 'translateX(-400px)'; 
    }
    else{
        cart.style.right='-100%';
        container.style.transform = 'translateX(0)';
    }
})

Close.addEventListener('click',()=>{
    cart.style.right='-100%';
    container.style.transform = 'translateX(0)';
})

let products = null;
//get data form file json

fetch('product.json')
.then(response => response.json())
.then(data =>{
    products = data;
    addDatatohtml();
   
})




//show datas in list html

function addDatatohtml(){
    //remove datas default in html
    let listproducthtml= document.querySelector('.listproduct')
    listproducthtml.innerHTML='';

    //add new datas
    if(products!=null){
        products.forEach(product => {
            let newproduct = document.createElement('div');
            newproduct.classList.add('item');
            newproduct.innerHTML=
            ` <img src="${product.image}">
            <h2>${product.name}</h2>
            <div class="price">$ ${product.price}</div>
            <button onclick="addcart(${product.id})">Add To Cart</button>`;
            listproducthtml.appendChild(newproduct);
        });
    }
}

let listcart = [];

//cookies from datacart
function checkcart(){
    var cookievalue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listcart='));
    if(cookievalue){
        listcart = JSON.parse(cookievalue.split('=')[1]);
    }
}
checkcart();

function addcart($idproduct){
    let productcopy = JSON.parse(JSON.stringify(products));

    //if this products are not in cart
  if(!listcart[$idproduct]){
    let dataproduct = productcopy.filter(
        product => product.id == $idproduct
    )[0];
    //add data product in cart
    listcart[$idproduct] = dataproduct;
    listcart[$idproduct].quantity =1;
  }
  else{
    // if this product is already in the cart.
    //then i just increased the quantity
    listcart[$idproduct].quantity++;
  }
  //saving cart datas in cookies
  //saving cart datas when comp turned off
  let timesave = "expires=Thu, 31 Dec 2025 23:59:59 UTC";
  document.cookie = "listcart="+JSON.stringify(listcart)+"; "+timesave+"; path=/;";
  addcarttohtml();
}
addcarttohtml();
function addcarttohtml(){
    //clear data

    let listcarthtml = document.querySelector('.listcart');
    listcarthtml.innerHTML = '';

    let totalhtml = document.querySelector('.totalquantity');

    let toalquantity = 0;
    if(listcart){
        listcart.forEach(product => {
            if(product){
                let newcart= document.createElement('div');
                newcart.classList.add('item');
                newcart.innerHTML = 
                `<img src="${product.image}" alt="">
                <div class="content">
                    <div class="name">
                    ${product.name}
    
                    </div>
                    <div class="price">
                        $ ${product.price}/perfume1
                    </div>
                </div>
                <div class="quantity">
                    <button>-</button>
                    <span class="value"> ${product.quantity}</span>
                    <button>+</button>
                </div>`;
                listcarthtml.appendChild(newcart);
                toalquantity = toalquantity + product.quantity;
            }
        })
    }
    totalhtml.innerHTML = toalquantity;
}

