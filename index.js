const base = "https://api.themoviedb.org/3/";
const api_key = "e920b5db6dad5a0a6d7c88589601a299";

//https://api.themoviedb.org/3/search/movie?api_key=e920b5db6dad5a0a6d7c88589601a299&language=en-US&query=avengers%20endgame&page=1&include_adult=false
//https://api.themoviedb.org/3/movie/299534/credits?api_key=e920b5db6dad5a0a6d7c88589601a299&language=en-US
//////////////////////////////////
var first_movie = "avengers: infinity war".toLowerCase();
printFirstMoviePoster(first_movie);

//lists to keep track of movies/persons already mentioned
var list_persons = [];
var list_movies = [first_movie];
//////////////////////////////////////

//Add an event listerner on the first submit button
var buttons = document.querySelectorAll('[id=submitbutton]');
var button = buttons[buttons.length-1];
button.addEventListener('click',function(event){
  event.preventDefault();
  var forms = document.querySelectorAll('[id=formActor]');
  var formActor = forms[forms.length-1];
  var name = formActor.elements.actorname.value;//get the input
  if(name != ""){
    var moviesnames = document.querySelectorAll('[id=movietitle]');
    var movie= moviesnames[moviesnames.length-1].innerText;
    console.log(`${name} in ${movie} ?`);
    //Get the movie id and check the credits
    getMovieId(movie).then(function(movieid){
      console.log(movieid);
      checkCredits(movieid,name);
    });
  }
});

//////////////////////////////////////
//display the first movie poster and info
function printFirstMoviePoster(movie){
  var url = base + "search/movie?" + `api_key=${api_key}&query="${movie}"`;
  fetch(url).then(function (response) {
      return response.text();
  }).then(function (text) {
      let outcome = JSON.parse(text);
      var movie_json = outcome.results[0];
      var movies = document.querySelectorAll('[id=movieinfo]');
      movies[movies.length-1].innerHTML = `<b id="movietitle">${movie_json.title}</b><br> ` +`<b id="moviedate">${movie_json.release_date}</b><br> `+"<img src='https://image.tmdb.org/t/p/original/"+ movie_json.poster_path + "'>";
      var moviediv = document.getElementById("movie");
      moviediv.style.background=`radial-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%),url(https://image.tmdb.org/t/p/original${movie_json.backdrop_path}) no-repeat center`;
      moviediv.style.backgroundSize ="cover";
  }).catch(function (error) {
      console.log(error);
  });
}

//Add a new div below the previous div that will contain the person info and new form
function addDivPerson(){
  var divperson = document.createElement("div");
  divperson.setAttribute("id", "person");
  var divpersoninfo = document.createElement("div");
  divpersoninfo.setAttribute("id", "personinfo");
  var formmovie = document.createElement("form");
  formmovie.setAttribute("id","formMovie");
  formmovie.setAttribute("name","formMovie");
  formmovie.setAttribute("onsubmit","clickOnSubmitButton();return false;");
  var label = document.createElement("label");
  label.setAttribute("for","moviename");
  label.innerText = "Enter a movie that this person has directed or acted in :";
  var input_moviename = document.createElement("input");
  input_moviename.setAttribute("type","text");
  input_moviename.setAttribute("id","moviename");
  input_moviename.setAttribute("name","moviename");
  input_moviename.setAttribute("required","true");
  var submitbutton = document.createElement("input");
  submitbutton.setAttribute("id","submitbutton");
  submitbutton.setAttribute("type","button");
  submitbutton.setAttribute("value","Submit");
  var divwrong = document.createElement("div");
  var divquizz = document.getElementById("quizz");
  divquizz.appendChild(document.createElement("br"));
  divquizz.appendChild(divperson);
  divwrong.setAttribute("id","wrong");
  divperson.appendChild(divpersoninfo);
  divperson.appendChild(formmovie);
  formmovie.appendChild(label);
  formmovie.appendChild(document.createElement("br"));
  formmovie.appendChild(input_moviename);
  formmovie.appendChild(document.createElement("br"));
  formmovie.appendChild(submitbutton);
  divperson.appendChild(divwrong);
  //We add these elements below (like in the html):
  /*document.body.innerHTML += `<div id="person">
    <div id="personinfo"></div>
    <form id="formMovie" name=formMovie>
      <label for="moviename">Enter a movie where this person have directed or acted in :</label><br>
      <input type="text" id="moviename" name="moviename" required></input><br>
      <input id="submitbutton" type="submit" value="Submit">
    </form>
    <div id="wrong"></div>
  </div><br>`;*/
}

