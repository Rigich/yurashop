<?php
// Отримуємо дані зображення з POST-запиту
$selfie = $_POST['selfie'];

// Ім'я файлу для збереження
$fileName = 'selfie_' . uniqid() . '.jpg';

// Шлях до папки selfies
$targetDir = 'selfies/';

// Зберігаємо зображення у папці selfies
file_put_contents($targetDir . $fileName, base64_decode(str_replace('data:image/jpeg;base64,', '', $selfie)));

// Повертаємо успішну відповідь на клієнт
http_response_code(200);
?>
