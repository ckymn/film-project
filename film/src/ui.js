
// UI(ARAYUZ) COUNSTURCTOR
function UI(){
     
}
// filmleri arayuze ekleme
UI.prototype.addFilmToUI =function(newFilm){

    /*<tr>
        <td><img src="" class="img-fluid img-thumbnail"></td>
        <td></td>
        <td></td>
        <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
    </tr>*/

    const filmList =document.querySelector('#films');
    
    // burda tbody icine tr leri ekliycez
    filmList.innerHTML +=`
        <tr>
            <td><img src="${newFilm.url}" class="img-fluid img-thumbnail"></td>
            <td>${newFilm.title}</td>
            <td>${newFilm.director}</td>
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
        </tr>

    `; //buna template litereal yeni ES6+ ozellikleri
}
// aratilan inputlari temizleme islemi
UI.prototype.clearInputs =function(el1,el2,el3){
    el1.value = "";
    el2.value = "";
    el3.value = "";
}
// alert
UI.prototype.displayMessage = function(mesajNe,type){ //succes or danger
    const cardBody =document.querySelectorAll('.card-body')[0];
    // Alert olustur
    const div =document.createElement('div');
    div.className =`alert alert-${type}`;
    div.textContent =mesajNe;
    // olusan cocugu card-body ekleme
    cardBody.appendChild(div);
    // 1 saniye sonra uyari kaybolsun
    setTimeout(function(){
        div.remove();   
    },1000);
}
// local storage
UI.prototype.loadAllFilms =function(LSFilmAll){
    // aldigimiz filmleri buraya yerlestircez
    const filmList =document.querySelector('#films');
    
    // tum filmler uzerinde gezinip ekleme yapicaz innerHTML ile
    LSFilmAll.forEach(function(element) {
        filmList.innerHTML +=`
        <tr>
            <td><img src="${element.url}" class="img-fluid img-thumbnail"></td>
            <td>${element.taitle}</td>
            <td>${element.director}</td>
            <td><a href="#" id = "delete-film" class = "btn btn-danger">Filmi Sil</a></td>
        </tr>

    `;

    });
}
// arayuzden silme islemi
UI.prototype.deleteFilmFromUI = function(element){
    element.parentElement.parentElement.remove(); //burda a etiketinin en ust parent ulastik ve kaldirdik 
}
// filmlerin tumunu kaldirma islemleri
UI.prototype.clearAllFilmsFromUI =function(){
    // oncelikle film listesini secmemiz gerekecek
    const filmList =document.querySelector('#films');

    // filmsList.innerHTML =""; diyebiliriz ama bu yavas calisan bir yontem
    while(filmList.firstElementChild !== null){ //child oldugu surece
        filmList.firstElementChild.remove();
    }
}