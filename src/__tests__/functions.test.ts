import { IMovie } from "./../ts/models/IMovie";
import * as fnFunctions from "../ts/functions";

let testMovies: IMovie[] = [
    {
        Title: "Die Hard",
        imdbID: "0095016",
        Type: "test",
        Poster: "urlol",
        Year: "1988"
    },
    {
        Title: "Avatar",
        imdbID: "0499549",
        Type: "test",
        Poster: "urlol",
        Year: "2009"
    },
    {
        Title: "Jurassic Park",
        imdbID: "0107290",
        Type: "test",
        Poster: "urlol",
        Year: "1993"
    },
    {
        Title: "Blade Runner",
        imdbID: "0083658",
        Type: "test",
        Poster: "urlol",
        Year: "1982"
    }
];

let testUnsortMovies: IMovie[] = [     
{
    Title: "Die Hard",
    imdbID: "0095016",
    Type: "test",
    Poster: "urlol",
    Year: "1983"
},
{
    Title: "Die Hard",
    imdbID: "0095016",
    Type: "test",
    Poster: "urlol",
    Year: "1982"
},
{
    Title: "Die Hard",
    imdbID: "0095016",
    Type: "test",
    Poster: "urlol",
    Year: "1981"
},
{
    Title: "Die Hard",
    imdbID: "0095016",
    Type: "test",
    Poster: "urlol",
    Year: "1980"
}
];

describe("movieSort", ()=>{
    test("should sort objects", ()=>{

        fnFunctions.movieSort(testMovies);

        expect(testMovies[0].Title).toBe("Avatar");
        expect(testMovies[1].Title).toBe("Blade Runner");
        expect(testMovies[2].Title).toBe("Die Hard");
        expect(testMovies[3].Title).toBe("Jurassic Park");
    });

    test("should not sort objects", ()=>{
    
        fnFunctions.movieSort(testUnsortMovies);

        expect(testUnsortMovies[0].Year).toBe("1983");
        expect(testUnsortMovies[1].Year).toBe("1982");
        expect(testUnsortMovies[2].Year).toBe("1981");
        expect(testUnsortMovies[3].Year).toBe("1980");
    });

    test("should sort objects reversed", ()=>{

        fnFunctions.movieSort(testMovies, false);

        expect(testMovies[0].Title).toBe("Jurassic Park");
        expect(testMovies[1].Title).toBe("Die Hard");
        expect(testMovies[2].Title).toBe("Blade Runner");
        expect(testMovies[3].Title).toBe("Avatar");
    });

    test("should not sort objects reversed", ()=>{
        
        fnFunctions.movieSort(testUnsortMovies, false);

        expect(testUnsortMovies[0].Year).toBe("1983");
        expect(testUnsortMovies[1].Year).toBe("1982");
        expect(testUnsortMovies[2].Year).toBe("1981");
        expect(testUnsortMovies[3].Year).toBe("1980");
    });
});