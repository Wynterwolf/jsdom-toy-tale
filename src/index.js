let addToy = false;
const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
    fetchToys()
    addNewToy()
    addLike()
  })

addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
})

function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => displayToys(toys))
}

function displayToys(toys){
  toys.forEach(toy => {
    makeToyCard(toy)
  })
}
function makeToyCard(toy) {
  const collection = document.querySelector('#toy-collection')
  const toyCard = document.createElement('div')
  const toyName = document.createElement('h2')
  const toyImg = document.createElement('img')
  const toyLikes = document.createElement('p')
  const toyLikeBtn = document.createElement('button')

  toyCard.className = 'card'
  toyCard.id = toy.id
  toyName.innerHTML = toy.name
  toyImg.src = toy.image
  toyImg.className = 'toy-avatar'
  toyLikes.innerHTML = toy.likes + ' likes'
  toyLikeBtn.innerHTML = 'Like <3'
  toyLikeBtn.className = 'like-btn'

  toyCard.append(toyName, toyImg, toyLikes, toyLikeBtn)

  collection.appendChild(toyCard);
}

function addNewToyListener() {
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const image = event.target[1].value;
    addNewToy(name, image);
  })
}

