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
    displayAllPets(data.pets);
  } catch (err) {
    console.log(err);
  }
  // finally {
  //   loadAllPets();
  // }
};

// displayCategories function
const displayCategories = (categories) => {
  // getting categories container
  const categoriesContainer = document.getElementById("categories-container");

  categories.forEach((category) => {
    // create category html
    const categoryDiv = document.createElement("div");
    categoryDiv.classList =
      "flex justify-center items-center gap-5 py-5 border border-teal-200 rounded-lg";

    if (category.id === 1) {
      //   console.log(category.id);
      categoryDiv.classList.add("active", "rounded-[120px]");
    }

    categoryDiv.innerHTML = `
          <img src="${category.category_icon}"/>
          <h4 class="text-2xl font-bold">${category.category}</h4>
          `;

    categoriesContainer.appendChild(categoryDiv);
    // console.log(category);
  });
};

// displayAllPets function;
const displayAllPets = (pets) => {
  // getting pets container cards section
  const petsContainer = document.getElementById("left-cards");

  pets.forEach((pet) => {
    // birth date
    const birth = pet.date_of_birth;
    console.log(pet);
    const petCard = document.createElement("div");
    petCard.classList = "border rounded-lg p-5";
    petCard.innerHTML = `
    
                <img id="cardImg" class="w-full rounded-lg h-[180px]" src="${
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
                <button class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
                <button class="btn text-teal-600">Adopt</button>
                <button class="btn text-teal-700">Details</button>
            </div>
            
        `;

    petsContainer.appendChild(petCard);
  });
};

// calling loadCategories function
loadCategories();
// loadAllPets();
