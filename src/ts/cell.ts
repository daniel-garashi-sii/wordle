export class Cell {
    constructor(public status: "empty" | "wrong" | "exists" | "exact",
                public content: string) {
        this.status = status;
        this.content = content;
    }
}