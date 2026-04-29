// Load orders or create default
let orders = JSON.parse(localStorage.getItem("orders")) || [
  { id: 1001, customer: "John Doe", total: 250, status: "pending" },
  { id: 1002, customer: "Sarah Smith", total: 480, status: "completed" }
];

const container = document.getElementById("orders-container");

// Render orders
function renderOrders() {
  container.innerHTML = "";

  orders.forEach((order, index) => {
    container.innerHTML += `
      <div class="card">
        <h3>Order #${order.id}</h3>
        <p>Customer: ${order.customer}</p>
        <p>Total: R${order.total}</p>

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

// Mark as completed
function markComplete(index) {
  orders[index].status = "completed";
  saveOrders();
}

// Delete order
function deleteOrder(index) {
  orders.splice(index, 1);
  saveOrders();
}

// Save + re-render
function saveOrders() {
  localStorage.setItem("orders", JSON.stringify(orders));
  renderOrders();
}

// Initial load
renderOrders();
