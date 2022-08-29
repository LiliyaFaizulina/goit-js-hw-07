import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryRef = document.querySelector('.gallery');

let instance;

galleryRef.innerHTML = createGalleryMarkup(galleryItems);
galleryRef.addEventListener('click', openModal);

function createGalleryMarkup(arr) {
  return arr.reduce(
    (acc, { preview, original, description }) =>
      acc +
      `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
    <img
    class="gallery__image"
    src="${preview}"
    data-source="${original}"
    alt="${description}"
    />
    </a>
    </div>`,
    ''
  );
}

function openModal(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  const currentUrl = evt.target.dataset.source;

  instance = basicLightbox.create(
    `<img src = "${currentUrl}" alt ="${evt.target.alt}" width="800" height="600" />`
  );
  instance.show(addModalListeners);
}

function onEscKeydown(evt) {
  if (evt.code !== 'Escape') {
    return;
  }
  instance.close(removeModalListeners);
}

function onModalClick() {
  instance.close(removeModalListeners);
}

function addModalListeners() {
  document.addEventListener('keydown', onEscKeydown);
  instance.element().addEventListener('click', onModalClick);
}

function removeModalListeners() {
  document.removeEventListener('keydown', onEscKeydown);
}
