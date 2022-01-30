if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}


let removeCartItemButtons = document.getElementsByClassName("removeFromCart");
let addItemToCart = document.getElementsByClassName("add");

function ready() {
  for (let x = 0; x < removeCartItemButtons.length; x++) {
    let button = removeCartItemButtons[x];

    button.addEventListener("click", function(event) {
      let buttonClicked = event.target;
      buttonClicked.parentElement.parentElement.remove();
      updateCartTotal();
    });
  }

  for (let x = 0; x < addItemToCart.length; x++) {
    addItemToCart[x].addEventListener("click", addToCart);
  }
}

function addToCart(event) {
  let nameText = event.target.parentElement.innerText;
  let name = nameText.replace(/per lb|per item|per bundle/g, "").replace("$", "").replace(":", "");
  let price = event.target.parentElement.nextSibling.nextSibling.innerText;
  let id = event.target.parentElement.dataset.itemId;
  placeInCart(name, price, id);
}

function placeInCart(name, price, id) {
  let newItem = document.createElement("div");
  newItem.dataset.itemId = id;
  newItem.classList.add("shopping-cart-item-div");
  newItem.innerHTML = `<p class="card-decorations shopping-cart-items" data-item-id= ${id}><i class="removeFromCart fas fa-minus"></i>${name}:</p> <p class="fix-width total-items">${price}</p> <input class="shop-item-input" onchange="updateCartTotal()" type="number" name="" value="1">`
  let listNumber = document.getElementsByClassName("shopping-cart-item-div").length;

  let totalItemsInCart = document.getElementsByClassName("shopping-cart-item-div");


  cart: {
    if (totalItemsInCart[0] === undefined && totalItemsInCart.length === 0) {
      let list = document.getElementsByClassName("shopping-cart-basket")[0];
      list.appendChild(newItem);

    } else {
      for (let x = 0; x <= totalItemsInCart.length; x++) {
        let item = totalItemsInCart[x];
        let itemName = item.firstElementChild.innerHTML.replace('<i class="removeFromCart fas fa-minus"></i>', "").replace(":", "");
        let allow = 0;
        if (itemName === name) {
          allow = 1;
          break cart;
        } else if (x === (listNumber - 1) && allow === 0) {
          let list = document.getElementsByClassName("shopping-cart-basket")[0];
          list.appendChild(newItem);
        }
      }
    }
  }
  updateCartTotal();
  ready();
}

function updateCartTotal() {
  let total = 0;
  let cartItems = document.getElementsByClassName("total-items");
  let cartItemsQuantity = document.getElementsByClassName("shop-item-input");
  for (let x = 0; x < cartItems.length; x++) {
    let number = parseFloat(cartItems[x].innerText.replace(/per lb|per item|per bundle/g, "").replace("$", ""));
    let quantity = cartItemsQuantity[x].value;
    if (isNaN(quantity) || quantity <= 0) {
      quantity = 1;
    }
    total = total + (number * quantity);
    total = Math.round(total * 100) / 100;
  }

  if (typeof total === typeof 1) {
    document.getElementsByClassName("shopping-cart-number")[0].innerText = "$" + total;
  } else {
    document.getElementsByClassName("shopping-cart-number")[0].innerText = "$" + 0;
  }
}

function showPrices() { // will display the category prices
  if (window.getComputedStyle(event.currentTarget.parentNode.childNodes[7]).display === "none") {
    event.currentTarget.parentNode.firstElementChild.style.display = "none ";
    event.currentTarget.parentNode.childNodes[7].style.display = "grid";
    event.currentTarget.parentNode.childNodes[9].style.opacity = 0.2;
    event.currentTarget.parentNode.childNodes[5].style.display = "none";
    event.currentTarget.parentNode.childNodes[5].style.visibility = "hidden";
    event.currentTarget.parentNode.childNodes[3].style.display = "inherit";
    event.currentTarget.parentNode.childNodes[3].style.visibility = "visible";
  } else if (window.getComputedStyle(event.currentTarget.parentNode.childNodes[7]).display === "grid") { // will hide the category prices
    event.currentTarget.parentNode.firstElementChild.style.display = "inline-block";
    event.currentTarget.parentNode.childNodes[7].style.display = "none";
    event.currentTarget.parentNode.childNodes[9].style.opacity = 1;
    event.currentTarget.parentNode.childNodes[3].style.display = "none";
    event.currentTarget.parentNode.childNodes[3].style.visibility = "hidden";
    event.currentTarget.parentNode.childNodes[5].style.display = "inherit";
    event.currentTarget.parentNode.childNodes[5].style.visibility = "visible";
  }
}




function changeParentBg() { // keeps the parent div background white
  for (x = 0; x < document.getElementsByClassName("card-decorations-id").length; x++) {
    document.getElementsByClassName("card-decorations-id")[x].addEventListener("mouseover", function() {
      event.currentTarget.parentNode.nextSibling.nextSibling.style.opacity = 0.2;
    });
  }
  for (x = 0; x < document.getElementsByClassName("card-decorations-id").length; x++) {
    document.getElementsByClassName("card-decorations-id")[x].addEventListener("mouseout", function() {
      event.currentTarget.parentNode.childNodes[9].style.opacity = 1;
    });
  }
}



