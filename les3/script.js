document.addEventListener('DOMContentLoaded', () => {
    const addReviewButton = document.getElementById('add-review');
    const productNameInput = document.getElementById('product-name');
    const reviewTextInput = document.getElementById('review-text');
    const productList = document.getElementById('product-list');

 
    const loadReviews = () => {
        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        productList.innerHTML = '';

        for (const product in reviews) {
            const productItem = document.createElement('li');
            productItem.textContent = product;
            productItem.classList.add('product-item');
            productItem.onclick = () => showReviews(product, reviews[product]);
            productList.appendChild(productItem);
        }
    };

   
    const showReviews = (product, reviews) => {
        const existingReviews = document.querySelector('.review-list');
        if (existingReviews) existingReviews.remove();

        const reviewList = document.createElement('ul');
        reviewList.classList.add('review-list');

        reviews.forEach((review, index) => {
            const reviewItem = document.createElement('li');
            reviewItem.textContent = review;
            reviewItem.classList.add('review-item');

            const deleteButton = document.createElement('span');
            deleteButton.textContent = ' [Удалить]';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = (e) => {
                e.stopPropagation();
                deleteReview(product, index);
            };

            reviewItem.appendChild(deleteButton);
            reviewList.appendChild(reviewItem);
        });

        productList.appendChild(reviewList);
    };


    addReviewButton.onclick = () => {
        const productName = productNameInput.value;
        const reviewText = reviewTextInput.value;

        if (!productName || !reviewText) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        const reviews = JSON.parse(localStorage.getItem('reviews')) || {};
        if (!reviews[productName]) {
            reviews[productName] = [];
        }
        reviews[productName].push(reviewText);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        productNameInput.value = '';
        reviewTextInput.value = '';
        loadReviews();
    };


    const deleteReview = (product, index) => {
        const reviews = JSON.parse(localStorage.getItem('reviews'));
        reviews[product].splice(index, 1);
        if (reviews[product].length === 0) {
            delete reviews[product];
        }
        localStorage.setItem('reviews', JSON.stringify(reviews));
        loadReviews();
    };

    loadReviews();
});