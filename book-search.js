const searchByBookName = document.getElementById('search-book-name');
const searchBtn= document.getElementById('search-books');
const bookDisplay = document.getElementById('book-display');
const noSearchResult = document.getElementById('no-result');
const totalBooksFound = document.getElementById('search-section');
const div1 = document.createElement('div');


searchBtn.addEventListener('click', ()=>{
    bookDisplay.innerHTML = '';
    const bookNameEntered = searchByBookName.value;
    if(bookNameEntered === ''){
        noSearchResult.innerText = "Enter a book name first";
        div1.innerHTML = "";
        return;
    }
    searchByBookName.value = '';
    
    // console.log(bookNameEntered);
    const url = `https://openlibrary.org/search.json?q=${bookNameEntered}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data){
            noSearchResult.innerText ='';
        }
        displayData(data);
    });
}
)

const displayData = data =>{
    
    const fetchedData = data.docs;
    // console.log(fetchedData);
    const totalSearchResults = fetchedData.length;
    if(totalSearchResults>0)
    {div1.innerHTML=`<p id="totalBooks" class="text-center mt-4">Search Results : ${totalSearchResults}</p>`;
    totalBooksFound.appendChild(div1);}
    else{
        noSearchResult.innerText = "NO RESULTS FOUND"
        div1.innerHTML = "";
    }

    fetchedData.forEach(item => {
        // console.log(item.cover_i);
        // console.log(item.title);
        
        const div2 = document.createElement('div');
        div2.classList.add('col-md-4');
        console.log(item.cover_i);
        let imgUrl = item.cover_i? `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg` : `https://orsa.tech/wp-content/uploads/2018/07/dummy-placeholder-image-400x400.jpg`;

        div2.innerHTML=`
        <div class="card h-auto mb-4">
            <div class="rounded overflow-hidden border p-3 text-center ">
                <img class="img-fluid" src=${imgUrl} alt="" />
            </div>
            <div
                class="
                py-2
                d-flex
                justify-content-between
                align-items-center
                d-md-block
                text-md-center
                "
            >
                <h4>Book Name: ${item.title}</h4>
                <p>Author Name: ${item.author_name!==undefined?item.author_name[0]: 'not available'}</p>
                <p>First Publish Year : ${item.first_publish_year!== undefined? item.first_publish_year: 'not available'}</p>
                <p id="publisher">Publisher : ${item.publisher!==undefined?item.publisher[0]: 'not available'}</p>
                <button class="btn btn-dark">More Details</button>
            </div>
        </div>
        `;
        // if(item.cover_i === undefined){
        //     console.log(item.cover_i);
        //     console.log(document.getElementById('img-div').src=`facebook_profile_image.png`);
        // }
        // if(item.publisher!==undefined)
        console.log(item.author_name);
        bookDisplay.appendChild(div2);
    });
}
