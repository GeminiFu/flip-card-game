const cardStack = {
  0: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  1: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  2: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  3: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
}


const cardsContainer = document.getElementById('cards-container')
let playerClickedElement = []


function Card(cardIndex) {
  const that = this
  const Id = cardIndex

  // 產生卡片在 HTML
  that.createElement = function () {
    const element = document.createElement('div')

    that.addClass(element, 'card', 'hide')

    that.giveCard(element)

    that.clickEvent(element)

    return element
  }

  // 卡片點擊事件
  that.clickEvent = function (element) {
    element.addEventListener('click', () => {
      // console.log('clicked')


      if (element.classList.contains('hide')) {
        playerClickedElement.push(element)

        that.renderFlipCard(element)

        if (playerClickedElement.length === 2) {
          that.compare()
        }
      }

    })
  }

  // 比較數字
  that.compare = function () {

    console.log('two card clicked')

    const [card1, card2] = playerClickedElement

    if (card1.dataset.number !== card2.dataset.number) {
      playerClickedElement.forEach((element) => {
        that.renderFoldCard(element)
      })
    }

    playerClickedElement = []

    that.gameover()
  }

  // 給卡片
  that.giveCard = function (element) {
    const [suit, number] = randomCard()

    element.dataset.suit = suit
    element.dataset.number = number
  }

  // TODO: 翻開卡片渲染
  that.renderFlipCard = function (element) {
    const suit = element.dataset.suit
    const number = element.dataset.number

    element.classList.remove('hide')
    element.classList.add('show')

    element.innerHTML = `<p>suit is ${suit}, number is ${number}</p>`
  }

  // 蓋起卡片渲染
  that.renderFoldCard = function (element) {

    element.classList.remove('show')
    element.classList.add('hide')
    element.innerHTML = ``
  }

  // 卡片設定class
  that.addClass = function (element, ...className) {
    for (let i = 0, n = arguments.length - 1; i < n; i++) {
      element.classList.add(arguments[i + 1])
    }
  }

  // 遊戲結束判定
  that.gameover = function () {
    const nodes = cardsContainer.childNodes



    for (let i = 0, n = nodes.length; i < n; i++) {
      if (nodes[i].classList.contains('hide')) {
        return
      }
    }

    const body = document.getElementsByTagName('body')[0]
    body.innerHTML = `Game Over`
  }
}

// 建立52張牌
const newCardsStack = []

for (let i = 0; i < 52; i++) {
  const card = new Card

  const element = card.createElement()

  newCardsStack.push([card, element])

  cardsContainer.appendChild(element)

  // element.click()
}





// -----------------------------------------------------------------------------------------------------

// 亂數卡片產生器
function randomCard() {
  let randomSuit = randomFromZero(3)

  while (cardStack[randomSuit].length === 0 && isStackHasCard()) {
    randomSuit = randomFromZero(3)
  }

  const randomNumber = randomFromZero(cardStack[randomSuit].length - 1)

  return takeCard(randomSuit, randomNumber)
}

// 拿走卡片
function takeCard(suit, index) {
  const number = cardStack[suit].splice(index, 1)

  return [suit, number[0]]
}

// 從零到某數的亂數產生器
function randomFromZero(int) {
  return Math.floor(Math.round(Math.random() * int))
}

// 檢查 cardStack 是否還有牌
function isStackHasCard() {
  for (let i = 0; i < 4; i++) {
    if (cardStack[i].length > 0) {
      return 1
    }
  }

  return 0
}




window.addEventListener('click', () => {
  // const card = randomCard()

  // console.log('card is ', card)


  // console.log('cardStack is ', cardStack)
})





// ------------------------------------------------------------------------------------------------------
function flipAllCards() {
  newCardsStack.forEach(item => {
    const [card, element] = item

    card.renderFlipCard(element)
  })
}