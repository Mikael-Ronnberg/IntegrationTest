import { IMovie } from "../../models/IMovie";

export const mockDataIMovie: IMovie[] = [
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

export const getData = async(searchText: string): Promise<IMovie[]> =>{
    return new Promise((resolve, reject) => {
        if(searchText !== "") {
            resolve(mockDataIMovie);
        }
        else {
            reject([]);
        }
    });
};

