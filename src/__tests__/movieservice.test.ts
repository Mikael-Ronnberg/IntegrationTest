/**
*@jest-environment jsdom
*/

import { IMovie } from "../ts/models/IMovie";
import { getData } from "../ts/services/movieservice";
import { mockDataIMovie } from "../ts/services/__mocks__/movieservice";

jest.mock("axios", ()=>({
    get: async() => {
        return new Promise<IMovie[]>((resolve) => {
            resolve(mockDataIMovie)
        })
    }
}));

jest.mock("./../ts/services/movieservice");

describe("getData", ()=>{
    test("should mock and return mock data", async()=>{
    
        let testSearch: string = "search";
    
        let r = await getData(testSearch);
    
        expect(r.length).toBe(4);
        expect(r[1].Title).toBe("Avatar");
    });

    test("should reject and return empty array", async()=> {

        let testSearch: string = "";

        let r: IMovie[];

        try {
            r = await getData(testSearch);
        } 
        catch (reject: any) {
            expect(reject.length).toBe(0);
            expect(reject).toEqual([]);
        }
    });
})