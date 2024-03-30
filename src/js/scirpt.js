import { BASE_URL, options } from "./pixabay.js";
import axios from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio.js";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

//Elements

const galleryL =document.querySelector('.gallery');
const searchL = document.querySelector('input[name="searchQuery"]');
const searchForm = document.getElementById('search-form');
//lightbox
const lightbox = new simpleLightbox('.lightbox',{
    captionData: "alt",
    captionDelay: 250,
});
//char Var
let endPage = false;
let totalHits = 0;

//document listeners
searchForm.addEventListener("submit", submitAction);
window.addEventListener("scroll", pageEnd);

async function submitAction(e){
    e.preventDefault();
    options.params.q = searchL.value.trim();

    if (options.params.q ==="") return;
    options.params.page = 1;
    galleryL.innerHTML="";
    endPage = false;

    try {
        const result = await axios.get(BASE_URL, options);
        totalHits = result.data.totalHits;

        const {hits} = result.data;
        if (hits.length === 0){
            Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        else{
            Notify.success(`Hooray! We found ${totalHits} images.`);
            createGallery(hits);
        }
        searchL.value = "";
    }
    catch(e){
        Notify.failure(e);  
    }
}

//create gallery
function createGallery(hits){
    let galleryMarkup =
    hits.map(({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return `
                <a href =${largeImageURL} class="lightbox">
                    <div class="photo-card">
                        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                        <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                        </div>
                    </div>
                </a>
            `;
        }).join("");
    galleryL.insertAdjacentHTML('beforeend',galleryMarkup);

    //end of collection
    if (options.params.page * options.params.per_page >= totalHits){
        if (!endPage){
            Notify.info("We are sorry you reach the end of search");
            endPage = true;
        }
    }
    lightbox.refresh();
}

// load more page

async function loadNextPage(){
    options.params.page += 1;

    try{
        const result =await axios.get(BASE_URL, options);
        const hits = result.data.hits;
        createGallery(hits);
    }   
    catch(e){   
        Notify.failure(e);
    }
}

//endpage
function pageEnd(){
    const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight){
        loadNextPage();
    }
}


