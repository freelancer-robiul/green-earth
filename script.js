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
              class="single-card md:w-[343px] w-full h-[425px] p-2 space-y-3 bg-white shadow-xl rounded-xl"
            >
            <img class="rounded-xl h-[200px] w-full object-cover" src="${plant.image}" alt="">
            <p class="plant-name text-[16px] font-semibold cursor-pointer">${plant.name}</p>
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

// Plants by Category ====================================++++++++
const loadCategoryPlants = (id) => {
  const parentCardDiv = document.getElementById("parent-card");

  // spinner create
  const spinner = document.createElement("div");
  spinner.id = "spinner";
  spinner.className = "flex justify-center items-center h-[400px]";
  spinner.innerHTML = `
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
  `;

  parentCardDiv.innerHTML = "";
  parentCardDiv.appendChild(spinner);

  fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      spinner.remove(); // spinner remove

      if (data && data.plants && data.plants.length > 0) {
        displayPlants(data.plants);
      } else {
        parentCardDiv.innerHTML =
          "<p class='text-center text-gray-500'>No plants found.</p>";
      }
    })
    .catch((err) => {
      spinner.remove();
      parentCardDiv.innerHTML = `<p class='text-center text-red-500'>Error loading plants.</p>`;
      console.error(err);
    });
};

const displayPlants = (plants) => {
  const parentCardDiv = document.getElementById("parent-card");
  parentCardDiv.innerHTML = "";

  plants.forEach((plant) => {
    const card = document.createElement("div");

    card.innerHTML = `
      <div class="single-card w-[343px] h-[425px] p-2 space-y-3 bg-white shadow-xl rounded-xl">
        <img class="rounded-xl h-[200px] w-full object-cover" src="${plant.image}" alt="">
        <p class="plant-name text-[16px] font-semibold cursor-pointer">${plant.name}</p>
        <p class="text-[12px] font-normal line-clamp-3">${plant.description}</p>
        <div class="flex justify-between items-center">
          <p class="text-[14px] font-normal bg-[#dcfce7] rounded-full inline-block px-3 py-2">${plant.category}</p>
          <p class="p-2 text-[14px] font-normal"><span>৳${plant.price}</span></p>
        </div>
        <button class="btn-button bg-green-700 text-white px-5 py-2 w-full rounded-full text-[16px] font-medium cursor-pointer">
          Add to Cart
        </button>
      </div>   
    `;
    parentCardDiv.appendChild(card);
  });
};

// spinner CSS-------------------
const style = document.createElement("style");
style.innerHTML = `
.loader {
  border-top-color: #22c55e;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
`;
document.head.appendChild(style);

// My Cart Section =========================
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

  alert(`${name} has been add to cart.`);

  let newCart = document.createElement("div");
  newCart.innerHTML = `
      
      <div
            class="single-cart flex justify-between px-3 py-2 bg-[#F0FDF4] rounded-lg shadow-md"
            >
            <div class="cart-content">
              <h2 class="text-[14px] font-semibold">${name}</h2>
              <p class="text-[16px] font-normal">৳<span class="cart-price">${cartPrice}</span> x 1</p>
            </div>
            <div class="close">
              <span id="btn-close" class="btn-close cursor-pointer text-red-500 font-bold">X</span>
            </div>
          </div>
      `;

  const totalDiv = myCart.querySelector(".total");

  myCart.insertBefore(newCart, totalDiv);

  // Total------------------
  let newTotal = totalPrice + cartPrice;
  document.getElementById("total-price").innerText = newTotal;
}

// Cart item remove-----------------
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

// modal container create ==================================

const parentCardDiv = document.getElementById("parent-card");

const modal = document.createElement("div");
modal.id = "plant-modal";
modal.className = "hidden fixed inset-0 flex justify-center items-center z-50";
modal.innerHTML = `
  <div class="modal-overlay absolute inset-0 bg-black bg-opacity-20"></div>
  <div class="modal-content relative z-50 pointer-events-auto bg-white p-5 rounded-lg shadow-xl w-[400px] max-w-full transition-transform duration-300 scale-95">
    <button id="modal-close" class="absolute top-2 right-2 text-lg font-bold cursor-pointer">✕</button>
    <div id="modal-body"></div>
  </div>
`;
document.body.appendChild(modal);

const modalBody = document.getElementById("modal-body");

parentCardDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("plant-name")) {
    const card = e.target.closest(".single-card");

    modalBody.innerHTML = "";
    modalBody.appendChild(card.cloneNode(true));

    modal.classList.remove("hidden");
    const modalContent = modal.querySelector(".modal-content");
    setTimeout(() => {
      modalContent.classList.add("scale-110");
    }, 10);

    parentCardDiv.classList.add("filter", "blur-sm");
  }
});

document.addEventListener("click", (e) => {
  if (
    e.target.id === "modal-close" ||
    e.target.classList.contains("modal-overlay")
  ) {
    const modalContent = modal.querySelector(".modal-content");
    modalContent.classList.remove("scale-110");

    modal.classList.add("hidden");
    parentCardDiv.classList.remove("filter", "blur-sm");
    modalBody.innerHTML = "";
  }
});
