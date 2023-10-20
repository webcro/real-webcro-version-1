function swapInAlternateElements(alternatableClass, alternateIdSuffix)
{
    var alternatableNodes = getElementsByClass(alternatableClass);
    for (var i = 0; i < alternatableNodes.length; i++) {
        var alternatableNode = alternatableNodes[i];
        var alternateNode = 
              document.getElementById(alternatableNode.id + alternateIdSuffix);
        if (alternateNode != null) {
            var idTemp = alternatableNode.id;
            alternatableNode.id = alternateNode.id;
            alternateNode.id = idTemp;
            var displayTemp = alternatableNode.style.display;
            alternatableNode.style.display = alternateNode.style.display;
            alternateNode.style.display = displayTemp;
        }
    }
}
