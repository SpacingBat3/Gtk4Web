const { getColorScheme } = require('@spacingbat3/gtk4web')

var gtk=getColorScheme()

console.log("GTK Preloaded!")

var bgColor=gtk.theme_bg_color
var fgColor=gtk.theme_fg_color
var accentColor=gtk.theme_selected_bg_color
var headerColor=gtk.wm_bg
var headerFont=gtk.wm_title

document.body.innerHTML=`
<style id="gtk-theme">

html {
	overflow-x:hidden;
    margin: 0;
    padding: 0;
}

body {
	text-align: center;
    margin: 0;
    padding: 0;
	color: ${fgColor};
	background-color: ${bgColor};
}

p {
	margin: 5px;
}

div.header h1 {
	margin: 0;
	padding: 0;
}

h1 {
	-webkit-animation: scroll-left 15s linear infinite;
}

div.header {
	width: 100%;
	background-color: ${headerColor};
	color: ${headerFont}
}

@-webkit-keyframes scroll-left {
            0% {
                -webkit-transform: translateX(-70%);
            }
            100% {
                -webkit-transform: translateX(70%);
            }
        }
</style>
`

for (const placeholder of document.getElementsByClassName('placeholder')) {
  placeholder.remove()
}