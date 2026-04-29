let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

const list = document.getElementById("product-list");

// SAVE (Add or Update)
function saveProduct() {
  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const image = document.getElementById("image").value;
  const category = document.getElementById("category").value;

  if (!name || !price) {
    alert("Name and price required");
    return;
  }

  const product = {
    id: Date.now(),
    name,
    price,
    image,
    category
  };

  if (editIndex !== null) {
    products[editIndex] = product;
    editIndex = null;
  } else {
    products.push(product);
  }

  saveProducts();
  clearForm();
}

// DISPLAY
function renderProducts() {
  list.innerHTML = "";

  products.forEach((p, index) => {
    list.innerHTML += `
      <div class="card">
        <h3>${p.name}</h3>
        <p>R${p.price}</p>
        <p>${p.category}</p>

        <button class="btn btn-primary" onclick="editProduct(${index})">Edit</button>
        <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
      </div>
    `;
  });
}

// EDIT
function editProduct(index) {
  const p = products[index];

  document.getElementById("name").value = p.name;
  document.getElementById("price").value = p.price;
  document.getElementById("image").value = p.image;
  document.getElementById("category").value = p.category;

  editIndex = index;
}

// DELETE
function deleteProduct(index) {
  products.splice(index, 1);
  saveProducts();
}

// SAVE STORAGE
function saveProducts() {
  localStorage.setItem("products", JSON.stringify(products));
  renderProducts();
}

// CLEAR FORM
function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("image").value = "";
  document.getElementById("category").value = "";
}

// INIT
renderProducts();
