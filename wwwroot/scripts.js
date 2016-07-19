// Load Inicio by default
getPage("svgsprite", "svgsprite.html");
getMainPage("inicio");

// ******* General Interactivity *******

// Main nav hover and active effects

$(".nav-item").on({ 
	click: function() {
		$(this).siblings().removeClass('active');
		$(this).addClass('active');
		$(this).siblings().children('a').children('svg.selected-arrow').detach();
		$(this).children('a').append('<svg class="selected-arrow"><use xlink:href="#selected-arrow"/></svg>');
		// $(this).siblings().children('a').detach('svg.selected-arrow'); 
		// $(this).children('a').append('<svg class="selected-arrow"><use xlink:href="#selected-arrow"/></svg>');
	},
	mouseenter: function() {
		$(this).siblings().removeClass('selected');
		$(this).addClass('selected'); 
	},
	mouseleave: function() {
		$(this).removeClass('selected'); 
	}
});

// List item hover and click effects
$(document).on({
	click: function() {
 		window.document.location = $(this).data("href");
	},
	mouseenter: function() {
		$(this).siblings().removeClass('list-item-selected');
		$(this).addClass('list-item-selected');
	},
	mouseleave: function() {
		$(this).removeClass('list-item-selected');
	}
}, '.list .list-item');


// Hide sidebar when clicking nav link
// $("#nav-link").click(function(event) {
// 	event.preventDefault();
// 	$("#sidebar").css("width", "0");
// 	$("#primary-view").css("width", "100%");
// })


// ******* AJAX *******

// Get any extra page with target id and file name
function getPage(targetID, fileName) {
	$.ajax({
		url: fileName,
		cache: true
	}).done(function( h ) {
			$("#" + targetID).html(h);
	});	
}

// Get main content pages by link's id name
function getMainPage(pageName) {
	$.ajax({
		url: pageName + ".html",
		cache: false
	}).done(function( h ) {
			$("#main-content").html(h);
			// these are temporary and should be replaced with a function that serves all Ajax-loaded pages
			$('.column-calif-clases').hide();
			$('.column-calif-grades').hide();
			displayMajors();
	});	
}

// Function and request to bind nav links to the getPage function
function bindNavLinks() {
	$(".nav-item a").each(function() {
		var idName = $(this).attr("id");
		$(this).click(function() {
			getMainPage(idName);
		});
	}); 
}
bindNavLinks();


// ******* Calificaciones Section *******


// *** Add Calificaciones Form *** //

$(document).on('click', '#add-grades', function(event) {
	event.preventDefault();
	console.log('clicked');
	$('.modal-popup').css('display', 'block');
});

$('#close-form').click(function(event) {
	$('#add-grades-popup').css('display', 'none');
});

$('#add-student-button').click(function(event) {
	event.preventDefault();
	$('#alumnos').append('<select name="alumno" class="alumno-select"><option value="" disabled selected>Escoga un alumno</option><option class="alumno-option" value="Jordan Chapman">Jordan Chapman</option><option class="alumno-option" value="Nathan Chapman">Nathan Chapman</option></select>');
	$('#grades').append('<input type="text" class="new-grade-field" name="grade" placeholder="Calificación">');
});


// *** "Por Clase" view *** //

// All active majors
var majors =  { 
	2: 'Teología', 
	43: 'Tronco Común',
	20: 'Música Sacra',
	10: 'Contaduría',
	23: 'Derecho',
	66: 'Administración'
};

// All active courses, organized by major id
var majorCourses = { 
	2: {
			101: 'Teologia 1',
			102: 'Teologia 2',
			103: 'Teologia 3',
			104: 'Teologia 4',
			105: 'Teologia 5',
			106: 'Teologia 6'
		 }, 
	43: {
			201: 'Contaduría 1',
			202: 'Contaduría 2',
			203: 'Contaduría 3',
			204: 'Contaduría 4',
			205: 'Contaduría 5',
			206: 'Contaduría 6'
		 }, 
	20: {
			301: 'Administración de la Música en la Iglesia',
			302: 'Introducción a la Música',
			303: 'Historia de la Música I',
			304: 'Dirección General I',
			305: 'Armonía I',
			306: 'Dirección Coral'
		 }, 
	10: {
			401: 'Derecho 1',
			402: 'Derecho 2',
			403: 'Derecho 3',
			404: 'Derecho 4',
			405: 'Derecho 5',
			406: 'Derecho 6'
		 }, 
	23: {
			501: 'Tronco Común 1',
			502: 'Tronco Común 2',
			503: 'Tronco Común 3',
			504: 'Tronco Común 4',
			505: 'Tronco Común 5',
			506: 'Tronco Común 6'
		 }, 
	66: {
			601: 'Administración 1',
			602: 'Administración 2',
			603: 'Administración 3',
			604: 'Administración 4',
			605: 'Administración 5',
			606: 'Administración 6'
		 }
};

