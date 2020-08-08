<?php
    $_POST = json_decode(file_get_contents('php://input'), true);

    $email = $_POST['email'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    $mail_to = "scooby_roma_doo@mail.ru";
    $subject = '=?utf-8?B?'.base64_encode("Сообщение от: $name.").'?=';
    $messageMail = "$message.\r\n\r\n\r\nПочта отправителя: $email\r\n\r\nНомер телефона отправителя: $phone";

    $success = mail($mail_to, $subject, $messageMail);

    echo ($success);
?>