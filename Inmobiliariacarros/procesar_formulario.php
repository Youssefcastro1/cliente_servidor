<?php
// Verificamos si se ha enviado el formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obtenemos los datos del formulario
    $nombre = $_POST["nombre"];
    $fecha_nacimiento = $_POST["fecha_nacimiento"];
    $marca = $_POST["marca"];
    $tipo = $_POST["tipo"];
    
    // Procesamos la imagen
    $imagen_nombre = $_FILES["imagen"]["name"];
    $imagen_temp = $_FILES["imagen"]["tmp_name"];
    $imagen_destino = "imagenes/" . $imagen_nombre;
    move_uploaded_file($imagen_temp, $imagen_destino);
    
    // Calculamos la edad a partir de la fecha de nacimiento
    $fecha_actual = new DateTime();
    $fecha_nac = new DateTime($fecha_nacimiento);
    $edad = $fecha_actual->diff($fecha_nac)->y;
    
    // Mostramos los resultados
    echo "<h2>Resultados del Formulario:</h2>";
    echo "<p><strong>Nombre:</strong> $nombre</p>";
    echo "<p><strong>Fecha de Nacimiento:</strong> $fecha_nacimiento</p>";
    echo "<p><strong>Edad:</strong> $edad años</p>";
    echo "<p><strong>Marca de Carro:</strong> $marca</p>";
    echo "<p><strong>Tipo de Carro:</strong> $tipo</p>";
    echo "<p><strong>Imagen del Carro:</strong><br><img src='$imagen_destino' alt='Imagen del Carro'></p>";
} else {
    // Si no se ha enviado el formulario, redirigimos al usuario
    header("Location: formulario.php");
    exit();
}
?>
