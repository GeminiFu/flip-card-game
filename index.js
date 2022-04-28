const cardStack = {
  0: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  1: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  2: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
  3: ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
}


const cardsContainer = document.getElementById('cards-container')


function Card(cardIndex) {
  const that = this
  const Id = cardIndex

  console.log(that)

  // 產生卡片在 HTML
  that.generator = function () {
    cardsContainer.innerHTML += `
      <div class="card""></div>
    `
    const cardDom = document.getElementsByClassName('card')[Id]

    cardDom.dataset.index = Id

    that.clickEvent(cardDom)
  }


  // 卡片點擊事件
  that.clickEvent = function (card) {
    card.addEventListener('click', () => {
      if (!card.dataset.cardId) {
        card.dataset.cardId = randomCard()
      }
      // console.log(cardStack)
      console.log(card.dataset.cardId)
      // console.dir(card)
    })
  }
}

const cardNewStack = {}

for (let i = 0; i < 52; i++) {
  const card = new Card(i)
  card.generator()

  cardNewStack[i] = document.getElementsByClassName('card')[i]

}





// -----------------------------------------------------------------------------------------------------

// 亂數卡片產生器
function randomCard() {
  let randomSuit = randomFromZero(3)

  while (cardStack[randomSuit].length === 0 && isStackHasCard()) {
    randomSuit = randomFromZero(3)
  }

  console.log('clicked')

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


