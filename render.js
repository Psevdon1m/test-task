const createJoke = (joke) => {
    return `
    <section class = "joke" id="joke-id">
    <div class="container-item" id="container-item1">
    <div class="icon" >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z" class="heart" onclick="moveToFav('${joke.id}')" /></svg>

    </div>
<p class="link-text">ID: <a href="${joke.url}">${joke.id}</a></p>
<div class="joke-body">${joke.value}</div>
<div class="icon-photo">
    <img class="icon-img" src="${joke.icon_url}" />
</div>
<div class="joke-update">
    <p>Last update: ${joke.updated_at} hours ago</p>
</div>
<div class="joke-category">
    <p class="category-text">${joke.categories[0]? joke.categories[0] : "" }</p>
</div>         
    </div>
        
    </section>
    `
}






// const like = document.querySelector('.fa-heart');


// like.addEventListener('click', favoriteJoke());

// const makeFavorite = (joke) => {
//     console.log(joke)
//     return createJoke(joke);
// }
    

//Select/deselect category buttons

function changeClass(id)
{
    if ($('#' + id).hasClass('chosenBtn'))
        $('#' + id).removeClass('chosenBtn');
    else
    {
        if ($('.chosenBtn').length <= 1)
        {
            $('#' + id).addClass('chosenBtn').siblings().removeClass('chosenBtn');
        }
        else
        {
             alert('Only one category can be selected.');
        }       
    }
}
