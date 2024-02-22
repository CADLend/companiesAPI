/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Jihun Yu   Student ID: 107890220 Date: Feb-07-2024
*  Cyclic Link: https://strange-goat-capris.cyclic.app/
*
********************************************************************************/ 
// assign appropriate base URL for both dev and deployed version
const apiUrlBase = window.location.origin.includes('localhost')
? 'http://localhost:3000/'
: 'https://strange-goat-capris.cyclic.app/';
console.log(`apiurlbase: ${apiUrlBase}`);

let page = 1;
const perPage = 8;

async function testBtn() {
    try{
      const response = await fetch(`${apiUrlBase}api/company/65d34af496c1307637d52209`);

    if(!response.ok){
      throw new Error("fetch went wrong!");
    }
    const data = await response.json();

    console.log(data._id);

    document.getElementById('testP').textContent = data.name;
  }
  catch(err){
    console.log(err);
  }
}


async function loadCompanyData(name = null) {
  const paginationClass = document.querySelector('.pagination');
  let apiUrl = `${apiUrlBase}api/companies?page=${page}&perPage=${perPage}`

  if(name) {
    apiUrl += `&name=${encodeURIComponent(name)}`;
    paginationClass.classList.add("d-none");
  } else {
    paginationClass.classList.remove("d-none");
  }

  try {
    const response = await fetch(apiUrl);

    if(!response.ok) {
      throw new Error("Fetch failed!");
    }

    const companies = await response.json(); 
    companyObjectToTableRowTemplate (companies)   
  } catch (err) {
    console.error(`Could not fetch: ${err}`);
  }
}

function companyObjectToTableRowTemplate(companies) {
  console.log("Updating...");
  const tableBody = document.querySelector('#companiesTable tbody');
  tableBody.innerHTML = '';

  companies.forEach(company => {
    const tags = company.tag_list ? company.tag_list.split(',').map(tag => tag.trim()).filter((tag, index) => index < 2).join(', ') : '--';

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="name">${company.name}</td>
      <td class="description">${company.description || '--'}</td>
      <td class="employees">${company.number_of_employees || '--'}</td>
      <td class="offices">${company.offices && company.offices.length > 0 ? `${company.offices[0].city}, ${company.offices[0].country}` : '--'}</td>
      <td class="category">${company.category_code || '--'}</td>
      <td class="founded">${company.founded_year ? `${company.founded_month}/${company.founded_day}/${company.founded_year}` : '--'}</td>
      <td class="homepage"><a href="${company.homepage_url || '#'}" target="_blank">${company.homepage_url || 'No Website'}</a></td>
      <td class="tags">${tags}</td>
    `;
    row.addEventListener('click', (data) => {
      {
        try {
          const productsList = company.products && company.products.length > 0
              ? company.products.map(product => `• ${product.name}`).join('<br />')
              : 'N/A';
          myModalObj = document.getElementById('detailsModal');
          const myModal = new bootstrap.Modal(myModalObj);

          myModalObj.querySelector('.modal-title').innerText = data.currentTarget.querySelector('.name').innerText;
          myModalObj.querySelector('.modal-body').innerHTML = `
          <strong>Category: </strong>${data.currentTarget.querySelector('.category').innerText}<br /><br />
          <strong>Description: </strong>${data.currentTarget.querySelector('.description').innerText}<br /><br />
          <strong>Overview: </strong> ${company.overview}
          <strong>Tag List: </strong> ${data.currentTarget.querySelector('.tags').innerText}
          <strong>Founded: </strong>Mon Dec 10 2012<br /><br />
          <strong>CEOs: </strong> ${company.relationships[0] ? company.relationships[0].person.first_name + ' ' + company.relationships[0].person.last_name + ' (' + company.relationships[0].title + ')' : 'N/A'}<br /><br />
          <strong>Products:</strong> 
          ${productsList}<br />
          <strong>Number of Employees:</strong>${data.currentTarget.querySelector('.employees').innerText}<br /><br />
          <strong>Website:</strong>${data.currentTarget.querySelector('.homepage').innerText}<br /><br />
          `
          myModal.show();
        }
        catch(err) {
          console.log(err);
        }
      }
    });
    tableBody.appendChild(row);

  });
}


// Populates the modal based on passed 'company' row
async function searchByName() {
  try {
    const companyName = document.getElementById('searchInput').value.toLowerCase();
    
    console.log(companyName); 
    const response = await fetch(`${apiUrlBase}api/companies?page=${page}&perPage=${perPage}&name${companyName}`)
    
    if(!response.ok) {
      throw new Error('could not fetch');
    }else {
      const data = await response.json();
      console.log(data.name);
      companyObjectToTableRowTemplate(data);      
    }

  } catch (err) {
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', loadCompanyData);