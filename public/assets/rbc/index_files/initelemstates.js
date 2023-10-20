$(function () {

    if($('#spotlight a').length === 0)
    {
        $('#spotlight').remove();
        $('#staysafeonline').removeClass('col-xs-4').addClass('col-xs-8');
    }
    else if($('#staysafeonline a').length === 0)
    {
        $('#staysafeonline').remove();
        $('#spotlight').removeClass('col-xs-4').addClass('col-xs-8');
    }
    else
    {
    } 
});