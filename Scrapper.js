const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { dirname } = require('path')
const readline = require('readline')
const { RSA_X931_PADDING } = require('constants')
/**
 * Name class="heading__title"
 * Ingredients id="ingredient-list_1-0"
 * Rating
 * Path for the image used
 */

const getDocument = async function (url) {
    // Request page
    const responce = await fetch(url)
    // Convert fetched page data to text
    const text = await responce.text()
    // Load page text into cheerio object
    const $ = cheerio.load(text)

    let ingredients = $('#ingredient-list_1-0').text().replace(/(^[ \t]*\n)/gm, '')
    let ingredientsList = ingredients.split('\n')
    ingredientsList.pop()

    // Parse data from page into drink object
    let drink = {
        "Name": $('.heading__title').text(),
        "Img": $('.img-placeholder').children('img').attr('src'),
        "Ingredients": ingredientsList,
    }

    // Log object parameters
    console.log(`Drink Name : ${drink.Name}`);
    console.log(`Image URL : ${drink.Img}`);
    console.log('Ingredients List:');
    for (ingredient of drink.Ingredients) {
        console.log(ingredient);
    }

    console.log();

    console.log(drink);


}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('Please enter a url: ', (answer) => {
      
    getDocument(answer)
 
  rl.close()

  });
