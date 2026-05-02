// Firebase config (same as checkout)
const firebaseConfig = {
  apiKey: "AIzaSyBhDQeyV9_REmBi0zjQQyawkDoaX7Ho544",
  authDomain: "tickorder-13b84.firebaseapp.com",
  projectId: "tickorder-13b84",
  storageBucket: "tickorder-13b84.appspot.com",
  messagingSenderId: "288232701324",
  appId: "1:288232701324:web:ae43423dacecd9508f6aa9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const container = document.getElementById("orders-container");

const statusFilter = document.getElementById("status-filter");
const searchInput = document.getElementById("search-input");
const sortFilter = document.getElementById("sort-filter");

// ==========================
// FORMAT STATUS LABEL
// ==========================
function formatStatus(status) {
  if (status === "pending") return "Pending";
  if (status === "processing") return "Processing (Packed)";
  if (status === "shipped") return "Shipped";
  if (status === "completed") return "Completed";
  return status;
}

// ==========================
// UPDATE STATUS
// ==========================
function updateStatus(id, newStatus) {
  db.collection("orders").doc(id).update({
    status: newStatus
  });
}

// ==========================
// DELETE ORDER
// ==========================
function deleteOrder(id) {
  db.collection("orders").doc(id).delete();
}

// ==========================
// LOAD ORDERS
// ==========================
function loadOrders() {

  db.collection("orders").onSnapshot(snapshot => {

    let orders = [];

    snapshot.forEach(doc => {
      orders.push({ id: doc.id, ...doc.data() });
    });

    applyFilters(orders);
  });
}

// ==========================
// APPLY FILTERS
// ==========================
function applyFilters(orders) {

  const status = statusFilter.value;
  const search = searchInput.value.toLowerCase();
  const sort = sortFilter.value;

  let filtered = orders;

  // Status filter
  if (status !== "all") {
    filtered = filtered.filter(o => o.status === status);
  }

  // Search
  if (search) {
    filtered = filtered.filter(o =>
      (o.name && o.name.toLowerCase().includes(search)) ||
      (o.phone && o.phone.includes(search)) ||
      (o.orderID && o.orderID.toLowerCase().includes(search))
    );
  }

  // Sort
  filtered.sort((a, b) => {
    if (sort === "newest") {
      return (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0);
    } else {
      return (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0);
    }
  });

  renderOrders(filtered);
}

// ==========================
// RENDER ORDERS
// ==========================
function renderOrders(orders) {

  container.innerHTML = "";

  if (orders.length === 0) {
    container.innerHTML = "<p>No matching orders</p>";
    return;
  }

  orders.forEach(order => {

    container.innerHTML += `
      <div class="card">

        <h3>${order.orderID || "Order"}</h3>

        <p><strong>Name:</strong> ${order.name}</p>
        <p><strong>Email:</strong> ${order.email}</p>
        <p><strong>Phone:</strong> ${order.phone}</p>

        <p><strong>Total:</strong> R${order.total}</p>
        <p><strong>Delivery:</strong> ${order.deliveryType}</p>

        <span class="status ${order.status}">
          ${formatStatus(order.status)}
        </span>

        <hr>

        <p><strong>Items:</strong></p>
        <ul>
          ${(order.items || []).map(i => `<li>${i.name} - R${i.price}</li>`).join("")}
        </ul>

        <button onclick="updateStatus('${order.id}', 'processing')">
          Processing
        </button>

        <button onclick="updateStatus('${order.id}', 'shipped')">
          Shipped
        </button>

        <button onclick="updateStatus('${order.id}', 'completed')">
          Completed
        </button>

        <button onclick="deleteOrder('${order.id}')">
          Delete
        </button>

      </div>
    `;
  });
}

// ==========================
// EVENTS
// ==========================
statusFilter.addEventListener("change", loadOrders);
searchInput.addEventListener("input", loadOrders);
sortFilter.addEventListener("change", loadOrders);

// INIT
loadOrders();
