// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
    return moviesArray.map(movie => movie.director);
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
   
    if(!moviesArray.length) {
        return 0
    }

    const spielbergDramaMovies = moviesArray.filter(movieCategory => {
        if(movieCategory.director.toLowerCase() === 'Steven Spielberg'.toLowerCase()) {
            for (const genre of movieCategory.genre) {
                if(genre.toLowerCase() === 'drama') {
                    return movieCategory;
                }
            }
        }
    });

    return !spielbergDramaMovies.length ? 0 : spielbergDramaMovies.length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
    if(!moviesArray.length) {
        return 0;
    }
    
    const scoreTotal = moviesArray.reduce((countScore, movie) => (!isNaN(movie.score)) ? Number(countScore + movie.score) : Number(countScore + 0), 0);
    const avg = Number(scoreTotal / moviesArray.length);
    
    return Number(avg.toFixed(2));
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
    const moviesDramaTotal = moviesArray.filter((movie) => {
        for (const genre of movie.genre) {
            if(genre === 'Drama'){
                return movie;
            }
        }
    });

    if(!moviesDramaTotal.length) {
        return 0;
    }

    const scoreDramaTotal = moviesDramaTotal.reduce((countScore, movie) => Number(countScore + movie.score), 0);
    const avgDrama = Number(scoreDramaTotal / moviesDramaTotal.length);

    return Number(avgDrama.toFixed(2));
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
    if(!moviesArray.length) {
        return [];
    }

    return moviesArray.toSorted((movie1, movie2) => {
        if(movie1.year < movie2.year) {
            return -1;
        }else if (movie1.year > movie2.year){
            return 1;
        }else {
            return movie1.title.localeCompare(movie2.title);
        }
    });
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
    return moviesArray.map(movie => movie.title)
    .toSorted((movie1, movie2) => movie1.localeCompare(movie2))
    .slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
    return moviesArray.map(movie => {
        const hour = movie.duration.match(/(\d+)h/);
        const minute = movie.duration.match(/(\d+)min/);
        let durationMin = 0;

        if (hour && !minute) {
            durationMin = Number(hour[1] * 60);
        } else if (minute && !hour) {
            durationMin = Number(minute[1]);
        } else {
            durationMin = Number((hour[1] * 60)) + Number(minute[1]);
        }
        
        return {...movie, duration: durationMin};
    });
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
    if (!moviesArray.length) {
        return null;
    }

    const movieScore = moviesArray.reduce((bestMovie, movie) => {
        const moviesInside = bestMovie.find(movieYear => movieYear.year === movie.year);

        if (!moviesInside) {
            bestMovie.push({'year': movie.year, 'countMovie': 1, 'score': movie.score, 'avg': movie.score});
        } else {
            moviesInside.score += movie.score;
            moviesInside.countMovie ++;
            moviesInside.avg = moviesInside.score / moviesInside.countMovie;
        }
                        
        return bestMovie;
    }, [])
    .toSorted((movie1, movie2) => {
        if (movie1.avg > movie2.avg) {
            return -1;
        } else if (movie1.avg < movie2.avg) {
            return 1;
        } else {
            if(movie1.year > movie2.year) {
                return 1;
            } else if (movie1.year < movie2.year) {
                return -1;
            } else {
                return 0;
            }
        }
    })
    .slice(0,1);

    return `The best year was ${movieScore[0].year} with an average score of ${movieScore[0].avg}`;
}