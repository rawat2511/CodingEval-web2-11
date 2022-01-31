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
        c.onchange = changed;
        commentDiv.appendChild(c);
    })


    return commentDiv;
}


fetchBooks();