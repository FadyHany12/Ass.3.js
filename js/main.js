//! GLOBAL VARIABLES
var siteNameInput = document.querySelector("#siteNameInput");
var siteUrlInput = document.querySelector("#siteUrlInput");
var submitBtn = document.querySelector("#submitBtn");
var siteNameInputValidation = document.querySelector("#siteNameInput");
var siteUrlInputValidation = document.querySelector("#siteUrlInput");

//! GLOBAL ARRAY
let sitesList = [];

//! CHECK LOCAL STORAGE
if (localStorage.getItem("allSites") !=null) 
{
    sitesList = JSON.parse(localStorage.getItem("allSites"));
    displaySites(sitesList);
}

//! FUNCTION FOR displaySites
function displaySites(list) 
{
    let blackBox = " ";
    for (let i = 0; i < list.length; i++) 
    {
        blackBox += `<tr>
    <th scope="row">${i + 1}</th>
    <td class="text-capitalize">${list[i].name}</td>
    <td><button id="visitbtn" class="btn" onclick="visitSite('${list[i].url}')"><i class="fa-solid fa-eye"></i> Visit</button></td>
    <td><button class="btn btn-danger" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
    </td>
</tr>`
    }
    document.querySelector("tbody").innerHTML = blackBox;
}

//! FUNCTION FOR deleteSite
function deleteSite(index) 
{
    sitesList.splice(index, 1);
    localStorage.setItem("allSites", JSON.stringify(sitesList));
    displaySites(sitesList);
}

//! FUNCTION FOR addSites
function addSites() 
{
    if (validSiteUrl() && validSiteName()) 
    {
        let sites = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        };
        sitesList.push(sites);
        localStorage.setItem("allSites", JSON.stringify(sitesList));
        clearForm();
    }

}

//! FUNCTION FOR clearForm
function clearForm() 
{
    siteNameInput.value = "";
    siteUrlInput.value = "";

    document.getElementById("validName").classList.add("d-none");
    document.getElementById("validUrl").classList.add("d-none");
    document.getElementById("siteNameInput").classList.remove("is-valid");
    document.getElementById("siteUrlInput").classList.remove("is-valid");
}

//! FUNCTION FOR vistSite
function visitSite(url) 
{
    window.open(url, '_blank');
}

//! VALIDATION (REGEX)

//! NAME VALIDATION
function validSiteName() 
{
    let regex = /^(?!\s+$)[a-zA-Z\s]+$/;
    let isValid = regex.test(siteNameInput.value);
    if (isValid) 
    {
        document.getElementById("siteNameInput").classList.add("is-valid");
        document.getElementById("siteNameInput").classList.remove("is-invalid");
        document.getElementById("validName").classList.remove("d-none");
        document.getElementById("inValidName").classList.add("d-none");


    }
    else 
    {
        document.getElementById("siteNameInput").classList.remove("is-valid");
        document.getElementById("siteNameInput").classList.add("is-invalid");
        document.getElementById("inValidName").classList.remove("d-none");
        document.getElementById("validName").classList.add("d-none");


    }
    return isValid;
}

//! URL VALIDATION
function validSiteUrl() 
{

    let regex = /^(https:\/\/|http:\/\/)([\da-z.-]+)\.([a-z.]{2,6})([/\w.-]*)*\/?$/i;
    let isValid = regex.test(siteUrlInput.value);

    if (isValid) {
        document.getElementById("siteUrlInput").classList.add("is-valid");
        document.getElementById("siteUrlInput").classList.remove("is-invalid");
        document.getElementById("validUrl").classList.remove("d-none");
        document.getElementById("inValidUrl").classList.add("d-none");


    }
    else {
        document.getElementById("siteUrlInput").classList.remove("is-valid");
        document.getElementById("siteUrlInput").classList.add("is-invalid");
        document.getElementById("inValidUrl").classList.remove("d-none");
        document.getElementById("validUrl").classList.add("d-none");


    }
    return isValid;

}

//! EVENT LISTENER 
submitBtn.addEventListener('click', () => {addSites(); displaySites(sitesList);})

siteNameInputValidation.addEventListener('input', () => { return validSiteName() })

siteUrlInputValidation.addEventListener('input', () => { return validSiteUrl() })