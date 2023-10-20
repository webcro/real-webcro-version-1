NumOnly=false;
EnterOn=false;
ie4 = (document.all)? true:false                     
function keyPress(e) {
if (ie4)                                        
{
  var nKey=event.keyCode;
}
else
{
  var nKey=e.which;
}
if (EnterOn)
{
  if (nKey==13)
  {
    if (!ie4)
    {
      document.rbunxcgi.SignIn.click();
      return(false);
    }
  }
}
if (NumOnly)
    {
     if (((nKey > 31) && (nKey < 48)) || (nKey > 57))
     {
        return(false);
     }
    }                                                
}                                                    
document.onkeypress = keyPress;                      
if (!ie4) document.captureEvents(Event.KEYPRESS);    

