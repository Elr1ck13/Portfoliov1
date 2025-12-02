const navbarContent = document.getElementById("navbarContent");
const homeData = document.getElementById("homeData");
const projectsTitle = document.getElementById("projectsTitle");
const showProyects = document.getElementById("showProyects");
const titleMe = document.getElementById("titleMe");
const codeMe = document.getElementById("codeMe");
const aMe = document.getElementById("aMe");
const cvTitle = document.getElementById("cvTitle");
const education = document.getElementById("education");
const skillTitle = document.getElementById("skillTitle");
const skillList = document.getElementById("skillList");
const blogTitle = document.getElementById("blogTitle");
const entries = document.getElementById("entries");
const footerContent = document.getElementById("footerContent");
const content = [
  navbarContent,
  homeData,
  showProyects,
  aMe,
  education,
  skillList,
  entries,
  footerContent,
];
const titles = [projectsTitle, titleMe, cvTitle, skillTitle, blogTitle];

function toogleTheme() {
  if (
    document.documentElement.style.getPropertyValue("--bg-color") === "#121212"
  ) {
    document.documentElement.style.setProperty("--bg-color", "#F5F5F5");
    document.documentElement.style.setProperty("--bg-secondary", "#EBEBEB");
    document.documentElement.style.setProperty("--text-color", "#333333");
    document.documentElement.style.setProperty("--btn-color", "#3A86FF");
    document.documentElement.style.setProperty("--hg-color", "#658af0");
    document.documentElement.style.setProperty("--box-shadow-color", "#000000");
  } else {
    document.documentElement.style.setProperty("--bg-color", "#121212");
    document.documentElement.style.setProperty("--bg-secondary", "#1c1c1c");
    document.documentElement.style.setProperty("--btn-color", "#3A86FF");
    document.documentElement.style.setProperty("--hg-color", "#5959E5");
    document.documentElement.style.setProperty("--text-color", "#E0E0E0");
    document.documentElement.style.setProperty("--box-shadow-color", "#0000FF");
  }
  //location.reload();
}
function cleanTitle() {
  for (const element of titles) {
    if (element.lastElementChild) {
      element.removeChild(element.firstElementChild);
    }
  }
  codeMe.textContent = "";
}
function cleanContent() {
  for (const element of content) {
    while (element.lastElementChild) {
      element.removeChild(element.lastElementChild);
    }
  }
}
function buildFooter(data) {
  let fcontent = `
    <p class="footText mb-1">${data["footer"]["p"]} </p>
    <p class="footSub">{"<"}${data["footer"]["quote"]}{">"}</p>
  `;
  footerContent.insertAdjacentHTML("beforeend", fcontent);
}

function buildBlog(data) {
  let title = `
    <h2 class="secondTitle text-center mb-5">${data["blog"]["h2"]}</h2>
  `;
  blogTitle.insertAdjacentHTML("afterbegin", title);
  let main = true;
  for (const [key, value] of Object.entries(data["blog"]["post"])) {
    let post = ``;
    if (main) {
      post += `
      <div class="col-12">
            <div class="card blogCard feat p-4">
              <div class="card-body">
                <h3 class="firsTitle">${value["h3"]}</h3>
                <p class="published">${value["date"]}</p>
                <p>${value["p"]}<span class="cursorEffect">|</span></p>
                <a href="#" class="btn btn-primary">${value["a"]}</a>
              </div>
            </div>
          </div>
      `;
      main = false;
    } else {
      post += `
        <div class="col-md-6 col-lg-4">
            <div class="card blogCard h-100">
              <img src="${value["img"]}" class="cardImgTop" alt="Tema relevante 1">
              <div class="card-body">
                <h5 class="firsTitle">${value["h5"]}</h5>
                <p class="published">${value["date"]}</p>
                <p>${value["p"]}</p>
                <a href="#" class="btn btn-outline-light">${value["a"]}</a>
              </div>
            </div>
          </div>
      `;
    }

    entries.insertAdjacentHTML("beforeend", post);
  }
}
function buildCV(data) {
  let title = `
    <h2 class="secondTitle text-center mb-5">${data["cv"]["h2"]}</h2>
  `;
  cvTitle.insertAdjacentHTML("afterbegin", title);
  for (const [key, value] of Object.entries(data["cv"]["education"])) {
    let schools = `
    <div class="cvCard p-4 rounded mb-4">
      <h5 class="firsTitle">${value["h5"]}</h5>
      <p>${value["p"]}</p>
    </div>
  `;
    education.insertAdjacentHTML("beforeend", schools);
  }
  let skillT = `
    <h4 class="skills-title mb-4">${data["cv"]["skillTitle"]}</h4>
  `;
  skillTitle.insertAdjacentHTML("afterbegin", skillT);

  for (const [key, value] of Object.entries(data["cv"]["skillList"])) {
    let skill = `
    <div class="skills" data-percent="90">
      <img src="${value["img"]}" alt="img">
      <span class="skillsLabel">${value["span"]}</span>
    </div>
  `;
    skillList.insertAdjacentHTML("beforeend", skill);
  }
}

