const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
const apiUrl = 'https://my.internetticketing.com/taposadmin/GENABU/pos_feed/?type=MEDIA2';
const context = document.getElementById('context');

function timec(time) {
    var first = time.slice(0,2);
    var second = time.slice(3,5);
    var format;
    if(first == '00' || first == '1' || first == '2' || first == '3' || first == '4' || first == '5' || first == '6' || first == '7' || first == '8' || first == '9' || first == '10' || first == '11') {
        format = 'AM';
    } else {
        format = 'PM'
    }
    if (first == '13') {
        first = '1';
    } else if (first == '14') {
        first = '2';
    } else if (first == '15') {
        first = '3';
    } else if (first == '16') {
        first = '4';
    } else if (first == '17') {
        first = '5';
    } else if (first == '18') {
        first = '6';
    }  else if (first == '19') {
        first = '7';
    } else if (first == '20') {
        first = '8';
    } else if (first == '21') {
        first = '9';
    } else if (first == '22') {
        first = '10';
    } else if (first == '23') {
        first = '11';
    }
    return `${first}:${second} ${format}`;
}

function datec(date) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weeks = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const d = new Date(date);
    let month = months[d.getMonth()];
    let datei = d.getDate(); 
    if(datei == '1') {
        datei = datei + 'st';
    } else if(datei == '2') {
        datei = datei + 'nd';
    } else if(datei == '3') {
        datei = datei + 'rd';
    } else {
        datei = datei + 'th';
    }
    let week = weeks[d.getDay()];
    return `${week}, ${month} ${datei}`;
}

fetch(proxyUrl + apiUrl)
    .then(function(resp) {
        return resp.text();
    })
    .then(function(data) {
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(data, 'text/html');
        // console.log(xmlDoc.getElementsByTagName('film')[0].children[0].innerHTML);
        let tags = xmlDoc.getElementsByTagName('film');
        let performance = xmlDoc.getElementsByTagName('performance');
        console.log(xmlDoc);
        for(var i = 0; i < tags.length; i++) {
            // console.log(tags[i].children[1].innerHTML);
            function perform(performance, tags, i) {
                var c_performance = ``;
                for(z=0; z < performance.length; z++) {
                    console.log(performance[z].children[12].innerHTML);
                    if(performance[z].children[12].innerHTML == tags[i].children[22].innerHTML) {
                        c_performance += `
                            <h3>${datec(performance[z].children[0].innerHTML)}</h3>
                            <div class="showtimes-group">
                            <div class="show">${timec(performance[z].children[27].innerHTML)}</div>
                            </div>
                        `;
                    }
                }
                return c_performance;
            }
            let content = `
            <div class="movie-row">
            <div class="img-container">
            <img src="${tags[i].children[14].innerHTML}" id="poster-img">
            </div>
            <div class="content">
            <h2>${tags[i].children[1].innerHTML}</h2>
            <p>${tags[i].children[19].innerHTML}</p>
            <div class="info">
            <div class="info-row">
                    <p class="text-bold">RATING</p>
                    <p>${tags[i].children[20].innerHTML}</p>
                </div>
                <div class="info-row">
                    <p class="text-bold">RUNNING TIME</p>
                    <p>${tags[i].children[25].innerHTML}</p>
                </div>
                <div class="info-row">
                    <p class="text-bold">RELEASED</p>
                    <p>${tags[i].children[13].innerHTML}</p>
                    </div>
                    <div class="info-row">
                    <p class="text-bold">GENRE</p>
                    <p>${tags[i].children[16].innerHTML}</p>
                </div>
            </div>
            <div class="showtimes">
                <h2>Movie Times</h2>
                <div class="showtimes-row" id="showrow" data-id=${tags[i].children[22].innerHTML}>
                    ${perform(performance, tags, i)}
                </div>
            </div>
            </div>
            </div>`;
            context.innerHTML += content;
            
            const showrow = document.getElementById('showrow');
            
            
        }
    })

