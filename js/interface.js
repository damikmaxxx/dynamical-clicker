/* ################### КАМИЛЬ ################### */
window.addEventListener("load", () => {
  const market = document.querySelector(".market");
  const panel__button_market = document.querySelector(".panel__button-market");
  let color_accent = "rgb(179, 55, 207)";
  const shop_opening = () => {
    market.style.right = "0";
    panel__button_market.style.background = color_accent;
  };

  const inventory = document.querySelector(".inventory");
  const inventory_active = document.querySelector(".inventory_active");
  const panel__button_inventory = document.querySelector(
    ".panel__button-inventory"
  );

  let ActiveMarket = false;
  let ActiveInventory = false;

  document.addEventListener("click", (a) => {
    const click_Market = a.composedPath().includes(market);
    const clickButton_Market = a.composedPath().includes(panel__button_market);

    if (
      (ActiveMarket && !(click_Market || clickButton_Market)) ||
      (ActiveMarket && clickButton_Market)
    ) {
      market.setAttribute("class", "market");
      ActiveMarket = !ActiveMarket;
    } else if (!ActiveMarket && clickButton_Market) {
      market.classList.add("market_active");
      ActiveMarket = !ActiveMarket;
    }

    const click_Inventory = a.composedPath().includes(inventory);
    const clickButton_Inventory = a
      .composedPath()
      .includes(panel__button_inventory);

    if (
      (ActiveInventory && !(click_Inventory || clickButton_Inventory)) ||
      (ActiveInventory && clickButton_Inventory)
    ) {
      inventory.setAttribute("class", "inventory");
      ActiveInventory = !ActiveInventory;
    } else if (!ActiveInventory && clickButton_Inventory) {
      inventory.classList.add("inventory_active");
      ActiveInventory = !ActiveInventory;
    }
  });
});
