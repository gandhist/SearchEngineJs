import { setSearchFocus, showClearTextButton, clearSearchText, clearPushListener} from './searchBar.js';
import {buildSearchResults, crearStatsLine, setStatsLine, deleteSearchResult} from './searchResults.js';
import { getSearchTerm, retriveSearchResult } from './dataFunctions.js';

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete"){
        initApp();
    }
})

const initApp = () => {
    // set the focus
    setSearchFocus();
    // TODO 3 listener clear text
    const search = document.getElementById("search")
    search.addEventListener("input", showClearTextButton)

    const clear = document.getElementById("clear")
    clear.addEventListener("click", clearSearchText)
    clear.addEventListener("keydown", clearPushListener)

    const form = document.getElementById("searchBar");
    form.addEventListener("submit", submitTheSearch)
}

// procedural "workflow function"
const submitTheSearch = (event) => {
    event.preventDefault();
    // TODO delete search results
    deleteSearchResult();
    // process the search 
    processTheSearch();
    // set the focus 
    setSearchFocus()

}

// procedural
const processTheSearch = async () => {
    // TODO clear the state line
    crearStatsLine();
    const searchTerm = getSearchTerm();
    if(searchTerm === "") return;
    const resultArray = await retriveSearchResult(searchTerm);
    if (resultArray.length) { // TODO build the search results
        return buildSearchResults(resultArray);    
    }
    // TODO set stats line
    setStatsLine()
}