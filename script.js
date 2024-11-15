// Load books from localStorage or use sample data
let sampleBooks = JSON.parse(localStorage.getItem("books")) || [
    { id: 1, title: "To Kill a Mockingbird", author: "Harper Lee", editorial: "J.B. Lippincott & Co.", edition: 1, pages: 281 },
    { id: 2, title: "1984", author: "George Orwell", editorial: "Secker & Warburg", edition: 1, pages: 328 },
    { id: 3, title: "The Great Gatsby", author: "F. Scott Fitzgerald", editorial: "Charles Scribner's Sons", edition: 1, pages: 218 }
];

// Function to display books on the main page
function displayBooks() {
    const itemList = document.getElementById("item-list");
    if (itemList) {
        itemList.innerHTML = ""; // Clear the list before rendering
        sampleBooks.forEach(book => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `item.html?id=${book.id}`;
            link.textContent = `${book.title} by ${book.author}`;
            listItem.appendChild(link);
            itemList.appendChild(listItem);
        });
    }
}

// Load books on DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    displayBooks();

    // Handle item details on item.html
    const itemDetails = document.getElementById("item-details");
    if (itemDetails) {
        const urlParams = new URLSearchParams(window.location.search);
        const itemId = urlParams.get("id");
        const book = sampleBooks.find(b => b.id == itemId);
        if (book) {
            itemDetails.innerHTML = `<h2>${book.title}</h2><p><strong>Author:</strong> ${book.author}</p><p><strong>Editorial:</strong> ${book.editorial}</p><p><strong>Edition:</strong> ${book.edition}</p><p><strong>Pages:</strong> ${book.pages}</p>`;
        } else {
            itemDetails.innerHTML = "<p>Item not found.</p>";
        }
    }

    // Handle form submission on create.html
    const createForm = document.getElementById("create-form");
    if (createForm) {
        createForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value;
            const editorial = document.getElementById("editorial").value;
            const edition = parseInt(document.getElementById("edition").value);
            const pages = parseInt(document.getElementById("pages").value);

            // Prevent negative values
            if (edition < 0 || pages < 0) {
                alert("Edition and Number of Pages cannot be negative.");
                return;
            }

            const newBook = { id: sampleBooks.length + 1, title, author, editorial, edition, pages };
            sampleBooks.push(newBook);

            // Save the updated book list to localStorage
            localStorage.setItem("books", JSON.stringify(sampleBooks));

            alert(`New book "${title}" by ${author} added!`);
            window.location.href = "index.html";
        });
    }
});
