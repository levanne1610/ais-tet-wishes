// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, set, onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL0PwXSQwjowuw-jskuuIhU1rvLTQi7uI",
  authDomain: "sendyourwish-44a85.firebaseapp.com",
  databaseURL: "https://sendyourwish-44a85-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sendyourwish-44a85",
  storageBucket: "sendyourwish-44a85.appspot.com",
  messagingSenderId: "1056032145639",
  appId: "1:1056032145639:web:f5045d9706160ebddb6242"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Check if the form exists (Form Submission Logic)
if (document.getElementById("tetWishForm")) {
  const tetWishFormDB = ref(database, "tetWishForm");

  document.getElementById("tetWishForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const wish = document.getElementById("wish").value.trim();
    if (!wish) {
      alert("Please enter your Tết wish!");
      return;
    }
    // Save wish to Firebase
    const newWishRef = push(tetWishFormDB);
    set(newWishRef, { wish })
      .then(() => {
        alert("Your wish has been submitted successfully!");
        document.getElementById("tetWishForm").reset();

        // Redirect to display.html
        window.location.href = "display.html";
      })
      .catch((error) => {
        console.error("Error saving wish:", error);
        alert("Something went wrong. Please try again.");
      });
  });
}

// Check if the wish display grid exists (Display Wishes Logic)
if (document.getElementById("wishesGrid")) {
  const tetWishFormDB = ref(database, "tetWishForm");
  const wishesGrid = document.getElementById("wishesGrid");

  // Fetch and display wishes as cards
  onValue(tetWishFormDB, (snapshot) => {
    wishesGrid.innerHTML = ""; // Clear existing wishes

    if (!snapshot.exists()) {
      // Show a message if no wishes are found
      wishesGrid.innerHTML = `<p class="text-center">No wishes to display yet. Submit your wishes now!</p>`;
      return;
    }

    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();

      // Create a card for each wish
      const card = document.createElement("div");
      card.className = "card col-md-4";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      cardBody.textContent = childData.wish;

      card.appendChild(cardBody);
      wishesGrid.appendChild(card);
    });
  });
}
