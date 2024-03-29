import SimpleLightbox from "simplelightbox";
// Additional styles import

import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('ul.gallery');

//create gallery
function createGalleryItem(array) {
    return array.map(({preview, original, description}) =>  {
        return `
        <a class = "gallery__item" href ="${original}">
            <img class="gallery__image" src="${preview}" alt="${description}"/>
        </a>
        `;
    }).join(""); 
}

const picMarkup = createGalleryItem(galleryItems);
galleryContainer.insertAdjacentHTML("beforeend", picMarkup);
//simple light box
const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250, animationSpeed: 250});
lightbox.on("show.simplelightbox");
