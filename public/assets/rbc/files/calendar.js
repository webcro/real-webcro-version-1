<!--
var calendar =null;
var calendar_Parent =1;
var calendar_CloseWinOK =1;
var calendar_Title ="\n";
var calendar_Width =230;
var calendar_Height =200;
var calendar_HorPos =0;
var calendar_VerPos =0;
var calendar_NoSelect =0;
var calendar_NoGoPast =0;
var calendar_Lang =0;
var calendar_Reset =0;
var calendar_Past =1;
var calendar_Active =2;
var calendar_SelectUpdate =0;
var calendar_Include =new Array();
var calendar_Exclude =new Array();
var calendar_TodaysDate =new Date();
var calendar_SelectFlag =0;
var calendar_ResetDate =new Date();
var calendar_SelectDate =new Date();
var calendar_MinimumDate =new Date(0000,0,1,0,0,0);
var calendar_MaximumDate =new Date(9999,11,31,23,59,59);
var calendar_URLPath ="/uos/common/html/";
var calendar_FormFGCol ="#e0e0e0";
var calendar_FormBGCol ="#ffffff";
var calendar_HeadFGCol ="#666666";
var calendar_HeadBGCol ="#d7d7d7";
var calendar_DateFGCol ="#ffffff";
var calendar_DateBGCol ="#000080";
var calendar_WeekFGCol ="#000080";
var calendar_WeekBGCol ="#b0c4de";
var calendar_NormFGCol ="#2222af";
var calendar_NormBGCol ="#f7f7f7";
var calendar_HighFGCol ="#2222af";
var calendar_HighBGCol ="#efef00";
function calendar_Show(UpdateFunction)
{
var Parms ="";
calendar_SelectUpdate =UpdateFunction;
calendar_Parent =1;
calendar_CloseWinOK =1;
Parms +="WIDTH=" + calendar_Width + ",";
Parms +="HEIGHT=" + calendar_Height + ",";
Parms +="LEFT=" + calendar_HorPos + ",";
Parms +="TOP=" + calendar_VerPos;
calendar =window.open(calendar_URLPath + 'calendar.htm','cal01',Parms);
}
function calendar_Drop()
{
if (calendar)
{
if (calendar.closed)
calendar =null;
else
{
calendar.close();
calendar =null;
}
}
if ((calendar_SelectFlag)&&(calendar_SelectUpdate))
calendar_SelectUpdate(calendar_SelectDate);
calendar_SelectFlag =0;
}
function calendar_ResetColor()
{
calendar_FormFGCol ="#e0e0e0";
calendar_FormBGCol ="#ffffff";
calendar_HeadFGCol ="#666666";
calendar_HeadBGCol ="#d7d7d7";
calendar_DateFGCol ="#ffffff";
calendar_DateBGCol ="#000080";
calendar_WeekFGCol ="#000080";
calendar_WeekBGCol ="#b0c4de";
calendar_NormFGCol ="#2222af";
calendar_NormBGCol ="#f7f7f7";
calendar_HighFGCol ="#2222af";
calendar_HighBGCol ="#efef00";
}
function calendar_ResetIncludeDate()
{
calendar_Include.length =0;
}
function calendar_ResetExcludeDate()
{
calendar_Exclude.length =0;
}
function calendar_SetCloseWinOK(OK)
{
calendar_CloseWinOK =OK;
}
function calendar_GetCloseWinOK()
{
return(calendar_CloseWinOK);
}
function calendar_SetTitle(Title)
{
calendar_Title =Title;
}
function calendar_GetTitle()
{
return(calendar_Title);
}
function calendar_SetURLPath(Path)
{
calendar_URLPath =Path;
}
function calendar_SetLanguage(Ind)
{
calendar_Lang =((Ind ==1)?1:0);
}
function calendar_SetLanguageE()
{
calendar_Lang =0;
}
function calendar_SetLanguageF()
{
calendar_Lang =1;
}
function calendar_GetLanguage()
{
return(calendar_Lang);
}
function calendar_SetHighlightOnly()
{
calendar_NoSelect =1;
}
function calendar_SetAllowSelection()
{
calendar_NoSelect =0;
}
function calendar_GetHighlightOnly()
{
return(calendar_NoSelect);
}
function calendar_SetNoGoPast()
{
calendar_NoGoPast =1;
}
function calendar_SetNoMinMax()
{
calendar_NoGoPast =0;
}
function calendar_SetNoDates()
{
calendar_Active =0;
}
function calendar_SetBusDates()
{
calendar_Active =1;
}
function calendar_SetAllDates()
{
calendar_Active =2;
}
function calendar_SetPastDates()
{
calendar_Past =1;
}
function calendar_SetNoPastDates()
{
calendar_Past =0;
}
function calendar_SetStartAtReset()
{
calendar_Reset =1;
}
function calendar_SetStartAsIs()
{
calendar_Reset =0;
}
function calendar_GetReset()
{
return (calendar_Reset);
}
function calendar_SetWidth(Width)
{
if (Width >=230)
calendar_Width =Width;
}
function calendar_SetHeight(Height)
{
if (Height >=200)
calendar_Height =Height;
}
function calendar_SetHorPos(HorPos)
{
calendar_HorPos =HorPos;
}
function calendar_SetVerPos(VerPos)
{
calendar_VerPos =VerPos;
}
function calendar_SetHighFGCol(Color)
{
calendar_HighFGCol =Color;
}
function calendar_GetHighFGCol()
{
return(calendar_HighFGCol);
}
function calendar_SetHighBGCol(Color)
{
calendar_HighBGCol =Color;
}
function calendar_GetHighBGCol()
{
return(calendar_HighBGCol);
}
function calendar_SetNormFGCol(Color)
{
calendar_NormFGCol =Color;
}
function calendar_GetNormFGCol()
{
return(calendar_NormFGCol);
}
function calendar_SetNormBGCol(Color)
{
calendar_NormBGCol =Color;
}
function calendar_GetNormBGCol()
{
return(calendar_NormBGCol);
}
function calendar_SetHeadFGCol(Color)
{
calendar_HeadFGCol =Color;
}
function calendar_GetHeadFGCol()
{
return(calendar_HeadFGCol);
}
function calendar_SetHeadBGCol(Color)
{
calendar_HeadBGCol =Color;
}
function calendar_GetHeadBGCol()
{
return(calendar_HeadBGCol);
}
function calendar_SetFormFGCol(Color)
{
calendar_FormFGCol =Color;
}
function calendar_GetFormFGCol()
{
return(calendar_FormFGCol);
}
function calendar_SetFormBGCol(Color)
{
calendar_FormBGCol =Color;
}
function calendar_GetFormBGCol()
{
return(calendar_FormBGCol);
}
function calendar_SetDateFGCol(Color)
{
calendar_DateFGCol =Color;
}
function calendar_GetDateFGCol()
{
return(calendar_DateFGCol);
}
function calendar_SetDateBGCol(Color)
{
calendar_DateBGCol =Color;
}
function calendar_GetDateBGCol()
{
return(calendar_DateBGCol);
}
function calendar_SetWeekFGCol(Color)
{
calendar_WeekFGCol =Color;
}
function calendar_GetWeekFGCol()
{
return(calendar_WeekFGCol);
}
function calendar_SetWeekBGCol(Color)
{
calendar_WeekBGCol =Color;
}
function calendar_GetWeekBGCol()
{
return(calendar_WeekBGCol);
}
function calendar_SetIncludeDate(Date1)
{
calendar_SetIncludeYMDDate(Date1.getFullYear(),Date1.getMonth()+ 1,Date1.getDate());
}
function calendar_SetIncludeYMDDate(Year,Month,Day)
{
size =calendar_Include.length;
calendar_Include[size]=new Array(Year,Month,Day);
}
function calendar_SetExcludeDate(Date1)
{
calendar_SetExcludeYMDDate(Date1.getFullYear(),Date1.getMonth()+ 1,Date1.getDate());
}
function calendar_SetExcludeYMDDate(Year,Month,Day)
{
size =calendar_Exclude.length;
calendar_Exclude[size]=new Array(Year,Month,Day);
}
function calendar_SetMaximumDate(Date1)
{
var TempDate =new Date(Date1.getFullYear(),Date1.getMonth(),Date1.getDate(),23,59,59);
calendar_MaximumDate =TempDate;
}
function calendar_SetMaximumYMDDate(Year,Month,Day)
{
var TempDate =new Date(Year,Month-1,Day);
calendar_SetMaximumDate(TempDate);
}
function calendar_SetMinimumDate(Date1)
{
var TempDate =new Date(Date1.getFullYear(),Date1.getMonth(),Date1.getDate(),23,59,59);
calendar_MinimumDate =TempDate;
}
function calendar_SetMinimumYMDDate(Year,Month,Day)
{
var TempDate =new Date(Year,Month-1,Day);
calendar_SetMinimumDate(TempDate);
}
function calendar_SetResetDate(Date1)
{
var TempDate =new Date(Date1.getFullYear(),Date1.getMonth(),Date1.getDate());
calendar_ResetDate =TempDate;
}
function calendar_SetResetYMDDate(Year,Month,Day)
{
var TempDate =new Date(Year,Month-1,Day);
calendar_SetResetDate(TempDate);
}
function calendar_GetResetDate()
{
return(calendar_ResetDate);
}
function calendar_SetCookie(name,value,expire)
{
document.cookie =name + "=" + escape(value)
+ ((expire ==null)?"" :("; expires=" + expire.toGMTString()));
}
function calendar_GetMinimumDate()
{
return(calendar_MinimumDate);
}
function calendar_GetMaximumDate()
{
return(calendar_MaximumDate);
}
function calendar_GetNoGoPast()
{
return (calendar_NoGoPast);
}
function calendar_IsValidDate(Year,Month)
{
var TempMinDate =new Date(Year,Month - 1,31,23,59,59);
var TempMaxDate =new Date(Year,Month - 1,1,0,0,0);
var TempDate =new Date(Year,Month - 1);
if (calendar_NoGoPast)
{
if (TempMaxDate >calendar_MaximumDate)
TempDate =calendar_MaximumDate;
if (TempMinDate <calendar_MinimumDate)
TempDate =calendar_MinimumDate;
}
return(TempDate);
}
function calendar_UpdateSelectDate(Year,Month,Day)
{
calendar_SelectDate.setDate(1);
calendar_SelectDate.setYear(Year);
calendar_SelectDate.setMonth(Month-1);
calendar_SelectDate.setDate(Day);
calendar_SelectFlag =1;
calendar_Drop();
}
function calendar_ResetWin()
{
if (calendar)
{
if (calendar.closed)
calendar =null;
else
{
calendar.close();
calendar =null;
}
}
calSelectFlag =0;
}
function calendar_FromParent()
{
return(calendar_Parent);
}
function calendar_FromChild()
{
calendar_Parent =0;
}
function calendar_IsActiveDate(Year,Month,Day)
{
var Active =0;
var TempDate =new Date (Year,Month-1,Day,23,59,59);
if (calendar_Active ==2)
Active =1;
else
if (calendar_Active ==1)
{
var WeekDay =TempDate.getDay();
if ((WeekDay >=1)&&(WeekDay <=5))
Active =1;
}
if ((TempDate <calendar_TodaysDate)&&(Active))
{
if (!calendar_Past)
Active =0;
}
if (!Active)
{
for (var i =0;i <calendar_Include.length;i++)
{
if ((Day ==calendar_Include[i][2])&&(Month ==calendar_Include[i][1])&&(Year ==calendar_Include[i][0]))
{
Active =1;
i =calendar_Include.length;
}
}
}
if (Active)
{
for (var j =0;j <calendar_Exclude.length;j++)
{
if ((Day ==calendar_Exclude[j][2])&&(Month ==calendar_Exclude[j][1])&&(Year ==calendar_Exclude[j][0]))
{
Active =0;
j =calendar_Exclude.length;
}
}
}
if ((TempDate >calendar_MaximumDate)&&(Active))
Active =0;
if ((TempDate <calendar_MinimumDate)&&(Active))
Active =0;
return(Active);
}
//-->