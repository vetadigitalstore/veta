<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>File Browser</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ddd;
        }
        th {
            background-color: #f4f4f4;
        }
        tr:hover {
            background-color: #f9f9f9;
        }
        a {
            text-decoration: none;
            color: #007BFF;
        }
        a:hover {
            text-decoration: underline;
        }
        .header {
            text-align: center;
            font-size: 24px;
            margin-bottom: 20px;
            color: #333;
        }
        .path {
            margin-bottom: 10px;
            font-size: 16px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="header">File Browser</div>
    <div class="path">Current Path: <?php echo getcwd(); ?></div>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Size (KB)</th>
                <th>Last Modified</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $files = scandir(getcwd());
            foreach ($files as $file) {
                if ($file == "." || $file == "..") continue;

                $filePath = realpath($file);
                $fileType = is_dir($filePath) ? "Folder" : "File";
                $fileSize = is_file($filePath) ? round(filesize($filePath) / 1024, 2) : "-";
                $fileModified = date("F d Y H:i:s", filemtime($filePath));

                echo "<tr>";
                echo "<td><a href='{$filePath}' target='_blank'>{$file}</a></td>";
                echo "<td>{$fileType}</td>";
                echo "<td>{$fileSize}</td>";
                echo "<td>{$fileModified}</td>";
                echo "</tr>";
            }
            ?>
        </tbody>
    </table>
</body>
</html>