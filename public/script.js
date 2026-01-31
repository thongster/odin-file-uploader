const openFolderBtn = document.getElementById('openCreateFolder');
const createFolderBtn = document.getElementById('createFolder');
const createFolderModal = document.getElementById('createFolderModal');

openFolderBtn.addEventListener('click', () => {
  if (createFolderModal.style.display === 'none') {
    createFolderModal.style.display = 'flex';
  } else {
    createFolderModal.style.display = 'none';
  }
});

createFolderBtn.addEventListener('click', () => {
  createFolderModal.style.display = 'none';
});
