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
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/peddy/pets"
    );
    const data = await res.json();
    displayPets(data.pets);
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
    const res = await fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
    );
    const data = await res.json();
    displayPets(data.data);
    // console.log(data.data);
  } catch (err) {
    console.log(err);
  }

  //   try {
  //     const res = await fetch(
  //       `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  //     );
  //     const data = await res.json();

  //   } catch (err) {
  //     console.log(err);
  //   }
  // finally {
  //   loadAllPets();
  // }
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
                <button onclick="likedPets('cardImg${
                  pet.petId
                }')" class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="btn text-teal-600">Adopt</button>
                <button class="btn text-teal-700">Details</button>
            </div>
            
        `;

    petsContainer.appendChild(petCard);
  });
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
    img.classList = "w-[140px] h-[124px] rounded-lg"

    // getting selected pet container
    const selectedPetContainer = document.getElementById("right-cards");

    // appendChild in selectedPetContainer
    selectedPetContainer.appendChild(img);
    
  console.log(selectedPetContainer);
};

// calling loadCategories function
loadCategories();
// loadAllPets();
