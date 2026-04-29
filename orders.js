// Load existing orders OR empty
let orders = JSON.parse(localStorage.getItem("orders")) || [];

// Load products (important connection)
let products = JSON.parse(localStorage.getItem("products")) || [];

const container = document.getElementById("orders-container");

// ==========================
// CREATE ORDER (FROM PRODUCT)
// ==========================
function createOrder(productIndex) {
  const product = products[productIndex];

  const newOrder = {
    id: Date.now(),
    productName: product.name,
    price: product.price,
    status: "pending",
    date: new Date().toLocaleString()
  };

  orders.push(newOrder);
  saveOrders();
}

// ==========================
// DISPLAY ORDERS
// ==========================
function renderOrders() {
  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No orders yet</p>";
    return;
  }

  orders.forEach((order, index) => {
    container.innerHTML += `
      <div class="card">
        <h3>Order #${order.id}</h3>

        <p><strong>Product:</strong> ${order.productName}</p>
        <p><strong>Price:</strong> R${order.price}</p>
        <p><strong>Date:</strong> ${order.date}</p>

        <span class="status ${order.status}">
          ${order.status}
        </span>

        <br><br>

        <button class="btn btn-primary" onclick="markComplete(${index})">
          Complete
        </button>

        <button class="btn btn-danger" onclick="deleteOrder(${index})">
          Delete
        </button>
      </div>
    `;
  });
}

// ==========================
// UPDATE STATUS
// ==========================
function markComplete(index) {
  orders[index].status = "completed";
  saveOrders();
}

// ==========================
// DELETE ORDER
// ==========================
function deleteOrder(index) {
  orders.splice(index, 1);
  saveOrders();
}

// ==========================
// SAVE
// ==========================
function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

// ==========================
// INIT
// ==========================
renderOrders();