//Add a new div below the previous div that will contain the movie info and new form
function addDivMovie(){
  var divmovie = document.createElement("div");
  divmovie.setAttribute("id", "movie");
  var divmovieinfo = document.createElement("div");
  divmovieinfo.setAttribute("id", "movieinfo");
  var formactor = document.createElement("form");
  formactor.setAttribute("id","formActor");
  formactor.setAttribute("name","formActor");
  formactor.setAttribute("onsubmit","clickOnSubmitButton();return false;");
  var label = document.createElement("label");
  label.setAttribute("for","actorname");
  label.innerText = "Enter the director or one of the actors of this movie :";
  var input_actorname = document.createElement("input");
  input_actorname.setAttribute("type","text");
  input_actorname.setAttribute("id","actorname");
  input_actorname.setAttribute("name","actorname");
  input_actorname.setAttribute("required","true");
  var submitbutton = document.createElement("input");
  submitbutton.setAttribute("id","submitbutton");
  submitbutton.setAttribute("type","button");
  submitbutton.setAttribute("value","Submit");
  var divwrong = document.createElement("div");
  var divquizz = document.getElementById("quizz");
  divquizz.appendChild(document.createElement("br"));
  divquizz.appendChild(divmovie);
  divwrong.setAttribute("id","wrong");
  divmovie.appendChild(divmovieinfo);
  divmovie.appendChild(formactor);
  formactor.appendChild(label);
  formactor.appendChild(document.createElement("br"));
  formactor.appendChild(input_actorname);
  formactor.appendChild(document.createElement("br"));
  formactor.appendChild(submitbutton);
  divmovie.appendChild(divwrong);
  //We add these elements below (like in the html):
  /*document.body.innerHTML += `<div id="movie">
    <div id="movieinfo"></div>
    <form id="formActor" name=formActor>
      <label for="actorname">Enter the director or one of the actors of this movie </label><br>
      <input type="text" id="actorname" name="actorname" required></input><br>
      <input id="submitbutton" type="submit" value="Submit">
    </form>
    <div id="wrong"></div>
  </div><br>`;*/
}
//display the pic of an actor/director with its name
function printProfile(person_json){
  var persons = document.querySelectorAll('[id=personinfo]');
  persons[persons.length-1].innerHTML = `<b id="personid" style="visibility:hidden;">${person_json.id}</b><br>`+`<b id="personname">${person_json.name}</b>`+"<br>" +"<img src='https://image.tmdb.org/t/p/w780/"+ person_json.profile_path + "'>";
}
//display the poster of a movie with its release date and title
//Change also the background
function printPoster(movie_json){
  var movies = document.querySelectorAll('[id=movieinfo]');
  movies[movies.length-1].innerHTML = `<b id="movieid" style="visibility:hidden;">${movie_json.id}</b><br>`+`<b id="movietitle">${movie_json.title}</b><br> `+`<b id="moviedate">${movie_json.release_date}</b><br>`  +"<img src='https://image.tmdb.org/t/p/original/"+ movie_json.poster_path + "'>";
  var moviedivs = document.querySelectorAll('[id=movie]');
  var moviediv = moviedivs[moviedivs.length-1]
  moviediv.style.background=`radial-gradient(rgba(0,0,0,0) 50%, rgba(0,0,0,1) 100%),url(https://image.tmdb.org/t/p/original${movie_json.backdrop_path}) no-repeat center`;
  moviediv.style.backgroundSize ="cover";
}

//Add eventlistener on a button to submit a movie name for an actor/director
function addeventlisternerSubmitMovie(){
  var buttons = document.querySelectorAll('[id=submitbutton]');
  var button = buttons[buttons.length-1];
  button.addEventListener('click',function(event){
    event.preventDefault();
    var forms_m = document.querySelectorAll('[id=formMovie]')
    var formMovie = forms_m[forms_m.length-1];
    var name = formMovie.elements.moviename.value;
    //Check if the movie has already been mentionned
    if(list_movies.includes(name.toLowerCase())){
      var wrongs = document.querySelectorAll('[id=wrong]');
      wrongs[wrongs.length-1].innerHTML = "<b id='wrong'>Already Mentionned!</b>";
    }
    else if(name != ""){
      var personsnames = document.querySelectorAll('[id=personname]')
      var person= personsnames[personsnames.length-1].innerText;
      console.log(document.querySelectorAll('[id=personid]'));
      var personsids = document.querySelectorAll('[id=personid]')
      var personid= personsids[personsids.length-1].innerHTML;
      console.log(`${person} (id:${personid}) in ${name} ?`);
      checkMovies(personid,name);
    }});
}

//Add eventlistener on a button to submit a actor/director name for a movie
function addeventlisternerSubmitPerson(){
  var buttons = document.querySelectorAll('[id=submitbutton]');
  var button = buttons[buttons.length-1];
  button.addEventListener('click',function(event){
    event.preventDefault();
    var forms_a = document.querySelectorAll('[id=formActor]')
    var formActorDirector = forms_a[forms_a.length-1];
    var name = formActorDirector.elements.actorname.value;
    //Check if the person has already been mentionned
    if(list_persons.includes(name.toLowerCase())){
      var wrongs = document.querySelectorAll('[id=wrong]');
      wrongs[wrongs.length-1].innerHTML = "<b id='wrong'>Already Mentionned!</b>";
    }
    else if(name != ""){
    var moviesnames = document.querySelectorAll('[id=movietitle]')
    var movie= moviesnames[moviesnames.length-1].innerText;
    console.log(document.querySelectorAll('[id=movieid]'));
    var moviesids = document.querySelectorAll('[id=movieid]')
    var movieid= moviesids[moviesids.length-1].innerHTML;
    console.log(`${name} (id:${movieid}) in ${movie} ?`);
    checkCredits(movieid,name);
  }});
}

