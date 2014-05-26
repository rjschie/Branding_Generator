$(document).foundation();

function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : "Err: "+result;
}

function setImage(img, color) {
	$('canvas.logo').each(function() {
		var canvas = this;
		var ctx = canvas.getContext("2d");

		var myImage = new Image();
		myImage.onload = function() {

			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(myImage,0,0, canvas.width,canvas.height);
			myImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
				for (var i = 0; i < myImage.data.length; i += 4) {
					myImage.data[i] = hexToRgb(color).r;
					myImage.data[i+1] = hexToRgb(color).g;
					myImage.data[i+2] = hexToRgb(color).b;
				}
			ctx.putImageData(myImage, 0, 0);
		}
		myImage.src = img;
	});
}

function changeCanvasColor(color) {
	$('canvas.logo').each(function() {
		var ctx = this.getContext("2d");
		var myImage = ctx.getImageData(0, 0, this.width, this.height);
		for (var i = 0; i < myImage.data.length; i += 4) {
			myImage.data[i] = hexToRgb(color).r;
			myImage.data[i+1] = hexToRgb(color).g;
			myImage.data[i+2] = hexToRgb(color).b;
		}
		ctx.putImageData(myImage, 0, 0);
	});
}


function defaultPos(obj) {
	if(obj.parent().parent().attr('id') == 'icon'){
		obj.position({
			my: "center",
			at: "center",
			of: obj.parent()
		});
	} else {
		obj.position({
			my: "bottom",
			at: "center",
			of: obj.parent()
		});
	}
}



$(function() {

	var bgcolor = $('input#bgcolor');
	var logocolor = $('input#logocolor');
	var logoResetPos = $('#logoResetPos');

	var icon = $('#icon');
	var phone = $('#phone');
	var tablet = $('#tablet');
	var logo = $('canvas.logo');

	icon.css('background', bgcolor.val());
	phone.css('background', bgcolor.val());
	tablet.css('background', bgcolor.val());
	bgcolor.on('change', function() {
		icon.css('background', bgcolor.val());
		phone.css('background', bgcolor.val());
		tablet.css('background', bgcolor.val());
	});

	logo.each(function(){
		defaultPos($(this));
		setImage("_design/trans_00.png", logocolor.val());	// TODO remove
		$(this).draggable({containment: $(this).parent() })

		// TODO Make available
//		$(this).resizable({handles: "ne, se, nw, sw", aspectRatio: true, autoHide: false, containment: $(this).parent() });
	});


	logocolor.on('change', Foundation.utils.throttle(function () {
		changeCanvasColor($(this).val());
	}, 600));

	logoResetPos.on('click', function() {
		logo.each(function() {
			defaultPos($(this));
		});
	});

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

});






