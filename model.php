<?php
    include('./dbsettings.php');
    //오류 출력
    // error_reporting(E_ALL);
    // ini_set("display_errors", 1);

    $dbConn = new mysqli(DBSETTINGS["host"], DBSETTINGS["user"], DBSETTINGS["password"], DBSETTINGS["database"]);
    $condition = null;

    if(isset($_POST['insert'])){
        $table = $_POST['insert']['table'];
        $user = $_POST['insert']['user_id'];
        $title = $_POST['insert']['title'];
        $content = $_POST['insert']['content'];
        $date = new DateTime();
        $date = $date->format('Y-m-d H:i:s');

        $query = "INSERT INTO $table(user_id, title, content, update_date, date) VALUES('$user', '$title', '$content', '$date')";

    } else if(isset($_POST['select'])) {
        $table = $_POST['select']['table'];
        $post_id = isset($_POST['select']['post_id']) ? "AND post_id = '".$_POST['select']['post_id']."'" : '';
        $p_id = isset($_POST['select']['p_id']) ? $_POST['select']['p_id'] : "'0'";
        $pageIndex = isset($_POST['select']['pageIndex']) ? $_POST['select']['pagIndex'] : '';
        $perPage = isset($_POST['select']['perPage']) ? $_POST['select']['perPage'] : "20";
        $keyword = isset($_POST['select']['keyword']) ? $_POST['select']['keyword'] : "";
        $search = "";

        switch($_POST['select']['keywordType']){
            case "작성자":
                $search .= " AND user_id LIKE '$keyword'";
                break;
            case "제목":
                $search .= " AND title LIKE '%$keyword%'";
                break;
            case "내용":
                $search .= " AND content LIKE '%$keyword%'";
                break;
            case "작성자+제목+내용":
                $search .= " AND user_id LIKE '%keyword%' OR title LIKE '%$keyword%' OR content LIKE '%$keyword%'";
                break;
        }
        $limit = " LIMIT ".$pageIndex * $perPage.", $perPage ";

        $query = "SELECT * FROM $table WHERE p_id = $p_id $search $post_id $limit";
        
    } else if(isset($_POST['delete'])){
        $table = $_POST['delete']['table'];
        $post_id = $_POST['delete']['post_id'];
        $user_id = $_POST['delete']['user_id'];

        $query = "DELETE FROM $table WHERE post_id = '$post_id' AND user_id = '$user_id'";
    } else if(isset($_POST['update'])){
        $table = $_POST['update']['table'];
        $post_id = $_POST['update']['post_id'];
        $title = isset($_POST['update']['title']) ? " title = '".$_POST['update']['title']."'" : '';
        $content = isset($_POST['update']['content']) ? ", content = '".$_POST['update']['content']."'" : '';
        $hits = isset($_POST['update']['hits']) ?
             " hits = (select * from (select hits+1 from post where post_id = ".$_POST['update']['post_id'].") as a) " : '';

        $query = "UPDATE $table SET $title $content $hits"." WHERE post_id = $post_id";
    }
    $result = $dbConn->query($query);

    $queryResult = null;
    while(gettype($result) == "object" && $row = $result->fetch_assoc()){
        $queryResult[] = $row;
    }
    echo json_encode($queryResult);

    $dbConn->close();