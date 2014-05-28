$(document).foundation();

$(function() {

	/**
	 * Vars
	 */
	var bgcolor = $('input#bgcolor');
	var logocolor = $('input#logocolor');
	var logoResetPos = $('#logoResetPos');
	var displayer = $('.displayer');
	var logo = $('canvas.logo');

	/**
	 * Event: Set Background Color from BGColor
	 */
	bgcolor.on('change', function() {
		displayer.css('background', bgcolor.val());
	});


	/**
	 * Put image in the <canvas>
	 */
	logo.each(function(){
		defaultPos($(this));
		setImage("_design/trans_00.png", logocolor.val());	// TODO remove
		$(this).draggable({containment: $(this).parent()});

		// TODO Make available
//		$(this).resizable({handles: "ne, se, nw, sw", aspectRatio: true, autoHide: false, containment: $(this).parent() });
	});


	/**
	 * Event: Change color of image
	 */
	logocolor.on('change', Foundation.utils.throttle(function () {
		changeCanvasColor($(this).val());
	}, 600));


	/**
	 * Event: Reset Pos
 	 */
	logoResetPos.on('click', function() {
		logo.each(function() {
			defaultPos($(this));
		});
	});

	/**
	 * Event: Put Logo in .displayer's
	 */
	$('#logoimage').on('change', function(evt) {
		var files = evt.target.files;
		var file = files[0];
		if (files && file) {
			var reader = new FileReader();
			reader.onload = function(readerEvt) {
				var binaryString = readerEvt.target.result;
				var imgData = "data:"+file.type+";base64," + btoa(binaryString);
				setImage(imgData, logocolor.val())
			}
		}
		reader.readAsBinaryString(file);
	});

	/**
	 * Event: Put Position in Hidden inputs
	 */
	$('.logo').on('dragstop', function(event, ui) {
		saveLogoPos($(this));
	});

});
