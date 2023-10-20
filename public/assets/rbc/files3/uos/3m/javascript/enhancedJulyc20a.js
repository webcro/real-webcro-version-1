<!-- Begin

event_addOnUnload( new Array( checkOnUnLoad ) );

var RefreshRate = 30;
var ChildWin = null;
var timediff=0;
var isdone=0;

function timedPopup( text, form )
{
  windowprops = "left=100,top=100,width=820,height=600,resizable=yes,scrollbars=yes,menubar=yes,status=yes,toolbar=yes,location=no,directories=yes";
  if (ChildWin)
    return false;

  alert( text );

  ChildWin = window.open("", "ChildWin", windowprops);

  form.target = "ChildWin";
  
  //alert( document.cookie );

  setTimeout("checkTimeOut();",RefreshRate * 1000);

  return;
}


function checkTimeOut()
{
  document.rbunxcgi.K1.value='';
  document.rbunxcgi.Q1.value='';
  var curDate = new Date();
  var pcTime = Math.round( curDate.valueOf() / 1000 );
  var name = "CAFE=";

  var posCAFE = document.cookie.indexOf("CAFE=");
  var cafeValue;
  var HostValue=0;
  var delta=0;


  cafeValue = new Number( document.cookie.substring( document.cookie.indexOf("CAFE=") + name.length, posCAFE + name.length + 10 ) );

  if (!isdone)
  {
    //alert( "!isdone" );
    if (isNaN(CAFETimeout))
    {
      //alert( "isNAN(CAFETimeout)" );
      CAFETimeout=900;
    }
    
    HostValue = cafeValue - CAFETimeout;
    delta = HostValue - pcTime;

    timediff=delta;
    isdone=1;
  }


  delta = cafeValue - pcTime - timediff;
  //alert( "delta=" + delta );

  if ( delta < 0 )
  {
    //alert( "delta < 0" );
    if (ChildWin)
    {
      //alert( "ChildWin" );
      ChildWin.close();
      ChildWin = null;
      document.SIGNOUT2.TIMEOUT.value = "TIMEDOUT";
	document.SIGNOUT2.submit();
    }
  }
  else
  {
    //alert( "else" );
    setTimeout("checkTimeOut();",RefreshRate * 1000);
  }
}

function checkCafe( text, form )
{
  if (!window.opener)
  {
    if ( document.rbunxcgi.CAFE && document.rbunxcgi.CAFE.checked )
    {
      timedPopup( text, form );
    }
  }
}
function checkRIBSCafe( text, form )
{
  if (!window.opener)
  {
      timedPopup( text, form );
  }
}


function checkOnUnLoad()
{
  if (ChildWin && !ChildWin.closed)
  {
    document.SIGNOUT2.target="ChildWin";
    document.SIGNOUT2.submit();

    ChildWin.close();
    ChildWin = null;
  }
  return true;
}
//  End -->
