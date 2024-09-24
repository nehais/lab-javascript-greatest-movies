// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    let directors = moviesArray.map((movie)=>{
        return movie.director;
    });

    directors = [...new Set (directors)];
    return directors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
    let stevenMovies = moviesArray.filter ((movie) => (movie.director === 'Steven Spielberg') && (movie.genre.includes('Drama')));

    return stevenMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if (!moviesArray || moviesArray.length === 0) return 0;

    let totalScore = moviesArray.reduce((acc, curr) => acc + (curr.score ? curr.score : 0), 0);

    let avg = Number((totalScore / moviesArray.length).toFixed(2));
    return avg;
}

// Iteration 4: Drama movies - Get the average of Drama Movies------------------?????????????????
function dramaMoviesScore(moviesArray) {
    let dramaMovies = moviesArray.filter ((movie) => movie.genre.includes('Drama'));
    let dramaAvg = scoresAverage(dramaMovies);

    return dramaAvg;
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    let sortedMovies = [...moviesArray];
    sortedMovies.sort((a, b) => {
        if (a.year !== b.year){ 
            return a.year - b.year;
        }
        else {
            return a.title.localeCompare(b.title);
        }
    });

    return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {    
    let sortedTitles = moviesArray.map(movie => movie.title);    
    
    sortedTitles.sort((a, b) => a.localeCompare(b));
    
    return sortedTitles.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    
    let timeFormatted = structuredClone(moviesArray);
    timeFormatted.forEach((movieTime) =>{
        let durH = Number(movieTime.duration.slice(0, movieTime.duration.indexOf('h')));
        let durM = Number(movieTime.duration.slice(movieTime.duration.indexOf(' '), movieTime.duration.indexOf('m')));
        movieTime.duration = (durH * 60) +  durM;
    })
    return timeFormatted;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (!moviesArray || moviesArray.length === 0) return null;

    let groupedYear = {};
    let bestYear, bestScore = 0;
    
    moviesArray.forEach((movie) =>{
        if (groupedYear[movie.year]){
            groupedYear[movie.year].totalScore += movie.score;
            groupedYear[movie.year].totalMovies ++;
        }
        else {
            groupedYear[movie.year] = {'totalScore' : movie.score,
                                       'totalMovies' : 1};
        }
        groupedYear[movie.year].avgScore = groupedYear[movie.year].totalScore / groupedYear[movie.year].totalMovies;        
    });
    
    Object.keys(groupedYear).forEach((year) =>{
        if(groupedYear[year].avgScore  > bestScore ){
            bestScore = groupedYear[year].avgScore;
            bestYear = year;
        }
        else if((groupedYear[year].avgScore === bestScore) && (Number(year) < Number(bestYear))){
            bestScore = groupedYear[year].avgScore;
            bestYear = year;
        }
    })

    return `The best year was ${bestYear} with an average score of ${bestScore}`;
}
