$(function () {
    var frPreText = ' carte-client ';
    var enPreText = ' Client Card ';
    if($('select#K1').length)
    {
        var selectedEl = $('select#K1').find(":selected");
        if(selectedEl && selectedEl.val() != 'SELECT_CARD')
        {
            $('.editOptions').addClass('removeItem');
            $('.editOptions').children().last().removeClass('hidden');
            $('.editOptions').children().last().find('span').text(frPreText + selectedEl.text());
            
        }
        else
        {
            $('.editOptions').removeClass('removeItem');
            $('.editOptions').children().last().addClass('hidden');
        }
    }
    $('select#K1').change(function(){
    	
    	var selectedEl = $('select#K1').find(":selected");
        if(selectedEl && selectedEl.val() != 'SELECT_CARD')
        {
		
            $('.editOptions').addClass('removeItem');
            $('.editOptions').children().last().removeClass('hidden');
            $('.editOptions').children().last().find('span').text(frPreText + selectedEl.text());
            
        }
        else
        {
			
            $('.editOptions').removeClass('removeItem');
            $('.editOptions').children().last().addClass('hidden');
			
		
        }
    	    	
        if(language == 1)
        {
            $('#removeCCIDlabel').text(frPreText + this.options[this.selectedIndex].text);
        }
        else if(language == 0)
        {
            $('#removeCCIDlabel').text(enPreText + this.options[this.selectedIndex].text);
        }
    });
    $('select#selectService').change(function(){
        if(language == 1)
        {
            $('#serviceSelectorBtn span.accessible').html('' + this.options[this.selectedIndex].text);
        }
        else if(language == 0)
        {
            $('#serviceSelectorBtn span.accessible').html('to ' + this.options[this.selectedIndex].text);
        }
        $('#serviceSelectorBtn').attr('title',$('#serviceSelectorBtn').text());
    });
});
