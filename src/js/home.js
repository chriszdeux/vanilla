(async function load () {
  
  async function getUrl (url) {
    const response = await fetch (url);
    const data =  response.json();
    return data;
  }
  
  const $form = document.querySelector('#form');
  const $home = document.querySelector('#home');
  const $featuringContainer = document.querySelector('#featuring');

  function setAttributes ($element, attributes = []) {
    for (const attribute in attributes) {
      // debugger;
      $element.setAttribute(attribute, attributes[attribute]);
    }
  }

  $form.addEventListener('submit', (event) => {
    event.preventDefault(); //para no recargar la pagina cada que se ejecute :)
    $home.classList.add('search-active');
    const $loader = document.createElement('img');
    // debugger;
    setAttributes($loader, {
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    // debugger;
    $featuringContainer.append($loader); 
  })
  
  const actionList = await getUrl('https://yts.mx/api/v2/list_movies.json?genre=action');
  const animationList = await getUrl('https://yts.mx/api/v2/list_movies.json?genre=animation');
  const dramaList = await getUrl('https://yts.mx/api/v2/list_movies.json?genre=drama');
  const horrorList = await getUrl('https://yts.mx/api/v2/list_movies.json?genre=horror')
  console.log(actionList, animationList, dramaList, horrorList);

  function videoItemTemplate (movie) {
    return (
      `
      <div class="primaryPlaylistItem">
        <div class="primaryPlaylistItem-image">
          <img src=${movie.medium_cover_image}>
        </div>
        <h4 class="primaryPlaylistItem-title">
        ${movie.title}
        </h4>
        </div>
        `
        )
      }
      
      
      function createVideoTemplate (HTMLString) {
        const html = document.implementation.createHTMLDocument();
        html.body.innerHTML = HTMLString;
        return html.body.children[0];
      }
      function addEventClick ($element) {
        $element.addEventListener('click', () => {
          // alert('click')
          showModal();
        })
  }
  function renderMovieList ( list, $container ) {
    $container.children[0].remove();
    list.forEach ( movie => {
      const HTMLString = videoItemTemplate(movie);
      const movieElement = createVideoTemplate(HTMLString);
      $container.append(movieElement);
      addEventClick(movieElement)
      
    })
  }

  
  
  const actionData = actionList.data.movies;
  const animationData = animationList.data.movies;
  const dramaData = dramaList.data.movies;
  const horrorData = horrorList.data.movies;

  
  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionData, $actionContainer);

  const $dramaContainer = document.querySelector('#drama');
  renderMovieList(dramaData, $dramaContainer);

  const $animationContainer = document.querySelector('#animation');
  renderMovieList(animationData, $animationContainer);

  const $horrorContainer = document.querySelector('#horror');
  renderMovieList(horrorData, $horrorContainer )

  

  const $modal = document.querySelector('#modal');
  const $overlay = document.querySelector('#overlay');
  const $hideModal = document.querySelector('#hide-modal');

  const $modalTitle = $modal.querySelector('h1');
  const $modalImage = $modal.querySelector('img');
  const $modalDescription = $modal.querySelector('p')

  function showModal () {
    $overlay.classList.add( 'active' );
    $modal.style.animation = 'modalIn 1s forwards';
  }

  $hideModal.addEventListener ('click', hideModal) 
  function hideModal() {
    $overlay.classList.remove ('active');
    $modal.style.animation = 'modalOut 1s forwards'
  }
  
})()




