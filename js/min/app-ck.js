$(document).foundation(),$(function(){var o=$("input#bgcolor"),n=$("input#logocolor"),t=$(".displayer"),a=$("canvas.logo");o.on("change",function(){t.css("background",o.val())}),a.each(function(){defaultPos($(this)),$(this).draggable({containment:$(this).parent()})}),n.on("change",Foundation.utils.throttle(function(){changeCanvasColor($(this).val())},600)),$("#logoResetPos").on("click",function(){a.each(function(){defaultPos($(this))})}),$("#logoimg").on("change",function(o){var t=o.target.files,a=t[0];t&&a&&setImage(a,n.val())}),a.on("dragstop",function(o,n){saveLogoPos($(this))}),$("#create_branding").on("click",function(o){window.console.log(createJSON())})});