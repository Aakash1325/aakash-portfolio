(() => {
  const viewer = document.querySelector('.image-viewer');
  if (!viewer) return;
  const image = viewer.querySelector('img');
  const caption = viewer.querySelector('p');
  const close = viewer.querySelector('.image-viewer-close');
  let returnFocus;
  document.querySelectorAll('[data-view-image]').forEach(button => button.addEventListener('click', () => {
    returnFocus = button;
    image.src = button.dataset.viewImage;
    image.alt = button.dataset.viewAlt || 'Project image';
    caption.textContent = button.closest('.case-screen-showcase')?.querySelector('figcaption')?.textContent || '';
    image.classList.remove('is-zoomed');
    viewer.showModal();
    close.focus();
  }));
  close.addEventListener('click', () => viewer.close());
  viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
  viewer.addEventListener('close', () => { image.src = ''; returnFocus?.focus(); });
  image.addEventListener('click', () => image.classList.toggle('is-zoomed'));
})();
