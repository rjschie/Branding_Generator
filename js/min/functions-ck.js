function hexToRgb(t){var a=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);return a?{r:parseInt(a[1],16),g:parseInt(a[2],16),b:parseInt(a[3],16)}:"Err: "+a}function setImage(t,a){$("canvas.logo").each(function(){var e=this,i=e.getContext("2d"),n=new Image;n.onload=function(){i.clearRect(0,0,e.width,e.height),i.drawImage(n,0,0,e.width,e.height),n=i.getImageData(0,0,e.width,e.height);for(var t=0;t<n.data.length;t+=4)n.data[t]=hexToRgb(a).r,n.data[t+1]=hexToRgb(a).g,n.data[t+2]=hexToRgb(a).b;i.putImageData(n,0,0)},n.src=t})}function changeCanvasColor(t){$("canvas.logo").each(function(){for(var a=this.getContext("2d"),e=a.getImageData(0,0,this.width,this.height),i=0;i<e.data.length;i+=4)e.data[i]=hexToRgb(t).r,e.data[i+1]=hexToRgb(t).g,e.data[i+2]=hexToRgb(t).b;a.putImageData(e,0,0)})}function defaultPos(t){if("icon"==t.parent().parent().attr("id")){var a=(t.parent().width()-t.width())/2,e=(t.parent().height()-t.height())/2;t.css({top:e,left:a})}else{var a=(t.parent().width()-t.width())/2,e=(t.parent().height()-t.height())/2-t.height()/2;t.css({top:e,left:a})}saveLogoPos(t)}function saveLogoPos(t){var a,e,i=t.parent().parent();if("icon"==i.attr("id"))a=icon.fw,e=icon.fh;else if("phone"==i.attr("id"))a=phone.fw,e=phone.fh;else{if("tablet"!=i.attr("id"))return;a=tablet.fw,e=tablet.fh}var n=t.position().left*(a/t.parent().width()),o=t.position().top*(e/t.parent().height());$("#"+i.attr("id")+"LogoPosX").val(n),$("#"+i.attr("id")+"LogoPosY").val(o)}function createJSON(){var t={};return $("input.useVal").each(function(){t[$(this).attr("id")]=$(this).val()}),t}