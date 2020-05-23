const $jokeDiv = $("#container1");
const $jokeItem = $('#container-item1')
const $submit = $('#search-button');
const $favJokes = $('#favorite-jokes')
let category;
let searchType;
let query;
const presentJokes =document.querySelector(".joke")
const favorJokes = document.getElementById("favorite-jokes");
const $icon = $('div:first');
const $options = $('#options');
const $search = $('#search') ;
const $fromCat = $('#from-categories')
const searchBox = document.querySelector('.search-box');
const searchData = document.getElementById('search-data');
let savedJoke;
let jokeIndex;

// NAVIGATION TOGGLE Section
let sliderItem = $('#slider-items');
let navToggle = $('#navToggle');

let container = $('.container');
let main = $('.main')
navToggle.on('click', function(event){
    event.preventDefault();
    sliderItem.toggleClass('show');
    navToggle.toggleClass('active');
    container.toggleClass('fade');
    main.toggleClass('fade');
});


//Loads info from LocalStorage
const loadSavedJokes = () => {
    let localStorJokes = [];
    
    console.log(localStorJokes)
    for( let i= 0; i< localStorage.length ; i++){

        const raw = localStorage.getItem(i);
        savedJoke = JSON.parse(raw)
        localStorJokes.push(savedJoke) 
    }
    
    if(savedJoke){
        let savedListOfJokes = [];
        let indexToRemove;
        
        localStorJokes.map((localJoke , i) => {
            console.log(localJoke, i)
            
            indexToRemove = i;
            let savedJokeContent = createJoke(localJoke)
            $favJokes.append(savedJokeContent).addClass("favorite")
            savedListOfJokes.push(savedJokeContent)
            favJokes.push(savedJokeContent)
            const joke = savedListOfJokes.find(({id})  => id === savedJokeContent.id )
            if (joke) {
                if(favJokes.includes(joke)){
                    favJokes.splice(favJokes.indexOf(joke), 1)
                }
        }
    
        $favJokes.on('click', function(){
            localStorage.removeItem(jokeIndex)
            favJokes.splice(favJokes.indexOf(joke), 1)
        
            localStorage.removeItem(indexToRemove)

            localStorJokes.splice(localStorJokes.indexOf(indexToRemove), 1)
            
        })})
        
    }else {
        console.log('i am not running')
    }
    
}

//calculated updated section
const today = new Date();
const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
const dateTime = date + ' ' + time;
const diffHours = (dt2, dt1) => {
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(Math.round(diff));
}


//Joke category section
function getQuery(e) {
    query = e.target.value;
    
    
}

searchData.addEventListener('change', getQuery)

const random = document.getElementById('random').addEventListener('click', function(){
    searchType = this.id;
    
    return searchType;
})

$fromCat.on('click', function(){
    searchType = this.id;
    if($("options:checked")){
        $(options).removeClass('not-visible');
    $(options).addClass('visible');
}
    if(!$("options:checked")) {
        $(options).removeClass('visible')
        $(options).addClass('not-visible') 
    }
    
    return searchType;
})


$search.on('click', function(){
    searchType = this.id
    
    if($("search:checked")){
        $(searchBox).removeClass('not-visible')
        $(searchBox).addClass('visible')
    }
   
})

const animal = document.getElementById('animal').addEventListener('click', function (){
    category = this.id;
    
    return category;
});
const career = document.getElementById('career').addEventListener('click', function () {
    category = this.id;
   
    return category;
});
const celebrity = document.getElementById('celebrity').addEventListener('click', function () {
    category = this.id;
   
    return category;
});
const dev = document.getElementById('dev').addEventListener('click', function () {
    category = this.id;
   
    return category;
});

const urlToRandomJoke = `https://api.chucknorris.io/jokes/random`

//Seding different requests to API to get paticular jokes

const getCategoryJoke = async () => {
    try{

        const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
        if(response.ok) {
            const jsonResponse = await response.json();
            const postDate = new Date(jsonResponse.updated_at);
            const currentDate = new Date(dateTime);
            const updated = (diffHours(postDate, currentDate));
            jsonResponse.updated_at = updated;
            return jsonResponse;
        }

    }catch(e){
        console.log(e)
    }
}

const getFreeSearch = async() => {
    
    try{

        const response = await fetch(`https://api.chucknorris.io/jokes/search?query=${query}`);
        if(response.ok) {
            const jsonResponse = await response.json();
            let randomJoke = Math.floor(Math.random() * (jsonResponse.total))
            const postDate = new Date(jsonResponse.result[randomJoke].updated_at);
            const currentDate = new Date(dateTime);
            const updated = (diffHours(postDate, currentDate));
            
            
            jsonResponse.result[randomJoke].updated_at = updated;
            return jsonResponse.result[randomJoke];
        }

    }catch(e){
        console.log(e)
    } 
}




const getJokes = async () => {
    

    try{
        const response = await fetch(urlToRandomJoke);
        

        if (response.ok){
            const jsonResponse = await response.json();
            const postDate = new Date(jsonResponse.updated_at);
            const currentDate = new Date(dateTime);
            const updated = (diffHours(postDate, currentDate));
            jsonResponse.updated_at = updated;
            return jsonResponse;
        }


    }catch (e){
        console.log(e)
    }
}

const renderJoke = joke => {
    let jokeContent = createJoke(joke);
    $jokeDiv.append(jokeContent);
};

//moves(and removes) jokes from search (from favorite) array to favorite jokes
const moveToFav = (jokeID) => {
    
    const joke = allJokes.find(({id})  => id === jokeID )
    if (joke) {
        if(favJokes.includes(joke)){
            localStorage.removeItem(jokeIndex)
            favJokes.splice(favJokes.indexOf(joke), 1)
            
        }else {
            favJokes.push(joke); 
        }
        
        $favJokes.empty();
        favJokes.forEach(joke => {
            jokeIndex = favJokes.indexOf(joke);  
            localStorage.setItem(jokeIndex, JSON.stringify(joke));    

            let jokeContent = createJoke(joke); 
            $favJokes.append(jokeContent).addClass('favorite');
            
            $icon.removeClass('far');
            
        })
        
    }
    
}

let allJokes = [];
let favJokes = [];

//this function chooses which request to send and add a received joke to all jokes list. 

const performSearch = () => {
    
    let jokePromise;

    if (document.getElementById('random').checked) {
        jokePromise = getJokes();
    }
    else if (searchType === "from-categories") {
        jokePromise = getCategoryJoke()
    } else {
        jokePromise = getFreeSearch()
    }

    jokePromise.then((joke) => {
        allJokes.push(joke);
        return renderJoke(joke)
        
    });
}
   
//funcitons loads jokes from storage
loadSavedJokes();

$submit.click(performSearch);