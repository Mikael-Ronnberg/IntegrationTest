/**
*@jest-environment jsdom
*/

import { IMovie } from "./../ts/models/IMovie";
import * as movieServiceFn from "./../ts/services/movieservice";
import * as movieAppFn from "./../ts/movieApp";

test("should call handleSubmit", ()=>{

    document.body.innerHTML = `
    <form id="searchForm">
    <input type="text" id="searchText" placeholder="Skriv titel här" />
    <button type="submit" id="search">Sök</button>
  </form>
    `;

    let sneakySpy = jest.spyOn(movieAppFn, "handleSubmit").mockImplementation(
        ()=> new Promise((resolve)=>{
            resolve();
        })
    );

    movieAppFn.init();
    
    let testForm = document.getElementById("searchForm") as HTMLFormElement;
    testForm.submit();

    expect(sneakySpy).toHaveBeenCalled();

});

describe("handleSubmit", ()=>{
    beforeEach(() => {
        jest.resetModules();
        jest.restoreAllMocks();
      });
    
    jest.mock("axios", ()=>({
        get: async () => {
            return new Promise ((reject)=> {
                reject({
                    data: []
                });
            });
        }
    }));

    test("should call createHTML", async()=> {

        document.body.innerHTML =`
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
      </form>
      <div id="movie-container"></div>
        `;
        let sneakySpy = jest.spyOn(movieAppFn, "createHtml").mockReturnValue();

        await movieAppFn.handleSubmit();
        
        expect(sneakySpy).toHaveBeenCalled();

    });

    test("should call displayNoResult", async()=>{
        document.body.innerHTML = `
        <form id="searchForm">
      <input type="text" id="searchText" placeholder="Skriv titel här" />
      <button type="submit" id="search">Sök</button>
    </form>
    <div id="movie-container"></div>
        `;

        let testText: string = (document.getElementById("searchText")as HTMLInputElement).value;

        testText = "";

        let testContainer: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;

        let callSpy = jest.spyOn(movieServiceFn, "getData").mockImplementation(()=>
            new Promise((reject)=>{
                reject([]);
            })
        );

        let sneakySpy = jest.spyOn(movieAppFn, "displayNoResult").mockReturnValue();

        try {
            await movieAppFn.handleSubmit();
        }
        catch {
            expect(sneakySpy).toBe([]);
            if (callSpy) {
                expect(callSpy).toHaveBeenCalled();
                expect(movieServiceFn.getData).toHaveBeenCalled();
                expect(sneakySpy).toBeCalledWith(testContainer);
            }
        }
    });

    test("should force error", async()=>{
        document.body.innerHTML = `
        <form id="searchForm">
        <input type="text" id="searchText" placeholder="Skriv titel här" />
        <button type="submit" id="search">Sök</button>
      </form>
      <div id="movie-container"></div>
        `;
        (document.getElementById("searchText")as HTMLInputElement).value = "";
        
        let sneakySpy = jest.spyOn(movieAppFn, "displayNoResult").mockReturnValue();

        await movieAppFn.handleSubmit();

        expect(sneakySpy).toHaveBeenCalled;
    });
});

jest.mock("./../ts/services/movieservice.ts");

test("should create HTML on DOM", async ()=>{
    document.body.innerHTML =`
    <div id="movie-container"></div>
    `;
    let testContainer: HTMLDivElement = document.getElementById(
        "movie-container"
      ) as HTMLDivElement;
    let testText: string = "test";

    let testCall: IMovie[] = await movieServiceFn.getData(testText);

    movieAppFn.createHtml(testCall, testContainer);

    expect(testContainer.innerHTML).toContain("div");
    expect(testContainer.innerHTML).toContain("h3");
    expect(testContainer.innerHTML).toContain("img");
    expect(document.querySelectorAll("h3")[0].innerHTML).toBe("Die Hard");
    expect(document.querySelectorAll("h3")[1].innerHTML).toBe("Avatar");
    expect(document.querySelectorAll("h3")[2].innerHTML).toBe("Jurassic Park");
    expect(document.querySelectorAll("h3")[3].innerHTML).toBe("Blade Runner");
});

test("should display message in paragraph", ()=>{
    
    document.body.innerHTML =`
    <div id="movie-container"></div>
    `;
    let testContainer: HTMLDivElement = document.getElementById("movie-container") as HTMLDivElement;
    
    movieAppFn.displayNoResult(testContainer);

    expect(testContainer.innerHTML).toBe(`<p>Inga sökresultat att visa</p>`);
});