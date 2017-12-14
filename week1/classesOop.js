class Movies {
    constructor(title, genres, stars = [], writers = [], director = [], rate = []) {
        this.genres = genres;
        this.title = title;
        this.stars = stars;
        this.writers = writers;
        this.director = director;
        this.rate = rate;
    }
    getTitle() {
        return this.title
    }
    getGenres() {
        return this.genres
    }
    set newStar(newStar) {
        this.stars.push(newStar)
    }
    getStars() {
        return this.stars
    }
    set newWriter(newWriter) {
        this.writers.push(newWriter)
    }
    getWrites() {
        return this.writers
    }
    set newDirector(newDirector) {
        this.director.push(newDirector)
    }
    getDirector() {
        return this.director
    }
    set newRate(newRate) {
        this.rate.push(newRate)
    }
    getRating() {
        let avgOfRate = this.rate.reduce((total, rate) => total + rate) / this.rate.length;
        return Math.round(avgOfRate);
    }
    
}

class Staff {
    constructor(name, role, dateOfBirth) {
        this.name = name;
        this.role = role;
        this.dateOfBirth = new Date(dateOfBirth);
        this.movies = [];
    }
    addMovie(movieInstance) {
        this.movies.push(movieInstance);
    }
    getName() {
        return this.name
    }
    getRole() {
        return this.role
    }
    getAge() {
        let currentYear = new Date().getFullYear();
        return currentYear - this.dateOfBirth.getFullYear();
    }
}

const babyDriver = new Movies("Baby Driver", "Action");

// document.querySelector('#t').innerHTML = this.director;

const ryanReynolds = new Staff(" Ryan Reynolds", "Actor", "1976-10-23");
const anselElgort = new Staff("Ansel Elgort", "Actor", "1994-04-14");
const jonBernthal = new Staff("Jon Bernthal", "actor", "1976-09-20");
const edgarWright = new Staff("Edgar Wright", "Writer", "1960-02-12");
const edgar_Wright = new Staff("Edgar Wright", "Director", "1965-05-29");

ryanReynolds.addMovie("Baby Driver");
anselElgort.addMovie("Baby Driver");
jonBernthal.addMovie("Baby Driver");
edgarWright.addMovie("Baby Driver");

babyDriver.newStar = anselElgort;
babyDriver.newStar = ryanReynolds;
babyDriver.newStar = jonBernthal;
babyDriver.newDirector = edgar_Wright;
babyDriver.newWriter = edgarWright;
babyDriver.newRate = 7.8;
babyDriver.newRate = 6.5;
babyDriver.newRate = 7.0;
babyDriver.newRate = 7.8;
//console.log(babyDriver.getWrites())
console.log(`the Rating for ${babyDriver.getTitle()} movie is :${babyDriver.getRating()}`);
console.log('Stars:', babyDriver.getStars().map(actor => `${actor.getName()} ${actor.getAge()}`));
const director = babyDriver.getDirector();
console.log(`Director: ${director.map(actor => `${actor.getName()}`)}`);
const Writer = babyDriver.getWrites();

// template
const d = `Director: ${director.map(actor => `${actor.getName()}`)}`
const s = (babyDriver.getStars().map(actor => `${actor.getName()} / old: ${actor.getAge()}`));
const w = `Writer: ${Writer.map(r => `${r.getName()}`)}`;
const imgUrl = 'https://images-na.ssl-images-amazon.com/images/M/MV5BMjM3MjQ1MzkxNl5BMl5BanBnXkFtZTgwODk1ODgyMjI@._V1_UX182_CR0,0,182,268_AL_.jpg';
const template = `<h1>${babyDriver.getTitle()} (2017)</h1>
    <p>Rating: ${babyDriver.getRating()}/10</P>
    <p>Genres: <em>${babyDriver.getGenres()}</em> </p>
    <img src="${imgUrl}" />
    <p>Stars: ${s.join(', ')}</p>
    <p>${d}</p>
    <p>${w}</p>`;
document.querySelector('body').innerHTML = template;

