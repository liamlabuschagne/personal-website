<?php
	$categories = ["Online","Android Download","Windows Download"];
	echo "<h1>Games</h1><p>Note: You must be logged in and activated to submit scores!</p><div class='text-center'><a href='./?action=highscores'>View highscores</a></div><div class='games'>";
	foreach($categories as $category)
	{
		$getGames = "SELECT name, image, description, link FROM games WHERE category = '$category' ORDER BY id DESC";
		$result = mysqli_query($dbc, $getGames);
		echo "<h2>".$category."</h2>";
		while ($row = mysqli_fetch_array($result)) {
			echo "<a href='".$row[3]."'><div class='game-preview'>";
			echo "<img src='".$row[1]."' alt='".$row[0]."' />";
			echo "<div class='game-text'><h2>".$row[0]."</h2>";
			echo "<p>".$row[2]."</p>";
			echo "<h3>Click to play</h3></div>";
			echo "</div></a>";
		}
	}
	echo "</div>";
?>