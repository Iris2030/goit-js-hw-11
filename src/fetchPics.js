const BASE_URL = 'https://pixabay.com/api/?key=24733344-a7c635fb3d48788b7b7d4e05e'

export default class ApiSearch{
    constructor() {
        this.searchedItems = ''
        this.page = 1
    }

    fetchTotalHits() {
         return fetch(`${BASE_URL}&q=${this.searchedItems}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
            .then(response => response.json())
            .then(data => {
                               
                return data.totalHits
                })
    }
    
    fetchPics() {
      
        return fetch(`${BASE_URL}&q=${this.searchedItems}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`)
            .then(response => response.json())
            .then(data => {
                this.page += 1
                
                return data.hits
                })
    }
  
    resetItems() {

        this.page = 1
    }

}