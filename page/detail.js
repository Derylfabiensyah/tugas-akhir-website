// Ambil parameter dari URL (misalnya ?id=1)
const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

// Fetch data dari JSON
fetch("detail.json")
  .then(response => response.json()) 
  .then(data => {
    const car = data.cars.find(c => c.id == carId);
    if (!car) {
      document.getElementById("car-detail").innerHTML = "<p>Mobil tidak ditemukan.</p>";
      return;
    }

    const carouselImages = car.images.map(img => `<img src="${img}" alt="Gambar Mobil">`).join("");

    const detailHTML = `
        <h1>${car.name}</h1>
        <div class="content">
          <div class="carousel">
            ${carouselImages}
            <div class="carousel-buttons">
              <button id="prev">❮</button>
              <button id="next">❯</button>
            </div>

          </div>
          <div class="text-content">
            <h2>Spesifikasi</h2>
            <p>${car.specs}</p>
          </div>
        </div>
      `;


    document.getElementById("car-detail").innerHTML = detailHTML;

    // Carousel sederhana
    const images = document.querySelectorAll(".carousel img");
    let index = 0;

    // Menampilkan gambar pertama
    showImage(index);

    // Fungsi untuk menampilkan gambar
    function showImage(i) {
        images.forEach((img, idx) => {
          img.classList.remove("active");
          if (idx === i) {
            img.classList.add("active");
          }
        });
    }

    // Tombol 'next'
    document.getElementById("next").addEventListener("click", () => {
      index = (index + 1) % images.length; // Mengatur indeks gambar berikutnya
      showImage(index); // Menampilkan gambar yang baru
    });

    // Tombol 'prev'
    document.getElementById("prev").addEventListener("click", () => {
      index = (index - 1 + images.length) % images.length; // Mengatur indeks gambar sebelumnya
      showImage(index); // Menampilkan gambar yang baru
    });
    console.log(document.getElementById("prev")); // Apakah ini null?

  });

fetch('car.json')
  .then(response => response.json())
  .then(data => {
    const viewCarContainer = document.querySelector('.viewcar');

    const filteredCars = data.filter(car => car.group == 2);

    const groupedCars = {
      2: []
    };

    filteredCars.forEach(car => {
      groupedCars[car.group].push(car);
    });

    [2].forEach(group => {
      const cardGroup = document.createElement('div');
      cardGroup.classList.add('card1');

      groupedCars[group].forEach(car => {
        const card = document.createElement('div');
        card.classList.add('card');

        const link = document.createElement('a');
        link.href = `detail.html?id=${car.id}`;

        const img = document.createElement('img');
        img.classList.add('imagecar');
        img.src = car.img;
        img.alt = car.name;

        const title = document.createElement('h2');
        title.textContent = car.name;

        link.appendChild(img);
        link.appendChild(title);
        card.appendChild(link);
        cardGroup.appendChild(card);
      });

      viewCarContainer.appendChild(cardGroup);
    });
  })
  .catch(error => {
    console.error('Error loading car data:', error);
  });
