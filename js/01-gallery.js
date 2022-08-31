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

  const { classList, dataset, alt } = evt.target;

  if (!classList.contains('gallery__image')) {
    return;
  }
  const currentUrl = dataset.source;

  instance = basicLightbox.create(
    `<img src = "${currentUrl}" alt ="${alt}" width="800" height="600" />`,
    {
      onShow: instance => {
        document.addEventListener('keydown', onEscKeydown);
      },
      onClose: instance => {
        document.removeEventListener('keydown', onEscKeydown);
      },
    }
  );
  instance.show();
}

function onEscKeydown(evt) {
  if (evt.code !== 'Escape') {
    return;
  }
  instance.close();
}