// All course events, organized by class id, then by event id
var courseEventInfo = {
	101: {
		1001: { 'gradeEvent' : 'Examen 1', 'term' : 'Primero', 'parcial' : 'Primero', 'noStudents': 15 },
		1002: { 'gradeEvent' : 'Examen 2', 'term' : 'Segundo', 'parcial' : 'Tercero', 'noStudents': 3},
		1003: { 'gradeEvent' : 'Control 1', 'term' : 'Primero', 'parcial' : 'Segundo', 'noStudents': 11 }
	},
	102: {
		1001: { 'gradeEvent' : 'Examen 1', 'term' : 'Primero', 'parcial' : 'Primero', 'noStudents': 15 },
		1002: { 'gradeEvent' : 'Examen 2', 'term' : 'Segundo', 'parcial' : 'Tercero', 'noStudents': 3},
		1003: { 'gradeEvent' : 'Control 1', 'term' : 'Primero', 'parcial' : 'Segundo', 'noStudents': 11 }
	},
	103: {
		1001: { 'gradeEvent' : 'Examen 1', 'term' : 'Primero', 'parcial' : 'Primero', 'noStudents': 15 },
		1002: { 'gradeEvent' : 'Examen 2', 'term' : 'Segundo', 'parcial' : 'Tercero', 'noStudents': 3},
		1003: { 'gradeEvent' : 'Control 1', 'term' : 'Primero', 'parcial' : 'Segundo', 'noStudents': 11 }
	},
	104: {
		1001: { 'gradeEvent' : 'Examen 1', 'term' : 'Primero', 'parcial' : 'Primero', 'noStudents': 15 },
		1002: { 'gradeEvent' : 'Examen 2', 'term' : 'Segundo', 'parcial' : 'Tercero', 'noStudents': 3},
		1003: { 'gradeEvent' : 'Control 1', 'term' : 'Primero', 'parcial' : 'Segundo', 'noStudents': 11 }
	},
	105: {
		1001: { 'gradeEvent' : 'Examen 1', 'term' : 'Primero', 'parcial' : 'Primero', 'noStudents': 15 },
		1002: { 'gradeEvent' : 'Examen 2', 'term' : 'Segundo', 'parcial' : 'Tercero', 'noStudents': 3},
		1003: { 'gradeEvent' : 'Control 1', 'term' : 'Primero', 'parcial' : 'Segundo', 'noStudents': 11 }
	},
	106: {
		1001: { 'gradeEvent' : 'Examen 1', 'term' : 'Primero', 'parcial' : 'Primero', 'noStudents': 15 },
		1002: { 'gradeEvent' : 'Examen 2', 'term' : 'Segundo', 'parcial' : 'Tercero', 'noStudents': 3},
		1003: { 'gradeEvent' : 'Control 1', 'term' : 'Primero', 'parcial' : 'Segundo', 'noStudents': 11 }
	}
};

function displayMajors() {
	// [SELECT MajorName FROM Aca_Majors];

	$.each( majors, function(id, name) {
		$('#majors').append('<tr class="list-item" data-majID="' + id + '" data-href="#"><td>' + name + '</td></tr>');
	});
}

function getMajorCourses(majorID) {
	$('#major-courses tbody').empty();
	// assumes that MajorCourses includes general courses
	// [SELECT CourseTitle FROM Aca_Courses, Aca_MajorCourses WHERE CourseID = IDCourse   ]; 
	var courseList = majorCourses[majorID];
	$.each( courseList, function(id, name) {
		$('#major-courses').append('<tr class="list-item" data-href="#" data-classID="' + id + '"><td>' + name + '</td></tr>');
	});
}

function getCourseEvents(courseID) {
	$('#grade-listings tbody').empty();
	var eventList = courseEventInfo[courseID];
	console.log(eventList);
	$.each(eventList, function(id, o) {
		$(o).each( function() {
		$('#grade-listings').append('<tr class="list-item" data-href="#"><td>' + o.gradeEvent + '</td><td>' + o.term + '</td><td>' + o.parcial + '</td><td>' + o.noStudents + '</td></tr>');
		});
	});
}

// Bind click events in Carrera column
$(document).on({
	click: function() {
		//these are temporary and should be replaced with call to displayMajorCourses()
		$('.column-calif-grades').hide();
 		$('.column-calif-clases').show();
 		getMajorCourses($(this).attr('data-majID'));
	}
}, '.column-calif-carrera .list tbody tr');

// Bind click events in Clases column
$(document).on({
	click: function() {
 		$('.column-calif-grades').show();
 		getCourseEvents($(this).attr('data-classid'));
	}
}, '.column-calif-clases .list tbody tr');