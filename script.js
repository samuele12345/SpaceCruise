// Inizializzazione dopo DOMContentLoaded.
document.addEventListener("DOMContentLoaded", () => {

  // Card animate in viewport.
  const cards = document.querySelectorAll(".scroll-card");

  // Demo chiamata API voli.
  async function loadFlights() {
    try {
      const res = await fetch('/api/flights');
      if (!res.ok) throw new Error('Network response was not ok');
      const flights = await res.json();
      const main = document.querySelector('main');
      flights.forEach(f => {
        const div = document.createElement('div');
        // Adattare i campi al formato della tabella.
        div.textContent = `${f.id || ''} ${f.origin || ''} → ${f.destination || ''}`;
        main.appendChild(div);
      });
    } catch (err) {
      console.error('Failed to load flights', err);
    }
  }
  loadFlights();

  

  // Chiusura dei details di navigazione al click sui link.
  const navLinks = document.querySelectorAll("#nav-div a");
  const navLinksAfter = document.querySelectorAll("#nav-div a::after");
  const dropDs = document.querySelectorAll(".drop");

  const arrows = document.querySelectorAll(".arrow");
  const arrowsCont = document.querySelectorAll(".arrow-cont");

  const detailsLink = document.querySelectorAll("#nav-div details");

  const body = document.querySelector("body");

  // Slot immagini del carosello offerte.
  const imgPlanet0 = document.querySelector("#img-offer0");
  const imgPlanet1 = document.querySelector("#img-offer1");
  const imgPlanet2 = document.querySelector("#img-offer2");
  const imgPlanet3 = document.querySelector("#img-offer3");
  const imgPlanet4 = document.querySelector("#img-offer4");

  const curT = document.querySelector(".hero-curved-title");
  

  // Testo associato al pianeta centrale.
  const descPlanet = document.querySelector("#desc-offer");
  const descTit = document.querySelector("#desc-tit");
  const randomOffer = document.querySelector(".random-offer");

  // Riavvio animazione astronavi.
  const buttonEngine = document.querySelector("#accensione");
  const sp_ship = document.querySelectorAll(".spaceship-button");

  // Nodo riservato per estensioni future.
  const engine = document.querySelectorAll(".intro-par-div-lat");

  
  const mainImgCl = document.querySelector(".main-img-div img");
  const imgPoint = document.querySelector(".tit-point");

  // Trigger viewport per animazioni wrappers astronavi.
  const section = document.querySelector(".random-offer");
  const planetVisualSection = document.querySelector("#div-img-planet");
  const shipWrappers = document.querySelectorAll(".ship-wrappers");

  // Contenitore principale slider.
  const slider = document.getElementById("scroll-moon");

  const cards2 = document.querySelectorAll(".scroll-card2");

  const cards3 = document.querySelectorAll(".scroll-card-mascotte");

  const mainImg = document.querySelector("#main-div1");

  const divImg = document.querySelectorAll(".div-un-img");

  // Flag anti-jank per aggiornamenti frame-based.
  let ticking = false;

  let isOpened = [false, false, false];

  const s_components = document.querySelector(".div-s");
  const movement = 5;
  let x = 0;
  let y = 0;

  const pressedKey = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  }

  const contShip = document.querySelector("#main-img-navicella");
  const butShip = document.querySelector("#but-sh");
  let isClicked = false;
  let shipAnimationId = null;

  // Render iniziale card2 con piccolo delay.
  window.addEventListener("load", () => {
    cards2.forEach(card => {
      setTimeout(() => {
        card.classList.add("visible");
      }, 50); // Delay anti-glitch.
    });
  });

  window.addEventListener("load", () =>{
    mainImgCl.classList.add("img-ready");
    imgPoint.classList.add("img-ready");
    mainImgCl.classList.add("loa");
  })

  window.addEventListener("load", () => {
    curT.classList.add("visible");
  });

  // Observer card2: mostra in ingresso, nasconde in uscita.
  if (cards2.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.1 // Soglia di attivazione.
      }
    );
    cards2.forEach(card => observer.observe(card));
  }

  // Observer card3: stessa logica con soglia piu alta.
  if (cards3.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      {
        threshold: 0.9 // Soglia di attivazione.
      }
    );
    cards3.forEach(card => observer.observe(card));
  }


  // Dataset locale pianeti per sezione random-offer.
  const placesImg = [
    {img: `img/mars.png`, tit: "Mars", desc: "Tired of ordinary landscapes? Try the Red Planet! Marvel at heroic canyons, take a rover ride across history itself, and toast the sunset under skies painted in bold Martian hues. Mars: rugged, radiant, and remarkably relaxing!"}, 
    {img: `img/moon.png`, tit: "Moon", desc: "Why settle for a backyard picnic when you can vacation on the Moon? Enjoy delightful low-gravity strolls, dazzling Earthrise views, and lunar cocktails served with a cosmic twist. It’s the classic getaway — now 384,000 kilometers better!"},
    {img: `img/uranus.png`, tit: "Uranus", desc: "Looking for something delightfully different? Uranus tilts the rules — and your expectations! Gaze upon shimmering rings, brilliant auroras, and the cool blue glow of the outer frontier. It’s distant, dazzling, and positively unforgettable!"},
    {img: `img/venus.png`, tit: "Venus", desc: "Too hot to handle? Not for SpaceCruise! Float high above Venus’ golden clouds in our luxurious skyborne resorts, where the view is electric and the atmosphere is simply divine. It’s sunshine, sophistication, and a little planetary drama — all included!"},
    {img: `img/neptune.png`, tit: "Neptune", desc: "Craving something truly out of this world? Venture to Neptune, where sapphire storms swirl across endless skies and the winds whisper at supersonic speed. Drift above deep cerulean clouds, witness the faint shimmer of distant sunlight, and experience the serene majesty of the solar system’s far frontier. Neptune: bold, breathtaking, and beautifully untamed."}
  ];

  const placesSoil = [
    {img: `img/marsSoil.png`}, 
    {img: `img/moonSoil.png`},
    {img: `img/uranusSoil.png`},
    {img: `img/venusSoil.png`},
    {img: `img/neptuneSoil.png`}
  ]

  // Observer card principali: animazione one-shot.
  if (cards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          } 
        });
      },
      {
        threshold: 0.2 // Soglia di attivazione.
      }
    );
    cards.forEach(card => observer.observe(card));
  }

  // Chiusura details menu al click sui link nav.
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      detailsLink.forEach(detail =>{
        detail.removeAttribute('open');
      });
    });
  });

  

  // Attivazione classe motore al caricamento.
  window.addEventListener("load", () => {
      document.querySelectorAll(".main-img-div-lat")
          .forEach(div => div.classList.add("engine-on"));
  });

  // Inizializzazione offerte solo in viewport.
  if (randomOffer){
    const observer = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          // Estrazione 5 indici distinti per gli slot.

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

          // Pianeta centrale usato per titolo e descrizione.
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

          // Stato corrente carosello.
          let dueLeftIndex = randomIndex0;
          let leftIndex = randomIndex1;
          let centerIndex = randomIndex2;
          let rightIndex = randomIndex3;
          let dueRightIndex = randomIndex4;

          // Click slot sinistro: promozione a centro.
          imgPlanet1.addEventListener("click", () => {
            centerIndex = leftIndex;
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigenerazione slot con vincolo no duplicati.
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === dueLeftIndex || newIndex === dueRightIndex);

            leftIndex = newIndex;

            imgPlanet1.src = placesImg[leftIndex].img;
            imgPlanet1.parentElement.dataset.name = placesImg[leftIndex].tit;
          });

          // Click slot destro: logica speculare.
          imgPlanet3.addEventListener("click", () => {
            centerIndex = rightIndex;
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigenerazione slot con vincolo no duplicati.
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === leftIndex || newIndex === dueLeftIndex || newIndex === dueRightIndex);

            rightIndex = newIndex;

            imgPlanet3.src = placesImg[rightIndex].img;
            imgPlanet3.parentElement.dataset.name = placesImg[rightIndex].tit;
          });

          // Click sinistra estrema: promozione a centro.
          imgPlanet0.addEventListener("click", () => {
            centerIndex = dueLeftIndex;
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigenerazione slot con vincolo no duplicati.
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === leftIndex || newIndex === dueRightIndex);

            dueLeftIndex = newIndex;

            imgPlanet0.src = placesImg[dueLeftIndex].img;
            imgPlanet0.parentElement.dataset.name = placesImg[dueLeftIndex].tit;
          });

          // Click destra estrema: promozione a centro.
          imgPlanet4.addEventListener("click", () => {
            centerIndex = dueRightIndex;
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigenerazione slot con vincolo no duplicati.
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

  // Riavvio animazione astronavi via reflow.
  if (buttonEngine) {
    buttonEngine.addEventListener("click", () => {
      if (sp_ship.length > 0) {
      sp_ship.forEach(ship => {
        ship.classList.remove("visible");
        void ship.offsetWidth; // Reflow.
        ship.classList.add("visible");
      });
      }
    });
  }

  // Avvio navicelle solo quando la sezione pianeti entra in viewport.
  if (planetVisualSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {
          shipWrappers.forEach(wrapper => {

            wrapper.classList.add("visible");

            const img = wrapper.querySelector(".spaceships");
            if (img) img.classList.add("visible");

          });

          observer.unobserve(entry.target);
        }

      });
    }, { threshold: 0.35 });

    observer.observe(planetVisualSection);
  }

  // Vibrazione immagine principale al click.
  if (mainImgCl) {
    mainImg.addEventListener("click", () => {
      mainImgCl.classList.remove("vibrate");
      void mainImgCl.offsetWidth; // forza reflow
      mainImgCl.classList.add("vibrate");
    });
  }

  

  

  // Stato drag slider.
  let isDown = false;
  let startX;
  let scrollLeft;


  // Centra la slide centrale al load.
  if (slider) {
    window.addEventListener("load", () => {
      const slides = slider.querySelectorAll(".par-divs-x-scroll");
      if (slides.length === 0) return;
      const middleSlide = slides[Math.floor(slides.length / 2)];
      const offset = middleSlide.offsetLeft 
                     - (slider.clientWidth / 2) 
                     + (middleSlide.clientWidth / 2);
      slider.scrollLeft = offset;
    });
  }

  // Aggiorna i 3 riquadri immagini in rotazione.
  function updateSoilBackgrounds(startIndex) {
    const visibleDivs = Array.from(divImg).slice(0, 3);

    visibleDivs.forEach((div, offset) => {
      const soil = placesSoil[(startIndex + offset) % placesSoil.length];
      div.style.animation = "none";
      div.style.backgroundImage = `url("${soil.img}")`;
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
      div.style.backgroundSize = "cover";
    });
  }

  // Avvia rotazione solo con dati sufficienti.
  if (divImg.length >= 3 && placesSoil.length > 0) {
    window.addEventListener("load", () => {
      let startIndex = 0;
      updateSoilBackgrounds(startIndex);

      setInterval(() => {
        startIndex = (startIndex + 1) % placesSoil.length;
        updateSoilBackgrounds(startIndex);
      }, 3000);
    });
  }

  arrowsCont[0].addEventListener("click", () => {
    if(isOpened[0]){
      arrows[0].classList.remove("clicked");
      dropDs[0].classList.remove("vis");
      isOpened[0] = false;
      
    }else{
      arrows[0].classList.remove("clicked");
      arrows[1].classList.remove("clicked");
      arrows[2].classList.remove("clicked");
      dropDs[0].classList.remove("vis");
      dropDs[1].classList.remove("vis");
      dropDs[2].classList.remove("vis");

      arrows.forEach((el) =>{
        void el.offsetWidth;
      })

      dropDs.forEach((el) =>{
        void el.offsetWidth;
      })

      arrows[0].classList.add("clicked");
      dropDs[0].classList.add("vis");
      isOpened[0] = true;
      isOpened[1] = false;
      isOpened[2] = false;
    }
    
  });

  arrowsCont[1].addEventListener("click", () => {
    if(isOpened[1]){
      arrows[1].classList.remove("clicked");
      dropDs[1].classList.remove("vis");
      isOpened[1] = false;
    }else{
      arrows[0].classList.remove("clicked");
      arrows[1].classList.remove("clicked");
      arrows[2].classList.remove("clicked");
      dropDs[0].classList.remove("vis");
      dropDs[1].classList.remove("vis");
      dropDs[2].classList.remove("vis");

      arrows.forEach((el) =>{
        void el.offsetWidth;
      })

      dropDs.forEach((el) =>{
        void el.offsetWidth;
      })

      arrows[1].classList.add("clicked");
      dropDs[1].classList.add("vis");
      isOpened[1] = true;
      isOpened[0] = false;
      isOpened[2] = false;
    }
    
  });

  arrowsCont[2].addEventListener("click", () => {
    if(isOpened[2]){
      arrows[2].classList.remove("clicked");
      dropDs[2].classList.remove("vis");
      isOpened[2] = false;
    }else{
      arrows[0].classList.remove("clicked");
      arrows[1].classList.remove("clicked");
      arrows[2].classList.remove("clicked");
      dropDs[0].classList.remove("vis");
      dropDs[1].classList.remove("vis");
      dropDs[2].classList.remove("vis");

      arrows.forEach((el) =>{
        void el.offsetWidth;
      })

      dropDs.forEach((el) =>{
        void el.offsetWidth;
      })
      
      arrows[2].classList.add("clicked");
      dropDs[2].classList.add("vis");
      isOpened[2] = true;
      isOpened[1] = false;
      isOpened[0] = false;
    }
    
  });
  // Controllo navicella: toggle, input tastiera e loop animazione.

  if (butShip && contShip && s_components) {
    // Limiti di movimento nel contenitore.
    function getDist(){
      const maxX = Math.max((contShip.clientWidth - s_components.offsetWidth) / 2, 0);
      const maxY = Math.max((contShip.clientHeight - s_components.offsetHeight) / 2, 0);
      return {maxX, maxY};
    }

    // Reset stato tasti freccia.
    function resetPressedKeys() {
      Object.keys(pressedKey).forEach(key => {
        pressedKey[key] = false;
      });
    }

    // Bottone attivo solo a pagina in alto, salvo controllo gia avviato.
    function updateShipButtonState() {
      const isAtTop = window.scrollY === 0;
      const shouldDisable = !isAtTop && !isClicked;
      butShip.disabled = shouldDisable;
      butShip.classList.toggle("ship-button-disabled", shouldDisable);
    }

    // Blocco scroll durante il controllo.
    function lockPageScroll() {
      body.style.overflowY = "hidden";
      body.style.height = "100vh";
    }

    // Ripristino scroll pagina.
    function unlockPageScroll() {
      body.style.overflowY = "";
      body.style.height = "";
    }

    // Disattiva controllo navicella.
    function stopShipControl() {
      isClicked = false;
      butShip.textContent = "Start!";
      resetPressedKeys();
      unlockPageScroll();
      if (shipAnimationId !== null) {
        cancelAnimationFrame(shipAnimationId);
        shipAnimationId = null;
      }
      updateShipButtonState();
    }

    // Loop movimento navicella con requestAnimationFrame.
    function updateMove(){
      if (!isClicked) {
        shipAnimationId = null;
        return;
      }
      const {maxX, maxY} = getDist();
      if(pressedKey.ArrowUp){
        y = Math.min(y + movement, maxY);
      }
      if(pressedKey.ArrowDown){
        y = Math.max(y - movement, -maxY);
      }
      if(pressedKey.ArrowRight){
        x = Math.min(x + movement + 2 , maxX);
      }
      if(pressedKey.ArrowLeft){
        x = Math.max(x - movement, -maxX);
      }
      // Stato visivo in virata orizzontale.
      if (pressedKey.ArrowLeft && !pressedKey.ArrowRight) {
        s_components.style.transform = "rotate(-5deg)";
        s_components.classList.add("break");
      } else if (pressedKey.ArrowRight && !pressedKey.ArrowLeft) {
        s_components.style.transform = "rotate(5deg)";
        s_components.classList.remove("break");
      } else {
        s_components.style.transform = "rotate(0deg)";
        s_components.classList.remove("break");
      }

      // Posizione calcolata dal centro + offset x/y.
      const startLeft = (contShip.clientWidth - s_components.offsetWidth) / 2;
      const startTop = (contShip.clientHeight - s_components.offsetHeight) / 2;

      s_components.style.left = `${startLeft + x}px`;
      s_components.style.top = `${startTop - y}px`;

      shipAnimationId = requestAnimationFrame(updateMove);
    }

    // Attiva controllo navicella.
    function startShipControl() {
      isClicked = true;
      butShip.textContent = "Stop!";
      lockPageScroll();
      updateShipButtonState();
      if (shipAnimationId === null) {
        const startLeft = (contShip.clientWidth - s_components.offsetWidth) / 2;
        const startTop = (contShip.clientHeight - s_components.offsetHeight) / 2;

        s_components.style.left = `${startLeft + x}px`;
        s_components.style.top = `${startTop - y}px`;
        updateMove();
      }
    }

    butShip.addEventListener("click", () => {
      if (butShip.disabled) {
        return;
      }
      if (isClicked) {
        stopShipControl();
      } else {
        startShipControl();
      }
    });

    document.addEventListener("keydown", event => {
      if(!Object.hasOwn(pressedKey, event.key) || !isClicked){
        return;
      }
      event.preventDefault();
      pressedKey[event.key] = true;
    });

    document.addEventListener("keyup", event => {
      if(!Object.hasOwn(pressedKey, event.key) || !isClicked){
        return;
      }

      s_components.style.transform = "rotate(0deg)";
      s_components.classList.remove("break");
      event.preventDefault();
      pressedKey[event.key] = false;
    });

    // Sincronizzazione stato bottone con scroll e load.
    window.addEventListener("scroll", updateShipButtonState, { passive: true });
    window.addEventListener("load", updateShipButtonState);
    updateShipButtonState();
  }
  

  
 
});
