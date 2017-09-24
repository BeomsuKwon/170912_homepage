<?php
    include('./dbsettings.php');
    //오류 출력
    // error_reporting(E_ALL);
    // ini_set("display_errors", 1);

    $dbConn = new mysqli(DBSETTINGS["host"], DBSETTINGS["user"], DBSETTINGS["password"], DBSETTINGS["database"]);
    echo $dbConn->connect_error;
    $condition = null;

    if(isset($_POST['insert'])){
        $table = $_POST['insert']['table'];
        $post_pid = isset($_POST['insert']['post_pid']) ? $_POST['insert']['post_pid'] : '0';
        $user_id = $_POST['insert']['user_id'];
        $title = $_POST['insert']['title'];
        $content = $_POST['insert']['content'];
        $content = str_replace(' ', '&nbsp', $content);
        $content = nl2br($content);
        $date = new DateTime();
        $date = $date->format('Y-m-d H:i:s');

        $query = "INSERT INTO $table(post_pid, user_id, title, content, date) VALUES($post_pid, '$user_id', '$title', '$content', '$date')";
    } else if(isset($_POST['select'])) {
        $table = $_POST['select']['table'];
        $post_id = isset($_POST['select']['post_id']) ? "AND post_id = '".$_POST['select']['post_id']."'" : '';
        $post_pid = isset($_POST['select']['post_pid']) ? $_POST['select']['post_pid'] : "'0'";
        $pageIndex = isset($_POST['select']['pageIndex']) ? $_POST['select']['pageIndex'] - 1 : '';
        $perPage = isset($_POST['select']['perPage']) ? $_POST['select']['perPage'] : "20";
        $keyword = isset($_POST['select']['keyword']) ? $_POST['select']['keyword'] : "";
        $search = "";
        $limit = isset($_POST['select']['limit']) ? " LIMIT ".$pageIndex * $perPage.", $perPage " : "";
        if(isset($_POST['select']['keyword'])){
            switch($_POST['select']['keywordType']){
                case "작성자":
                    $search .= " AND user_id LIKE '%$keyword%'";
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
                default:
                    break;
            }
        }

        $query = "SELECT * FROM $table WHERE post_pid = $post_pid $search $post_id $limit";
        // echo $query."\n";
    } else if(isset($_POST['delete'])){
        $table = $_POST['delete']['table'];
        $post_id = $_POST['delete']['post_id'];
        $user_id = $_POST['delete']['user_id'];
        // AND user_id = '$user_id'
        $query = "DELETE FROM $table WHERE post_id = '$post_id'";
    } else if(isset($_POST['update'])){
        $table = $_POST['update']['table'];
        $post_id = $_POST['update']['post_id'];
        $title = isset($_POST['update']['title']) ? " title = '".$_POST['update']['title']."'" : '';
        $content = isset($_POST['update']['content']) ? ", content = '".$_POST['update']['content']."'" : '';
        $datetime = new DateTime();
        $update_date = isset($_POST['update']['update']) ? 
            " ,update_date = '".$datetime->format('Y-m-d H:i:s')."'" : '';
        $hits = isset($_POST['update']['hits']) ?
             " hits = (select * from (select hits+1 from post where post_id = ".$_POST['update']['post_id'].") as a) " : '';
        
        $query = "UPDATE $table SET $title $content $update_date $hits"." WHERE post_id = $post_id";
    }
    $result = $dbConn->query($query);

    $queryResult = null;
    while(gettype($result) == "object" && $row = $result->fetch_assoc()){
        $queryResult[] = $row;
    }
    echo json_encode($queryResult);

    // echo $query;

    $dbConn->close();