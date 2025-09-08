const allPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => setupButton(data.plants));
};

const setupButton = (plants) => {
  let parentCardDiv = document.getElementById("parent-card");

  const allTreesBtn = document.getElementById("all-trees");

  allTreesBtn.addEventListener("click", function () {
    document.querySelectorAll("#categories-ul li").forEach((li) => {
      li.classList.remove("bg-green-700", "text-white");
    });

    allTreesBtn.classList[allTreesBtn.id !== "all-trees" ? "remove" : "add"](
      "bg-green-700",
      "text-white"
    );

    parentCardDiv.innerHTML = "";

    plants.forEach((plant) => {
      let newCardDiv = document.createElement("div");

      newCardDiv.innerHTML = `
      
      <div
              class="single-card w-[343px] h-[425px] p-2 space-y-3 bg-white shadow-xl rounded-xl"
            >
            <img class="rounded-xl h-[200px] w-full object-cover" src="${plant.image}" alt="">
            <p class="text-[16px] font-semibold cursor-pointer">${plant.name}</p>
            <p class="text-[12px] font-normal line-clamp-3">${plant.description}</p>
            <div class="flex justify-between items-center">
               <p class="text-[14px] font-normal bg-[#dcfce7] rounded-full inline-block px-3 py-2">${plant.category}</p>
               <p class="p-2 text-[14px] font-normal"><span>৳${plant.price}</span></p>
            </div>
            <button id="btn-add-to-cart"
            class="btn-button bg-green-700 text-white px-5 py-2 w-full rounded-full text-[16px] font-medium cursor-pointer"
              >
            Add to Cart
              </button>
          </div>     
      `;
      parentCardDiv.append(newCardDiv);
    });
  });

  allTreesBtn.click();
};

allPlants();

// Load Categories ===================================
const categoriesUl = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => categoryLoad(data.categories));
};

const categoryLoad = (categories) => {
  let categoryLi = document.getElementById("categories-ul");
  categoryLi.innerHTML = "";

  categories.forEach((cat) => {
    let li = document.createElement("li");
    li.className =
      "cursor-pointer p-2 rounded transition-colors duration-200 hover:bg-green-700 hover:text-white";
    li.innerText = cat.category_name;

    li.addEventListener("click", function () {
      document.querySelectorAll("#categories-ul li").forEach((item) => {
        item.classList.remove("bg-green-700", "text-white");
      });

      li.classList.add("bg-green-700", "text-white");

      document
        .getElementById("all-trees")
        .classList[li.id !== "all-trees" ? "remove" : "add"](
          "bg-green-700",
          "text-white"
        );

      loadCategoryPlants(cat.id);
    });

    categoryLi.appendChild(li);
  });
};

categoriesUl();

// Plants by Category ====================================
const loadCategoryPlants = (id) => {
  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayPlants(data.plants));
};

const displayPlants = (plants) => {
  const parentCardDiv = document.getElementById("parent-card");
  parentCardDiv.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");

    card.innerHTML = `
          <div
              class="single-card w-[343px] h-[425px] p-2 space-y-3 bg-white shadow-xl rounded-xl"
            >
            <img class="rounded-xl h-[200px] w-full object-cover" src="${plant.image}" alt="">
            <p class="text-[16px] font-semibold cursor-pointer">${plant.name}</p>
            <p class="text-[12px] font-normal line-clamp-3">${plant.description}</p>
            <div class="flex justify-between items-center">
               <p class="text-[14px] font-normal bg-[#dcfce7] rounded-full inline-block px-3 py-2">${plant.category}</p>
               <p class="p-2 text-[14px] font-normal"><span>৳${plant.price}</span></p>
            </div>
            <button id="btn-add-to-cart"
            class="btn-button bg-green-700 text-white px-5 py-2 w-full rounded-full text-[16px] font-medium cursor-pointer"
              >
            Add to Cart
              </button>
          </div>   
        `;

    parentCardDiv.appendChild(card);
  });
};

// Cart Section =========================
document.getElementById("parent-card").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-button")) {
    handleAddToCart(e.target);
  }
});

function handleAddToCart(button) {
  let myCart = document.getElementById("my-cart");
  const card = button.closest(".single-card");
  const name = card.querySelector("p").innerText;
  let cartPrice = Number(card.querySelector("span").innerText.replace("৳", ""));

  let totalPrice = Number(document.getElementById("total-price").innerText);

  let newCart = document.createElement("div");
  newCart.innerHTML = `
      
      <div
            class="single-cart flex justify-between px-3 py-2 bg-[#F0FDF4] rounded-lg"
            >
            <div class="cart-content">
              <h2 class="text-[14px] font-semibold">${name}</h2>
              <p class="text-[16px] font-normal">৳<span class="cart-price">${cartPrice}</span> x 1</p>
            </div>
            <div class="close">
              <span id="btn-close" class="btn-close cursor-pointer">X</span>
            </div>
          </div>
      `;

  const totalDiv = myCart.querySelector(".total");

  myCart.insertBefore(newCart, totalDiv);

  // Total
  let newTotal = totalPrice + cartPrice;
  document.getElementById("total-price").innerText = newTotal;
}

// Cart item remove
document.getElementById("my-cart").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-close")) {
    const cartItem = e.target.closest(".single-cart");
    const priceEl = cartItem.querySelector(".cart-price");
    const price = Number(priceEl.innerText);

    const totalPriceEl = document.getElementById("total-price");
    totalPriceEl.innerText = Number(totalPriceEl.innerText) - price;

    cartItem.remove();
  }
});
