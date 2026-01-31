const openFolderBtn = document.getElementById('openCreateFolder');
const createFolderBtn = document.getElementById('createFolderBtn');
const createFolderModal = document.getElementById('createFolderModal');

openFolderBtn.addEventListener('click', () => {
  if (createFolderModal.style.display == 'none') {
    createFolderModal.style.display = 'flex';
  } else {
    createFolderModal.style.display = 'none';
  }
});

createFolderBtn.addEventListener('click', () => {
  createFolderModal.style.display = 'none';
});

const header = document.querySelector('.header');

function updateModalOffset() {
  const headerHeight = header.getBoundingClientRect().height;
  createFolderModal.style.top = `${headerHeight + 10}px`;
}

updateModalOffset();
window.addEventListener('resize', updateModalOffset);
