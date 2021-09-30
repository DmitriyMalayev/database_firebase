const list = document.querySelector("ul");
const addRecipe = (recipe) => {
  let html = `
  <li>
  <div>${recipe.title}</div>
  <div>${recipe.created_at.toDate()}</div> 
  </li>`;
  list.innerHTML += html;
};

db.collection("recipes")
  .get()
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      addRecipe(doc.data());
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* 
reference to collection. 
get() is an asynchronous task which returns a promise
snapshot is how a collection looks like at that moment in time. 
  docs is an array with information

*/
