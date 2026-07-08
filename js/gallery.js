// basicLightbox is loaded via CDN and exposed as a global `basicLightbox`

const images = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// Render gallery into <ul class="gallery"> if present
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.querySelector('.gallery');
  if (!gallery) return;

  const markup = images
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${original}">
            <img
              class="gallery-image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>
      `;
    })
    .join('');

  gallery.innerHTML = markup;

  // Prevent default link behavior (download / navigation) when clicking images
  // Delegate clicks on the gallery: prevent default navigation and
  // log the large-image URL from the clicked item's <img data-source="...">
  gallery.addEventListener('click', event => {
    const item = event.target.closest('.gallery-item');
    if (!item || !gallery.contains(item)) return;

    // prevent link default behaviour (download/navigation)
    const link = event.target.closest('.gallery-link');
    if (link) event.preventDefault();

    const img = item.querySelector('.gallery-image');
    if (img) {
      // Open the large image in a basicLightbox modal
      if (typeof basicLightbox !== 'undefined') {
        const instance = basicLightbox.create(
          `<img src="${img.dataset.source}" alt="${img.alt}" />`
        );
        instance.show();
      } else {
        console.log(img.dataset.source);
      }
    }
  });
});

