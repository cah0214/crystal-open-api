const dogImage = document.getElementById('dog-image');
const dogBreed = document.getElementById('dog-breed');
const dogWeight = document.getElementById('dog-weight');
const newDogButton = document.getElementById('new-dog');

async function fetchDog() {
    try {
        // Fetch all breeds
        const response = await fetch("https://api.thedogapi.com/v1/breeds", {
            headers: {
                "x-api-key": "YOUR_API_KEY_HERE" // replace with your API key
            }
        });
        const data = await response.json();
        console.log("API Response:", data);

        // Pick a random breed
        const randomIndex = Math.floor(Math.random() * data.length);
        const dogData = data[randomIndex];

        const breedName = dogData.name || "Unknown Breed";
        const breedWeight = dogData.weight?.imperial || "N/A";

        // 🐶 If breed has an image, use it — otherwise fetch a random one
        let imageUrl = dogData.image?.url;

        if (!imageUrl) {
            console.log(`No image found for ${breedName}, fetching a random one...`);
            const imageResponse = await fetch("https://api.thedogapi.com/v1/images/search", {
                headers: {
                    "x-api-key": "YOUR_API_KEY_HERE"
                }
            });
            const imageData = await imageResponse.json();
            imageUrl = imageData[0].url;
        }

        // ✅ Update the DOM
        dogImage.src = imageUrl;
        dogBreed.textContent = `Breed: ${breedName}`;
        dogWeight.textContent = `Weight: ${breedWeight} lbs`;

    } catch (error) {
        console.error("Error fetching dog data:", error);
        dogBreed.textContent = "Error fetching dog data.";
        dogWeight.textContent = "";
    }
}


fetchDog();

newDogButton.addEventListener("click", fetchDog);
