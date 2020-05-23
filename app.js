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

// NAVIGATION TOGGLE
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
            console.log(indexToRemove)
            console.log(localStorJokes)
            
            
            localStorJokes.splice(localStorJokes.indexOf(indexToRemove), 1)
            
            
        })})
        
    }else {
        console.log('i am not running')
    }
    
}


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

//const search = document.getElementById('search');
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



const getCategoryJoke = async () => {
    try{

        const response = await fetch(`https://api.chucknorris.io/jokes/random?category=${category}`);
        if(response.ok) {
            const jsonResponse = await response.json();
            
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
// const performSearch = () => {
//     if(document.getElementById('random').checked){
    
//     getJokes().then((joke) => {
       
        
//         return renderJoke(joke);
//     })}
//     else if(searchType === "from-categories"){
         
//         getCategoryJoke().then((joke) => {
//             return renderJoke(joke);
//         })
//     } else if(searchType === "search"){
        
//         getFreeSearch().then((joke) => {
//             return renderJoke(joke)
//         })
//     }
        
//     }
    
loadSavedJokes();

$submit.click(performSearch);