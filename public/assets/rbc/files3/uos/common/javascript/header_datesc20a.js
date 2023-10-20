function dates_currentDate(lang )
{
var monthName =new Array("January","February","March","April","May","June","July","August","September","October","November","December" );
var sep =' ';
if(lang =="FRENCH" )
{
var monthName =new Array("janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre" );
var sep =' ';
}
var d =new Date()
var day =d.getDate()
var mon =monthName[d.getMonth()]
var year =d.getFullYear()

if(lang =="FRENCH" )
{
  document.write(day + sep + mon + sep + year );
}
else
{
  document.write(mon + sep + day + ',' + sep + year );
}

}