function buildAboutMe(data) {
  let title = `
    <h2 class="secondTitle text-center mb-4" >${data["aboutMe"]["h2"]}</h2>
    `;
  let code = `
    ${data["aboutMe"]["code"]}
    `;
  let a = `
    <a href="#cv" class="btn btn-primary" >${data["aboutMe"]["a"]}</a>
    `;
  titleMe.insertAdjacentHTML("afterbegin", title);
  codeMe.textContent = code;
  aMe.insertAdjacentHTML("beforeend", a);
}
function buildProjects(data) {
  let title = `
     <h2 class="secondTitle text-center mb-4">${data["projects"]["h2"]}</h2>
    `;
  projectsTitle.insertAdjacentHTML("afterbegin", title);
  for (const [key, value] of Object.entries(data["projects"]["projectsAll"])) {
    let projects = `
          <div class="col py-3">
            <div class="card projectCard h-100 d-flex flex-column">
              <div class="cardImgCont flex-grow-1 d-flex justify-content-center align-items-center">
                <img src="${value["img"]}" class="cardImgTop" alt="Proyecto Web 1" /> 
                <div class="cardOverlay">
                  <h5 class="firsTitle">${value["h5"]}</h5>
                </div>
              </div>
              <div class="card-body">
                <p class="cardText">${value["p"]}</p>
                <div class="d-flex justify-content-between">
                  <a href="${value["btn1"]["link"]}" class="btn btn-primary me-2">${value["btn1"]["a"]}</a>
                  <a href="${value["btn2"]["link"]}" class="btn btn-outline-light">${value["btn2"]["a"]}</a>
                </div>
              </div>
            </div>
          </div>
    `;
    showProyects.insertAdjacentHTML("afterbegin", projects);
  }
}

function buildHome(data) {
  let home = `
   <h1 id="homeTitle">${data["home"]["h1"]}</h1>
        <p id="homeSubtitle">>${data["home"]["p"]} <span class="cursorEffect">|</span></p>
        <a href="#project" class="btn btn-primary mt-3">${data["home"]["a"]}</a>
   `;
  homeData.insertAdjacentHTML("beforeend", home);
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
    <li class="nav-item btnNavBar ">
      <button class="btn btn-light btn-sm language" id="${value}">${value}</button>
    </li>
    `;
    navbarContent.insertAdjacentHTML("beforeend", btn);
  }
  let theme = `
    <li class="nav-item" >
    
      <button class="btn btn-secondary btn-sm language" id="theme">${data["navbar"]["theme"]}</button>
    </li>
  `;
  navbarContent.insertAdjacentHTML("beforeend", theme);
}

async function getJson(route) {
  try {
    console.log(route);
    const answer = await fetch(route);
    if (!answer.ok) {
      throw new Error("Json load error");
    }
    const data = await answer.json();
    createNavbar(data);
    buildHome(data);
    buildProjects(data);
    buildAboutMe(data);
    buildCV(data);
    buildBlog(data);
    buildFooter(data);
    //console.log('Contenido del JSON:', data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function loadBylanguage(lang) {
  let jsonRoute;
  switch (lang) {
    case "es":
      jsonRoute = "./data/indexEs.json";
      break;
    case "en":
      jsonRoute = "./data/indexEn.json";
      break;
    default:
      jsonRoute = "./data/indexEs.json";
      break;
  }
  console.log(jsonRoute);
  const data = await getJson(jsonRoute);
}

window.addEventListener("load", function (event) {
  const lang = navigator.language || navigator.userLanguage;
  console.log(lang)
  loadBylanguage(lang);
  document.documentElement.style.setProperty("--bg-color", "#121212");

});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".language");
  if (!btn) return;

  if (btn.id.toLowerCase() === "es") {
    cleanTitle();
    cleanContent();
    loadBylanguage("es");
  } else if (btn.id.toLowerCase() === "en") {
    cleanTitle();
    cleanContent();
    loadBylanguage("en");
  } else if (btn.id == "theme") {
    toogleTheme();
  }
});
