let addToy = false;
// const toyFormContainer = document.querySelector(".container");

document.addEventListener("DOMContentLoaded", () => {
    fetchToys()
    addNewToy()
    addLike()
  })

"new-toy-btn".addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
})
//fetch Andy's toys
function fetchToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => displayToys(toys))
}
//add the toy card
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
//add new toy
function addNewToy() {
  const form = document.querySelector('.add-toy-form')
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = event.target[0].value;
    const image = event.target[1].value;
    addNewToy(name, image);
  })
}

function addNewToy(name, image) {
  const reqObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": name,
      "image": image,
      "likes": 0
    })
  }
  fetch('http://localhost:3000/toys', reqObj)
    .then(resp => resp.json())
    .then(json => makeToyCard(json))
    .catch(error => console.log(error))
}
// increase likes
function updateLikes(toy) {
  const reqObj = {
    method: "PATCH",
    headers: 
    {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body:JSON.stringify(
      {
        "likes": parseInt(toy.children[2].innerHTML) + 1
      })
    }
    fetch(`http://localhost:3000/toys/${toy.id}`, reqObj)
    .then(resp => resp.json())
    .then(json => updateCard(json))
    .catch(error => console.log(error))
  }

  function updateCard(toy) {
    const card = document.getElementById(`${toy.id}`)
    card.children[2].innerText = `${toy.likes} likes`
  }

  function addLike(){
    document.addEventListener('click', (event) => {
      if (event.target.className === 'like-btn') {
        console.log(parseInt(event.target.parentNode.children[2].innerHTML)+1)
        updateLikes(event.target.parentNode)
    }
  })
}