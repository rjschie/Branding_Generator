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
	'icon_small' => array(240,240),
	'phone' => array(1080,1920),
	'tablet' => array(2400,3840),
	'tablet_hzntl' => array(3840,2400),
	'logoloader' => array(1024,1024),
);
$logosize = array(
	'icon' => array(800,800),
	'icon_small' => array(187,187),
	'phone' => array(420,420),
	'tablet' => array(1140,1140),
	'tablet_hzntl' => array(1140,1140),
	'logoloader' => array(1024,1024),
);
$logoPos = array(
	'icon' => array($_POST['iconLogoPosX'], $_POST['iconLogoPosY']),
	'icon_small' => array(floor($_POST['iconLogoPosX']/($bgsize['icon'][0]/$bgsize['icon_small'][0])), floor($_POST['iconLogoPosY']/($bgsize['icon'][0]/$bgsize['icon_small'][0]))),
	'phone' => array($_POST['phoneLogoPosX'], $_POST['phoneLogoPosY']),
	'tablet' => array($_POST['tabletLogoPosX'], $_POST['tabletLogoPosY']),
	'tablet_hzntl' => array($_POST['tabletLogoPosY'], $_POST['tabletLogoPosX']),
	'logoloader' => array(0,0),
);

foreach($bgsize as $name => $val) {
	// Create image
	$img = new Imagick();
	if($name == 'logoloader'){
		$img->newimage($bgsize[$name][0],$bgsize[$name][1],new ImagickPixel("rgba(0,0,0,0)"));
	} else {
		$img->newimage($bgsize[$name][0],$bgsize[$name][1],new ImagickPixel($bgcolor));
	}

	// Apply Logo
	$data = str_replace('data:image/png;base64,', '', $_POST['img']);
	$logo = new Imagick();
	$logo->readimageblob(base64_decode($data));

	if($name != 'logoloader'){
		$logo->setImageAlphaChannel(Imagick::ALPHACHANNEL_EXTRACT);
		$logo->setImageBackgroundColor($logocolor);
		$logo->setImageAlphaChannel(Imagick::ALPHACHANNEL_SHAPE);
	}

	$logo->resizeimage( $logosize[$name][0], $logosize[$name][1], imagick::FILTER_UNDEFINED, 1 );

	$img->compositeimage( $logo, imagick::COMPOSITE_OVER, $logoPos[$name][0], $logoPos[$name][1] );

	// Finish Image
	$img->setimageformat('png');
	$img->writeImage('_writes/'. $name .'.png');
//	echo '<img src="data:image/png;base64,"'.base64_encode($img).'">';
}

?>

</body>
</html>