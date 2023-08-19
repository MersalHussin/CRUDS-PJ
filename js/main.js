let title =document.getElementById("title")
let price =document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let search = document.getElementById("search")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")

let mood = "Create"
//هستخدمه في أني أقدر اتحكم في المتغير i بتاع اللوب والفانكشن
let tmp;


// Get total

function getTotal(){
    if(price.value !=""){
        let result = (+price.value + +ads.value + +taxes.value) - +discount.value
        total.textContent =result
        total.style.backgroundColor = "Green"
    }
}



// Create Product

// Save To Local Storage
let dataPro ;

if(localStorage.product != null ){
    dataPro =  JSON.parse(localStorage.product)
}else{
    dataPro = []
}

submit.onclick = function(){
    if (title.value.trim() === '') {
        return;
      }
    let newObj = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }    

    if(mood ==="Create"){
        
        // count
    if(newObj.count > 1){
        for(let i = 0 ;i< newObj.count;i++){
            dataPro.push(newObj)
        }
    }else{
        dataPro.push(newObj)
    }
}else{
    dataPro[  tmp  ] = newObj;
    mood = "Create"
    submit.innerHTML = "Create"
    count.style.display = "block"

}
    window.localStorage.setItem("product",JSON.stringify(dataPro))
    //clear date
    clearDate()
    showDate()
}

// clear after create

function clearDate(){
    title.value = "";
    price.value = "";
    taxes.value = "";
    ads.value = "";
    discount.value = "";
    total.innerHTML = "";
    count.value = "";
    category.value = "";
}
showDate()


// read
function showDate(){
    
    getTotal();
    let table = "";

    for(let i = 0 ; i < dataPro.length;i++){
     table += 
     `
     <tr>
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick ="updateDate(${i}),getTotal()">Update</button></td>
                    <td><button onclick="deleteDate(${i})">Delete</button></td>
                </tr>
    `;
    }
    
    document.getElementById("tbody").innerHTML  = table
    //تبع clean Date
    let btnDelete  = document.getElementById("Delete-All")
    if(dataPro.length > 0){
        btnDelete.innerHTML =  `<button "id" = "delete" onclick = "confirmDelete()">Delete All (${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML = ""
    }
}
// clean date

function confirmDelete() {
    // عرض مربع الحوار
    const confirmation = confirm("Do you want delete all products");
  
    // التحقق من الاختيار المرتبط بمربع الحوار
    if (confirmation) {
      deleteAll();
    }
  }
  
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showDate()
}


//delete
function deleteDate(i){
 dataPro.splice(i,1)
 localStorage.product = JSON.stringify(dataPro) // بتحدث بيانات الداتا من اللوكل ستورج
 showDate()
}
date = [1,2,22,33,44,5,6,7,8,9,99]
console.log(date.splice(0,1))

// update
function updateDate(i){
 title.value = dataPro[i].title
 price.value = dataPro[i].price
 taxes.value = dataPro[i].taxes
 ads.value = dataPro[i].ads
 discount.value = dataPro[i].discount
 category.value = dataPro[i].category
 getTotal()
 count.style.display= "none"
 submit.innerHTML = "Update"
 mood = "update"

 tmp = i;

 scroll({
    top:0,
    behavior:"smooth",
 })
}

// search

let searchMood = "title"

function getSearchMood(id){

    let search = document.getElementById("search")
    
    if(id === "searchTitle"){
        searchMood = "Title"
    }else{
        searchMood = "Category"
    }
    search.placeholder = `Search By ${searchMood}`
search.focus()
search.value = ""
showDate()
}

function searchDate(value){

    let table = '';

if(searchMood == "title"){
    
    for(let i = 0 ; i< dataPro.length; i++){

        if(dataPro[i].title.includes(value.toLowerCase())){
            table += 
            `
            <tr>
                           <td>${i+1}</td>
                           <td>${dataPro[i].title}</td>
                           <td>${dataPro[i].price}</td>
                           <td>${dataPro[i].taxes}</td>
                           <td>${dataPro[i].ads}</td>
                           <td>${dataPro[i].discount}</td>
                           <td>${dataPro[i].total}</td>
                           <td>${dataPro[i].category}</td>
                           <td><button onclick ="updateDate(${i}),getTotal()">Update</button></td>
                           <td><button onclick="deleteDate(${i})">Delete</button></td>
                       </tr>
           `;
        }
        
    }

}else{
    for(let i = 0 ; i< dataPro.length; i++){

        if(dataPro[i].category.includes(value.toLowerCase())){
            table += 
            `
            <tr>
                           <td>${i+1}</td>
                           <td>${dataPro[i].title}</td>
                           <td>${dataPro[i].price}</td>
                           <td>${dataPro[i].taxes}</td>
                           <td>${dataPro[i].ads}</td>
                           <td>${dataPro[i].discount}</td>
                           <td>${dataPro[i].total}</td>
                           <td>${dataPro[i].category}</td>
                           <td><button onclick ="updateDate(${i}),getTotal()">Update</button></td>
                           <td><button onclick="deleteDate(${i})">Delete</button></td>
                       </tr>
           `;
        }
        
    }
}

document.getElementById("tbody").innerHTML  = table
}

const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  const isDarkMode = localStorage.getItem('darkMode');

  if (isDarkMode === 'true') {
  body.classList.add('light-mode');
  themeToggle.innerHTML = `<img src="images/moon.png" alt="Dark Mood">`;
  }
// إضافة حدث النقر لزر التبديل
themeToggle.addEventListener('click', function() {
  // تبديل الفئة 'dark-mode' على العنصر body
  body.classList.toggle('light-mode');


  if (body.classList.contains('light-mode')) {
    themeToggle.innerHTML = `<img src="images/moon.png" alt="Dark Mood">`;
    localStorage.setItem('darkMode', 'true');

  } else {
    themeToggle.innerHTML =`<img src="images/sun.png" alt="Light Mood">`
    localStorage.setItem('darkMode', 'false');

  }

});