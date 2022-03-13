let main = document.querySelector('.main');
let searchBtn = document.querySelector('.searchBtn');
let searchInput = document.querySelector('.searchInput');
let footer = document.querySelector('.ftr');
let filters = document.querySelector('.filters');
let hdr = document.querySelector('.hdr');


function createCard(arr){

    let section = document.createElement('section');
    section.className = "card";
    let image = document.createElement('img');


    image.src=arr.picture.medium;
    
   

    let name = document.createElement('p');
    name.textContent = `${arr.name.title} ${arr.name.first} ${arr.name.last}`;
    let mail = document.createElement('p');
    mail.textContent = arr.email;
    mail.className = "mail";
    let join = document.createElement('p');
    join.textContent = `Joined at ${arr.registered.date}`;

    section.appendChild(image);
    section.appendChild(name);
    section.appendChild(mail);
    section.appendChild(join);

    main.appendChild(section);


}


function populateCards(arr){

    let section = document.querySelector('main');

    section.innerHTML='';
    arr.forEach(e =>{

        createCard(e);


    })



}


function pagination(arr, perPagina, pagina){

    

    let  vec=[];

    for(let i=(pagina-1)*perPagina;i<perPagina*pagina;i++){

        
        vec.push(arr[i]);
    }

    return vec;
}

function populateCardsPagination(arr, nrPagina){
    if(window.innerWidth < 720){
        let  elements = pagination(arr, 4, nrPagina);


        populateCards(elements);
        createButtons(Math.ceil(arr.length/4));



        
    }else if(window.innerWidth < 1024){
        let med = pagination(arr, 6, nrPagina);
      
        populateCards(med);
        createButtons(Math.ceil(arr.length/6));
        

        
      
        
    }else{
        let max = pagination(arr, 12, nrPagina);
       
        populateCards(max);
        createButtons(Math.ceil(arr.length/12));
        
        
    }

}

populateCardsPagination(data, 1);


window.addEventListener('resize',()=>{

   
    populateCardsPagination(data, 1);

})

//todo functie create buttons  primeste ca parametru un numar si ataseaza pe pagina butoane

function createButtons(number){

    let ftr = document.querySelector('.ftr');

    ftr.innerHTML="";

    for(let i = 1; i<=number; i++){
        let btn = document.createElement('button');
        btn.textContent = `${i}`;
        btn.value = `${i}`;
        ftr.appendChild(btn);
    }

}

footer.addEventListener('click', (e)=>{

    let el = e.target;
    let nr = el.textContent;

    populateCardsPagination(data, nr);

})







//SEARCH 

searchBtn.addEventListener('click', ()=>{

    let val = searchInput.value;
    
    let vector = searchByName(data, val);

    populateCards(vector);
    searchInput.value = "";


})

function searchByName(arr, value){

    let vec = [];
    
    for(let i = 0; i<arr.length; i++){

        if(value == arr[i].name.first || value == arr[i].name.last){

            vec.push(arr[i]);

        }
    }

    return vec;

}




function sortByName(arr){

    for(let i=0; i<arr.length; i++){

        for(let j=i+1; j<arr.length; j++){

            if(arr[i].name.last>arr[j].name.last){


                let aux = arr[i];
                arr[i] = arr[j];
                arr[j] = aux;
            }

        }
    }
}

function sortByJoinDate(arr){

    for(let i=0; i<arr.length; i++){

        for(let j=i+1; j<arr.length; j++){

            if(arr[i].registered.date>arr[j].registered.date){


                let aux = arr[i];
                arr[i] = arr[j];
                arr[j] = aux;
            }

        }
    }
}






//SORT

filters.addEventListener('change', (e)=>{

    

     console.log(filters.value);
   
    if(filters.value == "name"){

        console.log('sal');
              sortByName(data);

        populateCardsPagination(data, 1);

    }
    if(filters.value == "all"){

        sortByJoinDate(data);
        populateCardsPagination(data, 1);
    }
        
    

})


