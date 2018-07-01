
const exchangeAPIUrlBase = 'https://free.currencyconverterapi.com/api/v5/convert?q=';
(function() {
  'use strict';

  

 

  

  document.getElementById('convert').addEventListener('click', function() {
    getCurrency();
  });

  

  
 

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('/service-worker.js')
     .then(function() { 
        console.log('Service Worker Registered'); 
      });
  }
  
 
})();

async function getCurrency()
{
  document.querySelector("#warning").style.display="none";
  document.querySelector("#danger").style.display="none";
  let cur1=document.querySelector("#CURR_FR").value;
  let cur2= document.querySelector("#CURR_TO").value;
  let request=`${exchangeAPIUrlBase}${cur1}_${cur2}&compact=ultra`;
  // console.log(request);
await fetch(request)
.then(response=>{
 
  response.json().then(function(data) {
   // console.log(data);
    for ( n in data){
  
    }
        console.log("exchange", data[n]);
        
        document.querySelector("#CURR_VAL").value = data[n]*document.querySelector("#CURR_FR_VAL").value ;
        if (!('indexedDB' in window)) {
          console.log('This browser doesn\'t support IndexedDB');
          return;
        }
        var indexedDB = window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        var dbPromise = indexedDB.open('exchange', 1,function(upgradeDb) {
          if (!upgradeDb.objectStoreNames.contains( 'currency')) {
            upgradeDb.createObjectStore( 'currency');
          }
        });
        dbPromise.onerror = function(event) {
          console.log("error: DBINDEXED PROBLEM");
       };
       dbPromise.onupgradeneeded = function(event) { 
        var db = event.target.result;
      
        // Crée un objet de stockage pour cette base de données
        var objectStore = db.createObjectStore("currency",{ keyPath: 'curr' });
      };
       

        dbPromise.onsuccess = function(event) {

        
        var db = dbPromise.result;
       
        console.log('Got a db connection! WRITE It is %s', db);
        
        
        // Now, INSIDE THE BLOCK OF THIS FUNCTION ONLY, do something:
        var myTransaction = db.transaction(['currency'],'readwrite');
        var store = myTransaction.objectStore('currency');
        for (let n in data){
  
        }
       console.log(`{"curr":${n} , value:${data[n]}}`);
        store.add({curr: n, value: data[n]});

        }


      });

      
})
.catch(err=> {console.error(`sorry ${err} CONNEXION ERROR`);

var indexedDB = window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
var dbPromise = indexedDB.open('exchange', 1,function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains( 'currency')) {
    upgradeDb.createObjectStore( 'currency');
  }
});
dbPromise.onerror = function(event) {
  // i test this code with edge + chrome + firefox and only work with chrome i didn't want to use any framework like localforage :(
  console.log("error: INDEXEDDB PRB");
};
dbPromise.onupgradeneeded = function(event) { 
var db = event.target.result;

// Crée un objet de stockage pour cette base de données
var objectStore = db.createObjectStore("currency",{autoIncrement: true});
};


dbPromise.onsuccess = function(event) {


var db = dbPromise.result;

console.log('Got a db connection READ! It is %s', db);


// Now, INSIDE THE BLOCK OF THIS FUNCTION ONLY, do something:
var myTransaction = db.transaction(['currency'],'readwrite');
var store = myTransaction.objectStore('currency');


var test=store.get(`${cur1}_${cur2}`);
test.onsuccess = function() {
  //Affiche le succès de la requête
  console.log('Enregistrement retrouvé');

  //affecte la valeur de l'enregistrement à la variable
  var myRecord = test.result;
  console.log('test'+myRecord);
  if(myRecord!=null){
  for ( n in myRecord){
  
  }
      console.log("exchange", myRecord[n]);
      
      document.querySelector("#CURR_VAL").value = myRecord[n]*document.querySelector("#CURR_FR_VAL").value ;
  console.log(myRecord);
  document.querySelector("#warning").style.display="block";
}
else
{
  document.querySelector("#danger").style.display="block";
}
};
test.onerror=function()
{document.querySelector("#danger").style.display="block";}

   
};
});

}

