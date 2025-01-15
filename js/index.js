// Fetch All Pet Categories
const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// Display Pet Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories-btn");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList =
      "flex lg:justify-between lg:items-center mb-8 gap-2 md:gap-4";
    buttonContainer.innerHTML = `
    <button id="btn-${item.category}"  class="categories-btn py-4 h-20 border-2 border-grey-300 rounded-2xl font-extrabold text-xl hover:border-2 hover:border-secondaryColor hover:bg-userBorderColor hover:rounded-full w-full flex items-center justify-center gap-2 lg:px-20"><img class="object-cover h-full" src="${item.category_icon}" alt="">${item.category}</button>
    `;
    // Add Button
    categoryContainer.append(buttonContainer);
  });
};

loadCategories();
