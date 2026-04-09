// Tutto il codice viene inizializzato solo quando il DOM e pronto.
// In questo modo evitiamo errori su elementi non ancora presenti in pagina.
document.addEventListener("DOMContentLoaded", () => {

  // Collezione delle card animate quando entrano in viewport.
  const cards = document.querySelectorAll(".scroll-card");

  // ---- example database call ----
  // Esempio di caricamento dati dal backend: recupera i voli e li stampa nel <main>.
  // E una demo rapida, utile per verificare che API e frontend comunichino correttamente.
  async function loadFlights() {
    try {
      const res = await fetch('/api/flights');
      if (!res.ok) throw new Error('Network response was not ok');
      // Conversione della risposta in JSON.
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


  // Link di navigazione e relativi <details> del menu mobile.
  // Alla pressione di un link, i <details> vengono richiusi.
  const navLinks = document.querySelectorAll("#nav-div a");
  const navLinksAfter = document.querySelectorAll("#nav-div a::after");
  const dropDs = document.querySelectorAll(".drop");

  const arrows = document.querySelectorAll(".arrow");
  const arrowsCont = document.querySelectorAll(".arrow-cont");

  const detailsLink = document.querySelectorAll("#nav-div details");

  // 5 slot immagine del carosello offerte pianeti.
  const imgPlanet0 = document.querySelector("#img-offer0");
  const imgPlanet1 = document.querySelector("#img-offer1");
  const imgPlanet2 = document.querySelector("#img-offer2");
  const imgPlanet3 = document.querySelector("#img-offer3");
  const imgPlanet4 = document.querySelector("#img-offer4");

  const curT = document.querySelector(".hero-curved-title");
  

  // Area testuale collegata al pianeta centrale (titolo + descrizione).
  const descPlanet = document.querySelector("#desc-offer");
  const descTit = document.querySelector("#desc-tit");
  const randomOffer = document.querySelector(".random-offer");

  // Bottone che riavvia l'animazione delle astronavi.
  const buttonEngine = document.querySelector("#accensione");
  const sp_ship = document.querySelectorAll(".spaceship-button");

  // Nodo selezionato ma non usato nel file: utile se vorrai agganciare effetti futuri.
  const engine = document.querySelectorAll(".intro-par-div-lat");

  
  const mainImgCl = document.querySelector(".main-img-div img");

  // Sezione che fa da trigger per animazioni delle wrappers astronavi.
  const section = document.querySelector(".random-offer");
  const planetVisualSection = document.querySelector("#div-img-planet");
  const shipWrappers = document.querySelectorAll(".ship-wrappers");

  // Selezioniamo il contenitore principale dello slider
  const slider = document.getElementById("scroll-moon");

  const cards2 = document.querySelectorAll(".scroll-card2");

  const cards3 = document.querySelectorAll(".scroll-card-mascotte");

  const mainImg = document.querySelector("#main-div1");

  const divImg = document.querySelectorAll(".div-un-img");

  // Flag anti-jank: limita gli aggiornamenti dello scroll a un frame per volta.
  let ticking = false;

  let isOpened = [false, false, false];

  

  // On-load: rende subito visibili le card2 (con lieve delay per evitare glitch iniziale).
  window.addEventListener("load", () => {
    cards2.forEach(card => {
      setTimeout(() => {
        card.classList.add("visible");
      }, 50); // 50ms di ritardo evita offset iniziale
    });
  });

  window.addEventListener("load", () => {
    curT.classList.add("visible");
  });

  // Observer per card2: entra => mostra, esce => nasconde (animazione reversibile).
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

  // Observer per mascot/card3: stessa logica di cards2 ma threshold piu alto
  // per attivare l'effetto solo quando la card e quasi completamente visibile.
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


  // "Mini database" locale per i pianeti del modulo random-offer.
  // Ogni record contiene: percorso immagine, titolo e descrizione marketing.
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

  // Observer delle card principali: animazione one-shot.
  // Quando una card e visibile, aggiungiamo "visible" e poi smettiamo di osservarla.
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

  // Chiusura menu details al click su qualsiasi link nav.
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      detailsLink.forEach(detail =>{
        detail.removeAttribute('open');
      });
    });
  });

  

  // Attiva la classe di accensione motore sugli elementi laterali al caricamento pagina.
  window.addEventListener("load", () => {
      document.querySelectorAll(".main-img-div-lat")
          .forEach(div => div.classList.add("engine-on"));
  });

  // Blocco centrale: inizializza offerte pianeti solo quando la sezione entra in viewport.
  // Questo evita lavoro inutile prima che l'utente raggiunga la sezione.
  if (randomOffer){
    const observer = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          // 5 indici distinti per popolare i 5 slot del carosello.
          // L'uso dei do...while garantisce l'assenza di duplicati iniziali.

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

          // Il pianeta al centro e quello "attivo": titolo/descrizione dipendono da lui.
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
          

          // One-shot: inizializziamo una sola volta quando la sezione appare la prima volta.
          observer.unobserve(entry.target);

          // Stato corrente del carosello (sinistra estrema, sinistra, centro, destra, destra estrema).
          let dueLeftIndex = randomIndex0;
          let leftIndex = randomIndex1;
          let centerIndex = randomIndex2;
          let rightIndex = randomIndex3;
          let dueRightIndex = randomIndex4;

          // Click sullo slot di sinistra: quel pianeta diventa il nuovo centro.
          imgPlanet1.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = leftIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigeneriamo lo slot cliccato con un pianeta diverso da quelli gia visibili.
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === dueLeftIndex || newIndex === dueRightIndex);

            leftIndex = newIndex;

            imgPlanet1.src = placesImg[leftIndex].img;
            imgPlanet1.parentElement.dataset.name = placesImg[leftIndex].tit;
          });

          // Click sullo slot di destra: stessa logica speculare.
          imgPlanet3.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = rightIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigeneriamo lo slot cliccato evitando duplicati con gli altri quattro slot.
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === leftIndex || newIndex === dueLeftIndex || newIndex === dueRightIndex);

            rightIndex = newIndex;

            imgPlanet3.src = placesImg[rightIndex].img;
            imgPlanet3.parentElement.dataset.name = placesImg[rightIndex].tit;
          });

          // Click sulla sinistra estrema: promozione a centro + rigenerazione slot estremo.
          imgPlanet0.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = dueLeftIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigenerazione con controllo anti-duplicato rispetto agli slot correnti.
            let newIndex;

            do {
              newIndex = Math.floor(Math.random() * placesImg.length);
            } while (newIndex === centerIndex || newIndex === rightIndex || newIndex === leftIndex || newIndex === dueRightIndex);

            dueLeftIndex = newIndex;

            imgPlanet0.src = placesImg[dueLeftIndex].img;
            imgPlanet0.parentElement.dataset.name = placesImg[dueLeftIndex].tit;
          });

          // Click sulla destra estrema: promozione a centro + rigenerazione slot estremo.
          imgPlanet4.addEventListener("click", () => {

            // Il sinistro diventa il centro
            centerIndex = dueRightIndex;

            // Aggiorno centro
            imgPlanet2.src = placesImg[centerIndex].img;
            imgPlanet2.parentElement.dataset.name = placesImg[centerIndex].tit;

            descTit.textContent = placesImg[centerIndex].tit;
            descPlanet.textContent = placesImg[centerIndex].desc;

            // Rigenerazione con controllo anti-duplicato rispetto agli slot correnti.
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

  // Riavvia l'animazione delle astronavi:
  // 1) rimuove classe, 2) forza reflow, 3) riaggiunge classe.
  if (buttonEngine) {
    buttonEngine.addEventListener("click", () => {
      if (sp_ship.length > 0) {
      sp_ship.forEach(ship => {
        ship.classList.remove("visible");
        void ship.offsetWidth; // forza reflow per riavviare animazione
        ship.classList.add("visible");
      });
      }
    });
  }

  // Observer della sola area visiva dei pianeti: le navicelle partono solo
  // quando questa sezione entra davvero in viewport e non prima.
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

  // Effetto vibrazione logo/immagine principale al click, riavviato via reflow.
  if (mainImgCl) {
    mainImg.addEventListener("click", () => {
      mainImgCl.classList.remove("vibrate");
      void mainImgCl.offsetWidth; // forza reflow
      mainImgCl.classList.add("vibrate");
    });
  }

  

  

  // ===============================
  //  SLIDER ORIZZONTALE (MOUSE + TOUCH)
  // ===============================

  // Variabili di stato per il drag
  let isDown = false;     // Indica se il mouse è premuto
  let startX;             // Posizione iniziale del mouse
  let scrollLeft;         // Posizione iniziale dello scroll

  // ===============================
  //  CENTRATURA INIZIALE
  // ===============================

  // Ragionamento geometrico della centratura:
  // - middleSlide.offsetLeft = punto in cui inizia la slide centrale dentro il contenuto scrollabile.
  // - middleSlide.clientWidth / 2 = meta larghezza della slide centrale, quindi serve per passare
  //   dal suo bordo sinistro al suo centro.
  // - slider.clientWidth / 2 = meta della parte visibile dello slider, cioe il centro del riquadro visibile.
  //
  // Con le misure attuali del progetto:
  // - ogni slide e larga 700px
  // - il gap tra le slide e 25px
  // - il contenitore interno ha margin-left di 60px
  //
  // Quindi, con 3 slide:
  // - inizio slide centrale = 60 + 700 + 25 = 785
  // - centro slide centrale = 785 + 350 = 1135
  // - se la parte visibile dello slider misura 1008px, il suo centro e 504px
  // - per centrare la slide bisogna far cadere il suo centro a 504px dal bordo sinistro visibile
  // - quindi lo scroll da applicare e 1135 - 504 = 631
  //
  // In formula:
  // scrollLeft = middleSlide.offsetLeft - (slider.clientWidth / 2) + (middleSlide.clientWidth / 2)


  
  // Al load centriamo automaticamente la slide di mezzo nello slider.
  if (slider) {
    // Aspettiamo il caricamento completo della pagina prima di calcolare le misure.
    window.addEventListener("load", () => {

      // Recuperiamo tutte le slide contenute nello slider.
      const slides = slider.querySelectorAll(".par-divs-x-scroll");
      // Se non ci sono slide, usciamo subito per evitare errori.
      if (slides.length === 0) return;

      // Selezioniamo la slide centrale dell'elenco.
      const middleSlide = slides[Math.floor(slides.length / 2)];

      // Calcoliamo la posizione di scroll necessaria per portare al centro la slide centrale.
      const offset = middleSlide.offsetLeft 
                     // Sottraiamo meta larghezza visibile dello slider per allineare il centro del contenitore.
                     - (slider.clientWidth / 2) 
                     // Aggiungiamo meta larghezza della slide per allineare il suo centro.
                     + (middleSlide.clientWidth / 2);

      // Applichiamo lo scroll orizzontale calcolato.
      slider.scrollLeft = offset;
    });
  }

  // Aggiorna i tre riquadri immagine prendendo sempre 3 elementi consecutivi
  // da placesSoil a partire da startIndex.
  // Esempio:
  // startIndex = 0 -> mostra immagini 0, 1, 2
  // startIndex = 1 -> mostra immagini 1, 2, 3
  // startIndex = 4 -> mostra immagini 4, 0, 1 (grazie al modulo %)

  
  function updateSoilBackgrounds(startIndex) {
    // divImg e una NodeList: la convertiamo in array e prendiamo solo i primi 3 div,
    // cioe quelli che devono mostrare gli sfondi in rotazione.
    const visibleDivs = Array.from(divImg).slice(0, 3);

    visibleDivs.forEach((div, offset) => {
      // offset vale 0 per il primo div, 1 per il secondo, 2 per il terzo.
      // Sommando startIndex + offset otteniamo i 3 elementi consecutivi da mostrare.
      // Il modulo (%) serve a ricominciare da capo quando arriviamo in fondo all'array.
      const soil = placesSoil[(startIndex + offset) % placesSoil.length];

      // Disattiviamo l'animazione CSS di base del div per evitare che sovrascriva
      // lo sfondo impostato da JavaScript.
      div.style.animation = "none";

      // Applichiamo l'immagine corrente come background del div.
      // backgroundImage richiede la sintassi url("percorso") e non solo il path puro.
      div.style.backgroundImage = `url("${soil.img}")`;

      // Rifiniamo la resa visiva dello sfondo:
      // - center: immagine centrata
      // - no-repeat: niente ripetizione a mosaico
      // - cover: il div viene riempito completamente mantenendo le proporzioni
      div.style.backgroundPosition = "center";
      div.style.backgroundRepeat = "no-repeat";
      div.style.backgroundSize = "cover";
    });
  }

  // Avviamo la rotazione solo se esistono almeno 3 div da riempire
  // e almeno un'immagine disponibile nell'array.
  if (divImg.length >= 3 && placesSoil.length > 0) {
    window.addEventListener("load", () => {
      // Indice iniziale della finestra mobile sull'array placesSoil.
      // All'inizio partiremo da 0, quindi verranno mostrate le immagini 0, 1 e 2.
      let startIndex = 0;

      // Primo render immediato al caricamento pagina, senza aspettare i 3 secondi.
      updateSoilBackgrounds(startIndex);

      setInterval(() => {
        // Ogni 3 secondi spostiamo in avanti di 1 il punto di partenza.
        // Quindi la tripletta visibile scorre cosi:
        // 0,1,2 -> 1,2,3 -> 2,3,4 -> 3,4,0 -> 4,0,1 -> ...
        // quindi nel momento in cui si arriva a 5%5=0 lo start index viene resettato a 0
        startIndex = (startIndex + 1) % placesSoil.length;

        // Ridisegniamo subito i tre div con la nuova tripletta di immagini.
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


 
});
