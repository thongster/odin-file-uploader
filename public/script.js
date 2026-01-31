const openFolderBtn = document.getElementById('openCreateFolder');
const createFolderBtn = document.getElementById('createFolder');

openFolderBtn.addEventListener('click', () => {
  document.getElementById('createFolderModal').style.display = 'flex';
});

createFolderBtn.addEventListener('click', () => {
  document.getElementById('createFolderModal').style.display = 'none';
});
