var weighted = []; 
var answers = []; //Array voor alle antwoorden van de vragen
var resultsArray = []; 
for (let i = 0; i < parties.length; i++) {
    resultsArray[i] = {
        name: parties[i]['name'],
        amount: 0
    }
}
const bigOrSmall = 10; //const om te bepalen of er kleine of grote partij is 
var currentQuestion = -1; //Variable die er volgt huidige vraag


function answer(answer) { //Function die er antwoorden opslaat
    if (answer == "skip") {
        if (answers[currentQuestion] == null) {
            answers[currentQuestion] = "";
        }
    } else {
        answers[currentQuestion] = answer;
    }
    nextQuestion();
}

function nextQuestion() { // Functie die er check of het volgende vraag is (voor zekerheid)
    if (currentQuestion == subjects.length-1) {
        showWeightedQuestions();
    } else {
        currentQuestion++;
        showQuestion();
        showPreviousAnswer()
    }
}

function previousQuestion() { 
    currentQuestion--;
    showQuestion();
    showPreviousAnswer();
}

function results() { //Functie die er checkt alle antwoorden en vergelijk met parties array
    for (var i = 0; i < subjects.length; i++) {
        for (var j = 0; j < subjects[i]['parties'].length; j++) {
            if (subjects[i]['parties'][j]['position'] == answers[i]) {
                for (var k = 0; k < resultsArray.length; k++) {
                    if (resultsArray[k]['name'] == subjects[i]['parties'][j]['name']) {
                        if(weighted[i] == true) {
                            resultsArray[k]['amount']++;
                            resultsArray[k]['amount']++;
                        } else {
                            resultsArray[k]['amount']++;
                        }
                    }
                }
            }
        }
    }
    showResults('all');
}

function showResults(what) { //Functie die er resultaten laat zien welke partijen bij jou goed passen

    document.getElementById('form').innerHTML = "";
    document.getElementById('form').innerHTML += `<button onclick="showResults('big')" id="bigBtn" class="w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white">Alleen grote partijen</button>`
    document.getElementById('form').innerHTML += `<button onclick="showResults('small')" id="smallBtn" class="w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white">Alleen kleine partijen</button>`
    document.getElementById('form').innerHTML += `<button onclick="showResults('all')" id="allBtn" class="w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white">alle partijen</button>`
    resultsArray.sort( compare );
    resultsArray.reverse();
    if (what == 'all') {
        document.getElementById('allBtn').setAttribute('class','w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
        for (let i = 0; i < resultsArray.length; i++) {
            document.getElementById('form').innerHTML += "<h1 class='result'>"+resultsArray[i]['name']+" - "+resultsArray[i]['amount']+" overeenkomsten</h1>"
        }
    } else if (what == 'big') {
        document.getElementById('bigBtn').setAttribute('class','w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
        for (let i = 0; i < resultsArray.length; i++) {
            for (let j = 0; j < parties.length; j++) {
                if (parties[j]['name'] == resultsArray[i]['name']) {
                    if (parties[j]['size'] >= bigOrSmall) {
                        document.getElementById('form').innerHTML += "<h1 class='result'>"+resultsArray[i]['name']+" - "+resultsArray[i]['amount']+" overeenkomsten</h1>"
                    }
                }
                
            }
        }
    } else if (what == 'small') {
        document.getElementById('smallBtn').setAttribute('class','w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
        for (let i = 0; i < resultsArray.length; i++) {
            for (let j = 0; j < parties.length; j++) {
                if (parties[j]['name'] == resultsArray[i]['name']) {
                    if (parties[j]['size'] < bigOrSmall) {
                        document.getElementById('form').innerHTML += "<h1 class='result'>"+resultsArray[i]['name']+" - "+resultsArray[i]['amount']+" overeenkomsten</h1>"
                    }
                }
                
            }
        }
    }
}

function back() { //Functie voor back button
    if (currentQuestion == 0 || currentQuestion == subjects.length-1) {
        window.location.href = "../index.html";
    } else {
        previousQuestion();
    }
}

function showPreviousAnswer() { //Functie die er vorige beantwoorde vraag laat zien met een blauwe knop
        document.getElementById("pro").setAttribute('class','w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white');
        document.getElementById("none").setAttribute('class','w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white');
        document.getElementById("contra").setAttribute('class','w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white');
    if (answers[currentQuestion] == 'pro') {
        document.getElementById("pro").setAttribute('class','w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
    } else if (answers[currentQuestion] == 'none') {
        document.getElementById("none").setAttribute('class','w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
    } else if (answers[currentQuestion] == 'contra') {
        document.getElementById("contra").setAttribute('class','w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
    }
}

function showQuestion() { //Functie die er naar volgende vraag brengt
        document.getElementById("whatAbout").innerHTML = currentQuestion+1+". "+subjects[currentQuestion]['title'];
        document.getElementById("question").innerHTML = subjects[currentQuestion]['statement'];
}

function showWeightedQuestions() {
    document.getElementById('form').innerHTML = '<h1>Belangrijke vragen</h1>';
    for (let i = 0; i < subjects.length; i++) {
        document.getElementById('form').innerHTML += `<button onclick="setWeighted(`+i+`,'true')" id="weighted`+i+`" class="weightedBtn w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white">`+subjects[i]['title']+`</button>`;
    }

    var tempVar = document.createElement('br');
    document.getElementById('form').appendChild(tempVar);

    tempVar = document.createElement('br');
    document.getElementById('form').appendChild(tempVar);

    var tempVar = document.createElement('button');
    tempVar.innerHTML = "Bekijk resultaten";
    tempVar.setAttribute('class', 'w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white');
    tempVar.setAttribute('onclick', 'results()');
    document.getElementById('form').appendChild(tempVar);
}

function setWeighted(id, tof) {
    if (tof == 'true') {
        document.getElementById('weighted'+id).setAttribute('class','weightedBtn w3-button w3-round-large w3-blue w3-hover-cyan w3-hover-text-white');
        document.getElementById('weighted'+id).setAttribute('onclick','setWeighted('+id+', "false")');
        weighted[id] = true;
    } else {
        document.getElementById('weighted'+id).setAttribute('class','weightedBtn w3-button w3-round-large w3-black w3-hover-cyan w3-hover-text-white');
        document.getElementById('weighted'+id).setAttribute('onclick','setWeighted('+id+', "true")');
        weighted[id] = false;
    }
}

function compare( a, b ) {
    if ( a.amount < b.amount ){
      return -1;
    }
    if ( a.amount > b.amount ){
      return 1;
    }
    return 0;
  }