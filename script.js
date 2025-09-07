const allPlants = () => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => setupButton(data.plants));
};

const setupButton = (plants) => {
  let parentCardDiv = document.getElementById("parent-card");

  document.getElementById("all-trees").addEventListener("click", () => {
    parentCardDiv.innerHTML = "";

    plants.forEach((plant) => {
      let newCardDiv = document.createElement("div");

      newCardDiv.innerHTML = `
    
    <div
            class="single-card w-[343px] h-[450px] p-2 space-y-2 bg-white"
          >
          <img class="rounded-xl h-[200px] w-full object-cover" src="${plant.image}" alt="">
          <p class="text-[16px] font-semibold cursor-pointer">${plant.name}</p>
          <p class="text-[12px] font-normal line-clamp-3">${plant.description}</p>
          <p class="text-[14px] font-normal bg-[#dcfce7] rounded-full inline-block px-3 py-2">${plant.category}</p>
          <p class="p-2 text-[14px] font-normal">Price: <span>${plant.price}</span> Tk.</p>
          <button
          class="bg-green-700 text-white px-5 py-2 w-full rounded-full text-[16px] font-medium cursor-pointer"
            >
          Add to Cart
            </button>
        </div>     
    `;
      parentCardDiv.append(newCardDiv);
    });
  });
};

allPlants();

const categoriesUl = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => categoryLoad(data.categories));
};

const categoryLoad = (loads) => {
  let categoryLi = document.getElementById("categories-ul");
  categoryLi.innerHTML = "";

  loads.forEach((load) => {
    let li = document.createElement("li");

    li.innerHTML = `
      <li class="cursor-pointer p-2 hover:bg-green-700 hover:text-white rounded">${load.category_name}</li>      
    `;
    categoryLi.appendChild(li);
  });
};

categoriesUl();
