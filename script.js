const books = [
  { title: "The Midnight Library", author: "Matt Haig", category: "Fiction", price: 16.99, isbn: "9780525559474", badge: "Reader favorite" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", price: 18.50, isbn: "9780553380163", badge: "A modern classic" },
  { title: "The Creative Act", author: "Rick Rubin", category: "Biography", price: 22.00, isbn: "9780593652886", badge: "Staff pick" },
  { title: "Clean Code", author: "Robert C. Martin", category: "Technology", price: 34.99, isbn: "9780132350884", badge: "Build better" },
  { title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", price: 14.25, isbn: "9780062315007", badge: "A lovely read" },
  { title: "Astrophysics for People in a Hurry", author: "Neil deGrasse Tyson", category: "Science", price: 15.75, isbn: "9780393609394", badge: "Big ideas" },
  { title: "Steve Jobs", author: "Walter Isaacson", category: "Biography", price: 19.99, isbn: "9781451648539", badge: "Inspiring" },
  { title: "The Design of Everyday Things", author: "Don Norman", category: "Technology", price: 21.50, isbn: "9780465050659", badge: "Design smarter" },
];

const bookGrid = document.querySelector("#book-grid");
const searchInput = document.querySelector("#book-search");
const categoryFilter = document.querySelector("#category-filter");
const emptyState = document.querySelector("#empty-state");
const cartCount = document.querySelector("#cart-count");
let cartItems = 0;

function renderBooks() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;
  const visibleBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  bookGrid.innerHTML = visibleBooks.map((book) => `
    <article class="book-card">
      <div class="book-cover">
        <img src="https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg" alt="Cover of ${book.title}" loading="lazy">
        <span class="book-tag">${book.badge}</span>
      </div>
      <div class="book-info">
        <span class="book-category">${book.category}</span>
        <h3 class="book-title" title="${book.title}">${book.title}</h3>
        <p class="book-author">by ${book.author}</p>
        <div class="book-bottom">
          <span class="book-price">$${book.price.toFixed(2)}</span>
          <button class="add-button" type="button" data-title="${book.title}">Add to cart</button>
        </div>
      </div>
    </article>
  `).join("");
  emptyState.hidden = visibleBooks.length > 0;
}

searchInput.addEventListener("input", renderBooks);
categoryFilter.addEventListener("change", renderBooks);
document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
});
bookGrid.addEventListener("click", (event) => {
  const button = event.target.closest(".add-button");
  if (!button) return;

  cartItems += 1;
  cartCount.textContent = cartItems;
  button.textContent = "Added ✓";
  button.classList.add("added");
  window.setTimeout(() => {
    if (button.isConnected) {
      button.textContent = "Add to cart";
      button.classList.remove("added");
    }
  }, 1100);
});

document.querySelectorAll(".category-card").forEach((button) => {
  button.addEventListener("click", () => {
    categoryFilter.value = button.dataset.category;
    renderBooks();
    document.querySelector("#books").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const toggle = event.currentTarget;
  const isExpanded = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!isExpanded));
  toggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
  document.querySelector("#nav-links").classList.toggle("open", !isExpanded);
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#nav-links").classList.remove("open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector(".menu-toggle").setAttribute("aria-label", "Open navigation menu");
  });
});

document.querySelector("#contact-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const message = document.querySelector("#form-message");
  if (!form.reportValidity()) return;

  message.textContent = "Thanks for your note! We’ll be in touch soon.";
  form.reset();
});

renderBooks();
