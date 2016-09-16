/// <reference path="jquery.d.ts" />
/// <reference path="interfaces.ts"/>

class Painting implements IPainting {
    name: string;
    year: string;
    url: string;

    constructor(painting: IPainting) {
        this.name = painting.name;
        this.year = painting.year;
        this.url = painting.url;
    }

    static mapFromObject(data: any[]): IPainting[] {

        var paintings: IPainting[] = [];

        data.forEach((p: any) => {
            let painting = new Painting({
                name: p.name,
                year: p.year,
                url: p.url
            });

            paintings.push(painting);
        });

        return paintings;
    }

    static renderAsInformation(paintings: IPainting[]): string {

        let html: string = '';
        html = "<div class=\"row\">";

        paintings.forEach((p: IPainting) => {
            html += "<div class=\"col-md-4\"><div class=\"thumbnail\">";
            html += "<img src=\"" + p.url + "\" alt=\"...\">";
            html += "<div class=\"caption\">";
            html += "<h3>name: " + p.name + "</h3>";
            html += "<p><span>year: " + p.year + "</span></p>";
            
            html += "</div></div></div>";
        });

        html += "</div>";

        return html;
    }
}