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
  //   let clicked = true;
  //   console.log();
  //   if (menus.classList.contains("hidden")) {
  //   menus.classList.remove("hidden");
  //   menuListContainer.classList = "relative flex justify-center items-center";
  //   menus.classList =
  //     "  ";
  // } else {
  //   menus.classList.add();
  // }
  // menus.classList = "absolute";
  // menus.style.display = "block";
  // console.log(menus);
};
