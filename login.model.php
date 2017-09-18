<?php
    include('./dbsettings.php');

    if(isset($_POST['deleteCookie'])){
        unset($_POST['loginCookie']);
        exit();
    }
    if(isset($_COOKIE['loginCookie'])){
        exit(json_encode($_COOKIE['loginCookie']));
    } else {
        $dbConn = new mysqli(DBSETTINGS["host"], DBSETTINGS["user"], DBSETTINGS["password"], DBSETTINGS["database"]);
        $condition;
        $queryResult;
        if(isset($_POST['select'])){
            $user_id = isset($_POST['select']['user_id']) ? " user_id = '".$_POST['select']['user_id']."'" : null;
            $user_pw = isset($_POST['select']['user_pw']) ? " AND user_pw = '".$_POST['select']['user_pw']."'" : null;
            $condition = "WHERE $user_id $user_pw";
        }
        $query .= "SELECT * FROM user ".$condition;
        $result = $dbConn->query($query);

        $row = $result->fetch_assoc();

        setcookie('loginCookie', $row, time()+10);

        echo json_encode($row);
    }

    $dbConn->close();