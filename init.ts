/// <reference path="interfaces.ts"/>
/// <reference path="artist.ts"/>

class Bootstrapper {

    artists: IArtist[];

    init() {
        let dropDown = (<HTMLSelectElement>document.getElementById('artists'));

        dropDown.onchange = () => {
            try {
                let artist: IArtist = this.artists
                    //Find selected item by name
                    .filter(item => item.name === dropDown.value)
                    //return the item
                    .reduce(item => {
                        var a = new Artist({
                            name: dropDown.value,
                            style: item.style,
                            birthplace: item.birthplace,
                            nationality: item.nationality,
                            birthdate: item.birthdate,
                            examples: item.examples
                        });

                        return a;
                    });

                Artist.renderAsInformation(artist);
            }
            catch (ex) { alert(ex.message) }
        }

        Artist.mapFromJson("/famousPainters.json").then((artists: IArtist[]) => {
            this.artists = artists;
            if (this.artists && this.artists.length > 0) {
                Artist.renderAsDropDown(this.artists)
                Artist.renderAsInformation(this.artists[0]);
            }
        });
    }
}

window.onload = () => {
    var bootstrapper = new Bootstrapper();
    bootstrapper.init();
};
//# sourceMappingURL=js/compiled/typescript/init.js.map