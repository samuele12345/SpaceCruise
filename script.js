document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".scroll-card");

  // ---- example database call ----
  async function loadFlights() {
    try {
      const res = await fetch('/api/flights');
      if (!res.ok) throw new Error('Network response was not ok');
      const flights = await res.json();
      const main = document.querySelector('main');
      flights.forEach(f => {
        const div = document.createElement('div');
        // adjust field names to whatever your table has
        div.textContent = `${f.id || ''} ${f.origin || ''} → ${f.destination || ''}`;
        main.appendChild(div);
      });
    } catch (err) {
      console.error('Failed to load flights', err);
    }
  }
  loadFlights();

  

  // ---- end example database call ----


  const navLinks = document.querySelectorAll("#nav-div a");

  const detailsLink = document.querySelectorAll("#nav-div details");

  const imgPlanet0 = document.querySelector("#img-offer0");
  const imgPlanet1 = document.querySelector("#img-offer1");
  const imgPlanet2 = document.querySelector("#img-offer2");
  const imgPlanet3 = document.querySelector("#img-offer3");
  const imgPlanet4 = document.querySelector("#img-offer4");

  const descPlanet = document.querySelector("#desc-offer");
  const descTit = document.querySelector("#desc-tit");
  const randomOffer = document.querySelector(".random-offer");

  const buttonEngine = document.querySelector("#accensione");
  const sp_ship = document.querySelectorAll(".spaceship-button");

  const engine = document.querySelectorAll(".intro-par-div-lat");

  const mainImgCl = document.querySelector(".main-img-div img");

  const section = document.querySelector(".random-offer");
  const shipWrappers = document.querySelectorAll(".ship-wrappers");

  // Selezioniamo il contenitore principale dello slider
  const slider = document.getElementById("scroll-moon");

  const cards2 = document.querySelectorAll(".scroll-card2");

  const cards3 = document.querySelectorAll(".scroll-card-mascotte");

  const mainImg = document.querySelector("#main-div1");

  let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      const scrollY = window.scrollY;
      const maxScroll = 600;
      const progress = Math.min(scrollY / maxScroll, 1);

      const scale = 1 - progress * 0.05;
      const opacity = 1 - progress * 0.5;

      mainImg.style.transform = `scale(${scale})`;
      mainImg.style.opacity = opacity;

      ticking = false;
    });
    ticking = true;
  }
});

  window.addEventListener("load", () => {
    cards2.forEach(card => {
      setTimeout(() => {
        card.classList.add("visible");
      }, 50); // 50ms di ritardo evita offset iniziale
    });
  });

  if (cards2.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Quando la sezione entra nello schermo → aggiungi 'visible'
            entry.target.classList.add("visible");
          } else {
            // Quando la sezione esce dallo schermo → rimuovi 'visible'
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1 // 50% della sezione deve essere visibile per attivare
      }
    );

    // Osserva tutte le sezioni selezionate
    cards2.forEach(card => observer.observe(card));
  }

  if (cards3.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Quando la sezione entra nello schermo → aggiungi 'visible'
            entry.target.classList.add("visible");
          } else {
            // Quando la sezione esce dallo schermo → rimuovi 'visible'
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.9 // 90% della sezione deve essere visibile per attivare
      }
    );

    // Osserva tutte le sezioni selezionate
    cards3.forEach(card => observer.observe(card));
  }


  const placesImg = [
    {img: `img/mars.png`, tit: "Mars", desc: "Tired of ordinary landscapes? Try the Red Planet! Marvel at heroic canyons, take a rover ride across history itself, and toast the sunset under skies painted in bold Martian hues. Mars: rugged, radiant, and remarkably relaxing!"}, 
    {img: `img/moon.png`, tit: "Moon", desc: "Why settle for a backyard picnic when you can vacation on the Moon? Enjoy delightful low-gravity strolls, dazzling Earthrise views, and lunar cocktails served with a cosmic twist. It’s the classic getaway — now 384,000 kilometers better!"},
    {img: `img/uranus.png`, tit: "Uranus", desc: "Looking for something delightfully different? Uranus tilts the rules — and your expectations! Gaze upon shimmering rings, brilliant auroras, and the cool blue glow of the outer frontier. It’s distant, dazzling, and positively unforgettable!"},
    {img: `img/venus.png`, tit: "Venus", desc: "Too hot to handle? Not for SpaceCruise! Float high above Venus’ golden clouds in our luxurious skyborne resorts, where the view is electric and the atmosphere is simply divine. It’s sunshine, sophistication, and a little planetary drama — all included!"},
    {img: `img/neptune.png`, tit: "Neptune", desc: "Craving something truly out of this world? Venture to Neptune, where sapphire storms swirl across endless skies and the winds whisper at supersonic speed. Drift above deep cerulean clouds, witness the faint shimmer of distant sunlight, and experience the serene majesty of the solar system’s far frontier. Neptune: bold, breathtaking, and beautifully untamed."}
  ];

  if (cards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Quando la sezione entra nello schermo → aggiungi 'visible'
            entry.target.classList.add("visible");
            // Smette di osservare dopo la prima attivazione
            observer.unobserve(entry.target);
          } 
        });
      },
      {
        threshold: 0.2 // 20% della sezione deve essere visibile per attivare
      }
    );

    // Osserva tutte le sezioni selezionate
    cards.forEach(card => observer.observe(card));
  }

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      detailsLink.forEach(detail =>{
        detail.removeAttribute('open');
      });
    });
    link.addEventListener("click", () => {
      detailsLink.forEach(detail =>{
        detail.removeAttribute('open');
      });
    });
  });

  window.addEventListener("load", () => {
      document.querySelectorAll(".main-img-div-lat")
          .forEach(div => div.classList.add("engine-on"));
  });

  if (randomOffer){
    const observer = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          let randomIndex0 = 0;
          let randomIndex1 = Math.floor(Math.random() * placesImg.length);;
          let randomIndex2 = 0;
          let randomIndex3 = 0;
          let randomIndex4 = 0;

          do{
            randomIndex2 = Math.floor(Math.random() * placesImg.length);
          }while(randomIndex2 === randomIndex1);

          do{
            randomIndex3 = Math.floor(Math.random() * placesImg.length);
          }while(randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2);

          do{
            randomIndex0 = Math.floor(Math.random() * placesImg.length);
          }while(randomIndex0 === randomIndex1 || randomIndex0 === randomIndex2 || randomIndex0 === randomIndex3);

          do{
            randomIndex4 = Math.floor(Math.random() * placesImg.length);
          }while(randomIndex4 === randomIndex1 || randomIndex4 === randomIndex2 || randomIndex4 === randomIndex3 || randomIndex4 === randomIndex0);

          descTit.textContent = placesImg[randomIndex2].tit;

          imgPlanet0.src = placesImg[randomIndex0].img;
          imgPlanet0.parentElement.dataset.name = placesImg[randomIndex0].tit;

          imgPlanet1.src = placesImg[randomIndex1].img;
          imgPlanet1.parentElement.dataset.name = placesImg[randomIndex1].tit;

          imgPlanet2.src = placesImg[randomIndex2].img;
          imgPlanet2.parentElement.dataset.name = placesImg[randomIndex2].tit;

          imgPlanet3.src = placesImg[randomIndex3].img;
          imgPlanet3.parentElement.dataset.name = placesImg[randomIndex3].tit;

          imgPlanet4.src = placesImg[randomIndex4].img;
          imgPlanet4.parentElement.dataset.name = placesImg[randomIndex4].tit;

          descPlanet.textContent = placesImg[randomIndex2].desc;
          

          observer.unobserve(entry.target);

          let dueLeftIndex = randomIndex0;
          let leftIndex = randomIndex1;
          let centerIndex = randomIndex2;
          let rightIndex = randomIndex3;
          let dueRightIndex = randomIndex4;

          imgPlanet1.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = leftIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Genero nuovo pianeta per lo slot sinistro
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === dueLeftIndex || newIndex === dueRightIndex);

            leftIndex = newIndex;

            imgPlanet1.src = placesImg[leftIndex].img;
            imgPlanet1.parentElement.dataset.name = placesImg[leftIndex].tit;
          });

          imgPlanet3.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = rightIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Genero nuovo pianeta per lo slot sinistro
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === leftIndex || newIndex === dueLeftIndex || newIndex === dueRightIndex);

            rightIndex = newIndex;

            imgPlanet3.src = placesImg[rightIndex].img;
            imgPlanet3.parentElement.dataset.name = placesImg[rightIndex].tit;
          });

          imgPlanet0.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = dueLeftIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Genero nuovo pianeta per lo slot sinistro
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === leftIndex || newIndex === dueRightIndex);

            dueLeftIndex = newIndex;

            imgPlanet0.src = placesImg[dueLeftIndex].img;
            imgPlanet0.parentElement.dataset.name = placesImg[dueLeftIndex].tit;
          });

          imgPlanet4.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = dueRightIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Genero nuovo pianeta per lo slot sinistro
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === dueLeftIndex || newIndex === leftIndex);

            dueRightIndex = newIndex;

            imgPlanet4.src = placesImg[dueRightIndex].img;
            imgPlanet4.parentElement.dataset.name = placesImg[dueRightIndex].tit;
          });

        }
      });

    }, { threshold: 0.3 });

    observer.observe(randomOffer);

  }

  buttonEngine.addEventListener("click", () => {
    if (sp_ship) {
      sp_ship.forEach(ship => {
        ship.classList.remove("visible");
        void ship.offsetWidth; // forza reflow per riavviare animazione
        ship.classList.add("visible");
      })
      
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

      if (entry.isIntersecting) {
        shipWrappers.forEach(wrapper => {

          wrapper.classList.add("visible");

          const img = wrapper.querySelector(".spaceships");
          if (img) img.classList.add("visible");

        });
      }

    });
  }, { threshold: 0.9 });

  observer.observe(section);

  mainImgCl.addEventListener("click", () => {
    mainImgCl.classList.remove("vibrate");
    void mainImgCl.offsetWidth; // forza reflow
    mainImgCl.classList.add("vibrate");
  });

  

  

  // Variabili di stato per il drag
  let isDown = false;     // Indica se il mouse è premuto
  let startX;             // Posizione iniziale del mouse
  let scrollLeft;         // Posizione iniziale dello scroll

  // ===============================
  //  CENTRATURA INIZIALE
  // ===============================

  // Quando la pagina ha finito di caricare
  window.addEventListener("load", () => {

    const slides = slider.querySelectorAll(".par-divs-x-scroll");

    // Prendiamo la slide centrale
    const middleSlide = slides[Math.floor(slides.length / 2)];

    // Calcoliamo quanto scrollare
    const offset = middleSlide.offsetLeft 
                   - (slider.clientWidth / 2) 
                   + (middleSlide.clientWidth / 2);

    slider.scrollLeft = offset;
  });


  // ===============================
  //  EVENTI MOUSE (DESKTOP)
  // ===============================

  // Quando premiamo il mouse
  slider.addEventListener("mousedown", (e) => {

      isDown = true;                     // Attiviamo modalità drag
      slider.style.cursor = "grabbing";  // Cambiamo cursore
      startX = e.pageX;                  // Salviamo posizione iniziale mouse
      scrollLeft = slider.scrollLeft;    // Salviamo posizione iniziale scroll
  });

  // Quando rilasciamo il mouse
  slider.addEventListener("mouseup", () => {
      isDown = false;                    // Disattiviamo drag
      slider.style.cursor = "grab";
  });

  // Se il mouse esce dall'area
  slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.style.cursor = "grab";
  });

  // Movimento del mouse
  slider.addEventListener("mousemove", (e) => {

      if (!isDown) return;               // Se non stiamo trascinando, esci

      e.preventDefault();                // Blocca selezione testo

      const x = e.pageX;                 // Posizione attuale mouse
      const walk = (x - startX) * 1.2;   // Calcolo distanza (moltiplicatore = velocità)

      slider.scrollLeft = scrollLeft - walk;  // Muoviamo lo scroll
  });


  // ===============================
  //  SUPPORTO TOUCH (MOBILE)
  // ===============================

  slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX;
      scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX;
      const walk = (x - startX) * 1.2;
      slider.scrollLeft = scrollLeft - walk;
  });

  


});
