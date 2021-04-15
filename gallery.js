import galleryImages from "./gallery-items.js";

const refs = {
  galleryContainer: document.querySelector(".js-gallery"),
  lightboxContainer: document.querySelector(".js-lightbox"),
  imgLightbox: document.querySelector("img.lightbox__image"),
  closeLightBoxContainer: document.querySelector(
    `[data-action = "close-lightbox"]`
  ),
  boxOverlay: document.querySelector("div.lightbox__overlay"),
};

let counter = 0;

const imagesListTemplate = ({ preview, original, description }) => {
  return `<li class="gallery__item">
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
</li>`;
};

const addImg = galleryImages.map(imagesListTemplate).join("");

refs.galleryContainer.insertAdjacentHTML("afterbegin", addImg);

const galleryClick = (event) => {
  event.preventDefault();

  const currentImg = event.target.dataset.source;
  const currentAlt = event.target.alt;


  const findImgNavPosotion = () => {
    counter = 0;
    for (let i = 0; i < galleryImages.length; i++) {
      counter += 1;
      if (currentImg.includes(galleryImages[i].original)) {
        counter -= 1;
        return counter;
      }
    }
  };
  findImgNavPosotion();

  if (event.target.nodeName === "IMG") {
    refs.lightboxContainer.classList.add("is-open");
    refs.imgLightbox.setAttribute("src", `${currentImg}`);
    refs.imgLightbox.setAttribute("alt", `${currentAlt}`);
  }
};
refs.galleryContainer.addEventListener("click", galleryClick);

const closeLightBox = (event) => {
  if (
    event.target.nodeName === "BUTTON" &&
    event.target.dataset.action === "close-lightbox"
  ) {
    closeContainer();
  }
  if (event.target.nodeName === "DIV") {
    closeContainer();
  }
};

refs.closeLightBoxContainer.addEventListener("click", closeLightBox);
refs.boxOverlay.addEventListener("click", closeLightBox);

const closeContainer = () => {
  refs.lightboxContainer.classList.remove("is-open");
  refs.imgLightbox.setAttribute("src", "");
  refs.imgLightbox.setAttribute("alt", "");
};

const pressKeyLightBox = (event) => {
  if (refs.lightboxContainer.classList.contains("is-open")) {
    if (event.code === "Escape") {
      closeContainer();
    }
    if (event.code === "ArrowRight") {
      counter += 1;
      if (counter === galleryImages.length) {
        counter = 0;
      }

      currentGalleryImages();
    }

    if (event.code === "ArrowLeft") {
      counter -= 1;
      if (counter === -1) {
        counter = 8;
      }
      currentGalleryImages();
    }
  }
};

const currentGalleryImages = () => {
  refs.imgLightbox.setAttribute("src", `${galleryImages[counter].original}`);
  refs.imgLightbox.setAttribute("alt", `${galleryImages[counter].description}`);
};

const pressKey = window.addEventListener("keyup", pressKeyLightBox);
