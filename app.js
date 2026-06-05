 let book = null;
let current = 0;

/* 🔥 CARGAR LIBRO DESDE GITHUB */
async function loadBook(){
  const res = await fetch("books.json");
  book = await res.json();

  render();
}

function render(){
  document.getElementById("title").innerText = book.chapters[current].title;
  document.getElementById("content").innerText = book.chapters[current].text;

  const box = document.getElementById("chapters");
  box.innerHTML = "";

  book.chapters.forEach((c,i)=>{
    const d = document.createElement("div");
    d.innerText = c.title;
    d.style.padding = "10px";
    d.style.borderBottom = "1px solid #eee";
    d.onclick = ()=>{
      current = i;
      render();
      toggleMenu();
    };
    box.appendChild(d);
  });
}

/* MENU */
function toggleMenu(){
  document.getElementById("sidebar").classList.toggle("open");
  document.getElementById("overlay").classList.toggle("show");
}

/* BUSCAR */
function searchText(){
  const q = document.getElementById("search").value.toLowerCase();
  const text = book.chapters[current].text.toLowerCase();

  if(q === ""){
    render();
    return;
  }

  document.getElementById("content").innerHTML =
    text.includes(q)
    ? book.chapters[current].text.replaceAll(q, "🔍"+q+"🔍")
    : "No encontrado";
}

/* VOZ */
function speak(){
  const msg = new SpeechSynthesisUtterance(book.chapters[current].text);
  msg.lang = "es-ES";
  speechSynthesis.speak(msg);
}

/* DESCARGA */
function download(){
  const blob = new Blob([JSON.stringify(book,null,2)],{
    type:"application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "goopedia.json";
  a.click();
}

loadBook();