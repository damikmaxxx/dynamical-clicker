let DOMElementsCreator = {
  market__tools__item: (infoTools) => `
    <div id="${infoTools.id}" class="market__tools__item item-pickaxe">
      <div class="item-icon"><img src="${infoTools.iconImg}" alt="${infoTools.name}"></div>
      <div class="item-info">
        <h2>${infoTools.name}</h2>
        <p>
        ${infoTools.description}
        </p>
      </div>
      <div class="item-priceButton">
        <p>${infoTools.price} осколков</p>
        <button>купить</button>
      </div>
    </div>`,
  createMarketToolsItem() {
    document.getElementById("market-tools").innerHTML = "";
    if (!document.getElementById("market-tools")) return;
      for (let i = 0; i < 5; i++) {
        document.getElementById("market-tools").innerHTML += DOMElementsCreator[
          "market__tools__item"
        ]({
          id: i,
          name: "Предмет" + (i + 1),
          description:
            "описание описание описание описание описание описание описание",
          price: 500 * (i + 1),
        });
      }
  },
  item__block: (info) => `
  <div class="item__block">
  <div class="item">
      <p>${info.name}</p>
  </div>
  <div>${info.count}</div>
</div>
  `,

  activeCursor() {
    let el = ["weapon","magic","item"]
    if(document.getElementById("activeCursor") == null) return
    document.getElementById("activeCursor").innerHTML = "";
    
    for (key in STORE.activeCursor) {  
      console.log()
      document.getElementById("activeCursor").innerHTML += DOMElementsCreator[
        "item__block"
      ]({
        name: STORE.properties[key][STORE.activeCursor[key].name].name,
        count: STORE.items[STORE.activeCursor[key].name] || '∞',
      });
    }
  },
};
