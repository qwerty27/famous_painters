/// <reference path="jquery.d.ts" />
/// <reference path="painting.ts"/>
/// <reference path="interfaces.ts"/>

class Artist implements IArtist {
    name: string;
    style: string;
    birthplace: string;
    nationality: string;
    birthdate: string;
    examples: IPainting[];

    constructor(artist: IArtist) {
        this.name = artist.name;
        this.style = artist.style;
        this.birthplace = artist.birthplace;
        this.nationality = artist.nationality;
        this.birthdate = artist.birthdate;
        this.examples = artist.examples;
    }

    static mapFromJson(url: string): JQueryPromise<IArtist[]> {

        return $.getJSON(url).then((data: any) => {
            if (data) {

                var artists: IArtist[] = [];
                var artistsTemp: any[] = data.famousPainters;

                artistsTemp.forEach((a: any) => {

                    let artist = new Artist({
                        name: a.name,
                        style: a.style,
                        birthplace: a.birthplace,
                        nationality: a.nationality,
                        birthdate: a.birthdate,
                        examples: Painting.mapFromObject(a.examples)
                    });

                    artists.push(artist);
                });

                return artists;
            } else {
                return null;
            }
        });
    }

    static renderAsDropDown(artists: IArtist[]): void {
        var dropDown = (<HTMLSelectElement>document.getElementById('artists'));
        var html = '';

        for (var i = 0, len = artists.length; i < len; i++) {
            html += '<option>' + artists[i].name + '</option>';
        }

        dropDown.innerHTML = html;
    }

    static renderAsInformation(artist: IArtist): void {
        var div = (<HTMLSelectElement>document.getElementById('information'));
        var html = '';

        html = "<p><span>name: " + artist.name + "</span></p>";
        html += "<p><span>style: " + artist.style + "</span></p>";
        html += "<p><span>birthplace: " + artist.birthplace + "</span></p>";
        html += "<p><span>nationality: " + artist.nationality + "</span></p>";
        html += "<p><span>birthdate: " + artist.birthdate + "</span></p>";
        html += "<p><span>examples:</span></p>";

        html += Painting.renderAsInformation(artist.examples);

        div.innerHTML = html;
    }

    //[todo] spostare per rendere accessibile da + punti
    renderError() {
        var artistInformation = (<HTMLSelectElement>document.getElementById('ArtistInformation'));
        artistInformation.value = 'Unable to load data!';
    }
}