const container = document.getElementById("container");

async function fetchBooks() {
    let books = await fetch("http://localhost:3000/books");
    books = await books.json();
    console.log(books);
    dispalyBooks(books);
}

function dispalyBooks(books) {
    books.forEach(({book, author, comments, id}) => {

        var bookDiv = document.createElement('div');
        bookDiv.id = id;
        bookDiv.className = "card";
        
        var head = document.createElement('h2');
        head.innerHTML = `${book} - ${author}`;
        bookDiv.appendChild(head);

        var comment = document.createElement('h3');
        comment.innerHTML = "Comments:"

        bookDiv.appendChild(comment);

        const c = addComments(comments);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Add Comment';

        const btn = document.createElement('button');
        btn.innerHTML = "Add Comment";
        btn.addEventListener("click", () => {
            addNewComment(id, [...comments, input.value]);
            input.value = "";
        })

        bookDiv.appendChild(c);

        bookDiv.appendChild(input);
        bookDiv.appendChild(btn);

        // const addNewComment 

        container.appendChild(bookDiv);
        console.log(bookDiv);

    });
}


function changed() {
    console.log(1);
}

function addComments(comments) {

    var commentDiv = document.createElement('ul');
    commentDiv.className = 'comment';
    comments.forEach((comment, index) => {
        var c = document.createElement('li');
        c.contentEditable = "true";
        c.innerHTML = comment;
        c.addEventListener("input", () => {
            console.log(c.innerHTML);
        })
        commentDiv.appendChild(c);
    })


    return commentDiv;
}

const addBook = document.getElementById("addBook");
addBook.addEventListener("click", addBookToList);

async function addBookToList() {
    var book = document.getElementById("book").value;
    var author = document.getElementById("author").value;
    var data = {book: book, author: author, comments: []};
    console.log(data);
    var i = 0;
    
    const response = await fetch("http://localhost:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const res = await response.json();

    console.log(res);

    fetchBooks();
}


async function addNewComment(id, comment) {

    var data = {
        comments: comment
    };
    console.log(comment);

    await fetch(`http://localhost:3000/books/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(data)
    })

    fetchBooks();
}

fetchBooks();

