function scoreBoard() {
  // Get the value of the input field with id="numb"
  let x = document.getElementById("score1", "score2").value;
  // If x is Not a Number or less than one or greater than 10
  let text;
  if (isNaN(x) || x < 100 || x > 100000) {
    text = "Input not valid";
  } else {
    text = "Input OK";
  }
  document.getElementById("demo").innerHTML = text;
}
