import images from "./gallery-items.js";

const galleryList = document.querySelector('.js-gallery');
const listMarkup = createGalleryItem(images);

galleryList.insertAdjacentHTML('beforeend', listMarkup);

function createGalleryItem(images) {
  return images.map(({preview, original, description }) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
  })
    .join('');
}

galleryList.addEventListener('click', onListMarkupClick);
function onListMarkupClick(e) {
    
    if (!e.target.classList.contains('gallery__image')) {
        return
    }
    console.log(e.target.dataset.source);
}
 
const galleryClick = (e) => {
    e.preventDefault();
    const currentImg = e.target.dataset.source;
    const currentAlt = e.target.alt;

    
    const lightboxImg = document.querySelector(".lightbox__image")
    const lightboxContainer = document.querySelector(".js-lightbox")

    if (e.target.nodeName === "IMG") {
        lightboxContainer.classList.add("is-open");
        lightboxImg.setAttribute("src", `${currentImg}`);
        lightboxImg.setAttribute("alt", `${currentAlt}`);

    }
};
galleryList.addEventListener("click", galleryClick);

//const lightboxClosed = document.querySelector(`[data-action="close-lightbox"]`);


