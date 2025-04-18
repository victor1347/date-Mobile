let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mood = 'create';
let tmp;

function getTotal() {
  if (price.value !== '') {
    let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
  } else {
    total.innerHTML = '';
    total.style.background = '#a00';
  }
}

let dataPro = localStorage.product ? JSON.parse(localStorage.product) : [];

submit.onclick = function () {
  let totalValue = (+price.value + +taxes.value + +ads.value) - +discount.value;

  let newPro = {
    title: title.value.trim(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: totalValue,
    count: count.value,
    category: category.value.trim(),
  };

  let countValue = parseInt(newPro.count);

  if (mood === 'create') {
    if (countValue > 1 && countValue <= 100) {
      for (let i = 0; i < countValue; i++) {
        dataPro.push({ ...newPro });
      }
    } else {
      dataPro.push({ ...newPro });
    }
  } else {
    dataPro[tmp] = { ...newPro };
    mood = 'create';
    submit.innerHTML = 'Create';
  }

  localStorage.setItem('product', JSON.stringify(dataPro));
  clearData();
  showData();
};

function clearData() {
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

function showData() {
  let table = '';
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
        <td>${i + 1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})">Update</button></td>
        <td><button onclick="deleteData(${i})">Delete</button></td>
      </tr>
    `;
  }

  document.getElementById('tbody').innerHTML = table;

  let deleteAllBtn = document.getElementById('deleteAll');
  if (dataPro.length > 0) {
    deleteAllBtn.innerHTML = `<button onclick="deleteAll()">Delete All (${dataPro.length})</button>`;
  } else {
    deleteAllBtn.innerHTML = '';
  }
}

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.setItem('product', JSON.stringify(dataPro));
  showData();
}

function deleteAll() {
  localStorage.clear();
  dataPro = [];
  showData();
}

function updateData(i) {
  let pro = dataPro[i];
  title.value = pro.title;
  price.value = pro.price;
  taxes.value = pro.taxes;
  ads.value = pro.ads;
  discount.value = pro.discount;
  count.value = pro.count;
  category.value = pro.category;
  getTotal();
  mood = 'update';
  tmp = i;
  submit.innerHTML = 'Update';
  scroll({
    top: 0,
    behavior: 'smooth'
  });
}

showData();