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
loadMoreBtn.addEventListener('click', onLoadMore)

 
function onFormSubmit(event) {
    event.preventDefault()
    apiSearch.searchedItems = event.currentTarget.elements.searchQuery.value
        
 
    apiSearch.fetchTotalHits().then(totalHitsNotification).catch((error) => { console.log(error) })      
    loadMoreBtn.classList.remove('is-hidden')
    clearGallery()
    apiSearch.resetItems()
        
    fetchAndRender()
        // .catch((error) => { console.log(error) })
}

 

function renderMarkup(item) {
    gallery.insertAdjacentHTML('beforeend', template(item))

    if (item.length === 0) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    }
    if (item.length < 40) {
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
    }
  
}

 async function fetchAndRender(){
     loadMoreBtn.setAttribute('disabled', true)
     try {
         const pics = await apiSearch.fetchPics()
         const renderPics = await renderMarkup(pics) 
     if (!renderPics) {
         loadMoreBtn.removeAttribute('disabled',true) 
         }
     } catch(error) {
        console.log(error);
     }
  
}

function onLoadMore(event) {
    fetchAndRender()
    // console.log(event.currentTarget.elements);
}
 
 
    const lightbox = new SimpleLightbox('.gallery a') 
 