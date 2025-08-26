let pets = [];
// loadCategories function
const loadCategories = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );

    const data = await res.json();
    displayCategories(data.categories);
  } catch (err) {
    console.log(err);
  } finally {
    loadAllPets();
  }
};

// load all pets function
const loadAllPets = async () => {
  toggleLoadingSpinner(true);
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();
    pets = data.pets;
    toggleLoadingSpinner(false);
    displayPets(pets);
    //   console.log(data.pets);
  } catch (err) {
    console.log(err);
  } finally {
    // loadCategorizePets();
  }
};

// load categorize pets
const loadCategorizePets = async (categoryName) => {
  const categoryBtns = document.getElementsByClassName("category-btns");

  for (const categoryBtn of categoryBtns) {
    categoryBtn.classList.remove("active", "rounded-[120px]");
  }

  // getting clicked button
  const clickedCategoryBtn = document.getElementById(
    `categoryBtn${categoryName}`
  );

  // add style to clicked button
  clickedCategoryBtn.classList.add("active", "rounded-[120px]");

  //   load categorize pets
  try {
    toggleLoadingSpinner(true);
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
    );
    const data = await res.json();
    pets = data.data;

    toggleLoadingSpinner(false);
    displayPets(pets);
    // console.log(data.data);
  } catch (err) {
    console.log(err);
  }
  // finally {
  //   loadAllPets();
  // }
};

// load details by pet id
const loadDetailsById = async (petId) => {
  try {
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
    );
    const data = await res.json();
    displayModal(data.petData);
    // console.log(data.data);
  } catch (err) {
    console.log(err);
  }
  // console.log(petId);
};

// displayCategories function
const displayCategories = (categories) => {
  // console.log(categories);
  // getting categories container
  const categoriesContainer = document.getElementById("categories-container");

  categories.forEach((category) => {
    // create category html
    const categoryDiv = document.createElement("div");
    categoryDiv.classList =
      "category-btns flex justify-center items-center gap-5 py-5 border border-teal-200 rounded-lg cursor-pointer";

    if (category.id === 1) {
      //   console.log(category.id);
      categoryDiv.classList.add("active", "rounded-[120px]");
    }
    categoryDiv.setAttribute(
      "onclick",
      `loadCategorizePets('${category.category}')`
    );
    categoryDiv.setAttribute("id", `categoryBtn${category.category}`);
    categoryDiv.innerHTML = `
          <img src="${category.category_icon}"/>
          <h4 class="text-2xl font-bold">${category.category}</h4>
          `;

    categoriesContainer.appendChild(categoryDiv);
    // console.log(category);
  });
};

// console.log(pet);
// display Pets function;
const displayPets = (pets) => {
  // toggleLoadingSpinner(true);
  // getting pets container cards section
  const petsContainer = document.getElementById("left-cards");

  petsContainer.innerHTML = "";

  if (pets.length === 0) {
    const div = document.createElement("div");

    div.classList =
      "col-span-3 flex flex-col justify-center items-center py-[100px]";
    div.innerHTML = `
            <img src="./assets/images/error.webp"/>
            <h3 class="text-3xl font-bold">No Information Available</h3>
            <p class="text-black opacity-70">Information will be add soon.</p>
        `;

    petsContainer.classList.add("bg-[rgba(19,19,19,0.03)]", "rounded-lg");

    petsContainer.append(div);
    // console.log(0);
  }

  pets.forEach((pet) => {
    // console.log(pet);
    // birth date
    const birth = pet.date_of_birth;
    const petCard = document.createElement("div");
    petCard.classList = "border rounded-lg p-5";
    petCard.innerHTML = `
    
        <img id="cardImg${
          pet.petId
        }" class="w-full rounded-lg h-[180px]" src="${
      pet?.image ?? "No data found"
    }"/>

    <div id="cardContents" class="mt-6 flex flex-col justify-center gap-2 border-b pb-4">

      <h4 class="text-xl font-bold text-black">${
        pet?.pet_name ?? "No data found"
      }</h4>

      <div class="flex items-center gap-2 text-black opacity-70">

        <i class="fa-regular fa-object-group"></i>

        <p>Breed: ${pet?.breed ?? "No data found"}</p>
      </div>

      <div class="flex items-center gap-2 text-black opacity-70">
        <i class="fa-regular fa-calendar"></i>

        <p>Birth: ${birth?.substring(0, 4) ?? "No data found"}</p>
      </div>

      <div class="flex items-center gap-2 text-black opacity-70">
        <i class="fa-regular fa-user"></i>

        <p>Gender: ${pet?.gender ?? "No data found"}</p>
      </div>

      <div class="flex items-center gap-2 text-black opacity-70">
        <i class="fa-regular fa-calendar"></i>

        <p>Price: ${pet?.price ?? "No data found"}$</p>
      </div>
                
    </div>

    <div id="buttons" class="pt-4 flex justify-between items-center">

      <button onclick="likedPets('cardImg${pet.petId}')" class="btn">
        <i class="fa-regular fa-thumbs-up"></i>
      </button>

      <button id="adoptBtn${pet.petId}" onclick="disableElementWithTimer(${
      pet.petId
    })" class="btn text-teal-600">Adopt</button>

      <button onclick="loadDetailsById(${pet.petId})" class="btn text-teal-700">
        Details
      </button>
    </div>
            
        `;

    petsContainer.appendChild(petCard);
    // toggleLoadingSpinner(false);
  });
};

