function dates_currentDate(lang )
{
var monthName =new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec" );
var sep =' ';
if(lang =="FRENCH" )
{
var monthName =new Array("jan","fev","mar","avr","mai","jun","jui","aou","sep","oct","nov","dec" );
var sep =' ';
}
var d =new Date()
var day =d.getDate()
var mon =monthName[d.getMonth()]
var year =d.getFullYear()
document.write(day + sep + mon + sep + year );
}
