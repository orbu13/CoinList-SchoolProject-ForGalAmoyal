const loaderContainer = document.getElementById("progress-placeHolder")
const coinsContainer = document.querySelector(".coinsContainer") 
const buttonSearch = document.querySelector(".buttonSearch")
const searchInput = document.querySelector("input")
const parallax = document.querySelector(".parallax")
const infoModal = document.querySelector(".modal")
const infoModalContent = document.querySelector(".modalContent")
let list = []
let markedCoins = []
const cache = {}
const pickedCache = {}
const cacheTimeOut = 2*60*1000
let filterList 
buttonSearch.addEventListener("click", function(){
    loaderContainer.classList.add('show')
    setTimeout(() => {
        filterList = list.filter(function(item){
        return item.name.includes(searchInput.value)
    })
    displayCoins(filterList)
        loaderContainer.classList.remove('show')        
    }, 3000);
})

function displayCoins(coins){
    coinsContainer.innerHTML = ""
    const coinSlice = coins.slice(0,10)
    coinSlice.forEach(element => {
        const coinCard = document.createElement("div")
        coinCard.classList.add("coinCard")
        
        const coinTitle = document.createElement("h2")
        const coinTitleP = document.createElement("p")
        const buttonInfo = document.createElement("button")
        buttonInfo.id = element.id
        buttonInfo.addEventListener("click", showMoreInfo)
        const toggleSwitchContainer = document.createElement("div")
        const toggleSwitch = document.createElement("label")
        const toggleCheckbox = document.createElement("input")
        toggleCheckbox.addEventListener("change", function(e){
            if (e.target.checked === true) {
                if (markedCoins.length < 5) {
                if (markedCoins.includes(element.name) === false){
                markedCoins.push(element.name);
                }
                } else{
                e.target.checked = false;
                infoModal.style.display = "block"
                infoModalContent.innerHTML = ""
                const pickedCoins = []
                coinSlice.forEach(function(coin){
                    if(markedCoins.includes(coin.name)){
                        pickedCoins.push(coin)
                    }
                })
                const popularCoins = []
                const bitcoin = list.find((item)=>{
                    return item.name === "Bitcoin"
                })
                const peercoin = list.find((item)=>{
                    return item.name === "Peercoin"
                })
                popularCoins.push(bitcoin)
                popularCoins.push(peercoin)

                    popularCoins.forEach(element =>{
                        const coinsCardModal = document.createElement("div")
                        coinsCardModal.classList.add("coinsCardModal")
                        
                        const coinsTitleModal = document.createElement("h2")
                        coinsTitleModal.innerText = "Coin Title: " + element.symbol
                        const coinsNameModal = document.createElement("p")
                        coinsNameModal.innerText = "Coin Name: " + element.name
                        const toggleSwitchContainerModal = document.createElement("div")
                        const toggleSwitchModal = document.createElement("label")
                        toggleSwitchModal.classList.add("switch")
                        const toggleCheckboxModal = document.createElement("input")
                        toggleCheckboxModal.type = "checkbox"
                        toggleCheckboxModal.addEventListener("change", (e)=>{
                            if (e.target.checked === true) {
                                if (markedCoins.length >= 5) {
                                  e.target.checked = false;
                                  alert(
                                    "Please unchecked one of your picked coins in order to add new chaise"
                                  );
                                } else if (markedCoins.includes(element.name) === false) {
                                  markedCoins.push(element.name);
                                }
                              } else {
                                console.log("popular");
                                markedCoins.splice(markedCoins.indexOf(element.name), 1);
                              }
                
                              console.log(markedCoins);
                        })

                        toggleSwitchContainerModal.classList.add("toggleSwitchContainer")
                        const toggleSlider = document.createElement("span")
                        toggleSlider.classList.add("slider", "round")
                    
                        infoModalContent.appendChild(coinsCardModal)
                        coinsCardModal.appendChild(coinsTitleModal)
                        coinsCardModal.appendChild(coinsNameModal)

                        toggleSwitchContainerModal.appendChild(toggleSwitchModal)
                        toggleSwitchModal.appendChild(toggleCheckboxModal)
                        coinsCardModal.appendChild(toggleSwitchContainerModal)
                        toggleSwitchModal.appendChild(toggleSlider)
                    })

                    pickedCoins.forEach(element => {
                        const coinsCardModal = document.createElement("div")
                        coinsCardModal.classList.add("coinsCardModal")
                        
                        const coinsTitleModal = document.createElement("h2")
                        coinsTitleModal.innerText = "Coin Title: " + element.symbol
                        const coinsNameModal = document.createElement("p")
                        coinsNameModal.innerText = "Coin Name: " + element.name
                        const buttonInfoModal = document.createElement("button")
                        const toggleSwitchContainerModal = document.createElement("div")
                        const toggleSwitchModal = document.createElement("label")
                        toggleSwitchModal.classList.add("switch")
                        const toggleCheckboxModal = document.createElement("input")
                        toggleCheckboxModal.type = "checkbox"
                        toggleSwitchContainerModal.classList.add("toggleSwitchContainer")
                        const toggleSlider = document.createElement("span")
                        toggleSlider.classList.add("slider", "round")

                        toggleCheckboxModal.checked = true
                        toggleCheckboxModal.addEventListener("change", (e)=>{
                            if (e.target.checked === true) {
              
                                if (
                                  markedCoins.length < 5 &&
                                  markedCoins.includes(element.name) === false
                                ) {
                                  console.log("Adding:", element.name);
                                  markedCoins.push(element.name);
                                } else {
                            
                                  console.log(
                                    "Cannot add more than 5 or already included:",
                                    element.name
                                  );
                                  e.target.checked = false;
                                }
                              } else {
                     
                                const index = markedCoins.indexOf(element.name);
                                if (index > -1) {
                                    let allToggles = Array.from(document.querySelectorAll(".coinsContainer input"))
                                    let singleInputElement = allToggles.find((item)=>{
                                        return item.id === element.id
                                    })
                                    console.log(singleInputElement);
                                    singleInputElement.checked = false
                                  markedCoins.splice(index, 1);
                                }
                              }
                
                              console.log("Marked Coins:", markedCoins);
                        })
                    
                        infoModalContent.appendChild(coinsCardModal)
                        coinsCardModal.appendChild(coinsTitleModal)
                        coinsCardModal.appendChild(coinsNameModal)

                        toggleSwitchContainerModal.appendChild(toggleSwitchModal)
                        toggleSwitchModal.appendChild(toggleCheckboxModal)
                        coinsCardModal.appendChild(toggleSwitchContainerModal)
                        toggleSwitchModal.appendChild(toggleSlider)
                    })        
                }
                } else {
                const index = markedCoins.indexOf(element.name);
                if (index >= 0) {
                markedCoins.splice(index, 1);
                }
                }
        })
        const toggleSlider = document.createElement("span")

        buttonInfo.innerText = "More Info"
        buttonInfo.classList.add("buttonInfo")

        coinTitle.classList.add("coinTitle")
        coinTitle.innerText = element.symbol

        coinTitleP.classList.add("coinTitleP")
        coinTitleP.innerText = element.name

        toggleSwitchContainer.classList.add("toggleSwitchContainer")
        toggleSwitch.classList.add("switch")
        toggleCheckbox.type = "checkbox"
        toggleCheckbox.id = element.id
        toggleSlider.classList.add("slider", "round")
        
        coinCard.appendChild(coinTitle)
        coinCard.appendChild(coinTitleP)
        coinCard.appendChild(buttonInfo)
        toggleSwitch.appendChild(toggleCheckbox)
        toggleSwitch.appendChild(toggleSlider)
        toggleSwitchContainer.appendChild(toggleSwitch)
        coinCard.appendChild(toggleSwitchContainer)
        coinsContainer.appendChild(coinCard)
    });
}
const storedList = JSON.parse(localStorage.getItem("storedList"))
if(storedList === null){
    loaderContainer.classList.add('show')
    setTimeout(()=>{
        fetch ('https://api.coingecko.com/api/v3/coins/list')
        .then(function(res){
            return res.json()
        })
        .then(function(data){
            list = data 
            localStorage.setItem("storedList", JSON.stringify(data))
            loaderContainer.classList.remove('show')
    
        })
        .catch(function(error){
            console.log("something went wrong" + error);
        })
    },3000)
}else{
    loaderContainer.classList.add('show')

    setTimeout(()=>{
        list = storedList
        loaderContainer.classList.remove('show')
    },3000)
}


