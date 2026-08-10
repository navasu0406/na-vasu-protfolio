const reviewsAPI =
  "https://script.google.com/macros/s/AKfycbx3qIm_h_G2JUGsqLqCK9Jpb9YiumC8NU4klyMK0aE6TVdiAWMhbv4TJ0AaNvDCcsR6/exec";

const reviewsGallery =
  document.getElementById("reviews-gallery");

fetch(reviewsAPI)

  .then(response => {

    if (!response.ok) {
      throw new Error("Failed to fetch reviews");
    }

    return response.json();

  })

  .then(reviews => {

    reviewsGallery.innerHTML = "";

    if (!reviews || !reviews.length) {

      reviewsGallery.innerHTML = `
        <div class="review-loading">
          No reviews available yet.
        </div>
      `;

      return;
    }

    reviews.forEach(review => {

      const card = document.createElement("div");

      card.className = "review-card";

      card.innerHTML = `

        <div class="review-quote">
          “
        </div>

       

        <p class="review-text">
          ${review.review}
        </p>

        <div class="review-bottom">

          <div class="review-name">
            ${review.name}
          </div>

          <div class="review-platform">
            ${review.platform}
          </div>

        </div>

      `;

      reviewsGallery.appendChild(card);

    });

  })

  .catch(error => {

    console.error("Review error:", error);

    reviewsGallery.innerHTML = `
      <div class="review-loading">
        Unable to load reviews.
      </div>
    `;

  });