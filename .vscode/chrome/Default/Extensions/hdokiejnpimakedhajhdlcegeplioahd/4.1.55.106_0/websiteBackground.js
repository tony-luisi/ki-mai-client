function postacctsload(){var e,t={};for(e=0;e<g_sites.length;e++)g_sites[e].url=AES.hex2url(g_sites[e].url),void 0!==g_sites[e].username&&(g_sites[e].unencryptedUsername=lpmdec_acct(g_sites[e].username,!0,g_sites[e],g_shares)),g_SUPPORTSINGLE||(g_sites[e].pwch=!1),t[g_sites[e].aid]=g_sites[e];g_sites=t;var r={};for(e=0;e<g_securenotes.length;e++)r[g_securenotes[e].aid]=g_securenotes[e];g_securenotes=r;var a={};for(e=0;e<g_applications.length;e++)g_applications[e].appname=AES.hex2url(g_applications[e].appname),a[g_applications[e].appaid]=g_applications[e];for(g_applications=a,e=0;e<g_identities.length;e++)g_identities[e].deciname=lpdec(g_identities[e].iname);"function"==typeof get_data_handler&&get_data_handler()}function get_accts(){$.ajax({type:"POST",url:base_url+"getaccts.php",data:"mobile=1&b64=1&shap=1&includependingsharedfolders=1&includesharedfolderformfillprofiles=1&includeemergencyaccess=1&requestsrc=newvault&hasplugin="+encodeURIComponent(lpversion)+"&u="+encodeURIComponent(g_username_hash),dataType:"text",success:function(e){e=atob(e),g_sites=[],g_securenotes=[],g_prompts=[],g_formfills=[],g_identities=[],g_pendings=[],g_maxid=[],g_groups=[],g_prefoverrides=[],g_shares=[],g_applications=[],lp_attaches=[],g_attachversion=[],g_emer_sharers=[],g_emer_sharees=[],g_note_templates=[],g_reminders=[],g_pending_shares=[],parsemobile(e,e.length,100,0,postacctsload,g_sites,g_securenotes,g_prompts,g_formfills,g_identities,null,null,!0,!1,null,g_pendings,null,g_maxid,null,g_groups,g_prefoverrides,lp_rsaprivatekeyhex,g_shares,null,null,null,g_applications,lp_attaches,g_attachversion,null,null,null,g_emer_sharers,g_emer_sharees,null,g_note_templates,g_pending_shares,g_reminders)}})}function process_icons(e,t){if(e&&(e=e.split(":"),e.length))for(var r=e[0],a=0,i=e.length;a+1<i;a+=2){var n=parseInt(e[a+1]);if(0===r.indexOf("lp")&&n>0){r=r.substring(2);var s=e[a+2].substring(0,n);t?g_bigicons[AES.hex2bin(r)]=s:g_icons[r]=s,r=e[a+2].substring(n)}}}function get_icons(e){$.ajax({type:"POST",url:base_url+"geticon.php",data:"big=1&versionchrome=1&username="+encodeURIComponent(g_username)+"&domain=all",dataType:"text",success:function(t){"latest"!=t&&"nodata"!=t&&process_icons(t,!0),e&&e()}})}function refreshGroupNames(){}lploggedin=!0,g_local_accts_version=-1,g_server_accts_version=-1,g_identities=[],g_formfills=[],g_pendings=[],base_url="",g_sites={},g_securenotes={},g_enterpriseuser=0,g_teamsenterprisemodel=0,g_enterpriseuserrole=null,g_iscompanyadmin=0,g_premium_exp=0,g_applications={},g_shares=[],g_username=null,lp_username=null,g_username_hash=null,g_prompts={},g_maxid=[],g_groups={},g_prefoverrides={},lp_attaches=[],g_attachversion=[],g_emer_sharers=[],g_emer_sharees=[],g_note_templates=[],g_reminders=[],lpversion="4.0",g_uid=null,g_icons=[],g_bigicons=[],g_identity="undefined"!=typeof iid&&iid?iid:Preferences.get("identity"),g_nofolder_feature_enabled=!1,g_basicauth_feature_enabled=!1,get_personal_linked=function(){for(var e=0;e<g_shares.length;e++)if(void 0!==g_shares[e].associative&&1==g_shares[e].associative)return g_shares[e].id;return""},get_securityChallengeScore=function(e){e(null)},getbigicon=function(e){var t=lp_gettld_url(e);return void 0!==g_bigicons[t]?"data:image/png;base64,"+g_bigicons[t]:null},get_method_async=function(e){e()},geticonurlfromrecord=function(e,t){return is_application(e)?"lps lpapp"+e.fiid:"lps lp"+e.aid},unlock_plug2web=function(){g_plug2web_last_initiated=parseInt((new Date).getTime()/1e3)},get_last_reprompt_time=function(){return"undefined"==typeof last_reprompt_time&&(last_reprompt_time=Preferences.get("lastreprompttime")),last_reprompt_time},set_last_reprompt_time=function(){last_reprompt_time=(new Date).getTime(),Preferences.set("lastreprompttime",last_reprompt_time)},get_key_iterations=function(){return 5e3},function(){var e={};lpevent=function(t){t="w"+t,e[t]=e.hasOwnProperty(t)?e[t]+1:1},setInterval(function(){if(g_prompts.improve){var t=!1;for(var r in e){t=!0;break}t&&LPServer.xmlRequest({url:"poll_server.php",data:e}),e={}}},1e4)}(),processCS=function(e,t,r){if("ipcgetdata"==t.cmd&&"undefined"!=typeof g_plug2web_last_initiated&&g_plug2web_last_initiated>=parseInt((new Date).getTime()/1e3)-20){var a=lpParseUri(t.url),i=a.directory.replace(new RegExp("^/~[^/]*"),""),n=a.file.replace(new RegExp("#"),"");if("/"==i&&"acctsiframe.php"==n){var s={cmd:"ipcgotdata",username:g_username,key:btoa(g_local_key),version:lpversion,identity:g_identity,iterations:get_key_iterations(g_username)};t.callback(s)}}},openimport=function(){window.open(base_url+"import.php")},openexport=function(){window.open(base_url+"export.php")},openseccheck=function(){window.open(base_url+"?securitychallenge=1&lpnorefresh=1")},openentconsole=function(){g_enterpriseuserrole?window.open(base_url+"company/#/dashboard"):window.open(base_url+"enterprise_home.php")},loggedOut=function(){send_website_event("logoff"),setTimeout(function(){top.location.href=base_url+"logout.php?token="+g_token},500)},get_saved_logins=function(){},have_binary=function(){return canopensaveattach},install_binary=function(){window.open(base_url+"installer/")},addAttach=function(e){addattach_callback=e,attachkey=SHA256(get_random_password()),send_website_event("getattach",attachkey)},openAttach=function(e,t,r){for(var a=0;a<lp_attaches.length;a++)if(lp_attaches[a].id==t){if(void 0===lp_attaches[a].data||""===lp_attaches[a].data){var i={getattach:lp_attaches[a].storagekey};return void 0!==g_securenotes[e].sharefolderid&&(i.sharedfolderid=g_securenotes[e].sharefolderid),void $.ajax({global:!1,type:"POST",cache:!1,dataType:"json",url:"show_website.php",data:i,success:function(i){""!=i&&(lp_attaches[a].data=i,openAttach(e,t,r))},failure:function(e){alert("error")}})}send_website_event("openattach",lpdec_acct(g_securenotes[e].attachkey,g_securenotes[e],g_shares),lp_attaches[a].data,lp_attaches[a].mimetype)}},exportAttachment=function(e,t,r){for(var a=0;a<lp_attaches.length;a++)if(lp_attaches[a].id==t){if(void 0===lp_attaches[a].data||""===lp_attaches[a].data){var i={getattach:lp_attaches[a].storagekey};return void 0!==g_securenotes[e].sharefolderid&&(i.sharedfolderid=g_securenotes[e].sharefolderid),void $.ajax({global:!1,type:"POST",cache:!1,dataType:"json",url:"show_website.php",data:i,success:function(i){""!=i&&(lp_attaches[a].data=i,exportAttachment(e,t,r))},failure:function(e){alert("error")}})}send_website_event("saveattach",lpdec_acct(g_securenotes[e].attachkey,g_securenotes[e],g_shares),lp_attaches[a].data,lp_attaches[a].mimetype)}},can_copy_to_clipboard=function(){return!1},fastEncryptAttachments=function(e,t,r){var a=[];for(var i in t)t.hasOwnProperty(i)&&void 0!==t[i]&&a.push({id:t[i].id,data:enccbc(t[i].bytes,e)});r(a)},gotourl=function(e){if(g_sites[e].url){var t=g_sites[e].url;t.match(/^[a-z]+?\:\/\//i)||(t="http://"+t),window.open(t)}},increment_local_accts_version=function(){g_local_accts_version++},refreshsites=function(){get_accts()},request_native_messaging=function(){send_website_event("request_native_messaging")},rewritelocalfile=function(){},editAid=function(e,t,r,a){a&&send_website_event("auto_pwchg",e,"0")},switch_identity=function(e){send_website_event("switchidentity",e),g_identity=""+e,Preferences.set("identity",g_identity),document.cookie="iid="+encodeURIComponent(g_identity)},launch=function(e){g_hasplugin?(document[g_manualformname].aid.value=e,document[g_manualformname].submitbtn.click()):pa(function(){window.open(base_url+"launch.php?id="+encodeURIComponent(e)+"&shareid="+encodeURIComponent(void 0!==g_sites[e].sharefolderid?g_sites[e].sharefolderid:0)+"&method=web&token="+g_token)},g_prompts.login_site_prompt||g_sites[e].pwprotect)},launchApp=function(e){launch("app"+e)},check_ident_aid=function(e){if(""===g_identity)return!0;for(var t=0;t<g_identities.length&&g_identities[t].iid!=g_identity;t++);if(t>=g_identities.length)return!1;var r=g_identities[t];return void 0===r.aidarr&&(r.aidarr=r.aids.split(",")),lp_in_array(e,r.aidarr)},check_ident_appaid=function(e){if(""===g_identity)return!0;for(var t=0;t<g_identities.length&&g_identities[t].iid!=g_identity;t++);if(t>=g_identities.length)return!1;var r=g_identities[t];return void 0===r.appaidarr&&(r.appaidarr=r.appaids.split(",")),lp_in_array(e,r.appaidarr)},openall=function(e,t){var r=[],a=!1;for(var i in g_sites)if(check_ident_aid(i)){var n=g_sites[i];n.group==e&&"http://group"!=n.url&&(r.push(n),a=a||n.pwprotect)}if(0!==r.length){if(!t&&(a||g_prompts.login_site_prompt))return void pa(function(){openall(e,!0)},!0);for(var s=0;s<r.length;s++)window.open(r[s].url)}},openAllSites=function(e){for(var t=0;t<e.length;t++)window.open(e[t].url)},openfavorites=function(e){var t=[],r=!1;for(var a in g_sites){var i=g_sites[a];check_ident_aid(a)&&"1"==i.fav&&(t.push(i),r=r||i.pwprotect)}if(0===t.length)return void alert(StringUtils.translate("You do not have any Favorites yet."));if(!skip_reprompt&&(r||g_prompts.login_site_prompt))return void pa(function(){openfavorites(!0)},!0);for(var n=0;n<t.length;n++)window.open(t[n].url)},createNewAcct=function(){return{aid:"",name:"",group:"",url:"",tld:"",extra:"",fav:"0",sharedfromuid:"",username:"",unencryptedUsername:"",password:"",pwprotect:0,genpw:0,sn:0,last_touch:lp_get_gmt_timestamp(),autologin:0,never_autofill:0,realm_data:"",fiid:"",custom_js:"",submit_id:"",captcha_id:"",urid:"0",basic_auth:"0",method:"",action:"",individualshare:!1,fields:[]}},addEmptyGroup=function(e,t,r){var a=issharedfolder(g_shares,e);if(checkreadonly(a)){var i=!1===a?g_local_key:a.sharekey,n=e;if(a){if(!checkreadonly(a))return;n=e.substr(a.decsharename.length+1)}var s=createNewAcct();s.url="http://group",s.group=e,s.aid="0";var o="ajax=1&extjs=1&name=&url="+encodeURIComponent(AES.url2hex(s.url))+"&grouping="+encodeURIComponent(lpenc(n,i))+"&username=&password=&extra=&aid=0&openid_url=&isbookmark=0";o+=!1===a?"":"&sharedfolderid="+en(a.id),o+=get_identity_param(),o+="&token="+g_token,$.ajax({type:"POST",url:base_url+"show_website.php",data:o,dataType:"text",success:function(e){var r=$(jQuery.parseXML(e)).find("result");r.length&&(s.aid=r.attr("aid"),add_ident_aid(s.aid),t(s),g_sites[s.aid]=s)},failure:r})}},checkmultiplefolders=function(e){for(var t=!1,r=null,a=!0,i=0;i<e.length;i++){var n=e[i],s=get_record(n);if(s){var o=issharedfolder(g_shares,s.group);if(o){if(t){a=!1;break}if(null===r)r=o.decsharename;else if(r!=o.decsharename){a=!1;break}}else{if(null!==r){a=!1;break}t=!0}}}return a||alert(StringUtils.translate("Sorry, you cannot perform this operation on a mix of shared and non-shared folders, or multiple shared folders at once.")),a},get_record=function(e){return void 0===e?null:is_application(e)?g_applications[e.substring(3)]:"undefined"!=typeof g_sites&&void 0!==g_sites[e]?g_sites[e]:"undefined"!=typeof g_securenotes&&void 0!==g_securenotes[e]?g_securenotes[e]:null},deleteAid=function(e,t,r,a,i){var n=e.split(",");if(!checkmultiplefolders(n))return!1;for(var s="",o=0,d=0;d<n.length;d++){var l=n[d];if(is_application(id)){if(!check_ident_appaid(l))continue}else if(!check_ident_aid(l))continue;var c=get_record(l);if(c){if(s+=(""===s?"":",")+l,void 0!==c.sharefolderid){o=c.sharefolderid;var p=issharedfolder(g_shares,c.group);if(!checkreadonly(p))return!1}is_application(c)&&void 0!==g_applications[c.appaid]?delete g_applications[c.appaid]:void 0!==g_sites[l]?delete g_sites[l]:void 0!==g_securenotes[l]&&delete g_securenotes[l]}}if(""===s)return!1;var _="ajax=1&extjs=1&delete=1&aid="+en(s);return _+=get_identity_param(),0!==o&&(_+="&sharedfolderid="+en(o)),_+="&token="+g_token,$.ajax({type:"POST",url:base_url+"show_website.php",data:_,dataType:"text"}),i&&i(),!0},get_identity_param=function(){return"&iid="+encodeURIComponent(g_identity)},deleteGroup=function(e,t,r){var a,n=[];for(a in g_sites)g_sites[i].group===e&&n.push(a);for(a in g_securenotes)g_securenotes[i].group===e&&n.push(a);for(a in g_applications)g_applications[i].group===e&&n.push(a);return deleteAid(n.join(","),t,!1,!0,r)},deleteformfill=function(e,t,r,a,i,n,s){var o,d=!1;for(o=0;o<g_formfills.length;o++)if(g_formfills[o].ffid==e){d=issharedfolder(g_shares,void 0!==g_formfills[o].group?g_formfills[o].group:""),g_formfills.splice(o,1);break}var l="deleteext=1&ffid="+encodeURIComponent(e);return l+=!1===d?"":"&sharedfolderid="+encodeURIComponent(d.id),l+=get_identity_param(),l+="&method="+encodeURIComponent(getBG().get_method()),l+="&token="+g_token,l+="&src=website",s&&(l+="&source="+encodeURIComponent(s)),$.ajax({type:"POST",url:base_url+"formfill.php",data:l,dataType:"text",success:i,failure:n}),!0},moveSelectedToGroup=function(e,t,r,a,i){r=r||{},r.successCallback=a,r.errorCallback=i;var n=void 0!==r.skipConfirm&&r.skipConfirm,s=t.split(","),o=issharedfolder(g_shares,e),d=null;if(checkreadonly(o)){for(var l=!1,c=0;c<s.length;c++){var p=s[c],_=get_record(p);if(d=issharedfolder(g_shares,_.group),!checkreadonly(d))return;if(!checkmove(o,d))return;!o&&!d||o&&d&&o.id===d.id||(l=!0)}if(l){for(var g=[],c=0;c<s.length;c++)g[s[c]]=e;return void moveIntoSharedFolder(o,d,s,g,!1,!1,n,r)}var u=[],f=[];if(e===StringUtils.translate("favorites"))for(var c=0;c<s.length;c++){var h=get_record(s[c]);h&&"0"==h.fav&&(u[u.length]=s[c])}(s.length>0||u.length>0||f.length>0)&&changeGroupAndFavorites(s,u,f,e,o,r)}},changeGroupAndFavorites=function(e,t,r,a,i,n){for(var s="",o="",d="",l=[],c=0;c<e.length;c++){var p=e[c],_=get_record(p);_&&a!=StringUtils.translate("favorites")&&(l[l.length]=p,_.group=a,s+=d+p,d=",")}d="";for(var c=0;c<t.length;c++){var p=t[c],_=get_record(p);_&&(l[l.length]=p,_.fav="1",o+=d+p,d=",")}g_local_accts_version++,g_server_accts_version++,rewritelocalfile(),n&&n.successCallback&&n.successCallback();var g=!1===i?g_local_key:i.sharekey,u=a;i&&(u=a.substr(i.decsharename.length+1));var f="aids="+encodeURIComponent(s)+"&newfavaids="+encodeURIComponent(o)+"&oldfavaids="+encodeURIComponent("")+"&newgrp="+encodeURIComponent(lpenc(u,g))+"&xml=1";f+=0==i?"":"&sharedfolderid="+en(i.id),$.ajax({type:"POST",url:base_url+"groups.php",data:f,dataType:"text"})},renameGroup=function(e,t){if(e!=StringUtils.translate("favorites")){var r=issharedfolder(g_shares,e);if(0!=r&&r.decsharename==e)return void alertfrombg("You cannot rename a top level Shared folder");var a=issharedfolder(g_shares,t);if(checkmove(a,r)&&checkreadonly(a)&&checkreadonly(r)){var i=0==a?g_local_key:a.sharekey,n=t;if(a&&(n=t.substr(a.decsharename.length+1)),a||r){var s=[],o=[],d=[g_sites,g_securenotes,g_applications];a&&t.substr(a.decsharename.length+1);for(var l in d){var c=d[l];for(var p in c)if(c.hasOwnProperty(p)){var _=c[p];if(_.group==e||0==_.group.indexOf(e+"\\\\")){s[s.length]=get_record_id(_);var g=t;_.group!=e&&_.group.indexOf("\\\\")>0&&(g=t+_.group.substr(_.group.indexOf("\\\\"))),o[get_record_id(_)]=g}}}return void moveIntoSharedFolder(a,r,s,o,!1,!1,!1)}var d=[g_sites,g_securenotes,g_applications],u=[],f=[],h=[];for(var l in d){var c=d[l];for(var p in c)if(c.hasOwnProperty(p)){var _=c[p];if(_.group==e){_.group=t,void 0===u[e]?(h[h.length]=e,f[e]=get_record_id(_)):f[e]+=","+get_record_id(_);var n=t;a&&(n=n.substr(a.decsharename.length+1)),u[e]=n}else if(0==_.group.indexOf(e+"\\\\")){var m=_.group;_.group=_.group.replace(e+"\\\\",t+"\\\\"),void 0===u[m]?(h[h.length]=m,f[m]=get_record_id(_)):f[m]+=","+get_record_id(_);var n=_.group;a&&(n=n.substr(a.decsharename.length+1)),u[m]=n}}}g_local_accts_version++,rewritelocalfile();for(var v="xml=1",y=0;y<h.length;y++)v+="&ids"+y+"="+encodeURIComponent(f[h[y]])+"&newgrp"+y+"="+encodeURIComponent(lpenc(u[h[y]],i));v+=0==a?"":"&sharedfolderid="+en(a.id),$.ajax({type:"POST",url:base_url+"groups.php",data:v,dataType:"text"})}}},get_record_id=function(e){return is_application(e)?"app"+e.appaid:e.aid},is_application=function(e){return"string"==typeof e?0===e.indexOf("app"):e&&void 0!==e.appaid},moveIntoSharedFolder_orig=moveIntoSharedFolder,moveIntoSharedFolder=function(e,t,r,a,i,n,s,o){var d=Object.prototype.toString.call(r);if("[object Array]"===d)if("object"==typeof r[0]&&"string"==typeof r[0].aid){var l="A,";for(var c in r)r.hasOwnProperty(c)&&"string"==typeof r[c].aid&&(l+=(""==l?"":",")+r[c].aid);r=l}else r="B,"+r.join(",");else if("[object Object]"===d){var l="C,";for(var c in r)r.hasOwnProperty(c)&&(l+=(""==l?"":",")+c);r=l}else r="[object String]"===d?"D,"+r:"E,"+r;o||(o={});var p=o.successCallback?o.successCallback:function(){};o.successCallback=function(){p(),get_accts()},s&&(o.skipConfirm=!0);var _="";for(var c in a)if(a.hasOwnProperty(c)){_=a[c];break}return moveIntoSharedFolder_orig(t?t.id:"",e?e.id:"",_,r,"",o,"newvault")},getBG=function(){return this},saveSite=function(e,t,r,a){e+="&method="+encodeURIComponent(getBG().get_method()),e+="&auto=1"+get_identity_param(),e+="&token="+g_token,t.postdata=e,t.posturl=base_url+(is_application(t)?"addapp.php":"show_website.php"),$.ajax({type:"POST",url:t.posturl,data:e,dataType:"text",success:function(e){e=$(jQuery.parseXML(e));var i=e.find("result");if(i.length){0==t.aid&&(t.aid=i.attr("aid"),add_ident_aid(t.aid));var n=i.attr("attacherror");n&&""!=n&&alert(n);for(var s=0,o=Array();null!=i.attr("att_"+s);)o[i.attr("att_"+s)]=Array(),o[i.attr("att_"+s)].key=i.attr("attstorekey_"+s),o[i.attr("att_"+s)].size=i.attr("attsize_"+s),s++;if(void 0!==t.attacharraychanges&&(!n||""==n)){if(void 0!==t.attacharraychanges.add)for(var d in t.attacharraychanges.add)t.attacharraychanges.add.hasOwnProperty(d);applyattacharraychanges(t.attacharraychanges)}t.sn?g_securenotes[t.aid]=t:g_sites[t.aid]=t,r(t)}else{var l=e.find("error");l.length&&a(l.attr("response"))}},failure:a})},saveFields=function(e,t,r,a,i){t+="&method="+encodeURIComponent(getBG().get_method()),$.ajax({type:"POST",url:base_url+"fields.php?"+e,data:t,dataType:"text",success:a,failure:i})},changePassword=function(e,t,r,a,i){for(var n=[],s=0,o=0;o<t.length;o++)if(g_sites[t[o]]){var d=lpmdec_acct(g_sites[t[o]].password,!0,g_sites[t[o]],g_shares);if(d!=e&&(n[n.length]=t[o],g_sites[t[o]].password=lpmenc_acct(e,!0,g_sites[t[o]],g_shares),g_sites[t[o]].fields))for(var l=0;l<g_sites[t[o]].fields.length;l++)"password"==g_sites[t[o]].fields[l].type&&lpmdec_acct(g_sites[t[o]].fields[l].value,!0,g_sites[t[o]],g_shares)==d&&(g_sites[t[o]].fields[l].value=g_sites[t[o]].password);void 0!==g_sites[t[o]].sharefolderid&&(s=g_sites[t[o]].sharefolderid)}if(t=n,0!==t.length){for(var c="xml=1",p=[],o=0;o<t.length;o++){var _=o>0?o:"";c+="&username"+_+"=dummy",c+="&password"+_+"="+encodeURIComponent(lpenc_acct(e,g_sites[t[o]],g_shares)),c+="&id"+_+"="+encodeURIComponent(t[o]);try{lp_in_array(g_sites[t[o]].tld,p)||(p[p.length]=g_sites[t[o]].tld)}catch(e){}}try{for(var o in g_sites)if(g_sites[o].genpw&&lp_in_array(g_sites[o].tld,p)&&lpmdec_acct(g_sites[o].password,!0,g_sites[o],g_shares)==e){c+="&delgenpwaid="+encodeURIComponent(o);break}}catch(e){}0!=s&&(c+="&sharedfolderid="+en(s)),void 0!==r&&r&&(c+="&autochange=1");var g={};g.aid=0,g.postdata=c,g.url=base_url+"change_pw.php",g.handler=a,g.param={aid:g.aid,postdata:g.postdata,url:g.url,handler:g.handler},g.successCallback=a,$.ajax({type:"POST",url:g.url,data:g.postdata,dataType:"text",success:function(e){var t=$(jQuery.parseXML(e)).find("ok");if(t.length)for(var r="";t.attr("id"+r);){var i=g_sites[t.attr("id"+r)],n=crypto_atob(t.attr("newpassword"+r)),s=crypto_atob(t.attr("oldpassword"+r));if(i.password=n,i.fields)for(var o=0;o<i.fields.length;++o){var d=i.fields[o];"password"!=d.type||d.value!=s&&lpmdec_acct(d.value,!0,i,g_shares)!=lpmdec_acct(s,!0,i,g_shares)||(d.value=n)}r=""===r?1:++r}a()},failure:i})}},addeditformfill=function(e,t,r,a){var i="";i+="&method="+encodeURIComponent(getBG().get_method());var n;for(n in e)i+=(""==i?"":"&")+n+"="+en(e[n]);var s=!1;return void 0!==t.group&&""!=t.group&&(s=issharedfolder(g_shares,t.group)),i+=0==s?"":"&sharedfolderid="+en(s.id),i+=get_identity_param(),i+="&token="+g_token,i+="&src=website",$.ajax({type:"POST",url:base_url+"formfill.php",data:i,dataType:"text",success:function(e){var a=$(jQuery.parseXML(e)).find("result");if(a.length){var i=(a.attr("msg"),a.attr("ffid"));add_ident_ffid(i);var n,s=a.attr("cfids"),o=(a.attr("accts_version"),[]),d=""==s?[]:s.split(","),l=0;for(n=1;void 0!==t["customfield"+n+"cfid"];++n){var c={};c.cfid=0!=t["customfield"+n+"cfid"]?t["customfield"+n+"cfid"]:l<d.length?d[l++]:0,c.text=t["customfield"+n+"text"],c.value=t["customfield"+n+"value"],c.alttext=t["customfield"+n+"alttext"],""==c.text&&""==c.value&&""==c.alttext||o.push(c)}var p=t.cmd;for(delete t.cmd,delete t.deleteext,n=1;void 0!==t["customfield"+n+"cfid"];++n)delete t["customfield"+n+"cfid"],delete t["customfield"+n+"text"],delete t["customfield"+n+"value"],delete t["customfield"+n+"alttext"];if(t.custom_fields=o,"add"==p)t.ffid=i,g_formfills.push(t);else for(n=0;n<g_formfills.length;++n)if(i==g_formfills[n].ffid){g_formfills[n]=t;break}r&&r(t)}},failure:a}),!0},add_ident_aid=function(e){if(g_identity){for(var t=null,r=0;r<g_identities.length;r++)if(g_identities[r].iid===g_identity){t=g_identities[r];break}t&&(t.aids&&(t.aids+=","),t.aids+=e,t.aidarr=t.aids.split(","))}},add_ident_ffid=function(e){if(g_identity){for(var t=null,r=0;r<g_identities.length;r++)if(g_identities[r].iid==g_identity){t=g_identities[r];break}t&&(t.ffids&&(t.ffids+=","),t.ffids+=e,t.ffidarr=t.ffids.split(","))}},db_prepend=function(e){return e},localStorage_setItem=function(e,t){try{return localStorage.setItem(e,t),!0}catch(e){return!1}},localStorage_getItem=function(e){try{return localStorage.getItem(e)}catch(e){return null}},openURL=function(e){window.open(e)},canLaunchApplication=function(){return!1},singlefactor_reprompt=function(e,t,r){e()},isOffline=function(){return!1},get_method=function(){return"web"},lpReportError=function(){return errorCount=0,function(e){!0===g_prompts.improve&&(++errorCount>100||$.ajax({url:base_url+"error.php",type:"POST",data:{msg:"error: website("+lpversion+") errors("+errorCount+"): "+e}}))}}(),loglogin=function(e){if(g_loglogins){var t=get_record(e);if(t){var r=issharedfolder(g_shares,t.group);if(r&&r.id===get_personal_linked())return;var a={id:e,method:get_method()};r&&(a.sharedfolderid=r.id),g_loglogins>1&&t&&(2==(2&g_loglogins)&&"http://sn"!=t.url&&(a.u=AES.url2hex(t.url)),4==(4&g_loglogins)&&(a.n=AES.url2hex(t.name)),8==(8&g_loglogins)&&t.unencryptedUsername&&(a.un=AES.url2hex(t.unencryptedUsername))),$.ajax({url:base_url+"loglogin.php",type:"POST",data:a})}}},sendLpImprove=function(e,t){var r={cmd:"lpimprove",event:e,method:get_method()};t&&$.extend(r,t),$.ajax({type:"POST",url:base_url+"lastpass/api.php",data:r})},VaultToggle={toggleVault3_0:function(){}};