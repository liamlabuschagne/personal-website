<?php
	if(isset($_SESSION['username']))
	{
		$username = $_SESSION['username'];
		if(isset($_GET['score']) && isset($_GET['game']) && $_SESSION['active'] == 1)
		{
			$score = $_GET['score'];
			$game = mysqli_real_escape_string($dbc,$_GET['game']);
			if(isset($_GET['extra_info']))
				$extra_info = $_GET['extra_info'];
			else
				$extra_info = "";
			
			$checkQuery = "SELECT id FROM highscores WHERE username = '$username' AND game = '$game'";
			$id = mysqli_fetch_row(mysqli_query($dbc,$checkQuery))[0];
			if($id){
				$getScoreQuery = "SELECT score FROM highscores WHERE username = '$username' AND game = '$game'";
				$dbScore =  mysqli_fetch_row(mysqli_query($dbc,$getScoreQuery))[0];
				if($dbScore < $score)
					$submitQuery = "UPDATE highscores SET score = '$score', extra_info = '$extra_info' WHERE id = '$id'";
			}
			else
				$submitQuery = "INSERT INTO highscores (username,score,game,extra_info) VALUES ('$username','$score','$game','$extra_info')";
			
			mysqli_query($dbc,$submitQuery);
			header("Location: ./?action=highscores");
		}
		else
			header("Location: ./?action=activate_account");
	}	
	else
		header("Location: ./?action=highscores");
?>