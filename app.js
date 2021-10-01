const list = document.querySelector("ul");
const form = document.querySelector("form");
const button = document.querySelector("button");

const addRecipe = (recipe, id) => {
  let html = `
  <li data-id="${id}">
  <div>${recipe.title}</div>
  <div>${recipe.created_at.toDate()}</div>
  <button class="btn btn-danger btn-sm my-2">delete</button>
  </li>`;
  list.innerHTML += html;
};

const deleteRecipe = (id) => {
  const recipes = document.querySelectorAll("li");
  recipes.forEach((recipe) => {
    if (recipe.getAttribute("data-id") === id) {
      recipe.remove();
    }
  });
};

//Real Time Listener
const unsub = db.collection("recipes").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    const doc = change.doc;
    if (change.type === "added") {
      addRecipe(doc.data(), doc.id);
    } else if (change.type === "removed") {
      deleteRecipe(doc.id);
    }
  });
});
//Add documents
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const now = new Date();
  const recipe = {
    title: form.recipe.value,
    created_at: firebase.firestore.Timestamp.fromDate(now),
  };
  db.collection("recipes")
    .add(recipe)
    .then(() => {
      console.log("recipe added");
    })
    .catch((err) => {
      console.log(err);
    });
});
// Delete Document
list.addEventListener("click", (e) => {
  if (e.target.tagName === "button") {
    const id = e.target.parentElement.getAttribute("data-id");
    db.collection("recipes")
      .doc(id)
      .delete()
      .then(() => {
        console.log("recipe deleted");
      })
      .catch(err);
  }
});

//Unsubscribe from Database Changes by invoking unsub()
button.addEventListener("click", () => {
  unsub();
  console.log("unsubscribed");
});
