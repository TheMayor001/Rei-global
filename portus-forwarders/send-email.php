<?php

header('Content-Type: application/json; charset=UTF-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);

    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method.'
    ]);

    exit;
}

$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$message = trim($_POST['message'] ?? '');


// ----------------------------------------------------------
// Validate required fields
// ----------------------------------------------------------

if (
    $name === '' ||
    $email === '' ||
    $phone === '' ||
    $message === ''
) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Please complete all required fields.'
    ]);

    exit;
}


// ----------------------------------------------------------
// Validate email address
// ----------------------------------------------------------

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);

    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid email address.'
    ]);

    exit;
}


// ----------------------------------------------------------
// Email configuration
// ----------------------------------------------------------

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


// ----------------------------------------------------------
// Send email
// ----------------------------------------------------------

$sent = mail(
    $to,
    $subject,
    $body,
    implode("\r\n", $headers)
);


// ----------------------------------------------------------
// Return result
// ----------------------------------------------------------

if ($sent) {
    echo json_encode([
        'success' => true,
        'message' => 'Your message has been sent successfully.'
    ]);

    exit;
}


http_response_code(500);

echo json_encode([
    'success' => false,
    'message' => 'We were unable to send your message right now. Please try again later.'
]);

exit;