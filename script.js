
async function buscarClima() {
    let ciudad = document.getElementById("inputCiudad").value.trim();
    let cajaResultado = document.getElementById("resultado");

    if (ciudad === "") {
        cajaResultado.innerHTML = "Ingresá una ciudad.";
        return;
    }

    cajaResultado.innerHTML = "Buscando... 🛰️";

    try {
        let respuesta = await fetch(`https://wttr.in/${encodeURIComponent(ciudad)}?format=j1`);
        let datos = await respuesta.json();

        let temperatura = Number(datos.current_condition[0].temp_C);

        if (isNaN(temperatura)) {
            cajaResultado.innerHTML = "No encontramos esa ciudad.";
            return;
        }

        let descripcionClima = datos.current_condition[0].weatherDesc[0].value;

        let traducciones = {
            "Sunny": "Soleado",
            "Clear": "Despejado",
            "Partly cloudy": "Parcialmente nublado",
            "Cloudy": "Nublado",
            "Overcast": "Cubierto",
            "Mist": "Neblina",
            "Fog": "Niebla",
            "Light rain": "Lluvia ligera",
            "Moderate rain": "Lluvia moderada",
            "Heavy rain": "Lluvia intensa",
            "Light snow": "Nieve ligera",
            "Blizzard": "Ventisca",
            "Windy": "Ventoso"
        };

        let descripcionEsp = traducciones[descripcionClima] || descripcionClima;

        let emoji = "🌡️";

        if (descripcionClima.includes("Rain")) {
            emoji = "🌧️";
        } else if (descripcionClima.includes("Sunny") || descripcionClima.includes("Clear")) {
            emoji = "☀️";
        } else if (descripcionClima.includes("Cloud")) {
            emoji = "☁️";
        }

        let recomendacion = "";

        if (temperatura < 6) {
            recomendacion = "Mucho frío";
        } else if (temperatura < 12) {
            recomendacion = "Clima frío";
        } else if (temperatura < 26) {
            recomendacion = "Clima templado";
        } else {
            recomendacion = "Mucho calor";
        }

        if (descripcionClima.includes("Rain")) {
            document.body.className = "clima-lluvia";
        } else if (descripcionClima.includes("Sunny") || descripcionClima.includes("Clear")) {
            document.body.className = "clima-soleado";
        } else if (descripcionClima.includes("Cloud")) {
            document.body.className = "clima-nublado";
        } else {
            document.body.className = "";
        }

        cajaResultado.innerHTML = `
            <h3>${emoji} ${temperatura}°C en ${ciudad}</h3>
            <p><b>${recomendacion}</b></p>
            <p>${descripcionEsp}</p>
        `;

    } catch (error) {
        cajaResultado.innerHTML = "Error al consultar el clima. Intentá nuevamente.";
    }
}
