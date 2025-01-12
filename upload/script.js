document.getElementById('load-files').addEventListener('click', () => {
  fetch('/api/files')
    .then(response => response.json())
    .then(data => {
      const fileList = document.getElementById('file-list');
      fileList.innerHTML = ''; // Clear existing list

      if (data.success) {
        data.files.forEach(file => {
          const listItem = document.createElement('li');
          listItem.textContent = file.isDirectory ? `[DIR] ${file.name}` : file.name;
          fileList.appendChild(listItem);
        });
      } else {
        alert('Error loading files: ' + data.message);
      }
    })
    .catch(err => console.error('Error:', err));
});