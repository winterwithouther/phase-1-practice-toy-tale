let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const url = "http://localhost:3000/toys"
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const toyContainer = document.querySelector("#toy-collection");
  const addToyForm = document.querySelector(".add-toy-form");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  function renderCard(toy) {
    const toyCard = document.createElement("div");
    const toyName = document.createElement("h2");
    const toyImg = document.createElement("img");
    const toyLikes = document.createElement("p");
    const likeBtn = document.createElement("button");

    toyCard.className = "card"
    toyImg.className = "toy-avatar";
    likeBtn.className = "like-btn";
    likeBtn.textContent = "Like ❤️";
    likeBtn.id = toy["id"];
    toyName.textContent = toy["name"];
    toyImg.src = toy["image"];
    toyLikes.textContent = toy["likes"];

    toyCard.append(toyName);
    toyCard.append(toyImg);
    toyCard.append(toyLikes);
    toyCard.append(likeBtn);
    toyContainer.append(toyCard);
  }

  fetch(url)
  .then(response => response.json())
  .then(toys => {
    toys.forEach((toy) => {
      renderCard(toy);
    })
  })
  .catch((err) => {
    alert("Failed to render toys")
  })

  addToyForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const toy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

    fetch(url, {
      method: "POST",
      headers: {"content-type": "application/json"},
      body: JSON.stringify(toy)
    })
    fetch(url)
    .then(response => response.json())
    .then(data => {
      renderCard(toy);
    });
  })

});