setInterval(function() { //handles the left slide show
  var arrayOfImages = document.getElementsByClassName("image-identifier");

  for (x = 0; x < arrayOfImages.length; x++) {
    if (window.getComputedStyle(document.getElementsByClassName("image-identifier")[x]).getPropertyValue("display") !== "none" && x === (arrayOfImages.length - 1)) {
      document.getElementsByClassName("image-identifier")[x].style.display = 'none';
      document.getElementsByClassName("image-identifier")[0].style.display = 'inline';
      break;
    } else if (window.getComputedStyle(document.getElementsByClassName("image-identifier")[x]).getPropertyValue("display") !== "none" && x !== (arrayOfImages.length - 1)) {
      document.getElementsByClassName("image-identifier")[x].style.display = 'none';
      document.getElementsByClassName("image-identifier")[x + 1].style.display = 'inline';
      break;
    }
  }
}, 8000);

setInterval(function() { //handles the right slide show
  var arrayOfImages = document.getElementsByClassName("image-identifier-2");

  for (x = 0; x < arrayOfImages.length; x++) {
    if (window.getComputedStyle(document.getElementsByClassName("image-identifier-2")[x]).getPropertyValue("display") !== "none" && x === (arrayOfImages.length - 1)) {
      document.getElementsByClassName("image-identifier-2")[x].style.display = 'none';
      document.getElementsByClassName("image-identifier-2")[0].style.display = 'inline';
      break;
    } else if (window.getComputedStyle(document.getElementsByClassName("image-identifier-2")[x]).getPropertyValue("display") !== "none" && x !== (arrayOfImages.length - 1)) {
      document.getElementsByClassName("image-identifier-2")[x].style.display = 'none';
      document.getElementsByClassName("image-identifier-2")[x + 1].style.display = 'inline';
      break;
    }
  }
}, 11000);

changeParentBg();


function openCart() { //toggles the shopping cart

  if (window.getComputedStyle(document.getElementById("cart")).getPropertyValue("opacity") === "0") {
    document.getElementById("cart").style.opacity = "initial";
    document.getElementById("cart").style.zIndex = "4";
    document.getElementById("cart").style.visibility = "visible";
    updateCartTotal();
  } else {
    document.getElementById("cart").style.opacity = "0";
    document.getElementById("cart").style.zIndex = "0";
    setTimeout(function() {
      document.getElementById("cart").style.visibility = "collapse";
    }, 700);
  }
}

let compliments = ["You're Awesome!", "You Smell Great!", "Superstar!"]


function compliment() {
  let logo = document.getElementsByClassName("nav-logo")[0];
  let logobox = logo.getElementsByClassName("box-box")[0];

  if (window.getComputedStyle(logobox).getPropertyValue("height") === "0px") {
    logobox.style.opacity = "initial";
    logobox.style.visibility = "visible";
    logobox.style.height = "80px";
    logobox.style.zIndex = "4";
  }

  logobox.innerHTML = `<h1 class= "">${compliments[Math.floor(Math.random() * 3)]}</h1>`

  setTimeout( function() {
    logobox.style.opacity = "0";
    setTimeout(function() {
      logobox.style.visibility = "collapse";
    }, 600);
    logobox.style.height = "0";
    logobox.style.zIndex = "1";
  }, 3000);
}

function pageAnimation() {
  let navItems = document.getElementsByClassName("nav-item");
  let carosel = document.getElementsByClassName("carosel-container")[0];
  let navlogo = document.getElementsByClassName("box")[0];
  let navcart = document.getElementsByClassName("box-2")[0];
  let navlogo_title = document.getElementsByClassName("box_logo")[0];
  let subTitle = document.getElementsByClassName("sub-titles")[0];
  let subTitle_2 = document.getElementsByClassName("sub-titles")[1];
  let storeContainer = document.getElementsByClassName("grid-containers-store")[0];
  setTimeout( function () {
    for (x = 0; x < navItems.length; x++){
      navItems[x].style.opacity = "1";
      navItems[x].style.height = "30px";
    }
  }, 1300);

  setTimeout( function () {
    carosel.style.opacity = "1";
  }, 800);

  setTimeout( function () {
    subTitle.style.opacity = "1";
    subTitle_2.style.opacity = "1";
    navlogo_title.style.opacity = "1";
  }, 1300);

  setTimeout( function () {
    storeContainer.style.opacity = "1";
  },1500);

  navlogo.style.opacity = "1";
  navlogo.style.fontSize = "40px";
  navcart.style.opacity = "1";
  navcart.style.fontSize = "32px";
}


let payButton = document.getElementsByClassName("pay")[0].addEventListener("click", function() {



  let items = [];
  let cartCollection = document.getElementsByClassName("shopping-cart-basket")[0];
  let cartItems = cartCollection.getElementsByClassName("shopping-cart-items");

  for (let x = 0; x < cartItems.length; x++) {
    let cartItem = cartItems[x];
    let cartItemQuantity = cartItem.parentElement.getElementsByClassName("shop-item-input")[0];
    let quantity = cartItemQuantity.value;
    let id = cartItem.parentElement.dataset.itemId;
    let nameText = cartItem.innerText;
    let name = nameText.replace(/per lb|per item|per bundle/g, "").replace("$", "").replace(":", "");

    let cartTotal = document.getElementsByClassName("shopping-cart-number")[0].innerText;
    let price = parseFloat(cartTotal.replace("$", "")) * 100;


    items.push({
      id: id,
      quantity: quantity,
      name: name,
      price: price
    });
  }



if (items[0] !== undefined) {
  fetch("/create-checkout-session", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json'
    },
    body: JSON.stringify({items})
}).then(res => {
    if (res.ok) return res.json()
      return res.json().then(json => Promise.reject(json));
  }).then(({url}) => {
    window.location = url;
  }).catch(e => {
      console.error("Error: " + e.error)
  })
}


});
