


/*                1- get elments to html                   */
let ritle  = document.getElementById('ritle');
let price  = document.getElementById('price');
let taxes  = document.getElementById('taxes');
let ads  = document.getElementById('ads');
let discount  = document.getElementById('discount');
let total  = document.getElementById('total');
let count  = document.getElementById('count');
let category  = document.getElementById('category');
let submit  = document.getElementById('submit');
let  mood = 'create'
let temp ;

// console.log(category,ritle,price,taxes,ads,discount,total,count , submit )
/*           2- get total                        */
function getTotal()
{
  if(price.value != ""){
    let result = (+price.value + +taxes.value + +ads.value )
     - +discount.value ;
     total.innerHTML = result ;
     total.style.backgroundColor = "#040"
  }else{
    total.innerHTML = "";
    total.style.backgroundColor = "#a00d02"
  }
};
/*           3- create product                      */
let dataPro;
if(localStorage.data != null){
  dataPro = JSON.parse(localStorage.data)
}else{
  dataPro = []
}

submit.onclick = function (){
  let newPro = {
    ritle:ritle.value.toLowerCase(),
    price:price.value,
    taxes:taxes.value,
    ads: ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),
  }
  if(ritle.value != "" && price.value != ""){
   if(mood === 'create'){
   if (newPro.count > 1){
    for(let i = 0 ; i < newPro.count;i++){
      dataPro.push(newPro);
    }
  }else{
    dataPro.push(newPro)
  }
}else{
  dataPro[temp] = newPro;
  mood = 'create';
  submit.innerHTML = "create";
  count.style.display="block";
}
  
  }

  // dataPro.push(newPro)
  localStorage.setItem('data', JSON.stringify(dataPro) )
 clearData()
 showData()
 
}
/*           4- cleardata                     */
function clearData(){
  ritle.value = "" ;
  price.value = "" ;
  taxes.value = "" ;
  ads.value = "" ;
  discount.value = "" ;
  total.innerHTML = "" ;
  count.value = "" ;
  category.value = "" ;
}
/*           5- read                  */
function showData(){
let table = "";
for(let i = 0 ; i <dataPro.length ; i++ ){
  table += `
  <tr>
  <td>${i+1}</td>
      <td>${dataPro[i].ritle}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
     <td>${dataPro[i].discount}</td>
      <td>${dataPro[i].total}</td>
      <td>${dataPro[i].count}</td>
      <td>${dataPro[i].category}</td>
     <td><button onclick="updateData (${i})" id="update">update</button></td>
      <td><button onclick="deletData (${i})" id="delete">delete</button></td>
</tr>
  
  `
  getTotal()
}
document.getElementById('tbody').innerHTML = table
let btnDelete= document.getElementById('deletAll');
if(dataPro.length > 0){
  btnDelete.innerHTML= `
  <button onclick="deleteAll()">delete All (${dataPro.length})</button>
`

}else{
  btnDelete.innerHTML= ""
}
}
showData()
/*           6- deletData                  */

function deletData (i){
  dataPro.splice(i,1);
  localStorage.data = JSON.stringify(dataPro)
  showData()
}
function deleteAll(){
  localStorage.clear();
  dataPro.splice(0);
  showData()
}
/*         -7 update                          */
function updateData (i){
  price.value = dataPro[i].price;
  ritle.value = dataPro[i].ritle;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  document.value = dataPro[i].discount;
  getTotal();
  count.style.display="none";
  category.value = dataPro[i].category;
  submit.innerHTML = "UPDATE";
mood = 'update'
temp=i;
scroll({
  top: 0,
 behavior : 'smooth',
 
})

}

/*         7- search                          */
let searchMood = "title";
function getSearchMood(id){
  let search =document.getElementById("search")
  if (id === "searchTitle"){
    searchMood = "title";
    search.placeholder = "search by title";
  }else{
    searchMood = "category";
    search.placeholder = "search by category";
  }
  search.focus()
  search.value = "";
  showData()
  }
  function searchData(value){
    let  table ="";
  if( searchMood == "title"){
    for(let i = 0 ; i < dataPro.length ; i++){
      if(dataPro[i].ritle.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i}</td>
            <td>${dataPro[i].ritle}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
           <td><button onclick="updateData (${i})" id="update">update</button></td>
            <td><button onclick="deletData (${i})" id="delete">delete</button></td>
      </tr>
        
        `
      }
    }
  } else{




    for(let i = 0 ; i < dataPro.length ; i++){
      if(dataPro[i].category.includes(value.toLowerCase())){
        table += `
        <tr>
        <td>${i}</td>
            <td>${dataPro[i].ritle}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
           <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].count}</td>
            <td>${dataPro[i].category}</td>
           <td><button onclick="updateData (${i})" id="update">update</button></td>
            <td><button onclick="deletData (${i})" id="delete">delete</button></td>
      </tr>
        
        `
      }
    }



  } 
  document.getElementById('tbody').innerHTML = table  ;
  };
  
