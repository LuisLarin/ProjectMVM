<?php
$servername = "localhost"; // Cambia según tu configuración
$username = "admin"; // Tu usuario de MySQL
$password = "admin123"; // Tu contraseña de MySQL
$dbname = "casino_db"; // Nombre de tu base de datos

// Crear conexión
$conn = new mysqli($localhost, $admin, $admin123, $casino_db);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>