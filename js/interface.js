

/* ################### КАМИЛЬ ################### */
const market = document.querySelector(".market");
const panel__button_market = document.querySelector(".panel__button-market");
let color_accent = "rgb(179, 55, 207)";

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

  if ((ActiveMarket && !(click_Market || clickButton_Market)) || (ActiveMarket && clickButton_Market)) {
    market.classList.remove("market_active");
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
    inventory.classList.remove("inventory_active");
    ActiveInventory = !ActiveInventory;
  } else if (!ActiveInventory && clickButton_Inventory) {
    inventory.classList.add("inventory_active");
    ActiveInventory = !ActiveInventory;
  }


  const marketTabFirst = document.querySelector('.market__tab-first')
  const marketTabSecond = document.querySelector('.market__tab-second')
  const marketTabThird = document.querySelector('.market__tab-third')
  const click__marketTabFirst = a.composedPath().includes(marketTabFirst)
  const click__marketTabSecond = a.composedPath().includes(marketTabSecond)
  const click__marketTabThird = a.composedPath().includes(marketTabThird)
  const market_tabObj_first = document.querySelector('.market-tabObj-first')
  const market_tabObj_second = document.querySelector('.market-tabObj-second')
  const market_tabObj_third = document.querySelector('.market-tabObj-third')


  if (click__marketTabFirst) {
    marketTabFirst.classList.add("active__tab")
    marketTabSecond.classList.remove("active__tab");
    marketTabThird.classList.remove("active__tab");
    market_tabObj_first.classList.add("active__tab_block");
    market_tabObj_second.classList.remove("active__tab_block");
    market_tabObj_third.classList.remove("active__tab_block");
  } else if (click__marketTabSecond) {
    marketTabSecond.classList.add("active__tab")
    marketTabFirst.classList.remove("active__tab");
    marketTabThird.classList.remove("active__tab");
    market_tabObj_first.classList.remove("active__tab_block");
    market_tabObj_second.classList.add("active__tab_block");
    market_tabObj_third.classList.remove("active__tab_block");
  } else if (click__marketTabThird) {
    marketTabThird.classList.add("active__tab")
    marketTabFirst.classList.remove("active__tab");
    marketTabSecond.classList.remove("active__tab");
    market_tabObj_first.classList.remove("active__tab_block");
    market_tabObj_second.classList.remove("active__tab_block");
    market_tabObj_third.classList.add("active__tab_block");
  }
});