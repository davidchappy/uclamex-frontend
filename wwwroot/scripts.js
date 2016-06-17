// Main nav hover effect
$(".nav-item").hover(
	function () {
		$(this).siblings().removeClass('selected');
		$(this).addClass('selected'); 
	}, function() {
		$(this).removeClass('selected'); 
	}
); 

// List item hover effect
$(".list-item").hover(
	function () {
		$(this).siblings().removeClass('list-item-selected');
		$(this).addClass('list-item-selected'); 
	}, function() {
		$(this).removeClass('list-item-selected'); 
	}
); 


// Make rows clickable
$(".list-item").click(function() {
  window.document.location = $(this).data("href");
});