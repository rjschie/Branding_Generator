/**
 * Conversion function
 * @param hex
 * @returns {{r: Number, g: Number, b: Number}}
 */
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : "Err: "+result;
}

/**
 * Put the image in the .displayer with given color
 * @param img
 * @param color
 */
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
		};
		myImage.src = img;
	});
}

/**
 * Change .logo's to color
 * @param color
 */
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

/**
 * Reset object to default position
 * @param obj
 */
function defaultPos(obj) {
	if( obj.parent().parent().attr('id') == 'icon' ){
		var posX = (obj.parent().width() - obj.width()) / 2;
		var posY = (obj.parent().height() - obj.height()) / 2;
		obj.css({top: posY, left: posX});
	} else {
		var posX = (obj.parent().width() - obj.width()) / 2;
		var posY = ((obj.parent().height() - obj.height()) / 2) - (obj.height() / 2);
		obj.css({top: posY, left: posX});
	}
	saveLogoPos(obj);
}

/**
 * Save the XY position of logo
 */
function saveLogoPos(obj) {

	var fullparentW, fullparentH;
	if(obj.parent().parent().attr('id') == 'icon') {
		fullparentH = 1024;
		fullparentW = 1024;
	} else if(obj.parent().parent().attr('id') == 'phone') {
		fullparentH = 1920;
		fullparentW = 1080;
	} else if(obj.parent().parent().attr('id') == 'tablet') {
		fullparentH = 3840;
		fullparentW = 2400;
	}

	var posX = obj.position().left * (fullparentW/obj.parent().width());
	var posY = obj.position().top * (fullparentH/obj.parent().height());
	$('#logoPosX').val(posX);
	$('#logoPosY').val(posY);
}