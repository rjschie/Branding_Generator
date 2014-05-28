<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8" />
</head>
<body>
<?php


// Image Vars	// TODO AJAX-ify
$bgcolor = '#27354b';
$logocolor = '#e1e4e8';
$bgsize = array(240,240);
$logosize = array(200,200);

// Create image
$img = new Imagick();
$img->newimage($bgsize[0],$bgsize[1],new ImagickPixel($bgcolor));

// Apply Logo
$logo = new Imagick('_design/bw_00.jpg');	// TODO AJAX-ify
$logo->setImageAlphaChannel(Imagick::ALPHACHANNEL_EXTRACT);
$logo->setImageBackgroundColor($logocolor);
$logo->setImageAlphaChannel(Imagick::ALPHACHANNEL_SHAPE);
$logo->resizeimage( $logosize[0], $logosize[1], imagick::FILTER_UNDEFINED, 1 );
$img->compositeimage( $logo, imagick::COMPOSITE_OVER, ($bgsize[0]-$logosize[0])/2, ($bgsize[1]-$logosize[1])/2 );


// Finish Image
$img->setimageformat('png');

?>
<img src="data:image/png;base64,<?php echo base64_encode($img); ?>">

</body>
</html>