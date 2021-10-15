//this is my first funtion of the books archrive project.....
const mainFunction = () => {
    document.getElementById('input-button').addEventListener('click', () => {
        const inputText = document.getElementById('input-field');
        const searchText = inputText.value;
        fetchData(searchText);
        inputText.value = null;

        // here clean to my dom...
        // const element = document.getElementById('booksDetails');
        // while (element.firstChild) {
        //     element.removeChild(element.firstChild);
        // }

        // enother way...
        // const element = document.getElementById('booksDetails');
        // while (element.firstChild) {
        //     element.removeChild(element.lastChild);
        // }

        // another way to clean dom..
        // const element = document.getElementById('booksDetails');
        // while (element.hasChildNodes()) {  
        //     element.removeChild(element.lastChild);
        //   }
        
        // // another way to clean dom..
        // const element = document.getElementById('booksDetails');
        // while (element.hasChildNodes()) {  
        //     element.removeChild(element.firstChild);
        //   }

        // const node = document.getElementById('booksDetails');
        // node.childNodes.forEach(child => {
        //     node.removeChild();
        // })
        
        //another way to dom clean...
        // const node = document.getElementById('booksDetails');
        // for (let i = node.childNodes.length - 1; i >= 0; i--) {
        //     node.removeChild(node.childNodes[i]);
        //  }
        
        //another way to clean.... this posidure some have problem dont use this....
        const booksDetails = document.getElementById('booksDetails');
        const el = booksDetails.childNodes;
        for (let i = el.length - 1; i >= 0; i--) {
            booksDetails.removeChild(booksDetails.childNodes[i])
        }
        toggleSpinner('block');
    });
};
mainFunction();

// toggle Spinner code 
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

//this is my fetchData fuction....
const fetchData = async (bookName) => {
    try {
        const url = `https://openlibrary.org/search.json?q=${bookName}`
        const res = await fetch(url);
        const data = await res.json();
        loadData(data)
    }
    catch (error) {
        console.log('Somthing Went Wrong!')
    };
};


//this is my loadData funtion....
const loadData = (data) => {
    const { docs } = data;
    for (let i = 0; i < docs.length; i++ ) {
        const books = docs[i];
        displayDataUI(books);
    }
    const books = document.getElementById('books');
    books.textContent = null;
    books.innerHTML = `<h5>Total Books Load: ${docs.length}</h5>`

    // result not found
    if (docs == null || docs.length == 0) {
        document.getElementById('notFound').style.display = 'block';
        document.getElementById('books').style.display = 'none';
        toggleSpinner('none');
    }
    else {
        document.getElementById('books').style.display = 'block';
    }
}


//this is my displayDetailsUI function...
const displayDataUI = (books) => {
    // detructuring of books
    const { _version_, author_name, first_publish_year, language, publish_place, publisher, title, edition_count, cover_i } = books;
    const booksDetails = document.getElementById('booksDetails');

    const div = document.createElement('div');
    div.classList.add('col');
    const image = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    div.innerHTML = `
    <div class="card h-100">
        <img src="${image ? image: ''}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"><span class="fw-bold">Title:</span> ${title}</h5>
            <p class="card-text"><span class="fw-bold">Version:</span> ${_version_ ? _version_: ''}</p>
            <p class="card-text"><span class="fw-bold">Author Name:</span> ${author_name ? author_name: ''}</p>
            <p class="card-text"><span class="fw-bold">First Publish Year:</span> ${first_publish_year ? first_publish_year: ''}</p>
            <p class="card-text"><span class="fw-bold">Language:</span> ${language ? language: ''}</p>
            <p class="card-text"><span class="fw-bold">Publish Place:</span> ${publish_place ? publish_place: ''}</p>
            <p class="card-text"><span class="fw-bold">Publisher:</span> ${publisher ? publisher: ''}</p>
            <p class="card-text"> <span class="fw-bold">Editions:</span> ${edition_count ? edition_count: ''}</p>
        </div>
    </div>
    `;
    booksDetails.appendChild(div);

    // // toggleSpinner and toggleResult function call
    // toggleResult('block');
    toggleSpinner('none');  
}
