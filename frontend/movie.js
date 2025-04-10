const url = new URL(location.href);
const movieId = url.searchParams.get('id');
const movieTitle = url.searchParams.get('title');

// const API_LINK = 'http://localhost:8000/api/v1/reviews/';
const API_LINK = 'https://flickzy-backend.onrender.com/api/v1/reviews/';

const main = document.getElementById("section");
const title = document.getElementById("title");

title.innerText = movieTitle;
title.classList.add("movie-title-centered");

const div_new = document.createElement('div');
div_new.classList.add("review-container");
div_new.innerHTML = `
  <div class="review-form">
    <h3>New Review</h3>
    <p><strong>User:</strong><br>
      <input type="text" id="new_user" placeholder="Your name">
    </p>
    <p><strong>Review:</strong><br>
      <textarea id="new_review" placeholder="Write your thoughts..."></textarea>
    </p>
    <button onclick="saveReview('new_review', 'new_user')">💾 Save</button>
  </div>
`;

main.appendChild(div_new);

const reviewWrapper = document.createElement('div');
reviewWrapper.classList.add("review-wrapper");
main.appendChild(reviewWrapper);

returnReviews(API_LINK);

function returnReviews(url){
    fetch(url + 'movie/' + movieId).then(response => response.json()).then(function(data){
        console.log(data);
        data.forEach(review => {
            const div_card = document.createElement('div');
            div_card.innerHTML = `
              <div class="review-card" id="${review._id}">
                <p><strong>User:</strong> ${review.user}</p>
                <p><strong>Review:</strong> ${review.review}</p>
                <div class="review-actions">
                  <button onclick="editReview('${review._id}', \`${review.review}\`, \`${review.user}\`)">✏️ Edit</button>
                  <button onclick="deleteReview('${review._id}')">🗑 Delete</button>
                </div>
              </div>
            `;

            reviewWrapper.appendChild(div_card);
        });
    });
}

function editReview(id, review, user) {
    const element = document.getElementById(id);
    const reviewInputId = "review" + id;
    const userInputId = "user" + id;

    element.innerHTML = `
      <div class="review-card">
        <p><strong>Review:</strong><br>
          <input type="text" id="${reviewInputId}" value="${review}">
        </p>
        <p><strong>User:</strong><br>
          <input type="text" id="${userInputId}" value="${user}">
        </p>
        <div class="review-actions">
          <button onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾 Save</button>
        </div>
      </div>
    `;
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    if (id) {
      fetch(API_LINK + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });        
    } else {
      fetch(API_LINK + "new", {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
      }).then(res => res.json())
        .then(res => {
          console.log(res)
          location.reload();
        });
    }
}

function deleteReview(id) {
    fetch(API_LINK + id, {
      method: 'DELETE'
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        location.reload();
    });    
}



// const url = new URL(location.href);
// const movieId = url.searchParams.get('id');
// const movieTitle = url.searchParams.get('title');

// const API_LINK = 'http://localhost:8000/api/v1/reviews/';

// const main = document.getElementById("section");
// const title = document.getElementById("title");

// title.innerText = movieTitle;

// const div_new = document.createElement('div');
// div_new.innerHTML = `
//   <div class="review-form">
//     <h3>New Review</h3>
//     <p><strong>User:</strong><br>
//       <input type="text" id="new_user" placeholder="Your name">
//     </p>
//     <p><strong>Review:</strong><br>
//       <textarea id="new_review" placeholder="Write your thoughts..."></textarea>
//     </p>
//     <button onclick="saveReview('new_review', 'new_user')">💾 Save</button>
//   </div>
// `;


// main.appendChild(div_new);

// returnReviews(API_LINK);

// function returnReviews(url){
//     fetch(url + 'movie/' + movieId).then(response => response.json()).then(function(data){
//         console.log(data);
//         data.forEach(review => {
//             const div_card = document.createElement('div');
//             div_card.innerHTML = `
//               <div class="review-card" id="${review._id}">
//                 <p><strong>User:</strong> ${review.user}</p>
//                 <p><strong>Review:</strong> ${review.review}</p>
//                 <div class="review-actions">
//                   <button onclick="editReview('${review._id}', \`${review.review}\`, \`${review.user}\`)">✏️ Edit</button>
//                   <button onclick="deleteReview('${review._id}')">🗑 Delete</button>
//                 </div>
//               </div>
//             `;




//             main.appendChild(div_card);
//         });
//     });
// }

// function editReview(id, review, user) {

//     const element = document.getElementById(id);
//     const reviewInputId = "review" + id
//     const userInputId = "user" + id
    
//     element.innerHTML = `
//                 <p><strong>Review: </strong>
//                   <input type="text" id="${reviewInputId}" value="${review}">
//                 </p>
//                 <p><strong>User: </strong>
//                   <input type="text" id="${userInputId}" value="${user}">
//                 </p>
//                 <p><a href="#" onclick="saveReview('${reviewInputId}', '${userInputId}', '${id}')">💾</a>
//                 </p>
    
//     `
// }

// function saveReview(reviewInputId, userInputId, id="") {
//     const review = document.getElementById(reviewInputId).value;
//     const user = document.getElementById(userInputId).value;
  
//     if (id) {
//       fetch(API_LINK + id, {
//         method: 'PUT',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"user": user, "review": review})
//       }).then(res => res.json())
//         .then(res => {
//           console.log(res)
//           location.reload();
//         });        
//     } else {
//       fetch(API_LINK + "new", {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json, text/plain, */*',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({"user": user, "review": review, "movieId": movieId})
//       }).then(res => res.json())
//         .then(res => {
//           console.log(res)
//           location.reload();
//         });
//     }
// }

// function deleteReview(id) {
//     fetch(API_LINK + id, {
//       method: 'DELETE'
//     }).then(res => res.json())
//       .then(res => {
//         console.log(res)
//         location.reload();
//     });    
// }


