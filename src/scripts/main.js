function main() {
    const baseUrl = "https://covid19.mathdro.id";
    const d = new Date();
    console.log(d - 1);


    const getDialySummary = () => {
        let counter = 1;
        let temp;
        fetch(`${baseUrl}/api/daily`)
            .then(response => response.json())
            .then(responseJSON => {
                if (responseJSON.error) {
                    showResponseMessage(responseJSON.message);
                } else {
                    temp = responseJSON;
                    renderDialySummary(responseJSON);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
        const buttonPrev = document.querySelector("#prev-day");
        buttonPrev.addEventListener("click", function () {
            counter++;
            renderDialySummary(temp, counter);
        })

        const buttonNext = document.querySelector("#next-day");
        buttonNext.addEventListener("click", function () {
            counter--;
            if (counter < 1){
                showResponseMessage("This is the latest report!");
            } else{
                renderDialySummary(temp, counter);
            }
        })

    }

    const getGlobalData = () => {
        fetch(`${baseUrl}/api`)
            .then(response => {
                return response.json();
            })
            .then(responseJSON => {
                if (responseJSON.error) {
                    showResponseMessage(responseJSON.message);
                } else {
                    console.log(responseJSON.confirmed.value);
                    console.log(responseJSON.recovered.value);
                    console.log(responseJSON.deaths.value);
                    renderGlobalStatus(responseJSON);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            });
    }


    const getSearchedCountry = (searchKey) => {
        console.log(searchKey);
        fetch(`${baseUrl}/api/countries/${searchKey}`)
            .then(response => {
                return response.json();
            })
            .then(responseJSON_searched => {
                if (responseJSON_searched.error) {
                    showResponseMessage(responseJSON_searched.message);
                } else {
                    console.log(responseJSON_searched);
                    renderSearchedCountry(responseJSON_searched, searchKey);
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })
    }

    const renderDialySummary = (dialy_summary, flag = 1) => {
        let latest_summary = dialy_summary.length - flag;
        const dialy_confirmed_total = dialy_summary[latest_summary].confirmed.total;
        const dialy_confirmed_china = dialy_summary[latest_summary].confirmed.china;
        const dialy_confirmed_outside = dialy_summary[latest_summary].confirmed.outsideChina;
        const dialy_death_total = dialy_summary[latest_summary].deaths.total;
        const dialy_death_china = dialy_summary[latest_summary].deaths.china;
        const dialy_death_outside = dialy_summary[latest_summary].deaths.outsideChina;

        const element_d_confirmed_total = document.querySelector("#dialy-confirmed-total");
        const element_d_confirmed_china = document.querySelector("#dialy-confirmed-china");
        const element_d_confirmed_outside = document.querySelector("#dialy-confirmed-outside");
        element_d_confirmed_total.innerHTML = numberWithCommas(dialy_confirmed_total);
        element_d_confirmed_china.innerHTML = numberWithCommas(dialy_confirmed_china);
        element_d_confirmed_outside.innerHTML = numberWithCommas(dialy_confirmed_outside);

        const dialy_report = dialy_summary[latest_summary].reportDate;
        const element_dialy_report = document.querySelector("#dialy-report");
        element_dialy_report.innerHTML = "<b>" +  "Reported on: " + dialy_report + "</b>";

        const element_d_death_total = document.querySelector("#dialy-death-total");
        const element_d_death_china = document.querySelector("#dialy-death-china");
        const element_d_death_outside = document.querySelector("#dialy-death-outside");
        element_d_death_total.innerHTML = numberWithCommas(dialy_death_total);
        element_d_death_china.innerHTML = numberWithCommas(dialy_death_china);
        element_d_death_outside.innerHTML = numberWithCommas(dialy_death_outside);
    }



    const renderGlobalStatus = (global_status) => {
        const confirmed = global_status.confirmed.value;
        const deaths = global_status.deaths.value;
        const recovered = global_status.recovered.value;
        const confirmed_status = document.querySelector("#global-confirmed");
        const deaths_status = document.querySelector("#global-deaths");
        const recovered_status = document.querySelector("#global-recovered");
        confirmed_status.innerHTML = numberWithCommas(confirmed);
        deaths_status.innerHTML = numberWithCommas(deaths);
        recovered_status.innerHTML = numberWithCommas(recovered);
    }

    const renderSearchedCountry = (country_name, nama_negara) => {
        const confirmed = country_name.confirmed.value;
        const deaths = country_name.deaths.value;
        const recovered = country_name.recovered.value;
        const last_update = country_name.lastUpdate;
        const search_result = document.querySelector("#search-result");

        search_result.innerHTML = `
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#CountryModal">
            See Covid-19 Statistic in This Country
        </button>

        <!-- Modal -->
        <div class="modal fade" id="CountryModal" tabindex="-1" role="dialog"
            aria-labelledby="CountryModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="CountryLabel">Covid-19 Statistics in ${nama_negara}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <img class="img-fluid" src="https://covid19.mathdro.id/api/countries/${nama_negara}/og" alt="" style="max-height: 400px;">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>

        <p class="ml-auto text-center bg-info"> <b>Latest Update: ${last_update.substr(0, 10)}</b></p>
        <div class="d-flex flex-row flex-wrap justify-content-center text-center">
            <div class="p-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">Confirmed</h5>
                        <p class="card-text">${numberWithCommas(confirmed)}</p>
                    </div>
                </div>
            </div>
            <div class="p-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">Deaths</h5>
                        <p class="card-text">${numberWithCommas(deaths)}</p>
                    </div>
                </div>
            </div>
            <div class="p-3">
                <div class="card">
                    <div class="card-body text-center">
                        <h5 class="card-title">Recovered</h5>
                        <p class="card-text">${numberWithCommas(recovered)}</p>
                    </div>
                </div>
            </div>

         </div>
        `;
    }

    const searchBox = () => {
        fetch(`${baseUrl}/api/countries`)
            .then(response => {
                return response.json();
            })
            .then(responseJSON => {
                if (responseJSON.error) {
                    showResponseMessage(responseJSON.message);
                } else {
                    const dropdown_values = document.querySelector("#country-list")
                    responseJSON.countries.forEach(element => {
                        // console.log(element.name);
                        dropdown_values.innerHTML += `<option value="${element.name}">${element.name}</option>`;
                    })
                }
            })
            .catch(error => {
                showResponseMessage(error);
            })

        // const buttonSearch = document.querySelector("#search-country");
        // buttonSearch.addEventListener("click", function () {
        //     const search_value = document.getElementById("country_name").value;
        //     getSearchedCountry(search_value)
        // })
        const buttonSearch = document.querySelector("#search-country");
        buttonSearch.addEventListener("click", function () {
            const search_value = document.getElementById("country-list").value;
            getSearchedCountry(search_value)
        })

    }


    // from https://stackoverflow.com/questions/2901102/how-to-print-a-number-with-commas-as-thousands-separators-in-javascript
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function showResponseMessage(error) {
        console.log(error);
        alert(error);
    }


    document.addEventListener("DOMContentLoaded", () => {
        getDialySummary();
        getGlobalData();
        searchBox();
    });


}

export default main;