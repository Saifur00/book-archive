const searchByBookName = document.getElementById('search-book-name');
const searchBtn= document.getElementById('search-books');
const bookDisplay = document.getElementById('book-display');
const noSearchResult = document.getElementById('no-result');
const totalBooksFound = document.getElementById('search-section');
const div1 = document.createElement('div');
searchBtn.addEventListener('click', ()=>{
    const bookNameEntered = searchByBookName.value;
    if(bookNameEntered === ''){
        noSearchResult.innerText = "Enter a book name first";
    }
    searchByBookName.value = '';
    bookDisplay.innerHTML = '';
    
    // console.log(bookNameEntered);
    const url = `https://openlibrary.org/search.json?q=${bookNameEntered}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if(data.numFound !== 0){
            noSearchResult.innerText ='';
        }
        displayData(data)
    });
}
)

const displayData = data =>{
    
    const fetchedData = data.docs;
    // console.log(fetchedData);
    const totalSearchResults = fetchedData.length;
    div1.innerHTML=`<p id="totalBooks" class="text-center mt-4">Total Books Found : ${totalSearchResults}</p>`;
    totalBooksFound.appendChild(div1);
    fetchedData.forEach(item => {
        // console.log(item.cover_i);
        // console.log(item.title);
        const div2 = document.createElement('div');
        div2.classList.add('col-md-4');
        div2.innerHTML=`
        <div class="rounded overflow-hidden border p-3 text-center img-div">
            <img src= "https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg"  alt="" />
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
            <p>Author Name: ${item.author_name}</p>
            <p>First Publish Year : ${item.first_publish_year}</p>
            <p>Publisher : ${item.publisher}</p>
            <button class="btn btn-dark">More Details</button>
        </div>
        `;
        // const a = document.getElementsByTagName('img');
        // if(typeof item.cover_i === 'undefined'){
        //     // a.src="facebook_profile_image";
        //     const imgDiv= document.getElementsByClassName('img-div');
            
        //     // imgDiv.innerHTML = `<img src= "facebook_profile_image"  alt="" />`;
        //     // console.log(imgDiv.innerHTML);
        //     // console.log(imgDiv.length);
        //     // document.getElementById('book-display').appendChild(imgDiv);
        // 
        console.log(item.publisher)
        // if(type of (${item.publisher})=== undefined ){
        //     console.log("nothing to display");
        // }
        bookDisplay.appendChild(div2);
    });
}

// const imgError = image =>{
//     image.onerror = "";
//     image.src='facebook_profile_ima';
//     return true;
// }
