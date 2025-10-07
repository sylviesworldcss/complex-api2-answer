const descriptionDiv = document.querySelector(".description");
const button = document.querySelector("button");
button.addEventListener("click", getArt);
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", reset);

//Function
async function getArt() {
  descriptionDiv.innerHTML = "";
  //API's Used and Query Params
  const randomPage = Math.floor(Math.random() * 300); //this is giving us a random page of art between 0-99 rather than a decimal
  const artUrl = `https://api.artic.edu/api/v1/artworks?page=${randomPage}&limit=3&fields=id,title,artist_display,date_display,image_id,main_reference_number`;
  const poetryUrl = "https://poetrydb.org/author/William Shakespeare";

  try {
    const artResponse = await fetch(artUrl);
    const artData = await artResponse.json(); //taking the response processing so it's ready to use in javascript
    const artworks = artData.data;
    descriptionDiv.innerText = "";
    const poemResponse = await fetch(poetryUrl);
    const poems = await poemResponse.json();
    const randomPoem = poems[Math.floor(Math.random() * poems.length)]; // used in slot machine code. goes into the poems array index and multiplies the length of the poem array to populate a random poem.
    artworks.forEach((art) => {
      const { title, id, artist_display, date_display, image_id } = art;
      const artworkCard = document.createElement("div");
      const artworkTitle = document.createElement("h2");
      const artworkArtist = document.createElement("p");
      const artworkDate = document.createElement("p");
      const artworkImg = document.createElement("img");
      artworkImg.src = `https://www.artic.edu/iiif/2/${image_id}/full/843,/0/default.jpg`; //chicago art institute documentation
      artworkImg.alt = title;
      artworkTitle.innerText = title;
      artworkArtist.innerText = artist_display;
      artworkDate.innerText = `Date: ${date_display}`;
      //Appending The Cards
      artworkCard.appendChild(artworkImg);
      artworkCard.appendChild(artworkTitle);
      artworkCard.appendChild(artworkArtist);
      artworkCard.appendChild(artworkDate);
      descriptionDiv.appendChild(artworkCard);
    });
    const poemCard = document.createElement("div");
    const poemTitle = document.createElement("h3");
    const poemLines = document.createElement("p");
    poemTitle.innerText = `Poem: ${randomPoem.title}`;
    poemLines.innerText = randomPoem.lines;
    poemCard.appendChild(poemTitle);
    poemCard.appendChild(poemLines);
    descriptionDiv.appendChild(poemCard);
    console.log(artData);
  } catch (error) {
    console.error(error);
  }
}
function reset() {
  descriptionDiv.innerHTML = "";
}


// psuedo psuedo
// get and display chicago art institute api artworks in the dom
// each artwork will display a random shakespeare poem from poetryDB api
// https://api.artic.edu/docs/#iiif-image-api
// https://github.com/thundercomb/poetrydb#readme


//SOURCES
//Worked on with Maureen Zitouni RC 2025B and used NASA project and weather app I worked on with Ryan Hernandez-French RC Alum as template, google gemini for debugging aid
//referenced @Leon Noel Lecture, @mdn @dcode https://www.youtube.com/watch?v=X6MFUagtKiQ
//mdn Math.random https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
