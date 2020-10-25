// VERI TABANI COUNSTRUCTOR
function Storage(){

}
// newFilmi localStorage ekleme islemi
Storage.prototype.addFilmToStorage =function(newFilm){ 
    
    let films =this.getFilmsFromStorage();
    films.push(newFilm); //daha sonra array degerine yeni alinan film degerini ekliycez

    // ve daha sonra bunlari localStorage arrayine  string halindeatama yapariz
    localStorage.setItem('films',JSON.stringify(films)); 
} 
// burda bu degeri surekli kullanacagimiz icin fonkisyona cevirecez
Storage.prototype.getFilmsFromStorage =function(){
    let films;
    if(localStorage.getItem('films') === null){
        films = [];
    }
    else{
        // not: localStorage sadece string degerler aldigindan oncelikle degerleri PARS edilir
        // not2: daha sonra bunlari array tipine donustmeliyiz
        films =JSON.parse(localStorage.getItem('films'));
    }
    return films; //daha sonra bu arrayi doneriz
}
// filmi localStorage ten kaldirma islemi
// bunu filmin ismine gore yapicaz
Storage.prototype.deleteFilmFromStorage =function(filmTitle){

    // burda filmi storage tan silecegiz
    let films =this.getFilmsFromStorage();
    films.forEach(function(film,index){// neden index cunku film ler obje(element) halinde array kadolunur
        if(film.title === filmTitle){
            films.splice(index,1); // objenin bulundugu indexte objeyi silecek
        }
    });
    // local storage son degisikikleri gondericez
    localStorage.setItem('films',JSON.stringify(films)); 
    
}
// tum Filmleri veritabanin dan silme islemi
Storage.prototype.clearAllFilmsFromStorage =function(){
    localStorage.removeItem('films');
}