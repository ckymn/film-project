// SELECTOR
const form =document.getElementById('film-form');
const titleElement =document.querySelector('#title');
const directorElement =document.querySelector('#director');
const urlElement =document.querySelector('#url');
const cardBody =document.querySelectorAll('.card-body')[1];
const clear =document.querySelector('#clear-films');

// UI OBJECT START
const ui =new UI();
// SOTRAGE  OBJECT START
const storage =new Storage();
// ALL EVENT CALL LOADING


eventListeners();

function eventListeners(){ 
    form.addEventListener("submit",addFilm);
    //sayfa yuklendiginde calisan event bununla ekledigimiz degerleri LS kalici hale getiricez
    document.addEventListener("DOMContentLoaded",function(){
        const LSFilmAl =storage.getFilmsFromStorage();
        ui.loadAllFilms(LSFilmAl); //arayze ekleme islemi
    });    
    cardBody.addEventListener('click',deleteFilm);
    clear.addEventListener('click',clearAllFilms);
}
// film ekleme islemi
function addFilm(e){
    // burda sectigimiz uc elementin degerini alicaz
    const title =titleElement.value;
    const director =directorElement.value;
    const url =urlElement.value;

    // uc inputun dolu-bos olma durumu
    if(title === "" || director === "" || url === ""){
        // hata
        ui.displayMessage('Tum Alanlari Doldurunuz..','danger');

    }
    else{
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // arayuze film ekleme
        storage.addFilmToStorage(newFilm); // storage olusturma    
        ui.displayMessage('Film Basariyla Eklendi...','success');// mesaji yayinlama
    }


    ui.clearInputs(titleElement,directorElement,urlElement);   

    // burdaki submiti onlemek icin
    e.preventDefault();
}
// film arayuzden silme
function deleteFilm(e){
    // burda event nerde olustuysa onu alacak == e.target kullanilacak
    // mesela click eventi ni filmsil butonuna goturduk taerget ile  burda oldugumuzu soyiycek
    // console.log(e.target); // resme basarsam img ,satria basarsam tr , sutuna basarsam th, linke basarsam a etiketi doner

    // not: eger biz FilmSil butonuna erisirsek aslinda title,director,img kaldirmak istiyoruz
    // bunu icin tum tr kismina ulasmaliyiz yani Parentini almaliyiz
    if(e.target.id === 'delete-film'){
        ui.deleteFilmFromUI(e.target); //arayuzden silme islemi yapicaz
        // burda ise a  elemntinden yola cikarak parenin kalrdeslini alicaz
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);//title ulasip icerigini aliriz ! 
        ui.displayMessage('Silme islemi Basarili...','success');
    }
}
// tum filmleri silme islemi
function clearAllFilms(e){
    if(confirm('Tum Filmler Silinecek! Emin misniz ?')){
        ui.clearAllFilmsFromUI(); //arayuzde   
        storage.clearAllFilmsFromStorage(); // veritabaninda
    }
    ui.displayMessage('Tum Filmleriniz Silindi...','danger')
}