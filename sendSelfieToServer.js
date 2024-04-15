function sendImageToServer(imageDataURL) {
    // Створюємо FormData об'єкт для передачі даних на сервер
    var formData = new FormData();
    formData.append('selfie', imageDataURL);

    // Відправляємо POST-запит на сервер
    fetch('save-selfie.php', {
        method: 'POST',
        body: formData
    })
    .then(function(response) {
        if (response.ok) {
            console.log('Селфі успішно збережено на сервері!');
        } else {
            console.error('Не вдалося зберегти селфі на сервері:', response.statusText);
        }
    })
    .catch(function(error) {
        console.error('Помилка збереження селфі на сервері:', error);
    });
}
