const openMenuItems = () => {
  let menus = document.getElementById("menu-list");
  let isClicked = menus.classList.contains("hidden");
  const menuListContainer = document.getElementById("menu");

  if (isClicked) {
    console.log("clicked");
    menus.classList.remove("hidden");
    menuListContainer.classList.add("relative");
    menus.classList.add("absolute", "-left-26");
    menus.classList.add("flex");
  } else {
    menus.classList.add("hidden");
    menuListContainer.classList.remove("relative");
    menus.classList.remove("absolute", "-left-26");
    menus.classList.remove("flex");
    console.log("clicked again");
  }
};
