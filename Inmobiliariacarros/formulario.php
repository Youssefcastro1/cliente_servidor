<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Formulario de Inmobiliaria de Carros</title>
</head>
<body>
    <h1>Formulario de Inmobiliaria de Carros</h1>
    <form action="procesar_formulario.php" method="POST" enctype="multipart/form-data">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" required><br><br>
        
        <label for="fecha_nacimiento">Fecha de Nacimiento:</label>
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required><br><br>
        
        <label for="marca">Marca de Carro:</label>
        <select id="marca" name="marca">
            <option value="Toyota">Toyota</option>
            <option value="Honda">Honda</option>
            <option value="Ford">Ford</option>
            <option value="Chevrolet">Chevrolet</option>
        </select><br><br>
        
        <label for="imagen">Imagen del Carro:</label>
        <select id="imagen" name="imagen">
            <option value="COROLLA.png">Imagen 1</option>
            <option value="Honda.jpg">Imagen 2</option>
            <option value="Ford.jpg">Imagen 3</option>
            <option value="Chevrolet.jpg">Imagen 4</option>
        </select><br><br>
        
        <input type="submit" value="Enviar">
    </form>
</body>
</html>

