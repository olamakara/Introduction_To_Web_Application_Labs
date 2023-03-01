// fetch('http://localhost:3000/cities', {
//     method: 'GET',
//     headers: {
//         'Accept': 'cities.json',
//     },
// })
// .then(response => response.json())
// .then(response => console.log(JSON.stringify(response)))

let globalData = null;
const dataAddress = "http://localhost:3000/cities";

const getDataFromFile = async () => {
    if (globalData === null) {
        const response = await fetch(dataAddress);
        const json = await response.json();
        globalData = json;
    }
    
    return globalData;
};

const generateOrderedListFromArray = (answer, array) => {
    const orderedList = document.createElement("ol");
    array.forEach((city) => {
        const newListItem = document.createElement("li");
        newListItem.innerText = city.name;
        orderedList.appendChild(newListItem);
    });
    answer.appendChild(orderedList);
};

const getAnswerA = (answer) => {
    const data = globalData;
    const resultCities = [];
    for (let i = 0; i < data.length; i++) {
        const city = data[i];
        if (city.province === "małopolskie") {
            resultCities.push(city);
        }
    }
    generateOrderedListFromArray(answer, resultCities);
};

const getAnswerB = (answer) => {
    const data = globalData;
    const resultCities = [];
    data.forEach((city) => {
        if (city.name.match(/a.*a/gi) != null) {
            resultCities.push(city);
        }
    });
    generateOrderedListFromArray(answer, resultCities);
};

const getAnswerC = (answer) => {
    const data = [...globalData];
    const resultCities = [];
    data.sort((a, b) => {
        return a.dentensity > b.dentensity
            ? -1
            : a.dentensity < b.dentensity
            ? 1
            : 0;
    });
    resultCities.push(data[4]);
    generateOrderedListFromArray(answer, resultCities);
};

const getAnswerD = (answer) => {
    const data = globalData;
    const resultCities = [];
    data.forEach((city) => {
        resultCities.push(Object.assign({}, city));
        if (city.people > 100000) {
            resultCities[resultCities.length - 1].name += " city";
        }
    });
    generateOrderedListFromArray(answer, resultCities);
};

const getAnswerE = (answer) => {
    const border = 80000;
    const data = globalData;
    let belowCount = 0;
    let equalsCount = 0;
    let aboveCount = 0;
    data.forEach((city) => {
        if (city.people > border) {
            aboveCount++;
        } else if (city.people < border) {
            belowCount++;
        } else {
            equalsCount++;
        }
    });
    const resultCities = [
        {name: `Granica: ${border}`},
        {name: `Powyżej granicy: ${aboveCount}`},
        {name: `Równe granicy: ${equalsCount}`},
        {name: `Poniżej granicy: ${belowCount}`}
    ];
    generateOrderedListFromArray(answer, resultCities);
};

const getAnswerF = (answer) => {
    const data = globalData;
    let citiesCount = 0;
    let citiesTotalArea = 0;
    data.forEach((city) => {
        if (city.name.match(/^p/i)) {
            citiesCount++;
            citiesTotalArea += city.area;
        }
    });
    const resultCities = [
        {
            name: `Średnia powierzchnia miast zaczynających się na literę "P": ${
                Math.round(
                    (citiesTotalArea / citiesCount + Number.EPSILON) * 100
                ) / 100
            }`,
        },
    ];
    generateOrderedListFromArray(answer, resultCities);
};

const getAnswerG = (answer) => {
    let border = 5000;
    let flaga = true;
    let aboveCount = 0;
    const data = globalData;
    data.forEach((city) => {
        if (city.province === "pomorskie") {
            if (city.people > border) {
                aboveCount++;
            } else {
                flaga = false;
            }
        }
    });
    const resultCities = [
        {name: `Wszystkie miasta z województwa pomorskiego mają powyżej 5000 mieszkańców: ${flaga}`},
        {name: `Ilość miast z województwa pomorskiego powyżej 5000 mieszkańców: ${aboveCount}`}
    ];
    generateOrderedListFromArray(answer, resultCities);
};

const buttons = document.querySelectorAll(".questionContainer button");
const answers = document.querySelectorAll(".questionContainer .answer");
const functionArray = [getAnswerA, getAnswerB, getAnswerC, getAnswerD, getAnswerE, getAnswerF, getAnswerG];
const done = [false, false, false, false, false, false];

const addFunctions = async () => {
    await getDataFromFile();
    for (let i = 0; i < functionArray.length; i++) {
        buttons[i].addEventListener("click", () => {
            if (!done[i]) {
                functionArray[i](answers[i]);
                done[i] = true;
                buttons[i].innerText = "Schowaj odpowiedź";
            } 
            else {
                const toDelete = answers[i].firstChild;
                toDelete.remove();
                buttons[i].innerText = "Pokaż odpowiedź";
                done[i] = false;
            } 
            
        });
    }
};

addFunctions();
