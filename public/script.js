const openFolderBtn = document.getElementById('openCreateFolder');
const createFolderBtn = document.getElementById('createFolderBtn');
const createFolderModal = document.getElementById('createFolderModal');

// detech touch screen
const isTouch = window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0;

// disable/enable view of new folder modal
let isFolderModalOpen = false;

if (openFolderBtn) {
  openFolderBtn.addEventListener('click', () => {
    isFolderModalOpen = !isFolderModalOpen;
    createFolderModal.style.display = isFolderModalOpen ? 'flex' : 'none';
  });
}

if (createFolderBtn) {
  createFolderBtn.addEventListener('click', () => {
    createFolderModal.style.display = 'none';
  });
}

// folder double click
const allFolders = document.querySelectorAll('.folderLink');

allFolders.forEach((folder) => {
  folder.addEventListener('click', (e) => {
    e.preventDefault();
  });

  folder.addEventListener(isTouch ? 'click' : 'dblclick', () => {
    window.location.href = folder.href;
  });
});

// icon double click
const allIcons = document.querySelectorAll('.iconLink');

allIcons.forEach((icon) => {
  icon.addEventListener('click', (e) => {
    e.preventDefault();
  });

  // open detail

  icon.addEventListener(isTouch ? 'click' : 'dblclick', (e) => {
    e.preventDefault();
    const modal = icon.nextElementSibling;
    let isFileDetailOpen = false;
    isFileDetailOpen = !isFileDetailOpen;

    modal.style.display = isFileDetailOpen ? 'flex' : 'none';
  });
});

// close detail
const allCloseBtns = document.querySelectorAll('.closeAction');
allCloseBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const modal = btn.closest('.detailModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  });
});

// back function
const backBtn = document.getElementById('backBtn');
if (backBtn) {
  backBtn.addEventListener('click', () => {
    window.location.href = '/';
  });
}

// disable/enable view of rename and delete modal
const renameFolderModal = document.getElementById('renameFolderModal');
const deleteFolderModal = document.getElementById('deleteFolderModal');
const renameThisFolderBtn = document.getElementById('renameThisFolder');
const deleteThisFolderBtn = document.getElementById('deleteThisFolder');

let isRenameModalOpen = false;
let isDeleteModalOpen = false;

if (renameThisFolderBtn) {
  renameThisFolderBtn.addEventListener('click', () => {
    isDeleteModalOpen = false;
    deleteFolderModal.style.display = 'none';
    isRenameModalOpen = !isRenameModalOpen;
    renameFolderModal.style.display = isRenameModalOpen ? 'flex' : 'none';
  });
}

if (deleteThisFolderBtn) {
  deleteThisFolderBtn.addEventListener('click', () => {
    isRenameModalOpen = false;
    renameFolderModal.style.display = 'none';
    isDeleteModalOpen = !isDeleteModalOpen;
    deleteFolderModal.style.display = isDeleteModalOpen ? 'flex' : 'none';
  });
}

// measure header height to display newfolder modal nicely
const header = document.querySelector('.header');
const directoryBar = document.querySelector('.directoryBar');

function updateModalOffset() {
  const headerHeight = header.getBoundingClientRect().height;
  let directoryBarHeight;
  if (directoryBar) {
    directoryBarHeight = directoryBar.getBoundingClientRect().height;
  }
  if (createFolderModal) {
    createFolderModal.style.top = `${headerHeight + directoryBarHeight + 10}px`;
  }
  if (renameFolderModal) {
    renameFolderModal.style.top = `${headerHeight + directoryBarHeight + 10}px`;
  }
  if (deleteFolderModal) {
    deleteFolderModal.style.top = `${headerHeight + directoryBarHeight + 10}px`;
  }
}

updateModalOffset();
window.addEventListener('resize', updateModalOffset);
