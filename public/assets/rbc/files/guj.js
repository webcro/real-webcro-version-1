// { guj.js
if (!window.CTGUJLOADED) {
	window.CTGUJLOADED = true;
	var paths = [];
	var CT = {Queue: {calls: [], busy: false}}; 

	var CTC_BASE_TIME = 1041404400;
	var CTC_PREVIOUS_OFFSET = 3600;
	var CT_I_SET_ORIGIN = false;
	var CT_I_SET_REPEAT = false;
	var CT_I_REVISIT = false;
	CT.isIE = document.all ? true : false;

	//CT_I_... is an internally defined variable
	//window.CT_C_... is an internally named variable that the customer sets
	//window.CT_X_... is a customer defined variable to be written as a biscuit

	CT.readCookies = function() {
		if (typeof(CT.cookies) == 'undefined') {
			var cookieArray = document.cookie.split(/; ?/);
			CT.cookies = new Array;
			if (document.cookie != '')
				for (var i = 0; i < cookieArray.length; i++)
					CT.cookies.push(cookieArray[i]);
		}
	} // CT.readCookies

	CT.pushInto = function(vals, key, value) {
		if (typeof(vals) != 'object') {
			if (typeof(vals) == 'undefined')
				vals = [];
			else
				vals = [vals];
		}
		if (typeof(vals[key]) == 'undefined')
			vals[key] = [];
		vals[key].push(value);
	} // CT.pushInto

	//- fields MAY be undefined. If set it MUST be either null or an array of parameters to pass, encoded 
	//   as "key=value". e.g. fields = [ "some_param=somevalue", "some_other_param=blah" ];
	//- server MAY be undefined. If set it MUST be either null or a non-empty string indicating where to send the message
	//   to. e.g. server ="jdc.ct.com". do not include protocol or trailing /s.
	function CT_RecordView(request, method, fields, server, referrer, onCompletion ) {
		//set defaults
		var basicCall = true;
		if (request == null) {
			if (window.CT_C_Request != null)
				request = window.CT_C_Request;
			else if (CT.landingURL != null)
				request = CT.landingURL;
			else
				request = window.location;
		} else {
			basicCall = false;
		}
		if (typeof(window.CT_C_Referrer) == 'undefined')
			window.CT_C_Referrer = document.referrer;
		if (typeof(referrer) == 'undefined')
			referrer = window.CT_C_Referrer;
		fields = fields || []; //default
		server = server || CT_I_Path; //default

		if (CT_I_FirstPartyJDC)
			CT.setCookies(); // set up any cookies needed

		if (typeof(window.CT_R_PID) != 'undefined') {
			//if defined, add CT_R_PID to page requested to identify the page
			request += (/\?/.test(request) ? '&' : '?') + 'CT_R_PID=' + encodeURIComponent(window.CT_R_PID);
		}
		var orderTotal = (typeof(window.CT_C_OrderTotal) != 'undefined') ? window.CT_C_OrderTotal : 0;

		// handle biscuits first
		var biscuits = new Array();
		for (var i in window) {
			// if variable name starts with CT_X_ followed by something else 
			if (i.substring(0, 5) == 'CT_X_' && i.length > 5) {
				if (typeof(window[i]) == 'object')
					for (var n = 0; n < window[i].length; n++) {
						biscuits.push(i + '=' + window[i][n]);
					}
				else
					biscuits.push(i + '=' + window[i]);
			}
		}
		var ctxValue = biscuits.join('&');

		// setup request fields
		var vals = fields.concat(); //clone array into vals
		CT.pushInto(vals, 'i', CT_I_Datasets[0]);
		CT.pushInto(vals, 'r', request);

		if (method != null) {
			CT.pushInto(vals, 's', method); //method
			CT.pushInto(vals, 'f', referrer);
		} else {
			CT.pushInto(vals, 'f', referrer);
			if (orderTotal > 0)
				CT.pushInto(vals, 'e', orderTotal);
		}
		if (typeof(CT_I_Subdomain) != 'undefined')
			CT.pushInto(vals, 'd', CT_I_Subdomain);
		if (ctxValue != '')
			CT.pushInto(vals, 'U', ctxValue); //biscuits
		if (!basicCall)
			CT.pushInto(vals, 'g', 1) //use graphic as response
		if (typeof(CT_I_Protocol) == 'undefined')
			window.CT_I_Protocol = window.location.protocol;
		CT.pushInto(vals, 'sd', window.screen.width + 'x' + window.screen.height); //screen dimensions

		if (CT_I_FirstPartyJDC) {
			if (window.CT_I_FirstPartyDomain && window.CT_I_FirstPartyDomain != '')
				CT.pushInto(vals, 'fp', window.CT_I_FirstPartyDomain);
			else
				CT.pushInto(vals, 'fp', 1);
			var cookie = [];
			for (var i = 0; i < CT.cookies.length; i++) {
				var temp = CT.cookies[i].split(/=/, 2);
				if (CT_I_FirstPartyCookies || temp[0].match(/^Persistent_id_|^Revisit_|^Session_|^CTINC$/))
					cookie.push(CT.cookies[i]);
			}
			if (CT_I_REVISIT) {
				var id = CT_I_Datasets[0];
				cookie.push('Revisit_' + id + '=1');
			}
			CT.pushInto(vals, 'c', cookie.join('; '));
		} else if (CT_I_FirstPartyCookies)
			CT.pushInto(vals, 'c', document.cookie); // record all first party cookies

		// if origin or repeat is needed...
		if (CT_I_SET_ORIGIN) {
			CT.pushInto(vals, 'setOrigin', 1);
			CT_I_SET_ORIGIN = false;
		}
		if (CT_I_SET_REPEAT) {
			CT.pushInto(vals, 'setRepeat', 1);
			CT_I_SET_REPEAT = false;
		}

		CT.addToQueue(
			window.CT_I_Protocol + server,
			vals,
			onCompletion
		);
	} // CT_RecordView()

	CT.addToQueue = function(url, vals, onCompletion) {
		CT.Queue.calls.push({url: url, vals: vals, onCompletion: onCompletion});
		CT.Queue.process();
	} // CT.addToQueue

	CT.relocate = function(url, target) {
		if (!/liveperson\.net/.test(url)) {
			if (target == '')
				window.location.href = url;
			else
				window.open(url, target);
		}
		return false;
	} // CT.relocate

	function CT_ProcClick(evt) {
		var url;
		var wait;
		var elem;
		var targetWindowName = '';
		var usingOnClick = false;

		evt = (evt) ? evt : ((window.event) ? event : null);
		var leftClick = CT.isIE || evt.which == 1;
		if (evt && leftClick) {
			elem = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);

			while (elem) {
				url = '';
				switch(elem.tagName) {
					case 'A':
					case 'AREA':

						if (typeof(elem.onclick) == 'function')
							usingOnClick = true;
						url = elem.href;
						targetWindowName = elem.target;
						break;
					case 'INPUT':
						if (elem.form) {
							elem = elem.form;
							url = elem.action;
							if (url == '')
								url = window.location.href;
						} else {
							url = '';
						}
						break;
				}
				switch(elem.tagName) {
					case 'A':
					case 'AREA':
						if (url != '') {
							var callType = '';
							if (!CT_LocalLink(url))
								callType = 'EXIT';
							else if (CT_TrackFileExtension(url))
								callType = 'GET';
							if (callType != '') {
								if (targetWindowName == '' && usingOnClick == false) {
									CT_RecordView(url, callType, null, null, window.location.href, function() { window.location.href = url; });
									if (evt.preventDefault)
										evt.preventDefault();
									return false;
								} else {
									CT_RecordView(url, callType, null, null, window.location.href);
								}
							}
						}
						elem = 0;
						break;
					default:
						elem = (elem.parentElement) ? elem.parentElement : elem.parentNode;
						break;
				}
			}
		}
	} // CT_ProcClick

	function CT_TrackFileExtension(link) {
		link = link.split(/\?/)[0]; // get everything up to but not including ?
		link = link.toLowerCase();
		var l1 = link.length;
		for (var index = 0; index < CT_I_OtherFileExtensionsToReport.length; index++)
			if (CT_I_OtherFileExtensionsToReport[index] != '' && link.substring(l1-CT_I_OtherFileExtensionsToReport[index].length-1) == '.' + CT_I_OtherFileExtensionsToReport[index].toLowerCase())
				return true;
		return false;
	} // CT_TrackFileExtension

	function CT_LocalLink(link) {
		var pieces = link.match(/^https?:\/\/([^\/]+)\//);
		if (pieces) {
			var l = pieces[1].length;
			for (var i = 0; i < CT_I_LocalLinks.length; i++){
				if (pieces[1] == CT_I_LocalLinks[i])
					return true;
			}
			return false;
		}
		return true;
	} // CT_LocalLink

	CT.renderHiddenField = function( name, value ) {
		var newField = document.createElement('input');
		newField.type = 'hidden';
		newField.name = name;
		newField.value = value;
		newField.id = 'id_' + name;
		return newField;
	} // CT.renderHiddenField

	CT.encodeHex = function(string) {
		var len = string.length;
		var output = '';
		for (var i = 0; i < len; i++) {
			var c = '00'+string.charCodeAt(i).toString(16).toUpperCase();
			output += c.substring(c.length - 2);
		}
		return output;
	} // CT.encodeHex

	CT.postHiddenForm = function(obj) {
		var targetUrl = obj.url;
		var formData = obj.vals;
		var output = [];
		var dataLength = targetUrl.length;

		if (window.navigator.userAgent.match(/MSIE.6/) && dataLength > 2000) {
			for (var key in formData) {
				if (typeof(formData[key]) == 'object') {
					for (var j = 0; j < formData[key].length; j++) {
						var string = key+'='+encodeURIComponent(formData[key][j]);
						output.push(string);
					}
				}
			}
			var url = targetUrl + output.join('&');
			CT.image = new Image();
			CT.image.src = url.substring(0, 2000);
		} else {
			var onPostComplete = obj.onCompletion;
			var remotingDiv = CT.getRemotingDiv(targetUrl);
			//fill form with hidden input data
			CT.Queue.busy = true;
			for( var key in formData ) {
				if (typeof(formData[key]) == 'object') {
					for (var j = 0; j < formData[key].length; j++) {
						if (key == 'x' || key == 'X' || key == 'U' || key == 'c')
							output.push(key+'='+encodeURIComponent(formData[key][j]));
						else {
							remotingDiv.form.appendChild(CT.renderHiddenField(key, formData[key][j]));
							dataLength += (key+'='+encodeURIComponent(formData[key][j])).length + 1;
						}
					}
				}
			}
			remotingDiv.form.appendChild(CT.renderHiddenField('JDCDATA', CT.encodeHex(output.join('&'))));
			dataLength += ('JDCDATA='+CT.encodeHex(output.join('&'))).length + 1;
			if (dataLength > 2000 && CT.isIE)
				remotingDiv.form.method = 'post';
			remotingDiv.form.submit();

			remotingDiv.locationChangeTimer = setInterval(
				function() {
					var bLocationChanged = false;
					try {
						bLocationChanged = ( "about:blank" != (CT.isIE ? remotingDiv.iframe.document.location.href : remotingDiv.iframe.location));
					} catch(err) {
						//if we're not allowed to look at the iframe's location (which is why the exception was thrown)
						//then it must have changed!
						bLocationChanged = true;
					}

					if( bLocationChanged ) {
						clearInterval( remotingDiv.locationChangeTimer );
						if (typeof(onPostComplete) == 'function')
							onPostComplete();
						CT.Queue.calls.shift();
						CT.Queue.busy = false;
						CT.removeRemotingDiv();
						CT.Queue.process(); // if there are any more, queue them
					}
				},
				200 // ms
			);
		}
	} // CT.postHiddenForm

	CT.Queue.process = function() {
		if (!CT.Queue.busy && CT.Queue.calls.length)
			CT.postHiddenForm(CT.Queue.calls[0]);
	} // CT.Queue.process

	CT.getRemotingDiv = function(url) {
		var remotingDiv = CT.setupRemotingDiv();
		if (!remotingDiv.setup) {
			remotingDiv.setup = true;
			remotingDiv.innerHTML = '<iframe name="remotingFrame" id="remotingFrame" style="border:0;width:0;height:0;"></iframe>';
			remotingDiv.iframe = frames['remotingFrame'];

			var form = document.createElement('form');
			form.style.border = '0px';
			form.style.height = '0px';
			form.style.width = '0px';
			form.style.display = 'none';
			form.setAttribute('id', 'remotingForm');
			form.target = 'remotingFrame';
			form.setAttribute('method', 'get');
			form.setAttribute('action', url + (url.indexOf('?') == -1 ? '?' : ( url.search(/\?$/) ? '' : '&')) + 'rnd=' + Math.random());
			remotingDiv.form = form;
			remotingDiv.appendChild(form);
		}

		return remotingDiv;
	} // CT.getRemotingDiv

	CT.pruneTree = function(node) {
		if (node) {
			while (node.hasChildNodes()) {
				CT.pruneTree(node.childNodes[0]);
				node.removeChild(node.childNodes[0]);
			}
		}
	} // CT.pruneTree

	CT.removeRemotingDiv = function() {
		var remotingDiv = document.getElementById('remotingDiv');
		if (typeof(remotingDiv) != 'undefined') {
			CT.pruneTree(remotingDiv);
			remotingDiv.setup = false;
		}
	} // CT.removeRemotingDiv

	CT.setupRemotingDiv = function() {
		var remotingDiv = document.getElementById('remotingDiv');
		if (!remotingDiv) {
			remotingDiv = document.createElement('span');
			remotingDiv.id = 'remotingDiv';
			remotingDiv.setup = false;
			document.body.appendChild(remotingDiv);
		}
		return remotingDiv;
	} // CT.setupRemotingDiv

	CT.generateUniqueKey = function() {
		var key = '0000' + parseInt((new Date).getTime() + '' + (Math.floor(Math.random()) % 10)).toString(16).toUpperCase();
		return key.substring(key.length - 12);
	} // CT.generateUniqueKey

	CT.setCookie = function(name, value, domain, expires) {
		var string = name + '=' + value + '; domain=' + domain + '; path=/';
		if (typeof(expires) != 'undefined')
			string += '; expires=' + expires;
		document.cookie = string;
		for (var i = 0; i < CT.cookies.length; i++) {
			var vals = CT.cookies[i].split(/=/, 2);
			if (vals[0] == name) {
				CT.cookies[i] = name + '=' + value; // replace existing value
				return;
			}
		}
		CT.cookies.push(name+'='+value); // otherwise, append new value
	} // CT.setCookie

	CT.readCookie = function(name) {
		for (var i = 0; i < CT.cookies.length; i++) {
			var vals = CT.cookies[i].split(/=/, 2);
			if (vals[0] == name) {
				return vals[1];
			}
		}
		return null;
	}

	CT.tenYearsExpiration = function() {
		var expires = new Date();
		expires.setFullYear(expires.getFullYear() + 10);
		return expires;
	} // CT.tenYearsExpiration

	CT.setCookies = function() {
		var id = CT_I_Datasets[0];
		var unique = CT.generateUniqueKey();
		var Persistent = 'Persistent_id_'+id;
		var Session = 'Session_'+id;
		var expires = CT.tenYearsExpiration();
		var startTime = Math.floor((new Date).getTime() / 1000);
		var fields;
		if (CT.readCookie(Persistent) == null) {
			CT.setCookie(Persistent, unique+':'+startTime, CT_I_FirstPartyDomain, expires.toGMTString());
			CT_I_SET_ORIGIN = true;
			CT_I_SET_REPEAT = true;
			CT_I_REVISIT = false;
		} else {
			var persistentValues = CT.readCookie(Persistent).split(/:/);
			var sessionStarted = startTime - CTC_PREVIOUS_OFFSET;
			if (persistentValues[1] < sessionStarted) {
				CT.setCookie(Persistent, persistentValues[0]+':'+Math.floor((new Date).getTime() / 1000), CT_I_FirstPartyDomain, expires.toGMTString());
				CT_I_SET_REPEAT = true;
			}
			CT_I_REVISIT = true;
		}
		if (CT.readCookie(Session) == null)
			CT.setCookie(Session, unique, CT_I_FirstPartyDomain);
	} // CT.setCookies

	CT.onLoadHandler = function(e) {
		if (CT.onLoadOld != undefined)
			CT.onLoadOld();
		CT.setupRemotingDiv();
		CT_RecordView();
	} // CT.onLoadHandler

	CT.setMarketingParameters = function() {
		var params, search, index, lastClick;

		CT.landingURL = window.location.href;
		CT.lastClick = null;
		search = window.location.search.substring(1);
		params = new Array();
		if (search != '') {
			CT.lastClick = new Object();
			params = search.split(/&/);
			for (index = 0; index < params.length; index++) {
				var key = params[index].match(/^([^=]+)=(.*)$/);
				if (key[1] == 'mmccrtid'
						|| key[1] == 'mmcplc'
						|| key[1] == 'mmcnwk'
						) {
					CT.lastClick[key[1]] = key[2];
					params.splice(index, 1); // delete parameter
					index--;
				} else if (key[1] == 'mmcadgid'
						|| key[1] == 'mmckwdid') {
					CT.lastClick[key[1]] = key[2];
				}
			}
			search = params.join('&');
			CT.landingURL = window.location.protocol + '//' + window.location.hostname + window.location.pathname;
			if (search != '')
				CT.landingURL += '?' + search;
		}
	} // CT.setMarketingParameters

	if (CT_I_EnableExitTracking) {
		if (document.addEventListener) //handle DOM 2 (Mozilla 6)
			document.addEventListener('click', CT_ProcClick, false);
		else
			document.attachEvent('onclick', CT_ProcClick);
	}
	CT.readCookies();
	CT.setMarketingParameters();

	CT.onLoadOld = window.onload;
	window.onload = CT.onLoadHandler;
}

// } guj.js
