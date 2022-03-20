let kittens = [];

let addKittenForm = document.getElementById("add-kitten-form");
let kittensContainer = document.getElementById("kittens");

/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event)
{
    event.preventDefault();
    let form = event.target;
    let newId;
    
    do
    {
        newId = generateId();
    } while(kittens.find(kitten => (kitten.id == newId)) != undefined)

    if(kittens.find(kitten => (kitten.name == form.name.value)) == undefined)
    {
        let newKitten = {name: form.name.value, mood: "tolerant", affection: 5, id: newId};
        kittens.push(newKitten);
           
        resetForm();
        saveKittens();
        drawKittens();
    }
    else
    {
        alert("Kitten already exists with the same name.");
    }
}

/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens()
{
    window.localStorage.setItem("kittens", JSON.stringify(kittens));
}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens()
{
    let loadedKittens = JSON.parse(window.localStorage.getItem("kittens"));

    if(loadedKittens)
    {
        kittens = loadedKittens;
    }

    drawKittens();
}

function resetForm()
{
    addKittenForm.reset();
}

/**
 * Draw all of the kittens to the kittens element
 */
function drawKittens()
{
    let template = "";

    kittens.forEach(kitten => (template += 
        `<div class="kitten card w-20 m-3 ${kitten.mood}">
        <div>
          <img src="kitten_images/${kitten.mood}.png" alt="">
        </div>
        <div>
          <span>${kitten.name}</span>
        </div>
        <div>
          <span>${kitten.mood}</span>
        </div>
        <div class="d-flex flex-wrap space-between">
          <button class="btn-dark" onclick="pet('${kitten.id}')">Pet</button>
          <button class="btn-dark" onclick="catnip('${kitten.id}')">Feed Catnip</button>
        </div>
        <!-- <button class="btn-cancel" onlcick=">Delete Button</button> -->
        </div>
      </div>`));

    kittensContainer.innerHTML = template;
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */
function findKittenById(id)
{
   return kittens.findIndex(kitten => (kitten.id == id));
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id)
{
    let kitten = findKittenById(id);

    if(Math.random() > 0.5)
    {
        kittens[kitten].affection += 0.133 * (15 - kittens[kitten].affection);
    }
    else
    {
        kittens[kitten].affection -= 0.087 * (kittens[kitten].affection + 3);
    }

    console.log(kittens[kitten].affection);
    
    updateKittenMood(kitten);
    saveKittens();
    drawKittens();
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id)
{
    let kitten = findKittenById(id);

    kittens[kitten].mood = "tolerant";
    kittens[kitten].affection = 5;

    saveKittens();
    drawKittens();
}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function updateKittenMood(kitten)
{
    if(kittens[kitten].affection > 10)
    {
        kittens[kitten].mood = "happy";
    }
    else if(kittens[kitten].affection > 3)
    {
        kittens[kitten].mood = "tolerant";
    }
    else if(kittens[kitten].affection > 0)
    {
        kittens[kitten].mood = "angry";
    }
    else
    {
        kittens[kitten].mood = "gone";
    }

}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens()
{
    if(confirm("Really detele all kittens?"))
    for(let i = kittens.length; i > 0; i--)
    {
        kittens.pop();
        
        saveKittens();
        drawKittens();
    }
}

/**
 * Removes the welcome content and should probably draw the 
 * list of kittens to the page. Good Luck
 */
function getStarted()
{
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
resetForm();