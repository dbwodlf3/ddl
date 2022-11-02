# What is this
When make some client side application with jabascripts, it is creepy to make
some api test and make something something something..

So this is for it.

I would like to go home.

# Quick Start
```ts

interface BoardData {
    title: string;
    writer: string;
    date: string;
    data: any;
}

export class BoardData extends DefaultLayer {
    static type = "query";
    static method = "get";
    static url = "/board-api/getContent"

    static getData(params: {id: number}){
        return super.getData(params) as Promise<BoardData>
    }
}
```
