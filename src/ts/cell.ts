export class Cell {
    constructor(private status: "empty" | "wrong" | "exists" | "exact",
                private content: string) {
    }

    get getContent(): string {
        return this.content;
    }

    set setContent(value: string) {
        this.content = value;
    }

    get getStatus(): "empty" | "wrong" | "exists" | "exact" {
        return this.status;
    }

    set setStatus(value: "empty" | "wrong" | "exists" | "exact") {
        this.status = value;
    }
}