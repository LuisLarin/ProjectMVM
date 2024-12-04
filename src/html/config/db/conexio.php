<?php
$servername = "localhost"; // Cambia según tu configuración
$username = "admin"; // Tu usuario de MySQL
$password = "admin123"; // Tu contraseña de MySQL
$dbname = "casino_db"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

//Establir el conjunt de caracters a utf8
$conn->set_charset("uft8");

//Aqui deberia añadir mas codigo para poder implementar el formulario del pie de pagina 
//para que la persona que quiera contactar pueda hacerlo



?>
