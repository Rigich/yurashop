var cart = [];

function addToCart(productName, price, imgSrc) {
    cart.push({name: productName, price: price, image: imgSrc});
    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function updateCart() {
    var cartItems = document.getElementById('cartItems');
    var cartItemList = document.getElementById('cartItemList');
    var totalPrice = document.getElementById('totalPrice');
    var total = 0;

    cartItems.innerText = cart.length;
    cartItemList.innerHTML = '';

    cart.forEach(function(item, index) {
        var listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            ${item.name} - ${item.price} грн
            <button class="delete-button" onclick="removeFromCart(${index})">Видалити з кошика</button>
        `;
        cartItemList.appendChild(listItem);
        total += item.price;
    });

    totalPrice.innerText = 'Загальна вартість: ' + total + ' грн';
}

function toggleCartMenu() {
    var cartMenu = document.getElementById('cartMenu');
    cartMenu.classList.toggle('show');
}

function showPaymentMenu() {
    var paymentMenu = document.getElementById('paymentMenu');
    paymentMenu.style.display = 'block';
}

function closePaymentMenu() {
    var paymentMenu = document.getElementById('paymentMenu');
    paymentMenu.style.display = 'none';
}

function makePayment() {
    var fullName = document.getElementById('fullName').value;
    var phoneNumber = document.getElementById('phoneNumber').value;
    var postOffice = document.getElementById('postOffice').value;

    // Отримання загальної суми до оплати
    var totalPayment = 0;
    cart.forEach(function(item) {
        totalPayment += item.price;
    });

    // Формування повідомлення про оплату
    var paymentMessage = `Переведіть кошти на карту 5169755904345390. Сума до оплати: ${totalPayment.toFixed(2)} грн`;

    // Отримання елементів для відображення GIF, таймера та повідомлення
    var loadingGif = document.getElementById('loadingGif');
    var countdownTimer = document.getElementById('timer');
    var paymentInstructions = document.getElementById('paymentInstructions');

    // Відображення GIF та таймера
    loadingGif.style.display = 'block';
    countdownTimer.style.display = 'block';

    // Початок таймера на 5 хвилин
    var timer = 5 * 60;
    var minutes, seconds;

    var countdown = setInterval(function() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        countdownTimer.innerHTML = minutes + ':' + seconds;

        if (--timer < 0) {
            clearInterval(countdown);
            loadingGif.style.display = 'none';
            countdownTimer.style.display = 'none';
            paymentInstructions.innerHTML = 'Час вичерпано. Спробуйте ще раз.';
        }
    }, 1000);

    // Симуляція функції оплати (можна замінити на реальний код оплати)
    setTimeout(function() {
        clearInterval(countdown);
        loadingGif.style.display = 'none';
        countdownTimer.style.display = 'none';
        paymentInstructions.innerHTML = 'Оплата успішно завершена.';
        // Очищення кошика
        cart = [];
        updateCart();
    }, 5000);

    // Показ повідомлення про оплату
    paymentInstructions.innerHTML = paymentMessage;

    return false; // Відміна відправки форми
}
