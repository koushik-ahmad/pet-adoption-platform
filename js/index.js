// current pets
let currentPets = [];

// 1. Fetch All Pet Categories
const loadCategories = () => {
  fetch(`https://openapi.programming-hero.com/api/peddy/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

// 2. Fetch All Pets
const loadAllPets = () => {
  // Show Loading
  const leftContainer = document.getElementById("pets-cards-container");
  leftContainer.innerHTML = `<span class="loading loading-bars loading-lg col-span-3 mx-auto w-12"></span>`;
  // Fetch All Pet Data after 2 Seconds
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/pets`)
      .then((res) => res.json())
      .then((data) => {
        currentPets = data.pets;
        displayAllPets(currentPets);
      })
      .catch((error) => console.log(error));
  }, 2000);
};

// 3. Fetch Pets by Category form API
const loadCategoryPets = (category) => {
  const leftContainer = document.getElementById("pets-cards-container");
  leftContainer.innerHTML = `<span class="loading loading-bars loading-lg col-span-3 mx-auto w-12"></span>`;
  // Active Class to The Active Button
  removeActiveClass();
  const activeButton = document.getElementById(`btn-${category}`);
  activeButton.classList.add("active");
  // Fetch Category pet data after 2 Seconds
  setTimeout(() => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
      .then((response) => response.json())
      .then((data) => {
        currentPets = data.data;
        displayAllPets(currentPets);
      })
      .catch((error) => console.log(error));
  }, 2000);
};

// 4. Fetch Pets Data for Details modal
const loadDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((response) => response.json())
    .then((data) => displayDetails(data.petData))
    .catch((error) => console.log(error));
};

// Sort Pets by Price
const sortPetsByPrice = () => {
  // Show The Loading Bar
  const leftContainer = document.getElementById("pets-cards-container");
  leftContainer.innerHTML = `<span class="loading loading-bars loading-lg col-span-3 mx-auto w-12"></span>`;
  setTimeout(() => {
    currentPets.sort((a, b) => b.price - a.price);
    displayAllPets(currentPets);
  }, 2000);
};

// Display Pet Details When Button Clicked
const displayDetails = (petDetails) => {
  const detailsContainer = document.getElementById("modal-content");
  // Show The Details Modal
  document.getElementById("detailsModal").showModal();

  // Inner Content of Details Modal Container
  detailsContainer.innerHTML = `
    <div class="bg-primaryColor rounded-lg">
        <img class="rounded-lg w-full" src="${
          petDetails.image
        }" alt="Pet Image">
        <div class="mt-4">
            <h2 class="text-xl font-extrabold mb-3 text-primaryTextColor">${
              petDetails.pet_name
            }</h2>
            <div class="flex justify-between mb-3">
                <div>
                    <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=24&id=115909&format=png" alt="bulldog">Breed: ${
                      petDetails?.breed ? petDetails?.breed : "Breed is N/A"
                    }</p>
                
                    <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=32&id=16271&format=png" alt="gender">Gender: ${
                      petDetails?.gender ? petDetails?.gender : "Gender is N/A"
                    }</p>
                
                    <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=80&id=bHp2i5MxY171&format=png" alt="external-vaccination-reopening">Vaccinated status: ${
                      petDetails?.vaccinated_status
                        ? petDetails?.vaccinated_status
                        : "Vaccinated status is N/A"
                    }
                    </p>
                </div>
                <div class="">
                    <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=32&id=16152&format=png" alt="birth-date">Birth: ${
                      petDetails?.date_of_birth
                        ? petDetails?.date_of_birth
                        : "Birth is N/A"
                    }</p>
                    <p class="flex gap-2 font-bold text-tertiaryTextColor mb-3"><img width="22" height="22" src="https://img.icons8.com/?size=24&id=85843&format=png" alt="average-2">Price: ${
                      petDetails?.price ? petDetails?.price : "Price is N/A"
                    }</p>
                </div>
            </div>                              
            <hr>              
            <h2 class="font-extrabold mt-3">Details Information</h2>
            <p class="flex gap-1 font-bold text-tertiaryTextColor mt-2">${
              petDetails.pet_details
            }</p>
        </div>
    </div>
    `;
};

// Display Adoption Modal When Adopt Button Clicked
const displayAdoptModal = (petAdopt, petId) => {
  const adoptContainer = document.getElementById("adopt-modal-content");
  // Show The Adoption Modal
  document.getElementById("adoptModal").showModal();

  // Inner Content of Adopt Modal Container
  adoptContainer.innerHTML = `
    <div id="adopt-popup" class="bg-white rounded-lg flex flex-col justify-center items-center gap-2">
        <img class="font-extrabold" width="80" height="80" src="https://img.icons8.com/?size=48&id=q6BlPrJZmxHV&format=png" alt="">
        <h2 class="text-4xl font-extrabold text-primaryTextColor">Congratulation</h2>
        <p class="text-xl text-primaryTextColor font-bold">Adoption Process is Start For Your Pet</p>         
        <h2 id="countdownText" class="text-6xl font-black text-black">3</h2>
    </div>
    `;
  // Countdown Timer of Adopt Modal
  let countdown = 3;

  const adoptButton = document.getElementById(`${petId}`);

  const countdownInterval = setInterval(() => {
    countdown -= 1;
    const countdownText = document.getElementById("countdownText");
    countdownText.textContent = `${countdown}`;

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("adoptModal").close();

      adoptButton.innerText = "Adopted";
      adoptButton.disabled = true;
      adoptButton.classList.add("adopted-button");
    }
  }, 1000);

  setTimeout(() => {
    document.getElementById("adoptModal").close();
  }, 3000);
};

