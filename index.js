const dogImage = document.getElementById('dog-image');
const dogBreed = document.getElementById('dog-breed');
const dogWeight = document.getElementById('dog-weight');
const newDogButton = document.getElementById('new-dog');

function fetchDog() {
    fetch("https://api.thedogapi.com/v1/images/search?has_breeds=true")
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const dogData = data[0];
            const imageUrl= dogData.url;
            const breedName = dogData.breeds?.[0]?.name;
            const breedWeight = dogData.breeds?.[0]?.weight.imperial;


            dogImage.src = imageUrl;
            dogBreed.textContent = `Breed: ${breedName}`;
            dogWeight.textContent = `Weight: ${breedWeight} lbs`;
        })
        .catch(error => {
            console.error("Error fetching dog data:", error);
            dogBreed.textContent = "Error fetching dog data.";
            dogWeight.textContent = "";
        });
}

fetchDog();

newDogButton.addEventListener('click', fetchDog);