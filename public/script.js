const openFolderBtn = document.getElementById('openCreateFolder');
const createFolderBtn = document.getElementById('createFolderBtn');
const createFolderModal = document.getElementById('createFolderModal');

// disable/enable view of new folder modal
let isFolderModalOpen = false;

openFolderBtn.addEventListener('click', () => {
  isFolderModalOpen = !isFolderModalOpen;
  createFolderModal.style.display = isFolderModalOpen ? 'flex' : 'none';
});

createFolderBtn.addEventListener('click', () => {
  createFolderModal.style.display = 'none';
});

// measure header height to display newfolder modal nicely
const header = document.querySelector('.header');

function updateModalOffset() {
  const headerHeight = header.getBoundingClientRect().height;
  createFolderModal.style.top = `${headerHeight + 10}px`;
}

updateModalOffset();
window.addEventListener('resize', updateModalOffset);

// folder double click
const allFolders = document.querySelectorAll('.folderLink');

allFolders.forEach((folder) => {
  folder.addEventListener('click', (e) => {
    e.preventDefault();
  });

  folder.addEventListener('dblclick', () => {
    window.location.href = folder.href;
  });
});

// icon double click
const allIcons = document.querySelectorAll('.iconLink');

allIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
  });

  icon.addEventListener('dblclick', (e) => {
    e.preventDefault();
    const modal = icon.nextElementSibling;
    let isFileDetailOpen = false;
    isFileDetailOpen = !isFileDetailOpen;

    modal.style.display = isFileDetailOpen ? 'flex' : 'none';
  });
});

const allCloseBtns = document.querySelectorAll('.closeAction');
allCloseBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.detailModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  });
});