//Search query with the TMDB Api and return the movie id
function getMovieId(movie){
  var url = base + "search/movie?" + `api_key=${api_key}&query="${movie}"`;
  return fetch(url).then(function (response) {
      return response.text();
  }).then(function (text) {
      let outcome = JSON.parse(text);
      var movie_json = outcome.results[0];
      return movie_json.id;
  }).catch(function (error) {
      console.log(error);
  });
}

//Check if the input actor/director name is in the credits of a movie
//Parameters : movieid and name of an actor/director
function checkCredits(movieid,name){
  var url = base + `movie/${movieid}/credits?` + `api_key=${api_key}`
  fetch(url).then(function (response) {
      return response.text();
  }).then(function (text) {
      let credits = JSON.parse(text);
      let crew = credits.crew;//get cast and credits from the json
      let cast = credits.cast;
      var wrongs = document.querySelectorAll('[id=wrong]')
      let director = isDirector(crew,name);
      let actor = isActor(cast,name);
      if(director){
        console.log("Success");
        wrongs[wrongs.length-1].innerHTML = "<b id='success'>True!</b>";
        var submits = document.querySelectorAll('[id=submitbutton]')
        submits[submits.length-1].disabled = true;
        list_persons.push(name.toLowerCase());
        addDivPerson();
        printProfile(director);
        addeventlisternerSubmitMovie();
      } else if(actor){
        console.log("Success");
        wrongs[wrongs.length-1].innerHTML = "<b id='success'>True!</b>";
        var submits = document.querySelectorAll('[id=submitbutton]')
        submits[submits.length-1].disabled = true;
        list_persons.push(name.toLowerCase());
        addDivPerson();
        printProfile(actor)
        addeventlisternerSubmitMovie();
      } else {
        console.log("Wrong");
        //Display a message in red
        wrongs[wrongs.length-1].innerHTML = "<b id='wrong'>Wrong !</b>";
      }
  }).catch(function (error) {
      console.log(error);
  });
}

//Check if the input movie name is in the movie credits of an actor/director
//Parameters : personid and name of a movie
function checkMovies(personid,name){
  var url = base + `person/${personid}/movie_credits?` + `api_key=${api_key}`
  fetch(url).then(function (response) {
      return response.text();
  }).then(function (text) {
      let credits = JSON.parse(text);
      let crew = credits.crew;
      let cast = credits.cast;
      var wrongs = document.querySelectorAll('[id=wrong]')
      let directed = hasDirected(crew,name);
      let actedin = hasActedIn(cast,name);
      if(directed){
        console.log("Success");
        wrongs[wrongs.length-1].innerHTML = "<b id='success'>True!</b>";
        var submits = document.querySelectorAll('[id=submitbutton]')
        submits[submits.length-1].disabled = true;
        list_movies.push(name.toLowerCase());
        addDivMovie();
        printPoster(directed);
        addeventlisternerSubmitPerson();
      } else if(actedin){
        console.log("Success");
        wrongs[wrongs.length-1].innerHTML = "<b id='success'>True!</b>";
        var submits = document.querySelectorAll('[id=submitbutton]')
        submits[submits.length-1].disabled = true;
        list_movies.push(name.toLowerCase());
        addDivMovie();
        printPoster(actedin);
        addeventlisternerSubmitPerson();
      } else{
        console.log("Wrong");
        //Display a message in red
        wrongs[wrongs.length-1].innerHTML = "<b id='wrong'>Wrong !</b>";
      }
  }).catch(function (error) {
      console.log(error);
  });
}

//Check if a person is the director of the movie
function isDirector(crew, name){
  let director = null;
  crew.forEach(function(credit){
      if(credit.job == "Director"){
        if(credit.name.toLowerCase()==name.toLowerCase()){
          director = credit;
        }
  }});
  return director;
}

//Check if a person is an actor of the movie
function isActor(cast, name){
  let actor = null;
  let i = 0;
  while(i<cast.length && actor==null){
    if(cast[i].name.toLowerCase() == name.toLowerCase()){
      actor=cast[i];
    }
    i = i + 1;
  }
  return actor;
}

//Check if a movie has been directed by the person
function hasDirected(crew, name){
  let movie = null;
  crew.forEach(function(credit){
      if(credit.job == "Director"){
        if(credit.title.toLowerCase()==name.toLowerCase()){
          movie = credit;
        }
  }});
  return movie;
}

//Check if a movie has the person as an actor
function hasActedIn(cast, name){
  let movie = null;
  let i = 0;
  while(i<cast.length && movie==null){
    if(cast[i].title.toLowerCase() == name.toLowerCase()){
      movie=cast[i];
    }
    i = i + 1;
  }
  return movie;
}

/////////////////
//When submit the form, we click and redirect to the button event listerner
function clickOnSubmitButton(){
  var buttons = document.querySelectorAll('[id=submitbutton]');
  var button = buttons[buttons.length-1];
  button.click();
}
