

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

  
});

// РАБОТА С ТАБАМИ
document.querySelector(".tabs").addEventListener("click", e => {
  const tabChilds = e.target.parentNode.children
  const tabContentChilds = document.querySelectorAll('.tabs ~ .tabs-content')[0].children;
  let contentTab;
  for(let i = 0; i < tabChilds.length;i++){tabChilds[i].classList.remove(".tab-active")} 
  e.target.classList.add(".tab-active")
  document.querySelector(".tabs-line").style.left = e.target.offsetLeft + "px";
  contentTab = e.target.dataset.tab;
  for(let i = 0; i < tabContentChilds.length; i++) tabContentChilds[i].classList.remove(".tab-content-active")
  for(let i = 0; i < tabContentChilds.length; i++)if(tabContentChilds[i].dataset.tabContent == contentTab)tabContentChilds[i].classList.add(".tab-content-active") 

});




