fetch('workshop.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById('workshop-container');

    data.forEach(item => {

      const contentDiv = document.createElement('div');
      contentDiv.className = 'content';

      const img = document.createElement('img');
      img.src = item.foto;
      img.alt = item.judul;

      const textDiv = document.createElement('div');
      textDiv.className = 'workshoptext';

      const title = document.createElement('h1');
      title.textContent = item.judul;

      const desc = document.createElement('p');
      desc.innerHTML = item.isi;

      textDiv.appendChild(title);
      textDiv.appendChild(desc);

      contentDiv.appendChild(img);
      contentDiv.appendChild(textDiv);

      container.appendChild(contentDiv);
    });
  })
  .catch(error => console.error('Gagal memuat data:', error));
