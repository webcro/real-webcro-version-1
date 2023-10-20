function buttons_ButtonPreload(btnPrefix,downBtnSuffix )
{
this.up =buttons_ButtonPreload_release;
this.dn =buttons_ButtonPreload_press;
this.oneClick =buttons_ButtonPreload_oneClick;
document.write('<form name="buttons_OneClick">' +
'<input name="AllowClick" type="HIDDEN" value="Y">' +
'</form>');
}
function buttons_ButtonPreload_release(sImgName)
{
}
function buttons_ButtonPreload_press(sImgName)
{
}
function buttons_ButtonPreload_oneClick()
{
if (document.buttons_OneClick.AllowClick.value =="Y" )
{
document.buttons_OneClick.AllowClick.value ="N";
return (true);
}
else
{
return (false);
}
}
function buttons_RadioButtonSubmit(formName )
{
var mainForm =eval("document." +formName );
var submitForm =mainForm.form.value;
eval("document." +submitForm+ ".submit()" );
}
