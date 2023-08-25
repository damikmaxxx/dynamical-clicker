

/* ################### КАМИЛЬ ################### */


const market = document.querySelector(".market");
const panel__button_market = document.querySelector(".panel__button-market");
let color_accent = "rgb(179, 55, 207)";

const inventory = document.querySelector(".inventory");
const inventory_active = document.querySelector(".inventory_active");
const panel__button_inventory = document.querySelector(".panel__button-inventory");
const panel__button_evolution = document.querySelector(".panel__button-evolution");
const evolution = document.querySelector(".evolution");

let ActiveMarket = false;
let ActiveInventory = false;
let ActiveEvolution = false;

document.addEventListener("click", (a) => {
  const click_Market = a.composedPath().includes(market);
  const clickButton_Market = a.composedPath().includes(panel__button_market);

  if ((ActiveMarket && !(click_Market || clickButton_Market)) ||
    (ActiveMarket && clickButton_Market)) {
    market.classList.remove("market_active");
    ActiveMarket = !ActiveMarket;
  } else if (!ActiveMarket && clickButton_Market) {
    market.classList.add("market_active");
    ActiveMarket = !ActiveMarket;
  }

  const click_Inventory = a.composedPath().includes(inventory);
  const clickButton_Inventory = a.composedPath().includes(panel__button_inventory);

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


  const click_evolution = a.composedPath().includes(evolution);
  const clickButton_evolution = a.composedPath().includes(panel__button_evolution);

  if (
    (ActiveEvolution && (!click_evolution || clickButton_evolution)) ||
    (ActiveEvolution && clickButton_evolution)
  ) {
    evolution.classList.remove("ActiveEvolution");
    ActiveEvolution = !ActiveEvolution;
  } else if (!ActiveEvolution && clickButton_evolution) {
    evolution.classList.add("evolution_active");
    ActiveEvolution = !ActiveEvolution;
  }

  console.log(clickButton_evolution)
});

// РАБОТА С ТАБАМИ
var tabs = document.querySelectorAll(".tabs");
for (var i = 0; i < tabs.length; i++) {
  tabs[i].onclick = function (e) {
    const tabChilds = e.target.parentNode.children
    const tabContentChilds = e.target.parentNode.parentNode.children[1];
    let contentTab;
    for (let i = 0; i < tabChilds.length; i++) { tabChilds[i].classList.remove("tab-active") }
    e.target.classList.add("tab-active")

    for (var i = 0; i < e.target.parentNode.children.length; i++) {
      if (e.target.parentNode.children[i].className.includes("tabs-line")) {
        e.target.parentNode.children[i].style.left = e.target.offsetLeft + "px";
        break;
      }
    }
    contentTab = e.target.dataset.tab;
    console.log(tabContentChilds.children)
    for (let i = 0; i < tabContentChilds.children.length; i++) tabContentChilds.children[i].classList.remove("tab-content-active")
    for (let i = 0; i < tabContentChilds.children.length; i++)if (tabContentChilds.children[i].dataset.tabContent == contentTab) tabContentChilds.children[i].classList.add("tab-content-active")

  }
}


/* при клике удара происходит анимация 0.2s */
// const canvas_click = document.getElementById('canvas')
// const coldown_stage = document.querySelector('.coldown-stage')
// document.addEventListener('click', (a) => {
//   const click_canvas = a.composedPath().includes(canvas_click);
//   console.log(click_canvas)

//   if(click_canvas){
//     coldown_stage.classList.add("cooldown-above-stage")
//     setTimeout(()=>{
//       coldown_stage.classList.add("cooldown-below-stage")
//       coldown_stage.classList.remove("cooldown-above-stage");
//     },200)
//   }
// })





