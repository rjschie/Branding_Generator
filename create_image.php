<!doctype html>
<html class="no-js" lang="en">
<head>
	<meta charset="utf-8" />
</head>
<body>
<?php


// Image Vars
$bgcolor = $_POST['bgcolor'];
$logocolor = $_POST['logocolor'];
$bgsize = array(
	'icon' => array(1024,1024),
	'phone' => array(1080,1920),
	'tablet' => array(2400,3840),
);
$logosize = array(
	'icon' => array(800,800),
	'phone' => array(600,600),
	'tablet' => array(1200,1200),
);
$logoPos = array(
	'icon' => array($_POST['iconLogoPosX'], $_POST['iconLogoPosY']),
	'phone' => array($_POST['phoneLogoPosX'], $_POST['phoneLogoPosY']),
	'tablet' => array($_POST['tabletLogoPosX'], $_POST['tabletLogoPosY']),
);

foreach($bgsize as $name => $val) {
	// Create image
	$img = new Imagick();
	$img->newimage($bgsize[$name][0],$bgsize[$name][1],new ImagickPixel($bgcolor));

	// Apply Logo
	$logo = new Imagick('_design/trans_00.png');
	$logo->setImageAlphaChannel(Imagick::ALPHACHANNEL_EXTRACT);
	$logo->setImageBackgroundColor($logocolor);
	$logo->setImageAlphaChannel(Imagick::ALPHACHANNEL_SHAPE);
	$logo->resizeimage( $logosize[$name][0], $logosize[$name][1], imagick::FILTER_UNDEFINED, 1 );
	$img->compositeimage( $logo, imagick::COMPOSITE_OVER, $logoPos[$name][0], $logoPos[$name][1] );

	// Finish Image
	$img->setimageformat('png');
	$img->writeImage('_writes/'. $name .'.png');
}

?>
<!--<img src="data:image/png;base64,--><?php //echo base64_encode($img); ?><!--">-->

</body>
</html>