// Modal for details
const displayModal = (petData) => {
  // console.log(petData);
  // getting modal contents container
  const modalContentContainer = document.getElementById("modal-contents");

  modalContentContainer.innerHTML = `
    <img class="w-full object-fill rounded-lg h-[300px]" src="${
      petData?.image ?? "No data found"
    }"/>

    <div id="cardContents" class="mt-4 flex flex-col justify-center gap-2 border-b pb-4">

      <h4 class="text-2xl mb-4 font-bold text-black">
        ${petData.pet_name ?? "No data found"}
      </h4>

      <div id="characteristics" class="grid grid-cols-2 gap-2">
        <div class="flex items-center gap-2 text-black opacity-70">

          <i class="fa-regular fa-object-group"></i>

          <p>Breed: ${petData?.breed ?? "No data found"}</p>
        </div>

        <div class="flex items-center gap-2 text-black opacity-70">
          <i class="fa-regular fa-calendar"></i>

          <p>
            Birth: ${petData.date_of_birth?.substring(0, 4) ?? "No data found"}
          </p>
        </div>

        <div class="flex items-center gap-2 text-black opacity-70">
          <i class="fa-regular fa-user"></i>

          <p>Gender: ${petData?.gender ?? "No data found"}</p>
        </div>

        <div class="flex items-center gap-2 text-black opacity-70">
          <i class="fa-regular fa-calendar"></i>

          <p>Price: ${petData?.price ?? "No data found"}$</p>
        </div>

        <div class="flex items-center gap-2 text-black opacity-70">
          <i class="fa-solid fa-syringe"></i>

          <p>
            Vaccinated status: ${petData?.vaccinated_status ?? "No data found"}
          </p>
        </div>
      </div>
                
    </div>
    
    <div>
      <h3 class="font-semibold text-black">Details Information</h3>
      <p class="text-black opacity-70">
        ${petData.pet_details}
      </p>
    </div>
  
  `;

  document.getElementById("modal").showModal();
  // console.log(petData);
};

// display liked pets
const likedPets = (imageId) => {
  // getting selected card image id
  const image = document.getElementById(imageId);
  // getting src attribute value
  const src = image.getAttribute("src");

  // create img tag
  const img = document.createElement("img");
  img.setAttribute("src", `${src}`);
  img.classList = "rounded-lg";

  // getting selected pet container
  const selectedPetContainer = document.getElementById("right-cards");

  // appendChild in selectedPetContainer
  selectedPetContainer.appendChild(img);

  console.log(selectedPetContainer);
};

// adopt button with timer and disabled function
const disableElementWithTimer = (id) => {
  // getting clicked adopt button
  const clickedAdoptBtn = document.getElementById(`adoptBtn${id}`);
  console.log(clickedAdoptBtn);

  let countingModal = document.getElementById("counting-modal");

  countingModal.showModal();

  // getting timer element
  const p = document.getElementById("timer-element");
  p.innerText = "";

  let count = 3;
  const timer = setInterval(function () {
    // increase count by 1
    // console.log(count)
    // set count as innerText in timer element
    p.innerText = count;
    count--;
    // console.log(count);
    // console.log(".....");

    // set limitation
    if (count < 0) {
      clearInterval(timer);
      countingModal.close();
      clickedAdoptBtn.innerText = "Adopted";
    }
  }, 1000);

  // call modal
  // make button disabled
  clickedAdoptBtn.disabled = true;
};

// sort by price
document.getElementById("sortBtn").addEventListener("click", () => {
  pets.sort((a, b) => {
    return b.price - a.price;
  });
  console.log(pets);

  displayPets(pets);
});

// spinner
const toggleLoadingSpinner = (isLoading) => {
  // get spinner div
  const spinner = document.getElementById("spinner");

  if (isLoading) {
    spinner.classList.remove("hidden");
  } else {
    // this will hide the spinner after 2seconds
    setTimeout(() => {
    spinner.classList.add("hidden");
    }, 2000);
  }
};

// calling loadCategories function
loadCategories();
