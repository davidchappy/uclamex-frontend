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
 		$(this).siblings('.list-item').removeClass('active');
 		$(this).addClass('active');
	},
	mouseenter: function() {
		$(this).siblings().removeClass('list-item-selected');
		$(this).addClass('list-item-selected');
	},
	mouseleave: function() {
		$(this).removeClass('list-item-selected');
	}
}, '.list .list-item');

// Gray out select boxes until clicked
function selectBox(sel) {
	$(sel).css('color', '#3D464D');
}
function deselectBox(sel) {
	$(sel).css('color', '#9B9B9B')
}
$(document).on('change', 'select', function() {
	selectBox(this);
});

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
function getMainPage(pageurl) {
	$.ajax({
		url: pageurl,
		cache: false
	}).done(function( h ) {
			$('#main-content').html(h);
			loadCalificaciones();
	});	
	// Page URLs are visible in browser path
	// if(pageurl!=window.location){
	// 	window.history.pushState({path:pageurl},'',pageurl);
	// }
};

// Tie each nav item to the getMainPage() function
$(function(){
	$('li.nav-item a').click(function(e){
		e.preventDefault();
		var pageurl = $(this).attr('href');
		getMainPage(pageurl);
		// return false;
	});
});


// Function and request to bind nav links to the getPage function
function bindNavLinks() {
	// override default click action

}
bindNavLinks();


// ******* Calificaciones Section *******

// *** Data *** //

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

var studentsByEvent = {
	1001: {
		10001: 'Nathan Chapman',
		10002: 'Jordan Chapman', 
		10003: 'Erika Chapman'
	},
	1002: {
		10004: 'Isaac Chapman',
		10005: 'Aaron Bixby',
		10006: 'David Bixby'
	},
	1003: {
		10007: 'Natalie Chapman',
		10008: 'Emily Chapman',
		10009: 'Andrew Chapman'
	}
}

// *** Function to load default (por clase) view - called by getMainPage() function *** //
function loadCalificaciones() {
	$('.column-calif-clases').hide();
	$('.column-calif-grades').hide();
	displayMajors();
}



// *** Add Calificaciones Form *** //

$(document).ajaxComplete(function(event, xhr, settings) { //make sure page is fully loaded
	if (settings.url.match("^calificaciones.html")) {
		$('#form-row2').hide();
		$('fieldset.student-grade-listing').hide();
	};
});

// Load majors into #carrera
$.each(majors, function(id, major) {
	$('#carrera').append('<option data-majID="' + id + '" value="' + major + '">' + major + '</option>');	
});

// Show modal form when + button is clicked 
$(document).on('click', '#add-grades', function(event) {
	event.preventDefault();
	$('.modal-popup').css('display', 'block');
});

// When major is selected, load matching courses into #clase
$(document).on('change', '#carrera', function(event) {
	$('#form-row2').hide();
	$('fieldset.student-grade-listing').hide();
	$('#clase').html('<option value="" disabled hidden selected>Escoja</option>');
	$('#evento').html('<option value="" disabled hidden selected>Escoja una Clase</option>');
	deselectBox('select');
	selectBox(this);
	var id = $('#carrera option:selected').attr('data-majid'); // get selected option's data-majID
	var courses = majorCourses[id];
	$.each(courses, function(id, course) {
		$('#clase').append('<option data-classid="' + id + '" value="' + course + '">' + course + '</option>');
	});
});

// When class is selected, load matching events into #evento
$(document).on('change', '#clase', function(event) {
	$('#form-row2').hide();
	$('fieldset.student-grade-listing').hide();
	$('#evento').html('<option value="" disabled hidden selected>Escoja</option>');
	deselectBox('#evento');
	var id = $('#clase option:selected').attr('data-classid'); // get selected option's data-majID
	var events = courseEventInfo[id];
	$.each(events, function(id, eventObj) {
		$('#evento').append('<option data-eventid="' + id + '" value="' + eventObj.gradeEvent + '">' + eventObj.gradeEvent + '</option>');
	});
});

// Once both term and parcial radio buttons are checked, show grade rows
$(document).on('click', '#form-row2 input', function(event) {
	var n = $('#form-row2 input:checked').length;
	if (n === 2) {
		$('fieldset.student-grade-listing').show();
	};
});

// When evento is selected, load matching events into first student row 
$(document).on('change', '#evento', function(event) {
	$('select.alumno-select option[data-sid]').remove();
	$('#form-row2').show();
	// $('select.alumno-select').append('<option value="" disabled selected hidden>Escoga un alumno</option>');
	var id = $('#evento option:selected').attr('data-eventid');
	var studentList = studentsByEvent[id];
	$.each(studentList, function(id, name) {
		$('select.alumno-select').append('<option data-sid="' + id + '" value="' + name + '">' + name + '</option>');
	});
});

// Hide form with x
$('#close-form').click(function(event) {
	event.preventDefault();
	$('#add-grades-popup').css('display', 'none');
});

// Add new student row
$('#add-student-button').click(function(event) {
	event.preventDefault();
	$('#alumno').append('<tr class="student-grade-row"><td><select name="alumno" class="alumno-select new-row"><option value="" disabled selected hidden>Escoga un alumno</option></select></td><td><input type="text" class="new-grade-field" name="grade" placeholder="Calificación"></td><td><span class="remove-row">—</span></td></tr>');
	var id = $('#evento option:selected').attr('data-eventid');
	var studentList = studentsByEvent[id];
	$.each(studentList, function(id, name) {
		$('select.new-row').append('<option data-sid="' + id + '" value="' + name + '">' + name + '</option>');
	});
});

// Remove student row
$(document).on('click', '.remove-row', function(event) {
	event.preventDefault();
	$(this).parent().parent().remove();
});


// *** "Por Clase" view *** //

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