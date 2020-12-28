$(document).ready(() => {
    getData()

    $("#search").click(() => {
        var countryName = $("#country").val()
        searchCountryData(countryName)
    })

    function searchCountryData(countryName) {
        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://covid-19-data.p.rapidapi.com/country?name=" + countryName,
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "dcd4fc8981msh2126f19fb93f31fp1a34d3jsn81d776bb6e58",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
            }
        };
        $.ajax(settings).done(function (response) {
            if (response.length == 0) {
                let resultCard = `
                    <div class="text-center bg-secondary">
                       <h1>404 Country Not Found</h1>
                    </div>
                `
                $(".result").html(resultCard)
            } else {
                let data = response[0]
                let resultCard = `
                            <div class="card mb-3">
                            <div class="row no-gutters">
                            <div class="col-md-4">
                                <img src="https://www.countryflags.io/${data.code}/flat/64.png" class="card-img w-100" alt="...">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                <h3 class="card-title">${data.country}</h3>
                                <h4>Code: ${data.code}</h4>
                                <h4>Confirmed: ${data.confirmed} people</h4>
                                <h4>Recovered: ${data.recovered} people</h4>
                                <h4>Critical: ${data.critical} people</h4>
                                <h4>Death: ${data.deaths} people</h4>
                                </div>
                            </div>
                            </div>
                        </div>
                `
                $(".result").html(resultCard)
            }
        });
    }

    function getData() {
        console.log("fetching...");
        $.ajax({
            url: "https://covid-19-data.p.rapidapi.com/totals",
            method: "GET",
            async: true,
            crossDomain: true,
            headers: {
                "x-rapidapi-key": "dcd4fc8981msh2126f19fb93f31fp1a34d3jsn81d776bb6e58",
                "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
            },
            success: function (response) {
                let data = response[0]
                $("#confirm").text(data.confirmed + " people")
                $("#recovered").text(data.recovered + " people")
                $("#critical").text(data.critical + " people")
                $("#deaths").text(data.deaths + " people")
            },
            error: function error() {
                console.log("error");
            }

        })
    }
})