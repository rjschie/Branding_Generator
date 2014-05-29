NOTES
===================

Logo Process
--------------------
- User uploads logo
- send to PHP via AJAX
- thumbnail-ify
- send back via AJAX
- Put in canvas


Submit Image Process
--------------------
- send data via AJAX (in JSON)
	- bg color
	- logo color
	- logo sizes
		- icon
		- phone
		- tablet
	- logo position
		- icon
		- phone
		- tablet
	- logo image
- Php create images
- email to branding dept.
- show on screen
- Success!



TODO
================
- Get image into Local Storage
	- fullimage
	- tabletimage
	- iconimage



Algorithm to convert small position to big position
------------------------------------------------------
(fullparent-fullthis)/((origparent-origthis)/pos)


