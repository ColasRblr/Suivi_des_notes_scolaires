<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1278000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');


$file = fopen("./grades.json", "r+");
$jsonDoc = "";
while (($buffer = fgets($file, 4096)) !== false) {
    $jsonDoc .= $buffer;
}

$json = json_decode($jsonDoc);

// add a new grade
if (isset($_POST["create"]) && $_POST["create"] == "true") {
    $content = json_decode($_POST["content"]);
    array_push($json, $content);
    file_put_contents('./grades.json', json_encode($json, JSON_UNESCAPED_UNICODE));
}

// delete a grade

if (isset($_POST["delete"]) && $_POST["delete"] == "true") {
    $id = $_POST["id"];

    foreach ($json as $key => $note) {
        if ($note->id == $id) {
            array_splice($json, $key, 1);
            break;
        }
    }
    file_put_contents('./grades.json', json_encode($json, JSON_UNESCAPED_UNICODE));
}

// modify a grade 
if (isset($_POST["modify"]) && $_POST["modify"] == "true") {
    $grade = JSON_decode($_POST["grade"]);
    var_dump($grade);

    $idGrade = $grade->id;
    $value = $grade->value;
    $date = $grade->date;
    $type = $grade->type;
    $comment = $grade->comment;

    foreach ($json as $key => $note) {
        if ($note->id == $idGrade) {
            $note->value = $value;
            $note->date = $date;
            $note->type = $type;
            $note->comments = $comment;
            break;
        }
    }
    file_put_contents('./grades.json', json_encode($json, JSON_UNESCAPED_UNICODE));
}


fclose($file);