// Display All Pets by Default
const displayAllPets = (pets) => {
  const petsCardContainer = document.getElementById("pets-cards-container");
  petsCardContainer.innerHTML = "";

  if (pets.length === 0) {
    petsCardContainer.classList.remove("grid");
    petsCardContainer.innerHTML = `
        <div class="text-center py-16 p-8 border-2 border-solid rounded-xl w-full h-full flex flex-col justify-center items-center bg-gray-100">
            <div class="flex justify-center items-center">
                <img class="rounded-xl w-full h-full py-8" src="./images/error.webp" alt="Error Image">
            </div>
            <h2 class="font-extrabold text-4xl mb-4">No Information Available</h2>
            <p class="mb-16 mx-16 text-center font-semibold text-textColor">Currently, there is no information available in the Bird category. We are working to update our listings and provide you with the latest details. Please check back soon for new additions and updates!</p>
        </div>
        `;
    return;
  } else {
    petsCardContainer.classList.add("grid");
  }

  pets.forEach((pet) => {
    const card = document.createElement("div");
    card.classList =
      "card card-compact p-3 border-2 border-solid border-gray-300";
    card.innerHTML = `
        <figure>
            <img class="rounded-xl object-cover w-full h-full" src=${
              pet.image
            } alt="Image of a pet" />
        </figure>
        <div class="">
            <div class="mt-4">
                <h2 class="text-xl font-extrabold mb-3 text-primaryTextColor">${
                  pet.pet_name
                }</h2>

                <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=24&id=115909&format=png" alt="Pet-breed">Breed: ${
                  pet?.breed ? pet?.breed : "Breed is N/A"
                }</p>

                <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=32&id=16152&format=png" alt="birth-date">Birth: ${
                  pet?.date_of_birth ? pet?.date_of_birth : "Birth is N/A"
                }</p>

                <p class="flex gap-2 font-bold text-tertiaryTextColor mb-1"><img width="24" height="24" src="https://img.icons8.com/?size=32&id=16271&format=png" alt="gender">Gender: ${
                  pet?.gender ? pet?.gender : "Gender is N/A"
                }</p>
                
                <p class="flex gap-2 font-bold text-tertiaryTextColor mb-3"><img width="22" height="22" src="https://img.icons8.com/?size=24&id=85843&format=png" alt="average-2">Price: ${
                  pet?.price ? pet?.price : "Price is N/A"
                }</p>
  
                <div class="grid grid-cols-3 gap-2 pt-4 border-t-2">
                    <button onclick="displayLikedPetImage('${
                      pet.image
                    }')" id="like-btn" class="btn btn-outline btn-info"><img width="30" height="30" src="https://img.icons8.com/?size=48&id=U6uSXVbuA1xU&format=png" alt="facebook-like"></button>
                    <button onclick="displayAdoptModal('petAdopt', ${
                      pet.petId
                    })" id="${
      pet.petId
    }" class="btn btn-outline btn-accent adopt-btn px-0 text-secondaryColor font-extrabold">Adopt</button>
                    <button onclick="loadDetails(${
                      pet.petId
                    })" id="details-btn" class="btn btn-outline btn-accent px-0 text-secondaryColor font-extrabold">Details</button>
                </div>
            </div>
        </div>
        `;
    // Pet Cards add to the container
    petsCardContainer.append(card);
  });
};

// Display Pet Image When Like Button Clicked
const displayLikedPetImage = (url) => {
  const likedPetContainer = document.getElementById("liked-pet-container");
  const div = document.createElement("div");

  div.classList = "p-1 border-2 border-solid rounded-lg";
  div.innerHTML = `
     <img class="rounded-lg overflow-hidden h-full w-full" src="${url}" alt="">
    `;
  // Add Images to Container
  likedPetContainer.appendChild(div);
};

// Display Pet Categories
const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("categories-btn");

  categories.forEach((item) => {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList =
      "flex lg:justify-between lg:items-center mb-8 gap-2 md:gap-4";
    buttonContainer.innerHTML = `
    <button id="btn-${item.category}" onclick="loadCategoryPets('${item.category}')"  class="categories-btn py-4 h-20 border-2 border-grey-300 rounded-2xl font-extrabold text-xl hover:border-2 hover:border-secondaryColor hover:bg-userBorderColor hover:rounded-full w-full flex items-center justify-center gap-2 lg:px-20"><img class="object-cover h-full" src="${item.category_icon}" alt="">${item.category}</button>
    `;
    // Add Button
    categoryContainer.append(buttonContainer);
  });
};

// Remove Active Class
const removeActiveClass = () => {
  const buttons = document.getElementsByClassName("categories-btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

loadCategories();
loadAllPets();
