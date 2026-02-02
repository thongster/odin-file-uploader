const openFolderBtn = document.getElementById('openCreateFolder');
const createFolderBtn = document.getElementById('createFolderBtn');
const createFolderModal = document.getElementById('createFolderModal');

// disable/enable view of new folder modal
let isFolderModalOpen = false;

if (openFolderBtn) {
  openFolderBtn.addEventListener('click', () => {
    isFolderModalOpen = !isFolderModalOpen;
    createFolderModal.style.display = isFolderModalOpen ? 'flex' : 'none';
  });
}

createFolderBtn.addEventListener('click', () => {
  createFolderModal.style.display = 'none';
});

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

  // open detail
  icon.addEventListener('dblclick', (e) => {
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
backBtn.addEventListener('click', () => {
  window.location.href = '/';
});

// disable/enable view of rename and delete modal
const renameFolderModal = document.getElementById('renameFolderModal');
const deleteFolderModal = document.getElementById('deleteFolderModal');
const renameThisFolderBtn = document.getElementById('renameThisFolder');
const deleteThisFolderBtn = document.getElementById('deleteThisFolder');

let isRenameModalOpen = false;
let isDeleteModalOpen = false;

if (renameThisFolderBtn) {
  renameThisFolderBtn.addEventListener('click', () => {
    isRenameModalOpen = !isRenameModalOpen;
    renameFolderModal.style.display = isRenameModalOpen ? 'flex' : 'none';
  });
}

// renameThisFolderBtn.addEventListener('click', () => {
//   renameFolderModal.style.display = 'none';
// });

if (deleteThisFolderBtn) {
  deleteThisFolderBtn.addEventListener('click', () => {
    isDeleteModalOpen = !isDeleteModalOpen;
    deleteFolderModal.style.display = isDeleteModalOpen ? 'flex' : 'none';
  });
}

// deleteThisFolderBtn.addEventListener('click', () => {
//   deleteFolderModal.style.display = 'none';
// });

// measure header height to display newfolder modal nicely
const header = document.querySelector('.header');
const directoryBar = document.querySelector('.directoryBar');

function updateModalOffset() {
  const headerHeight = header.getBoundingClientRect().height;
  const directoryBarHeight = directoryBar.getBoundingClientRect().height;
  createFolderModal.style.top = `${headerHeight + directoryBarHeight + 10}px`;
  renameFolderModal.style.top = `${headerHeight + directoryBarHeight + 10}px`;
  deleteFolderModal.style.top = `${headerHeight + directoryBarHeight + 10}px`;
}

updateModalOffset();
window.addEventListener('resize', updateModalOffset);
