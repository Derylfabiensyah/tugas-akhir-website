fetch('brand.json')
  .then(response => response.json())
  .then(data => {
    const container = document.querySelector('.cardbrand');
    data.forEach((brand, index) => {
      const brandCard = document.createElement('div');
      brandCard.classList.add('logocard');
      brandCard.style.setProperty('--position', index + 1);

      const img = document.createElement('img');
      img.src = brand.img;
      img.alt = brand.name;
      img.style.width = brand.width;
      img.style.height = brand.height;
      if (brand.marginBottom) img.style.marginBottom = brand.marginBottom;
      if (brand.marginTop) img.style.marginTop = brand.marginTop;

      const name = document.createElement('p');
      name.textContent = brand.name;

      brandCard.appendChild(img);
      brandCard.appendChild(name);
      container.appendChild(brandCard);
    });
  })
  .catch(error => {
    console.error('Error loading brand data:', error);
  });

fetch('car.json')
  .then(response => response.json())
  .then(data => {
    const viewCarContainer = document.querySelector('.viewcar');

    const filteredCars = data.filter(car => car.group == 1 || car.group == 2 || car.group == 3 || car.group == 4);

    const groupedCars = {
      1: [],
      2: [],
      3: [],
      4: []
    };

    filteredCars.forEach(car => {
      groupedCars[car.group].push(car);
    });

    [1, 2, 3, 4].forEach(group => {
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