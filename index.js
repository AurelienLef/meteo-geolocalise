"use strict"

let url = ""

function req(ville = null, lat = null, long = null) {
    if (ville) {
        url = "https://api.openweathermap.org/data/2.5/weather?q="+ville+"&appid=d6b9b8e7850b069d7b940f64c964b013&units=metric"
    } else {
        url = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=d6b9b8e7850b069d7b940f64c964b013&units=metric"
    }

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (data) => {

            console.log(data)
            $('#ville').text(data.name)
            $('#temperature_label').text(data.main.temp)
        },
        error: () => {
            alert('Un problème est survenu veuillez réessayer plus tard.')
        }
    })
}

let btn = document.querySelector('#button')

btn.addEventListener('click', () => {
    let ville = prompt('Pour quel ville voulez-vous avoir la température ?')
    if (ville) {
        req(ville)
    }
})

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        req(undefined, position.coords.latitude, position.coords.longitude)
    }, erreur, options)

    function erreur() {
        req("paris")
    }

    var options = {
        enableHighAcurancy: true,
        timeout: 1000
    }
} else {
    req("paris")
}
