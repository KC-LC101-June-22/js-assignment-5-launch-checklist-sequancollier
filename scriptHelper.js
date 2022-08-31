// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
     // Here is the HTML formatting for our mission target div.
   /*
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: </li>
                    <li>Diameter: </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: </li>
                    <li>Number of Moons: </li>
                </ol>
                <img src="">
   */
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML = `
                <h2>The Mission Destination!</h2>
                <ol>
                    <li>Planet Name: ${name}</li>
                    <li>Planet Diameter: ${diameter} </li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src='${imageUrl}'>
                `
}

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return `Empty`
    } else if ((!isNaN(Number(testInput)))) {
        return `Is a Number`
    } else {
        return 'Not a Number'
    }
}

function formSubmission (document, list, pilotName, copilotName, fuelLevel, cargoLevel) {
    
    
   
    let fuelStatus = document.getElementById('fuelStatus');
    let launchStatus = document.getElementById('launchStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    

    if (validateInput(pilotName) === `Empty`|| validateInput(copilotName) === `Empty`|| 
    validateInput(fuelLevel) === `Empty`||validateInput(cargoLevel) === `Empty`) {
        alert(`All fields are required`);
    }
    else if (validateInput(fuelLevel) === 'Not a Number' || validateInput(cargoLevel) === 'Not a Number') {
        alert(`Please enter numerical values for Fuel Level and Cargo Mass`);
    } else if (validateInput(pilotName)===`Is a Number`||validateInput(copilotName)===`Is a Number`) {
        alert('Please do not enter numbers for name of pilot or co-pilot');
    } 
    else {
    pilotStatus.innerHTML = `Pilot ${pilotName} is ready for liftoff.`;
    copilotStatus.innerHTML = `Co-pilot ${copilotName} is ready for liftoff.`;
    list.style.visibility = 'hidden';
    }
    if (Number(fuelLevel) < 10000) {
        fuelStatus.innerHTML = `There is not enough fuel for journey`;
        list.style.visibility = 'visible';
        launchStatus.innerHTML = `Thr Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    } else if (Number(cargoLevel) > 10000) {
        cargoStatus.innerHTML = `There is too much mass for the shuttle to take off.`;
        list.style.visibility = `visible`;
        launchStatus.innerHTML = `The Shuttle not ready for launch`;
        launchStatus.style.color = `red`;
    } else if (Number(cargoLevel) < 10000 && Number(fuelLevel) > 10000) {
        list.style.visibility = `visible`;
        fuelStatus.innerHTML = `We have enough fuel for journey`;
        cargoStatus.innerHTML = `Cargo is at an approitate weight for liftoff`;
        launchStatus.innerHTML = `The Shuttle ready for launch`;
        launchStatus.style.color = `green`;
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()

        });
    return planetsReturned;
}

function pickPlanet(planets) {
    let idx = Math.floor(Math.random() * planets.length);
    return planets[idx];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;