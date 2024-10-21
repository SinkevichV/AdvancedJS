// Задание 2
// Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные сообщения, 
// вы решаете установить некоторые ограничения.

// Создайте HTML-структуру с текстовым полем для ввода отзыва, кнопкой для отправки и контейнером, где будут отображаться отзывы.

// Напишите функцию, которая будет добавлять отзыв в контейнер с отзывами. Однако если длина введенного отзыва менее 50 или более 500 символов,
//  функция должна генерировать исключение.

// При добавлении отзыва, он должен отображаться на странице под предыдущими отзывами, а не заменять их.

// const initialData = [
// {
// product: "Apple iPhone 13",
// reviews: [
// {
// id: "1",
// text: "Отличный телефон! Батарея держится долго.",
// },
// {
// id: "2",
// text: "Камера супер, фото выглядят просто потрясающе.",
// },
// ],
// },
// {
// product: "Samsung Galaxy Z Fold 3",
// reviews: [
// {
// id: "3",
// text: "Интересный дизайн, но дорогой.",
// },
// ],
// },
// {
// product: "Sony PlayStation 5",
// reviews: [
// {
// id: "4",
// text: "Люблю играть на PS5, графика на высоте.",
// },
// ],
// },
// ];

// Вы можете использовать этот массив initialData для начальной загрузки данных при запуске вашего приложения.


const initialData = [
    {
        product: "Apple iPhone 13",
        reviews: [
            { id: "1", text: "Отличный телефон! Батарея держится долго." },
            { id: "2", text: "Камера супер, фото выглядят просто потрясающе." },
        ],
    },
    {
        product: "Samsung Galaxy Z Fold 3",
        reviews: [
            { id: "3", text: "Интересный дизайн, но дорогой." },
        ],
    },
    {
        product: "Sony PlayStation 5",
        reviews: [
            { id: "4", text: "Люблю играть на PS5, графика на высоте." },
        ],
    },
];

const reviewsContainer = document.getElementById('reviewsContainer');

// Функция для отображения отзывов
function displayReviews() {
    reviewsContainer.innerHTML = '';
    initialData.forEach(product => {
        product.reviews.forEach(review => {
            const reviewDiv = document.createElement('div');
            reviewDiv.className = 'review';
            reviewDiv.textContent = review.text;
            reviewsContainer.appendChild(reviewDiv);
        });
    });
}

// Функция для добавления отзыва
function addReview(reviewText) {
    if (reviewText.length < 50 || reviewText.length > 500) {
        throw new Error("Отзыв должен быть от 50 до 500 символов.");
    }

    const newReview = {
        id: String(initialData[0].reviews.length + 1),
        text: reviewText
    };

    
    initialData[0].reviews.push(newReview);
    displayReviews();
}

// Обработчик события для кнопки
document.getElementById('submitReview').addEventListener('click', () => {
    const reviewInput = document.getElementById('reviewInput');
    const reviewText = reviewInput.value;
    try {
        addReview(reviewText);
        reviewInput.value = ''; // Очищаем поле ввода
    } catch (error) {
        alert(error.message);
    }
});

// Начальная загрузка отзывов
displayReviews();