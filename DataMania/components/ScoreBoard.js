function scoreBoard() {
  // Get the value of the input field with id="numb"
  let s1 = document.getElementById("score1").value;
  let s2 = document.getElementById("score1").value;
  // If the two scores are greater than 100 or less than 100,000
  let text;
  if (isNaN(s1) || x < 100 || x > 100000) {
    text = "Input not valid";
  } else {
    text = s1;
  }
  if (isNaN(s2) || x < 100 || x > 100000) {
    text = "Input not valid";
  } else {
    text = s2;
  }
  document.getElementById("demo").innerHTML = text;
}
