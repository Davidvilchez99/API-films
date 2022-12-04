var pagina = 1;
const xhttp = new XMLHttpRequest();
function loadDoc() {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datos = JSON.parse(xhttp.responseText);
            for (i = 0; i < datos.Search.length; i++) {
                const newDiv = document.createElement("div");
                const h2 = document.createElement("h2");
                const img = document.createElement("img");
                const pId = document.createElement("p");
                const button = document.createElement("button");
                button.innerHTML = "Mas informacion";
                button.className = "btnsInformacion";
                document.getElementById("demo").appendChild(newDiv);
                newDiv.className = "div--demo";
                newDiv.appendChild(h2);
                newDiv.appendChild(img);
                newDiv.appendChild(button);
                newDiv.appendChild(pId);
                h2.innerHTML = datos.Search[i].Title;
                pId.innerHTML = datos.Search[i].imdbID;
                pId.style.visibility = "hidden";
                button.addEventListener("click", () => {
                    var id = newDiv.lastElementChild.innerHTML;
                    var div = newDiv;
                    informacion(id, div);
                }, { once: true })
                if (datos.Search[i].Poster == "N/A")
                    img.src = "https://static.vecteezy.com/system/resources/previews/005/337/799/non_2x/icon-image-not-found-free-vector.jpg";
                else
                    img.src = datos.Search[i].Poster;

                document.getElementById("limpiar").addEventListener("click", () => {
                    for (i = 0; i < document.getElementsByClassName("div--demo").length; i++) {
                        document.getElementsByClassName("div--demo")[i].remove();
                        document.getElementById("input").value = "";
                    }
                })
            }
        }
    }
    xhttp.open("GET", "https://www.omdbapi.com/?s=" + document.getElementById("input").value + "&page=" + pagina + "&apikey=a6e842a7");
    xhttp.send();

}
function informacion(id, div) {
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            datosPlus = JSON.parse(xhttp.responseText);
            const pDirector = document.createElement("p");
            const pLanguage = document.createElement("p");
            const pPlot = document.createElement("p");
            const pReleased = document.createElement("p");
            const pYear = document.createElement("p");
            const pType = document.createElement("p");
            const hr = document.createElement("hr");
            div.appendChild(pDirector);
            div.appendChild(pLanguage);
            div.appendChild(pReleased);
            div.appendChild(pYear);
            div.appendChild(pType);
            div.appendChild(hr);
            div.appendChild(pPlot);
            pDirector.innerHTML = "Director: " + datosPlus.Director;
            pLanguage.innerHTML = "Language: " + datosPlus.Language;
            pReleased.innerHTML = "Released: " + datosPlus.Released;
            pYear.innerHTML = "Year: " + datosPlus.Year;
            pType.innerHTML = "Type: " + datosPlus.Type;
            pPlot.innerHTML = "Plot: " + datosPlus.Plot;
        }
    }
    xhttp.open("GET", "https://www.omdbapi.com/?i=" + id + "&apikey=a6e842a7");
    xhttp.send();
}

window.addEventListener("scroll", () => {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
        pagina++;
        loadDoc();
    }
})

window.onload = () => {
    document.getElementById("input").addEventListener("keypress", (event) => {
        if (event.which == 13) {
            loadDoc();
        }
    })
}