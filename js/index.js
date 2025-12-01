

const navbarContent = document.getElementById("navbarContent");
const btnNavBar = document.getElementById("btnNavBar");
const themeNavBar  = document.getElementById("themeNavBar");
const homeData = document.getElementById("homeData");
const titleProjects = document.getElementById("titleProjects");
const showProyects = document.getElementById("showProyects");
const titleMe = document.getElementById("titleMe");
const codeMe =  document.getElementById("codeMe");
const aMe = document.getElementById("aMe"); 


function buildAboutMe(data){
    let title =`
    <h2 class="secondTitle text-center mb-4" >${data["aboutMe"]["h2"]}</h2>
    `;
    let code = `
    <code >${data["aboutMe"]["code"]}</code>
    `;
    let a =`
    <a href="#cv" class="btn btn-primary" >${data["aboutMe"]["a"]}</a>
    `;
    titleMe.insertAdjacentHTML("afterbegin",title);
    codeMe.insertAdjacentHTML("beforeend",code);
    aMe.insertAdjacentHTML("beforeend",a);
}
function buildProjects (data){
    let title =`
     <h2 class="secondTitle text-center mb-4">${data["projects"]["h2"]}</h2>
    `;
    for (const [key, value] of Object.entries(data["projects"]["projectsAll"])) {
    let projects = `
          <div class="col py-3">
            <div class="card projectCard h-100">
              <div class="cardImgCont">
                <img src="img/proyecto1.png" class="cardImgTop" alt="Proyecto Web 1">
                <div class="cardOverlay">
                  <h5 class="firsTitle">${value["h5"]}</h5>
                </div>
              </div>
              <div class="card-body">
                <p class="cardText">${value["p"]}</p>
                <a href="${value["btn1"]["link"]}" class="btn btn-primary me-2">${value["btn1"]["a"]}</a>
                <a href="${value["btn2"]["link"]}" class="btn btn-outline-light">${value["btn2"]["a"]}</a>
              </div>
            </div>
          </div>
    `;
    showProyects.insertAdjacentHTML("afterbegin", projects);
  }
  

}


function buildHome(data){
   let home = `
   <h1 id="homeTitle">${data["home"]["h1"]}</h1>
        <p id="homeSubtitle">>${data["home"]["p"]} <span class="cursorEffect">|</span></p>
        <a href="#project" class="btn btn-primary mt-3">${data["home"]["a"]}</a>
   ` 
   homeData.insertAdjacentHTML("beforeend",home)
}

function putHTML(item, htmltxt) {
  item.insertAdjacentHTML("beforeend", htmltxt);
}
function createNavbar(data) {
    console.log("hool");
    
  for (const [key, value] of Object.entries(data["navbar"]["links"])) {
    let link = `
    <li class="nav-item"><a class="navLinks" href="#${key}">${value}</a></li>
    `;
    navbarContent.insertAdjacentHTML("afterbegin", link);
  }
  for (const [key, value] of Object.entries(data["navbar"]["languages"])) {
    let btn = `
    <button class="btn btn-light btn-sm language">${value}</button>
    `;
    btnNavBar.insertAdjacentHTML("beforeend", btn);
  }
  let theme = `
    <button class="btn btn-secondary btn-sm language" >${data["navbar"]["theme"]}</button>
  `
  themeNavBar.insertAdjacentHTML("beforeend", theme);
}

async function getJson(route) {
  try {
    const answer = await fetch(route);
    if (!answer.ok) {
      throw new Error("Json load error");
    }
    const data = await answer.json();
    createNavbar(data);
    buildHome(data);
    buildProjects(data);
    buildAboutMe(data);
    //console.log('Contenido del JSON:', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function loadBylanguage() {
  const lang = navigator.language || navigator.userLanguage;

  // Seleccionar archivo según language
  let jsonRoute;
  switch (lang) {
    case "es":
      jsonRoute = "../data/indexEs.json";
      break;
    case "en":
      jsonRoute = "../data/indexEn.json";
      break;
    default:
      jsonRoute = "../data/indexEs.json";
      break;
  }
  const data = await getJson(jsonRoute);
}

// Ejemplo de uso
//cargarJSONPorlanguage().then(datos => {
// Aquí puedes renderizar dinámicamente tu portafolio con los datos
//  console.log('Datos cargados según language:', datos);
//});

window.addEventListener("load", function (event) {
  loadBylanguage();
});
