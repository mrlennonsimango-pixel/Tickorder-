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

// ==========================
// LOAD ORDERS FROM FIREBASE
// ==========================
function loadOrders() {
  container.innerHTML = "<p>Loading orders...</p>";

  db.collection("orders")
    .orderBy("createdAt", "desc")
    .onSnapshot((snapshot) => {
      container.innerHTML = "";

      if (snapshot.empty) {
        container.innerHTML = "<p>No orders yet</p>";
        return;
      }

      snapshot.forEach((doc) => {
        const order = doc.data();

        container.innerHTML += `
          <div class="card">
            <h3>${order.orderID || "Order"}</h3>

            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>

            <p><strong>Total:</strong> R${order.total}</p>
            <p><strong>Delivery:</strong> ${order.deliveryType}</p>
            <p><strong>Status:</strong> ${order.status}</p>

            <hr>

            <p><strong>Items:</strong></p>
            <ul>
              ${(order.items || []).map(i => `<li>${i.name} - R${i.price}</li>`).join("")}
            </ul>

            <button onclick="markComplete('${doc.id}')">
              Mark Completed
            </button>

            <button onclick="deleteOrder('${doc.id}')">
              Delete
            </button>
          </div>
        `;
      });
    });
}

// ==========================
// UPDATE STATUS
// ==========================
function markComplete(id) {
  db.collection("orders").doc(id).update({
    status: "completed"
  });
}

// ==========================
// DELETE ORDER
// ==========================
function deleteOrder(id) {
  db.collection("orders").doc(id).delete();
}

// INIT
loadOrders();
