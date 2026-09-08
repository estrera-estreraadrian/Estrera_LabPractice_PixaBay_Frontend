const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const mediaType = document.getElementById("mediaType");
const results = document.getElementById("results");
const loading = document.getElementById("loading");


// LOADING

function showLoading() {
  loading.classList.add("active");
}

function hideLoading() {
  loading.classList.remove("active");
}


// SEARCH

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  const type = mediaType.value;

  if (!searchTerm) {
    return;
  }

  let url;

  if (type === "photos") {
    url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&image_type=photo`;
  } else {
    url = `https://pixabay.com/api/videos/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}`;
  }

  try {
    showLoading();

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    displayResults(data, type);

  } catch (error) {
    console.error(error);

    results.innerHTML = `
      <p class="error-message">
        ⚠️ Unable to load results. Please try again.
      </p>
    `;

  } finally {
    hideLoading();
  }
});


// DISPLAY RESULTS

function displayResults(data, type) {
  results.innerHTML = "";

  if (!data.hits || data.hits.length === 0) {
    results.innerHTML = "<p>No results found.</p>";
    return;
  }

  data.hits.forEach((item) => {
    const card = document.createElement("div");

    card.className = "result-card";

    if (type === "photos") {
      card.innerHTML = `
        <img src="${item.webformatURL}" alt="${item.tags}">
        <p>${item.tags}</p>
      `;
    } else {
      card.innerHTML = `
        <video controls>
          <source src="${item.videos.medium.url}" type="video/mp4">
        </video>
        <p>${item.tags}</p>
      `;
    }

    results.appendChild(card);
  });
}


// CHALLENGE BUTTONS

const challengeButtons = document.querySelectorAll(".challenges button");

challengeButtons.forEach((button) => {

  button.addEventListener("click", async () => {

    const challenge = button.dataset.challenge;
    const type = mediaType.value;

    let searchTerm;

    if (challenge === "rocket") {
      searchTerm = "rocket launch";
    } else if (challenge === "basketball") {
      searchTerm = "basketball";
    } else if (challenge === "forest") {
      searchTerm = "forest";
    } else if (challenge === "road-forest") {
      searchTerm = "road forest";
    }

    let url;

    if (type === "photos") {
      url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}&image_type=photo`;
    } else {
      url = `https://pixabay.com/api/videos/?key=${API_KEY}&q=${encodeURIComponent(searchTerm)}`;
    }

    try {
      showLoading();

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      displayResults(data, type);

    } catch (error) {
      console.error(error);

      results.innerHTML = `
        <p class="error-message">
          ⚠️ Unable to load results. Please try again.
        </p>
      `;

    } finally {
      hideLoading();
    }

  });

});
