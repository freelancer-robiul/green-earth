const categoriesUl = () => {
  fetch("https://openapi.programming-hero.com/api/categories")
    .then((res) => res.json())
    .then((data) => categoryLoad(data.categories));
  হবে;
};

const categoryLoad = (loads) => {
  console.log(loads);

  let categoryLi = document.getElementById("categories-ul");

  loads.forEach((load) => {
    let li = document.createElement("li");

    li.innerHTML = `
    <li class="cursor-pointer">${load.category_name}</li>
    `;
    categoryLi.appendChild(li);
  });
};

categoriesUl();
