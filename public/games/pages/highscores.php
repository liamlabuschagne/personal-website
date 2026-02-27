<h1>Highscores</h1>
<p>Note: You must be logged in and activated to submit a score.</p>
<h2>How to submit a score</h2>
<p>At the end of each game which is set up to recieve high scores, you will see a 'submit score' button. Just press this and you will be redirected to this page!</p>
<h2>Report someone:</h2>
<p>If you believe that a user has submitted a score which is not legitimate you can click the following link: <a href='../?action=contactme'>Contact me</a>. Please sate the users name and game their score is submitted to. <br>Thanks, admin.</p>
<?php
	$getGames = "SELECT game FROM highscores";
	$res = mysqli_query($dbc,$getGames);
	$games = array();

	while($row = mysqli_fetch_row($res)){
		$matched = false;
		foreach ($games as $key => $game) {
			if($row[0] == $game){
				$matched = true;
			}
		}
		if(!$matched)
			array_push($games,$row[0]);
	}
	foreach ($games as $key => $game){
		$game_stripped = mysqli_real_escape_string($dbc,$game);
		$getScores = "SELECT * FROM highscores WHERE game = '$game_stripped' ORDER BY score DESC LIMIT 10";
		$res = mysqli_query($dbc,$getScores);
		echo "<div class='highscores'><h3>".$game."</h3><table><tr><th>Placing</th><th>Username</th><th>Score</th><th>Extra information</th></tr>";
		$count = 1;
		while($row = mysqli_fetch_row($res)){
			echo "<tr><td>".$count."</td><td>".$row[1]."</td><td>".$row[2]."</td><td>".$row[4]."</td></tr>";
			$count++;
		}
		echo "</table></div>";
	}

?>