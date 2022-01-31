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

        bookDiv.appendChild(c);

        container.appendChild(bookDiv);
        console.log(bookDiv);

    });
}

function addComments(comments) {
    var commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    comments.forEach((comment, index) => {
        var c = document.createElement('p');
        c.innerHTML = (index + 1) + ". " + comment;
        commentDiv.appendChild(c);
    })

    return commentDiv;
}


fetchBooks();