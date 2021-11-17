// Axios calls will need to be formatted like this:
// axios.get("your endpoint url",
//     {
//       "x-api-key": "your API Key
//     })


import dotenv from 'dotenv';
dotenv.config();

const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;


const dropDown = document.querySelector("select");
const tryMeButton = document.querySelector("#try-me");
const picDisplay = document.querySelector("#cat-pic");

let response = async function() {
    await axios.get(`${BASE_URL}categories`,
    {
        "x-api-key" : API_KEY
    }).then(res => {
        console.log(res);
        const catCategories = res.data;
        for (let i = 0; i < catCategories.length; i++) {
            dropDown.innerHTML += `<option id=${catCategories[i].id}>${catCategories[i].name} <option/>`

        }
    })
    .catch(err => {
        console.log(err);
    })
}

tryMeButton.addEventListener("click", async() => {
    const categoryID = dropDown[dropDown.selectedIndex].id;
    // when we work with select elements in dropdown menus in DOM,
    // we are to use 'selectedIndex'.

        // asynchronus calls?
    try {
        const response = await axios.get(`${BASE_URL}images/search?category_ids=${categoryID}`,
    
    {
            "x-api-key" : API_KEY
        })

        const catPhoto = response.data[0].url;
        picDisplay.innerHTML = `<img src=${catPhoto}>`
    } catch (error) {
        console.log(error);
    }


})

