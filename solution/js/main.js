/*********************************************************************************
*  WEB422 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Jihun Yu Student ID: 107890220 Date: Feb-07-2024
*  Cyclic Link: https://strange-goat-capris.cyclic.app/
*
********************************************************************************/ 
// assign appropriate base URL for both dev and deployed version
const apiUrlBase = window.location.origin.includes('localhost')
? 'http://localhost:3000'
: 'https://strange-goat-capris.cyclic.app/';
console.log(`apiurlbase: ${apiUrlBase}`);

let page = 1;
const perPage = 8;





// async function loadCompanyData(name = null) {
//   const paginationClass = document.querySelector('.pagination');
//   let apiUrl = `https://strange-goat-capris.cyclic.app/api/companies?page=${page}&perPage=${perPage}`

//   console.log("loading...");

//   if(name) {
//     apiUrl += `&name=${encodeURIComponent(name)}`;
//     paginationClass.classList.add("d-none");
//   } else {
//     paginationClass.classList.remove("d-none");
//   }

//   try {
//     const response = await fetch(apiUrl);

//     if(!response.ok) {
//       throw new Error("Fetch failed!");
//     }

//     const companies = await response.json(); 
//     companyObjectToTableRowTemplate (companies)   
//   } catch (err) {
//     console.error(`Could not fetch: ${err}`);
//   }
// }

// function companyObjectToTableRowTemplate(companies) {
//   console.log("Updating...");
//   const tableBody = document.querySelector('#companiesTable tbody');
//   tableBody.innerHTML = '';

//   companies.forEach(company => {
//     const tags = company.tag_list ? company.tag_list.split(',').map(tag => tag.trim()).filter((tag, index) => index < 2).join(', ') : '--';

//     const row = document.createElement('tr');
//     row.innerHTML = `
//       <td>${company.name}</td>
//       <td>${company.description || '--'}</td>
//       <td>${company.number_of_employees || '--'}</td>
//       <td>${company.offices && company.offices.length > 0 ? `${company.offices[0].city}, ${company.offices[0].country}` : '--'}</td>
//       <td>${company.category_code || '--'}</td>
//       <td>${company.founded_year ? `${company.founded_month}/${company.founded_day}/${company.founded_year}` : '--'}</td>
//       <td><a href="${company.homepage_url || '#'}" target="_blank">${company.homepage_url || 'No Website'}</a></td>
//       <td>${tags}</td>
//     `;
//     tableBody.appendChild(row);
//   });
// }

// async function searchByName() {
//   try {
//     const companyName = document.getElementById('searchInput').value.toLowerCase();
    
//     console.log(companyName); 
//     const response = await fetch(`https://energetic-sundress-deer.cyclic.app/api/companies?page=${page}&perPage=${perPage}&name${companyName}`)
    
//     if(response.ok) {
//       throw new Error('could not fetch');
//     }else {
//       const data = await response.json();
//       companyObjectToTableRowTemplate(data);      
//     }

//   } catch (err) {
//     console.error(err);
//   }
// }

// console.log("Inside main.js")
// loadCompanyData();