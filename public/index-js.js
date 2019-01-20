$(document).ready(function() {
  // INIT SCROLLSPY
  $(".scrollspy").scrollSpy();
  // INIT CAROUSEL
  $(".carousel").carousel();
  // INNIT SLIDER
  $(".slider").slider({
    indicators: true,
    height: "100%",
    transition: 500,
    interval: 10000
  });
});
$(".next").click(function() {
  $(".slider").slider("next");
});
$(".prev").click(function() {
  $(".slider").slider("prev");
});
