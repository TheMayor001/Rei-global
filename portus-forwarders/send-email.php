<?php

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit('Method Not Allowed');
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');

if ($name === '' || $email === '' || $phone === '' || $message === '') {
    http_response_code(400);
    exit('Please complete all required fields.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    exit('Please provide a valid email address.');
}

$to = 'info@portusforwarders.com';

$subject = 'New Website Contact Form Message';

$body = "A new message has been submitted through the Portus Forwarders website.\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Phone: " . $phone . "\n\n";
$body .= "Message:\n";
$body .= $message . "\n";

$headers = [];
$headers[] = 'From: website@portusforwarders.com';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'Content-Type: text/plain; charset=UTF-8';

$sent = mail(
    $to,
    $subject,
    $body,
    implode("\r\n", $headers)
);

if ($sent) {
    header('Location: contact.html?sent=1');
    exit;
}

http_response_code(500);
exit('Unable to send your message. Please try again later.');