interface IArtist {
    name: string;
    style: string;
    birthplace: string;
    nationality: string;
    birthdate: string;
    examples: IPainting[];
}

interface IPainting {
    name: string;
    year: string;
    url: string;
}