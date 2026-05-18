export interface Verse {
    number: string;
    text: string;
}

export interface Chapter {
    title: string;
    verses: Verse[];
}