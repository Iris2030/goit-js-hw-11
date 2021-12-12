import './css/styles.css';
import Notiflix from 'notiflix'
import template from './template.hbs'
import ApiSearch from './fetchPics.js'
import SimpleLightbox from "simplelightbox"
import "simplelightbox/dist/simple-lightbox.min.css"
 
 
const apiSearch = new ApiSearch
const formEl = document.querySelector('.search-form')
const gallery = document.querySelector('.gallery') 
const loadMoreBtn = document.querySelector('.load-more')
 
 

loadMoreBtn.classList.add('is-hidden')

formEl.addEventListener('submit', onFormSubmit)
loadMoreBtn.addEventListener('click', fetchAndRender)

 
function onFormSubmit(event) {
    event.preventDefault()
    apiSearch.searchedItems = event.currentTarget.elements.searchQuery.value
        
 
    apiSearch.fetchTotalHits().then(totalHitsNotification).catch((error) => { console.log(error) })
  
    clearGallery()
    apiSearch.resetItems()
        
    fetchAndRender()
    
}

 

function renderMarkup(item) {
    gallery.insertAdjacentHTML('beforeend', template(item))

    if (item.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    if ( item.length > 0 && item.length < 40) {
            Notiflix.Notify.warning(`We're sorry, but you've reached the end of search results.`)
          loadMoreBtn.classList.add('is-hidden')
    }

   }

function clearGallery() {
    gallery.innerHTML = ''
}
 
function totalHitsNotification(totalHits) {
    if (totalHits > 0) {
        Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`)
        
    loadMoreBtn.classList.remove('is-hidden')
    }
   
  
}

 async function fetchAndRender(){
     loadMoreBtn.setAttribute('disabled', true)
     loadMoreBtn.textContent = "Loading..."
     try {
         const pics = await apiSearch.fetchPics()
         const renderPics = await renderMarkup(pics) 
     if (!renderPics) {
         loadMoreBtn.removeAttribute('disabled', true)
          loadMoreBtn.textContent = "Load more"
         }
     } catch(error) {
        console.log(error);
     }
  
}
 
gallery.addEventListener("click", onImgClick)

 
function onImgClick(event) {
    event.preventDefault()
}
  
   const lightbox = new SimpleLightbox('.gallery a',{captions: true,captionPosition : "bottom",captionDelay: 250,captionType : "attr", captionsData : "alt"}) 
 