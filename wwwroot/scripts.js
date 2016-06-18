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

// Make list rows clickable
$(".list-item").click(function() {
  window.document.location = $(this).data("href");
});

// Hide sidebar when clicking nav link
$("#nav-link").click(function(event) {
	event.preventDefault();
	$("#sidebar").css("width", "0");
	$("#primary-view").css("width", "100%");
})