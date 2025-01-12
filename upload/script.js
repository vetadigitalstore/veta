document.getElementById('load-files').addEventListener('click', () => {
  // মূল API URL (রুট)
  const apiUrl = 'https://api.github.com/repos/vetadigitalstore/veta/contents/';

  fetchFiles(apiUrl); // প্রথমবার রুট কন্টেন্ট লোড করবে
});

// ফাইল লোড করার ফাংশন
function fetchFiles(apiUrl) {
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const fileList = document.getElementById('file-list');
      fileList.innerHTML = ''; // আগের লিস্ট ক্লিয়ার

      if (Array.isArray(data)) {
        data.forEach(item => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');

          // ফোল্ডার বা ফাইল অনুযায়ী টেক্সট সেট করা
          link.textContent = item.type === 'dir' ? `[DIR] ${item.name}` : item.name;
          link.href = '#'; // ডিফল্ট লিঙ্ক
          link.style.textDecoration = 'none';
          link.style.color = item.type === 'dir' ? 'blue' : 'black';

          if (item.type === 'dir') {
            // ফোল্ডারের জন্য ক্লিক ইভেন্ট
            link.addEventListener('click', (e) => {
              e.preventDefault(); // ডিফল্ট রিফ্রেশ বন্ধ
              fetchFiles(item.url); // ফোল্ডারের ভেতরের কন্টেন্ট লোড
            });
          } else {
            // ফাইলের জন্য GitHub ভিউ লিঙ্ক
            link.href = item.html_url;
            link.target = '_blank'; // নতুন ট্যাবে খুলবে
          }

          listItem.appendChild(link);
          fileList.appendChild(listItem);
        });
      } else {
        alert('Error fetching repository data.');
      }
    })
    .catch(err => console.error('Error:', err));
}