window.addEventListener("scroll", function(){
    let offSet = document.documentElement.scrollTop || document.body.scrollTop
    parallax.style.backgroundPositionY = offSet * 0.7 + "px"
})

function showMoreInfo(e){
    if(e.target.innerText === "More Info"){
        loaderContainer.classList.add('show')
        setTimeout(()=>{
        let currentTIme = new Date().getTime()
        e.target.innerText = "Hide More Info"
        let coinCard = e.target.closest(".coinCard")
        console.log(coinCard);
        let coinId = e.target.id
        if(cache[coinId] && currentTIme - cache[coinId].timestamp < cacheTimeOut){
            console.log("testing");
            const data = cache[coinId]
            console.log(data);
            const infoDivContainer = document.createElement("div")
            infoDivContainer.classList.add("infoDivContainer")
            const dollarNameElement = document.createElement("h2")
            dollarNameElement.classList.add("dollarNameElement")
            dollarNameElement.innerText = data.name
            const dollarPriceElement = document.createElement("p")
            dollarPriceElement.innerHTML = "Price is USD: &#36; " + data.market_data.current_price.usd
            const euroPriceElement = document.createElement("p")
            euroPriceElement.innerHTML = "Price is EUR: &#8364; " + data.market_data.current_price.eur
            const ilsPriceElement = document.createElement("p")
            ilsPriceElement.innerHTML = "Price is ILS: &#8362; " + data.market_data.current_price.ils
            const coinImg = document.createElement("img")
            coinImg.classList.add("coinImg")
            coinImg.src = data.image.small
    
            infoDivContainer.appendChild(dollarNameElement)
            infoDivContainer.appendChild(dollarPriceElement)
            infoDivContainer.appendChild(euroPriceElement)
            infoDivContainer.appendChild(ilsPriceElement)
            infoDivContainer.appendChild(coinImg)

            coinCard.appendChild(infoDivContainer)
        }else{
            let coinId = e.target.id
            let currentCoin = filterList.find(function(item){
                return item.id === coinId
            })
            fetch('https://api.coingecko.com/api/v3/coins/' + currentCoin.id)
            .then(function(res){
                console.log("making new request");
                return res.json()
            })
            .then(function(data){
                data.timestamp = new Date().getTime()
                cache[coinId] = data
                const infoDivContainer = document.createElement("div")
                infoDivContainer.classList.add("infoDivContainer")
                const dollarNameElement = document.createElement("h2")
                dollarNameElement.classList.add("dollarNameElement")
                dollarNameElement.innerText = data.name
                const dollarPriceElement = document.createElement("p")
                dollarPriceElement.innerHTML = "Price is USD: &#36; " + data.market_data.current_price.usd
                const euroPriceElement = document.createElement("p")
                euroPriceElement.innerHTML = "Price is EUR: &#8364; " + data.market_data.current_price.eur
                const ilsPriceElement = document.createElement("p")
                ilsPriceElement.innerHTML = "Price is ILS: &#8362; " + data.market_data.current_price.ils
                const coinImg = document.createElement("img")
                coinImg.classList.add("coinImg")
                coinImg.src = data.image.small
        
                infoDivContainer.appendChild(dollarNameElement)
                infoDivContainer.appendChild(dollarPriceElement)
                infoDivContainer.appendChild(euroPriceElement)
                infoDivContainer.appendChild(ilsPriceElement)
                infoDivContainer.appendChild(coinImg)
        
                coinCard.appendChild(infoDivContainer)
            })
        }
        loaderContainer.classList.remove('show')
    
    },3000)

    }else if(e.target.innerText === "Hide More Info"){
        e.target.innerText = "More Info"
        let coinCard = e.target.closest(".coinCard")
        let coinInfoElement = coinCard.querySelector(".infoDivContainer")
        coinInfoElement.remove()
        console.log(coinInfoElement);
    }
}

function closeModal(){
    markedCoins = markedCoins.filter((coinName)=>{
        return coinName != "Peercoin" && coinName != "Bitcoin"
    })
    infoModal.style.display = "none"
}