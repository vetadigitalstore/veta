document.getElementById('load-files').addEventListener('click', () => {
  // GitHub API URL
  const apiUrl = 'https://api.github.com/repos/vetadigitalstore/veta/contents/';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const fileList = document.getElementById('file-list');
      fileList.innerHTML = ''; // Clear any previous list

      if (Array.isArray(data)) {
        data.forEach(item => {
          const listItem = document.createElement('li');

          // Display folder or file
          listItem.textContent = item.type === 'dir' ? `[DIR] ${item.name}` : item.name;

          // Add a link if it's a file
          if (item.type === 'file') {
            const link = document.createElement('a');
            link.href = item.html_url;
            link.textContent = ' [View]';
            link.target = '_blank';
            listItem.appendChild(link);
          }

          fileList.appendChild(listItem);
        });
      } else {
        alert('Error fetching repository data.');
      }
    })
    .catch(err => console.error('Error:', err));
});