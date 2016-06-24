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
// $("#nav-link").click(function(event) {
// 	event.preventDefault();
// 	$("#sidebar").css("width", "0");
// 	$("#primary-view").css("width", "100%");
// })

// Get pages (using Ajax) by link's id name
function getPage(pageName) {
	console.log("You got this far!");
	$.ajax({
		url: pageName + ".html",
		cache: false
	}).done(function( html ) {
			$("#main-content").html(html);
		})	
}

// Function and request to bind nav links to the getPage function
function bindNavLinks() {
	$(".nav-item a").each(function() {
		var idName = $(this).attr("id");
		console.log(idName);
		$(this).click(function() {
			console.log("you clicked");
			getPage(idName);
		});
	}); 
}
bindNavLinks();