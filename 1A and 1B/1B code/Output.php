<!-- output.php -->
<h1>With XmlHttpRequest</h1>
<?php 
$name = $_POST['name'];
$email = $_POST['email'];
$username = $_POST['username'];

echo "<div>Hi, " . htmlspecialchars($name) . "</div>";
echo "<div>Your email is: " . htmlspecialchars($email) . "</div>";
echo "<div>Your username is: " . htmlspecialchars($username) . "</div>";
?>
