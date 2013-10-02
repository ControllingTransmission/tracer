Leap.loop(function(obj) {
  if (obj.hands.length < 1) return;

  var hand = obj.hands[0];

  var x = hand.palmPosition[0];
  var y = hand.palmPosition[1];
  var z = hand.palmPosition[2];

  var hue = Math.round(x) % 360;
  var saturation = Math.round(y/3);
  var lightness = Math.round(z/2);

  document.body.style.background = "hsl(" + hue + "," + saturation + "%," + lightness + "%)";
});