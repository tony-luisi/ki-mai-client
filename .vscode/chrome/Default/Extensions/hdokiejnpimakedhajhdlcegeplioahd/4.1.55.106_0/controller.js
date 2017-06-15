LPProxy={},function(){var e=null,r=Strings.translateString("(none)");Topics.get(Topics.CLEAR_DATA).subscribe(function(){V=null,LPProxy.clearModel()}),LPProxy.getBaseURL=function(){return bg.get("base_url")},LPProxy.logEvent=function(e){bg.lpevent(e)},LPProxy.encryptAES=function(e,r){return e.length>0?bg.AES.Encrypt({pass:r,data:e,b64:!0,bits:256}):e},LPProxy.decryptAES=function(e,r){return bg.AES.Decrypt({pass:r,data:e,b64:!0,bits:256})};var t=function(e){return function(r,t,n){e(n)}},n=function(e,r){return function(t){try{switch(t){case"exceededlimit":e(Strings.translateString("Sorry, as a premium user, you are limited to one Shared Folder. Please consider using %1 if you would like more.",{type:"a",attributes:{target:"_blank",href:LPProxy.getBaseURL()+"enterprise/"},text:"LastPass Enterprise"}));break;default:var n=$(jQuery.parseXML(t));a(n,e,r)}}catch(r){LPPlatform.logException(r),e(Strings.Vault.UNEXPECTED_ERROR)}}},o=function(e,r,t){var n=e[r];return"function"==typeof n&&(n(t),!0)},a=function(e,r,t){var n=e.find("result"),a=e.find("ok"),i=e.find("error"),s=e.find("failed");if(n.length){var c=n.attr("rc"),l=n.attr("msg"),u=n.attr("success"),g=n.attr("ok"),d=n.text().trim();if(void 0!==c){var f=t[c];if("function"==typeof f)return void f(n);switch(c){case"notoken":return void r("No token was provided. Request could not be completed");case"cantsharewithself":return void r("Cannot share an item with yourself.");case"alreadyexists":return void r(Strings.translateString("That group already exists."))}}else if(void 0!==l){if(o(t,l,n))return}else if(void 0!==u){if(o(t,u,n))return}else if(void 0!==g){if(o(t,"ok"))return}else if("ok"===d){if(o(t,"ok"))return;if(o(t,e.find("status").text()))return}else if("bad"===d)return void r(e.find("message").text())}else if(a.length){if(o(t,"ok",a))return}else if(i.length){var P=i.attr("message");if(P)return void r(P)}else if(s.length&&o(t,s.attr("reason"),s))return;r(Strings.Vault.UNEXPECTED_ERROR)},i=function(e,r){return function(t){try{if(t=jQuery.parseJSON(t),"object"==typeof r){var n=r[t.error]||r[t.res]||r[t.reason]||r[t.status];if("function"==typeof n)return void n(t);r=r.default}if(t.error)switch(t.error){case"session_expired":return void e(Strings.translateString("ErrorSessionMsg"));case"not_allowed":return void e(Strings.translateString("Your Shared Folder action failed. Please check your permissions before trying again"));default:var o=t.errortxt||Strings.Vault.UNEXPECTED_ERROR;return void e(o)}if(t.res)switch(t.res){case"success":break;default:return void e(Strings.Vault.UNEXPECTED_ERROR)}r(t)}catch(r){LPPlatform.logException(r),e(Strings.Vault.UNEXPECTED_ERROR)}}},s=function(e){return function(){bg.have_binary()?e.apply(this,arguments):LPPlatform.supportsBinary()?dialogs.confirmation.open({title:Strings.translateString("Install Binary Component"),text:Strings.translateString("This feature requires the binary version of this browser extension. Would you like to install it now?"),handler:function(){bg.install_binary()}}):dialogs.alert.open({title:Strings.translateString("Not Supported"),text:Strings.translateString("This feature requires an external binary component, which is currently not supported on this platform.")})}};LPProxy.logout=function(){bg.lpevent("v_off"),bg.loggedOut(!1,"homelocal2")},LPProxy.copyUsername=function(e){bg.lpevent("v_cu"),bg.copytoclipboard(e.getUsername())},LPProxy.copyPassword=function(e,r){bg.lpevent("v_cp"),bg.copytoclipboard(e.getPassword());var t=0;e._data&&(t=e._data.autologin?1:0),r&&r.source&&(r.approach?bg.sendLpImprove("sitelogin",{source:r.source,autologin:t,copy:1,approach:r.approach}):bg.sendLpImprove("sitelogin",{source:r.source,autologin:t,copy:1})),bg.loglogin(e.getID(),"notrack")},LPProxy.copyURL=function(e){bg.lpevent("v_curl"),bg.copytoclipboard(e.getURL())},LPProxy.goToURL=function(e){bg.lpevent("v_g2"),bg.openURL(e.getURL())},LPProxy.copyToClipboard=function(e){bg.copytoclipboard(e)};var c=function(e){for(var r=[],t=0,n=e.length;t<n;++t)"0"!==e[t].getID()&&r.push(e[t].getID(!0));return r.join(",")};LPProxy.deleteItem=function(e,r){bg.lpevent("v_d"),bg.deleteAid(c(e),null,!0,!0,r)},LPProxy.deleteFormFill=function(e,r,t,n){var o=r&&r.source?r.source:"vault";bg.lpevent("v_dff"),bg.deleteformfill(e._data.ffid,!0,!1,null,t,n,o)},LPProxy.deleteFolder=function(e,r){bg.lpevent("v_dg"),bg.deleteAid(c(e),null,!0,!0,r)},LPProxy.launchSite=function(e,r){bg.lpevent("v_ls"),bg.launch(e.getID(),!0);var t=0;e._data&&(t=e._data.autologin?1:0),bg.sendLpImprove("sitelogin",{source:r.source,autologin:t,copy:0}),bg.loglogin(e.getID(),"notrack")},LPProxy.launchApplication=s(function(e){bg.launchApp(e.getID())}),LPProxy.moveToFolder=function(e,r,t,n){bg.moveSelectedToGroup(r._data.group,c(e),{skipConfirm:!0},t,n)},LPProxy.moveIntoSharedFolder=function(){var e=function(e){var r=null;return e&&(r=$.extend({},e),r.sharekey=r.key),r};return function(r){bg.moveIntoSharedFolder(e(r.params.toShareInfo),e(r.params.fromShareInfo),r.params.itemsToMove,r.params.parentMap,!1,!1,!0,{successCallback:r.success,errorCallback:r.error})}}(),LPProxy.addGroup=function(e,r,t){bg.addEmptyGroup(e._data.group,r,t)},LPProxy.renameGroup=function(e,r,t,n){bg.renameGroup(e._data.group,r.group,{skipConfirm:!0},t,n)};var l=function(e){return function(){var r=arguments;LPProxy.getToken(function(){e.apply(window,r)},arguments[arguments.length-1])}},u=function(){var e=function(e){e?dialogs.alert.open({title:Strings.translateString("Generating Sharing Keys"),text:Strings.translateString("LastPass is currently generating unique sharing keys required for this action. Please try again later.")}):dialogs.sharingKey.open()};return function(){LPPlatform.generateSharingKeys(e)}}(),g=function(){return function(e){return function(){for(var r=[],t=0,n=arguments.length;t<n;++t)r.push(arguments[t]);var o=r[r.length-1],a=new SharedFolderUser({uid:bg.get("g_uid"),username:bg.get("g_username")});LPProxy.getPublicKeys([a],function(){a.pubkey?(r.push(a),e.apply(window,r)):(u(),o())},o)}}}(),d=function(e){dialogs.inviteFriends.open(e)};LPProxy.shareItems=function(){var e={invite:d,problems:function(e){var r=LPTools.createElement("table","settings dialogMargin"),t=LPTools.createElement("tr","settingsHeader");t.appendChild(LPTools.createElement("th",null,Strings.translateString("Email Address"))),t.appendChild(LPTools.createElement("th",null,Strings.translateString("Reason"))),r.appendChild(t);for(var n=0,o=e.length;n<o;++n){var a=e[n],i=LPTools.createElement("tr","settingsRow"+(n%2!=0?" odd":""));i.appendChild(LPTools.createElement("td",null,a.email)),i.appendChild(LPTools.createElement("td",null,a.reason)),r.appendChild(i)}dialogs.alert.open({title:Strings.translateString("Failed To Share With Some Users"),text:[Strings.translateString("We failed to share with the following users:"),r]})}};return function(r){bg.BackgroundServer.sharing.individual.shareItems($.extend(!0,r,{params:{logname:bg.get("g_prefoverrides").logname},callbacks:$.extend({},e,{"Please first verify your email.":function(){r.error(""),dialogs.verifyEmail.open({email:bg.get("g_username")})}}),success:f(r.success,function(){Topics.get(Topics.ITEM_SHARED).publish()})}))}}();var f=function(e,r){return e?function(){r.apply(window,arguments),e.apply(window,arguments)}:r};LPProxy.resendShareInvitation=function(e){bg.BackgroundServer.sharing.individual.shareItems(e)},LPProxy.unshareItem=function(){bg.BackgroundServer.sharing.individual.unshareItem.apply(bg,arguments)},LPProxy.acceptShare=function(){bg.BackgroundServer.sharing.individual.acceptShare.apply(bg,arguments)},LPProxy.rejectShare=function(){bg.BackgroundServer.sharing.individual.rejectShare.apply(bg,arguments)},LPProxy.renameSharedGroup=function(e){bg.BackgroundServer.sharing.folder.rename(e)},LPProxy.parsePrivateKey=function(e){bg.parse_private_key(e,bg.get("rsaprivatekeyhex"))},LPProxy.parsePublicKey=function(e,r){bg.parse_public_key(e,r)},LPProxy.encrypt=function(e,r){return bg.enc(e,r)},LPProxy.decrypt=function(e,r){try{return bg.dec(e,r)}catch(e){return""}},LPProxy.getLocalKey=function(){return bg.get("g_local_key")},LPProxy.encryptWithKey=function(e,r){return bg.lpenc(e,r)},LPProxy.encryptWithBTOA=function(e){return bg.crypto_btoa(e)},LPProxy.encryptMobile=function(e,r,t){return null!==bg?bg.lpmenc(e,r,t):e},LPProxy.decryptMobile=function(e,r,t){return null!==bg?bg.lpmdec(e,r,t):e};var P=function(){var e=function(e,r,t,n,o,a){if(e._data.save_all&&e.isNew()&&e instanceof Account){var i=e.getURLArguments(r,t,n);bg.saveAllSite(i,e._data,o,a)}else{var i=e.getURLArguments(r,t,n);bg.saveSite(i,r,o,a)}};return function(r,t,n,o,a,i){if(t.attacharraychanges&&t.attacharraychanges.add&&t.attacharraychanges.add.length>0){var s=bg.AES.hex2bin(bg.lpdec(t.attachkey,n.getKey()));if(!s)throw new AttachmentKeyException;bg.fastEncryptAttachments(s,t.attacharraychanges.add,function(s){for(var c=0,l=s.length;c<l;++c)t.attacharraychanges.add[c].bytes=s[c].data;e(r,t,n,o,a,i)})}else e(r,t,n,o,a,i)}}(),p=function(e,r,t,n,o,a){return!(e.isNew()||!e.checkForSharedGroupChange(t))&&(LPProxy.moveIntoSharedFolder({params:{fromShareInfo:e.getShareInfo(),toShareInfo:t.getShareInfo(),itemsToMove:[r],parentMap:function(){var r={};return r[e.getID()]=t.getName(),r}()},success:function(r){o(r[e.getID()])},error:a}),!0)};LPProxy.saveSite=function(e,r,t,n,o,a){if(p(e,r,t,0,o,a));else if(LPTools.getOption(n,"saveFromSubmit",!1))bg.saveSiteFromSubmit(e.getURLArguments(r,t,n),r,o,a);else{var i=o;if(!e._data.save_all&&LPTools.getOption(n,"saveFields",!1))if(r.fields.length>e._data.fields.length){var s={data:e.getFieldFormData(r.fields),ref:bg.AES.url2hex(r.url),updatefields:1,aid:r.aid},c=e.getShareInfo();c&&(s.sharedfolderid=c.id),i=function(){bg.updateFieldsFromSubmit($.param(s),r,o,a)}}else{for(var l={aid:e.getID(),urid:0,auto:1,update:1},u=$.param(l),s={},g=0;g<r.fields.length;++g){var d=r.fields[g];if("checkbox"!=d.type||d.checked){var f=e.getFieldPostData(d),y="_"+d.name;d.otherfield&&void 0!==d.formname&&(y="_"+d.formname+y),s[y]=f.value}}var c=e.getShareInfo();c&&(s.sharedfolderid=c.id),s=$.param(s),i=function(){bg.saveFields(u,s,{aid:e.getID()},function(){o(r)},a)}}P(e,r,t,n,i,a)}},LPProxy.addSite=function(e,r,t,n,o){LPTools.getOption(t,"saveFromSubmit",!1)?bg.saveSiteFromSubmit(e.getURLArguments(e._data,r,t),e._data,n,o):P(e,e._data,r,t,n,o)},LPProxy.saveNote=function(e,r,t,n,o,a){p(e,r,t,0,o,a)||P(e,r,t,n,o,a)},LPProxy.addNote=function(e,r,t,n,o){P(e,e._data,r,t,n,o)},LPProxy.saveApplication=function(e,r,t,n,o,a){P(e,r,t,n,o,a)},LPProxy.addApplication=function(e,r,t,n,o){P(e,e._data,r,t,n,o)},LPProxy.addFormFill=function(e,r,t,n){var o=e.getPostData(e._data,null,r);o.cmd=e._data.cmd="add",bg.addeditformfill(o,e._data,t,n)},LPProxy.saveFormFill=function(e,r,t,n,o){var a=e.getPostData(r,null,t);a.cmd=r.cmd="edit",bg.addeditformfill(a,r,n,o)},LPProxy.getShareInfo=function(e){var r=null;return $.each(bg.get("g_shares"),function(t,n){if(n.id===e)return r=n,!1}),r};var y=function(e){for(var r in e){var t=e[r],n=t._model.getGroupParentName();if(n){var o=e[n];void 0!==o&&null===t._parent&&(o._subGroups.push(t),t.setParent(o))}}},m=function(){var e={};for(var r in R)e[r]=R[r].newDisplayObject();return e};LPProxy.getImage=function(e,r){var t=!0,n=r&&r.useSquareIcon?bg.getbigicon(e._model.getURL(),"sq"):bg.getbigicon(e._model.getURL());return null===n&&(t=!1,n=bg.geticonurlfromrecord(e._model._data,!0)),e.bigImg=t,n},LPProxy.hasReceivedShares=function(){var e=function(e){for(var r in e)if(e[r].isReceivedShare())return!0;return!1};return function(){return bg.get("g_pendings").length>0||e(b)||e(L)}}(),LPProxy.getPendingRecievedShares=function(){var e=[];if(LPTools.hasProperties(k))if(bg.get("rsaprivatekeyhex")){var r=0;for(var t in k)try{e.push(k[t].newDisplayObject())}catch(e){++r}r>0&&Topics.get(Topics.ERROR).publish(Strings.translateString("%1 Pending Shares could not be decrypted.",r))}else Topics.get(Topics.ERROR).publish(Strings.translateString("No private key. Cannot decrypt Pending Shares."));return e},LPProxy.getPendingRecievedShare=function(e){return k[e]},LPProxy.getEmergencyAccessRecipientModels=function(){var e=[];for(var r in A)e.push(A[r]);return e},LPProxy.getEmergencyAccessRecipientModel=function(e){return A[e]},LPProxy.assignItemsToGroups=function(e,t){var n=m();t=void 0===t||t;for(var o=0,a=e.length;o<a;++o){var i=e[o],s=i._model._data.group||r,c=n[s];if(void 0===c){for(var l=LPProxy.addDummyGroups(i._model,!1),u=0,g=l.length;u<g;++u){var d=l[u];n[d.getName()]=d.newDisplayObject()}c=n[s]}c._items.push(i),i.setParent(c)}y(n);var f=[];for(var P in n){var p=n[P];p._destructed||(t||0!==p.getItemChildren().length?null===p._parent&&f.push(p):p.destruct())}return f};var h=function(e,r){var t=null;null!==e&&(t=bg.get("g_identity"),void 0!==e&&(t=e.getID()));var n=null;return null!==t&&$.each(bg.get("g_identities"),function(e,o){if(o.iid===t){n={};for(var a=o[r].split(","),i=0;i<a.length;++i)n[a[i]]=!0;return!1}}),n},v=function(e,r,t){return!r||r[e]&&!t||void 0===r[e]&&t};LPProxy.getAllModelItems=function(){return LPTools.objectsToArray(b,L,S)},LPProxy.getAllModelTypes=function(){var e=[];return this.getAllModelItems().forEach(function(r){var t=r.getRecordType();e.includes(t)||e.push(t)}),e},LPProxy.getAllSharedGroupModelsByID=function(){return $.extend({},_)},LPProxy.getAllItems=function(e){var r=LPProxy.getSites(e).concat(LPProxy.getNotes(e)).concat(LPProxy.getApplications(e)),t=!0;return e&&e.identity instanceof Identity&&(t=e.identity instanceof AllIdentity),LPProxy.assignItemsToGroups(r,t).concat(LPProxy.getFormFills(e))},LPProxy.getApplicationModel=function(e){return x[e]},LPProxy.getApplications=function(e){return q(x,"appaids",e)};var b={},L={},S={},x={},_={},E={},k={},T={},A={},R={},w=!1,I=function(e){return e instanceof Account?b:e instanceof Note?L:e instanceof FormFill?S:e instanceof Application?x:e instanceof SharedGroup?_:e instanceof Group?E:"undefined"!=typeof PendingReceivedSharedItem&&e instanceof PendingReceivedSharedItem?k:"undefined"!=typeof EmergencyAccessRecipient&&e instanceof EmergencyAccessRecipient?A:"undefined"!=typeof EmergencyAccessSharer&&e instanceof EmergencyAccessSharer?T:void 0};LPProxy.removeItem=function(e){var r=I(e);r&&delete r[e.getID()],e instanceof Group&&delete R[e.getName()]},LPProxy.addItem=function(e){var r=I(e);r&&(r[e.getID()]=e),e instanceof Group&&(R[e.getName()]=e)},LPProxy.getExistingGroupParent=function(e){for(;e.length>0;){if(void 0!==R[e])return R[e];e=e.substring(0,e.lastIndexOf("\\"))}return null},LPProxy.addDummyGroups=function(){var e=function(e,r,t,n){var o=new e(r,n);return(void 0===t||t)&&(R[o.getName()]=o),o};return function(t,n){var o=t.getSharedGroup(),a=t._data.group,i=[];if(t instanceof DummyGroup&&(R[t.getName()]=t),a){var s=-1;do{s=a.indexOf("\\",s+1);var c=a.substring(0,-1===s?a.length:s);void 0===R[c]&&i.push(e(DummyGroup,c,n,o))}while(s>-1)}else void 0===R[r]&&i.push(e(DefaultGroup,r,n));return i}}(),LPProxy.clearModel=function(){b={},L={},S={},x={},E={},_={},R={},k={},T={},A={},w=!1};var D=function(r){var t=bg.get_personal_linked();t?Topics.get(Topics.ACCOUNT_LINKED).publish():Topics.get(Topics.ACCOUNT_UNLINKED).publish();var n={},o=LPPlatform.getBackgroundData(bg.get("g_sites"));for(var a in o){var i=o[a];if("http://group"===i.url&&i.sharefolderid===a){var s=LPProxy.getShareInfo(a),c=_[a];a===t?(c=c?c.refresh(i,s):new LinkedGroup(i,s),e=c):r[i.group]?c=c?c.refresh(i,s):new EmergencyAccessGroup(i,s):r[i.group.substring(SharedGroup.prototype.SHARED_FOLDER_NAME_PREFIX.length)]?(i.group=i.group.substring(SharedGroup.prototype.SHARED_FOLDER_NAME_PREFIX.length),c=c?c.refresh(i,s):new EmergencyAccessGroup(i,s)):c=c?c.refresh(i,s):new SharedGroup(i,s),_[a]=c,n[a]=!0}}F(_,n),B(_)},C=function(){var e={},r={},t=LPPlatform.getBackgroundData(bg.get("g_sites"));for(var n in t){var o=t[n],a=_[o.sharefolderid];if("http://group"===o.url){if(void 0===a||o.group.indexOf("\\")>-1){var i=E[n];i=i?i.refresh(o,a):new Group(o,a),E[n]=i,r[n]=!0}}else{var s=b[n];b[n]=s?s.refresh(o,a):new Account(o,a),e[n]=!0}}F(b,e),F(E,r),B(E),N(E),N(b)},F=function(e,r){for(var t in e)if(void 0===r[t]){var n=e[t];n.deleteUpdates(!1),n.removed=!0}},B=function(e){for(var r in e){var t=e[r];R[t.getName()]=t}},N=function(e){for(var r in e)LPProxy.addDummyGroups(e[r])},O=function(){var e={},r=LPPlatform.getBackgroundData(bg.get("g_securenotes")),t=LPPlatform.getBackgroundData(bg.get("lp_attaches"));for(var n in r){var o=r[n],a=[];if("1"===o.attachpresent&&t)for(var i=0,s=t.length;i<s;++i){var c=t[i];c.parent===o.aid&&a.push(new Attachment(c))}var l=_[o.sharefolderid],u=L[n];L[n]=u?u.refresh(o,l,a):new Note(o,l,a),e[n]=!0}F(L,e),N(L)},U=function(){var e={},r=LPPlatform.getBackgroundData(bg.get("g_applications"));for(var t in r){var n=r[t],o=x[t],a=_[n.sharefolderid];x[t]=o?o.refresh(n,a):new Application(n,a),e[t]=!0}F(x,e),N(x)},M=function(){var e={},r=LPPlatform.getBackgroundData(bg.get("g_formfills"));if(r){for(var t=0,n=r.length;t<n;++t){var o=r[t],a=o.ffid,i=S[a],s=_[o.sharefolderid];S[a]=i?i.refresh(o,s):new FormFill(o,s),e[a]=!0}F(S,e)}},G=function(){var e={},r=LPPlatform.getBackgroundData(bg.get("g_pendings"));if("undefined"!=typeof PendingReceivedSharedItem)for(var t=0,n=r.length;t<n;++t){var o=r[t],a=o.id,i=k[a];k[a]=i?i.refresh(o):new PendingReceivedSharedItem(o),e[a]=!0}F(k,e)},j=function(){var e={},r=LPPlatform.getBackgroundData(bg.get("g_emer_sharees"));if(r&&"undefined"!=typeof EmergencyAccessRecipient)for(var t=0,n=r.length;t<n;++t){var o=r[t],a=o.username,i=A[a];A[a]=i?i.refresh(o):new EmergencyAccessRecipient(o),e[a]=!0}F(A,e)},K=function(){var e={},r={},t=LPPlatform.getBackgroundData(bg.get("g_emer_sharers"));if(t&&"undefined"!=typeof EmergencyAccessSharer)for(var n=0,o=t.length;n<o;++n){var a=t[n],i=a.username,s=T[i];T[i]=s=s?s.refresh(a):new EmergencyAccessSharer(a),e[i]=!0,s.allowedAccess()&&(r[s.getName()]=!0)}return F(T,e),r},H=function(){w=LPPlatform.getBackgroundData(bg.get("RecordTypeConfig"))};LPProxy.initializeModel=function(){R={};var e=K();j(),D(e),C(),O(),U(),M(),G(),H(),bg.refreshGroupNames()},LPProxy.getModel=function(e,r){switch(r){case"Account":return LPProxy.getSiteModel(e);case"Note":return LPProxy.getNoteModel(e);case"FormFill":return LPProxy.getFormFillModel(e);case"Application":return LPProxy.getApplicationModel(e)}},LPProxy.getGroups=function(){return LPTools.objectsToArray(R)},LPProxy.getGroupByName=function(e){return R[e]};var q=function(e,r,t){var n=LPTools.getOption(t,"identity",void 0),o=LPTools.getOption(t,"filter",h(n,r)),a=LPTools.getOption(t,"invertIdentity",!1)||LPTools.getOption(t,"invertFilter",!1),i=[];if(o&&!a){for(var s in o)if(v(s,o,a)){var c=e[s];c&&i.push(c.newDisplayObject())}}else for(var l in e)v(l,o,a)&&i.push(e[l].newDisplayObject());return i};LPProxy.getSiteModel=function(e){return b[e]},LPProxy.getSiteModels=function(){return LPTools.objectsToArray(b)},LPProxy.getSite=function(e){var r=b[e];return r?r.newDisplayObject():null},LPProxy.getSites=function(e){return q(b,"aids",e)},LPProxy.getSiteUsernames=function(){var e={};for(var r in b)e[b[r].getUsername()]=!0;var t=[];for(var n in e)n&&t.push(n);return t},LPProxy.getNoteModel=function(e){return L[e]},LPProxy.getNote=function(e){var r=L[e];return r?r.newDisplayObject():null},LPProxy.getNotes=function(e){return q(L,"aids",e)},LPProxy.getRecordConfig=function(){return w||H(),w},LPProxy.getConfigViewObject=function(e){for(var r=this.getRecordConfig(),t=0;t<r.views.length;t++)if(e===r.views[t].id)return r.views[t];throw new TypeError("View Not Found")},LPProxy.getConfigTypeObject=function(e){for(var r=this.getRecordConfig(),t=0;t<r.types.length;t++)if(e===r.types[t].id)return r.types[t];throw new TypeError("Type Not Found")},LPProxy.getConfigItemCardinality=function(e,r){for(var t=this.getRecordConfig(),n=0;n<t.types.length;n++)if(r===t.types[n].recordType)return n;throw new TypeError("Type Id Not Found")},LPProxy.getItemsByShareID=function(e){for(var r=[],t=LPProxy.getAllModelItems(),n=0,o=t.length;n<o;++n){var a=t[n];a.getShareID()===e&&r.push(a)}return r},LPProxy.getFormFillModel=function(e){return S[e]},LPProxy.getFormFillModels=function(){return LPTools.objectsToArray(S)},LPProxy.getModelCount=function(){return LPTools.objectsToArray(b).length+LPTools.objectsToArray(S).length+LPTools.objectsToArray(L).length},LPProxy.getFormFill=function(e){var r=S[e];return r?r.newDisplayObject():null},LPProxy.getFormFills=function(e){var r=[],t=LPTools.getOption(e,"identity",void 0),n=LPTools.getOption(e,"filter",h(t,"ffids")),o=LPTools.getOption(e,"invertIdentity",!1);for(var a in S){var i=S[a];v(a,n,o)&&r.push(new FormFillDisplay(i))}return r},LPProxy.getIdentities=function(){var e=[new AllIdentity];return $.each(bg.get("g_identities"),function(r,t){var n=new Identity(t);e.push(n)}),e},LPProxy.enableCurrentIdentity=function(e){for(var r,t=0,n=e.length;t<n;++t){var o=e[t];if(o.getID()===bg.get("g_identity"))return void o.enable({reprompt:!1});o instanceof AllIdentity&&(r=o)}r.enable({reprompt:!1})},LPProxy.enableIdentity=function(e){bg.lpevent("v_cid"),bg.switch_identity(e._data.iid,!0)},LPProxy.getAccountClass=function(){var e=Constants.USER_FREE;return!0===bg.get("g_iscompanyadmin")?e="1"===bg.get("g_familyenterprisemodel")?Constants.USER_FAMILY_ADMIN:"1"===bg.get("g_teamsenterprisemodel")?Constants.USER_TEAMS_ADMIN:Constants.USER_ENTERPRISE_ADMIN:null!=bg.get("g_enterpriseuserrole")&&""!=bg.get("g_enterpriseuserrole")?e="1"===bg.get("g_familyenterprisemodel")?Constants.USER_FAMILY_ROLE:"1"===bg.get("g_teamsenterprisemodel")?Constants.USER_TEAMS_ROLE:Constants.USER_ENTERPRISE_ROLE:"1"===bg.get("g_enterpriseuser")?e="1"===bg.get("g_familyenterprisemodel")?Constants.USER_FAMILY:"1"===bg.get("g_teamsenterprisemodel")?Constants.USER_TEAMS:Constants.USER_ENTERPRISE:bg.get("g_premium_exp")>LPTools.get_gmt_timestamp()&&(e=Constants.USER_PREMIUM),e},LPProxy.getRoleName=function(){return bg.get("g_enterpriseuserrole")},LPProxy.getUser=function(){return new User(bg.get("g_username"),LPProxy.getAccountClass(),this.getIdentities(),LPProxy.getRoleName())},LPProxy.isEnterpriseUser=function(){var e=LPProxy.getAccountClass();return e===Constants.USER_ENTERPRISE||e===Constants.USER_ENTERPRISE_ADMIN||e===Constants.USER_ENTERPRISE_ROLE||e===Constants.USER_TEAMS||e===Constants.USER_TEAMS_ADMIN||e===Constants.USER_TEAMS_ROLE},LPProxy.getCreditMonitoringData=function(e,r){var n=LPProxy.getBaseURL()+"getCreditMonitoringData.php";LPPlatform.ajax({url:n,dataType:"text",success:i(r,e),error:t(r)})},LPProxy.getReceivedShareData=function(e){bg.BackgroundServer.sharing.individual.getReceivedShareData(e)},LPProxy.getSharedFolderData=function(e){bg.BackgroundServer.sharing.folder.getFolders(e)},LPProxy.getSentShareData=function(e){bg.BackgroundServer.sharing.individual.getSentShareData(e)};var V=null;LPProxy.getToken=function(e,r){if(void 0===e)return V;null!==V?e(V):LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"getCSRFToken.php",data:{token:V},success:function(r){V=r,e(V)},error:t(r)})},LPProxy.deleteIdentity=function(e){bg.BackgroundServer.identities.remove(e)},LPProxy.addIdentity=function(e){bg.BackgroundServer.identities.add(e)},LPProxy.saveIdentity=function(e){bg.BackgroundServer.identities.update(e)},LPProxy.import=function(){bg.lpevent("v_i"),bg.openimport()},LPProxy.export=function(){bg.lpevent("v_e"),bg.openexport()},LPProxy.openAllFavorites=function(){bg.lpevent("v_of"),bg.openfavorites()},LPProxy.openBookmarklets=function(){bg.lpevent("v_bk"),LPProxy.callAcctsIFrameCommand("bookmarklets")},LPProxy.openHistory=function(){bg.lpevent("v_his"),LPProxy.callAcctsIFrameCommand("history")},LPProxy.reprompt=function(){var e=function(e,r){var t=(new Date).getTime(),n=bg.Preferences.get("reprompttime"),o=bg.Preferences.get("lastreprompttime");t>o&&t-o<=1e3*n?e():Topics.get(Topics.REPROMPT).publish(e)},r=function(e){if(e){e instanceof Array||(e=[e]);for(var r=0,t=e.length;r<t;++r)if(bg.get("g_prompts")[e[r]])return!0;return!1}return!0};return function(t,n){if(r(LPTools.getOption(n,"types",null))){if("function"==typeof bg.singlefactor_reprompt)return bg.singlefactor_reprompt(function(){e(t)},t),!0;e(t)}else t();return!1}}(),function(){var e=null;LPProxy.callAcctsIFrameCommand=function(r,t){bg.unlock_plug2web();var n={rand:1e3*Math.random(),command:r,version:LPProxy.getVersion(),newvault:1};t&&(n.commandid=t),bg.get_method_async(function(r){n.method=r,e=LPTools.createElement("iframe","acctsiframe"),e.src=-1!==document.location.href.indexOf("vault.php")?"iframe.php":"iframe.html",LPPlatform.addEventListener(e,"load",function(){e.contentWindow.goTo(LPProxy.getBaseURL()+"acctsiframe.php?"+$.param(n)),LPTools.addClass(e,"loaded")}),document.body.appendChild(e)})},LPProxy.closeIFrame=function(){e&&(document.body.removeChild(e),e=null)}}(),LPProxy.getDeletedItems=function(){var e=function(e,r){for(var t=0,n=e.length;t<n;++t){var o=e[t];o.url=bg.AES.hex2url(o.url),"http://group"!==o.url&&r.push(new Account(o).newDisplayObject())}},r=function(e,r){for(var t=0,n=e.length;t<n;++t)r.push(new Note(e[t]).newDisplayObject())},n=function(t,n){var o=[],a=[];t=atob(t),bg.parsemobile(t,t.length,-1,0,null,o,a,null,null,null,null,null,!0,!1,null,null,null,null,null,null,null,null,[],null,null,null,null,null,null,null);var i=[];e(o,i),r(a,i);for(var s=LPProxy.assignItemsToGroups(i,!1),c=0,l=s.length;c<l;++c)s[c].setDeleted();n(s)};return function(e,r){var o=LPProxy.getBaseURL()+"getaccts.php",a={};a.mobile=1,a.b64=1,a.shap=1,a.u=bg.get("g_username_hash"),a.only_deleted=1,LPPlatform.ajax({type:"POST",url:o,data:a,dataType:"text",success:function(r){n(r,e)},error:t(r)})}}(),LPProxy.getSharedFolderMembers=function(e){bg.BackgroundServer.sharing.folder.getMembers(e)},LPProxy.restoreDeletedItems=l(function(e,r,o,a){var i={src:"website",fromwebsite:1,ajax:1,extjs:1,undelete:1,aid:c(e),token:V};r&&(i.sharedfolderid=r),LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"show_website.php",data:i,dataType:"text",success:n(a,{accountundeleted:o,reload:o}),error:t(a)})}),LPProxy.purgeDeletedItems=l(function(e,r,o,a){var i={src:"website",fromwebsite:1,ajax:1,extjs:1,purgeext:1,aid:c(e),token:V};r&&(i.sharedfolderid=r),LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"show_website.php",data:i,dataType:"text",success:n(a,{accountpurged:o}),error:t(a)})}),LPProxy.removeSharedFolderMember=function(e){bg.BackgroundServer.sharing.folder.removeMember(e)},LPProxy.getPublicKeys=function(){var e={emptyGroups:function(e){dialogs.alert.open({title:Strings.translateString("Error"),text:[Strings.translateString("The following user groups are empty and cannot be added."),Strings.translateString("Please try again once users have been added."),LPTools.buildDialogItemContainer(e)]})}};return function(r){bg.BackgroundServer.sharing.folder.getPublicKeys($.extend(!0,r,{callbacks:e}))}}(),LPProxy.addSharedFolderMembers=function(){var e={invite:d,noSharingKeyUsers:function(e){for(var r=LPTools.createElement("ul","bulletList"),t=0,n=e.length;t<n;++t){var o=e[t],a=o instanceof SharedFolderUser?o.getName():o;r.appendChild(LPTools.createElement("li",null,a))}dialogs.alert.open({title:Strings.translateString("No Sharing Support"),text:[Strings.translateString("The following users do not currently have sharing keys."),Strings.translateString("They can generate sharing keys by logging into LastPass via the LastPass Internet Explorer, Firefox, or Google Chrome browser extensions, or by logging into the website and clicking on the Generate Sharing Keys link."),Strings.translateString("Once they do that this Shared Folder will become accessible to them."),r]})},emptyGroups:function(e){for(var r=[],t=0,n=e.length;t<n;++t){var o=new SharedFolderUserGroup({name:e[t]});o._pending=!0,r.push(o)}dialogs.alert.open({title:Strings.translateString("Error"),text:[Strings.translateString("The following user groups are empty and cannot be added."),Strings.translateString("Please try again once users have been added."),LPTools.buildDialogItemContainer(r)]})}};return function(r){bg.BackgroundServer.sharing.folder.addMembers($.extend(!0,r,{callbacks:e}))}}(),LPProxy.createSharedFolder=function(){var e={sharingkeyrequired:u};return function(r){bg.BackgroundServer.sharing.folder.create($.extend(!0,r,{callbacks:e}))}}(),LPProxy.deleteSharedFolder=function(e){bg.BackgroundServer.sharing.folder.remove(e)},LPProxy.createCreditMonitoringProfile=function(e,r,o){var a={};a.cmd="enroll",a.xml=1,a.ffid=e.getID(),$.extend(a,e.getFormData({firstname:!0,lastname:!0,birthday:!0,ssn:!0,address1:!0,address2:!0,address3:!0,city:!0,state:!0,country:!0,zip:!0,phone:!0})),LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"creditmon.php",data:a,dataType:"text",success:n(o,{1:function(){Topics.get(Topics.SUCCESS).publish("Enrolled in credit monitoring."),Topics.get(Topics.ENROLLED_CREDIT_MONITORING).publish(),r()},"":function(e){o(e.attr("reason2"))}}),error:t(o)})},LPProxy.sendVerificationEmail=l(function(e,r,n){LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"settings.php",data:{testemail:1,email:e,extra:"verifysharing",token:V},success:r,error:t(n)})}),LPProxy.revertPasswordChange=function(){bg.BackgroundServer.vault.history.revertPasswordChange.apply(this,arguments)},LPProxy.getPasswordHistory=function(){bg.BackgroundServer.vault.history.getPasswordHistory.apply(this,arguments)},LPProxy.getUsernameHistory=function(){bg.BackgroundServer.vault.history.getUsernameHistory.apply(this,arguments)},LPProxy.getNoteHistory=function(){bg.BackgroundServer.vault.history.getNoteHistory.apply(this,arguments)},LPProxy.getSecurityChallengeScore=function(e){bg.get_securityChallengeScore(e)},LPProxy.getSharedFolderRestrictions=function(e){bg.BackgroundServer.sharing.folder.getRestrictions(e)},LPProxy.updateSharedFolderRestrictions=function(e){bg.BackgroundServer.sharing.folder.updateRestrictions(e)},LPProxy.unlinkAccount=l(function(e){LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"share.php",data:{unlink:1,uid:e.params.id,token:V},dataType:"text",success:n(e.error,{ok:e.success}),error:t(e.error)})}),LPProxy.linkAccount=function(){var e=g(function(e,r,o,a,i,s,c,l){var u=new bg.RSAKey;LPProxy.parsePublicKey(u,l.pubkey);var g=u.encrypt(bg.AES.bin2hex(r)),d={};d.id=0,d.update=1,d.link=1,d.xml=1,d.token=e.attr("token"),d.newusername=i.linkedEmail,d.newhash=o,d.sharekey=g,d.sharename=LPProxy.encryptWithKey(i.linkedEmail,r),d.name=i.linkedEmail,d.uid=e.attr("uid"),d.linkvalid=1,LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"share.php",data:d,dataType:"text",success:n(c,{ok:s}),error:t(c)})}),r=function(r,o,a,i,s,c){var l={};l.verifylink=1,l.outofbandsupported=1,l.outofbandrequest=0,l.outofbandretry=0,l.xml=1,l.username=i.linkedEmail,l.hash=o,l.iterations=a;var u=function(t){e(t,r,o,a,i,s,c)};LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"login.php",data:l,dataType:"text",success:n(c,{ok:u}),error:t(c)})};return function(e,t,n){bg.make_lp_key_hash(e.linkedEmail,e.linkedPassword,function(o,a,i){r(o,a,i,e,t,n)})}}(),LPProxy.refreshSites=function(){bg.refreshsites()},LPProxy.getLinkedAccount=function(){return e},LPProxy.updateSharedFolderMemberPermissions=function(e){bg.BackgroundServer.sharing.folder.updateMemberPermissions(e)},LPProxy.startDownloadingFolder=function(e){bg.BackgroundServer.sharing.folder.startDownloading(e)},LPProxy.stopDownloadingFolder=function(e){bg.BackgroundServer.sharing.folder.stopDownloading(e)};var X=function(e,r,t,n,o){var a=r.getFieldPostData(t,!0);a.aid=r.getID(),a.auto=1,a[e]=1;var i=$.param(a),s=r.getShareInfo(),c="";s&&(c=$.param({sharedfolderid:s.id})),bg.saveFields(i,c,{aid:r.getID()},n,o)};LPProxy.addField=function(e,r,t,n){X("add",e,r,t,n)},LPProxy.deleteField=function(e,r,t,n){X("delete",e,r,t,n)},LPProxy.autoChangePassword=function(e){bg.editAid(e,null,null,"1")},LPProxy.getPreference=function(e,r){return bg.Preferences.get(e,r)},LPProxy.setPreferences=function(e,r){bg.Preferences.set(e,r)},
LPProxy.fillSite=function(e){bg.get_selected_tab_data(null,function(r){bg.setcurrenttabid(r.id),bg.setcurrenturl(r.url),bg.lpevent("m_mf"),bg.fillaid(e.getID(),!0,"notrack")})},LPProxy.fillProfile=function(e,r){bg.lpevent("m_ff"),bg.fillform(e.getID(),null,null,null,null,null,r)},LPProxy.addAttachment=function(){var e=function(e,r,t){var n=bg.check_filename_badchars(e);n===bg.get("FILENAME_FRAGMENT_BAD_SHELL_CHARS")?Topics.get(Topics.ERROR).publish(Strings.translateString("Suspicious characters found in selected filename, will not process it")):n===bg.get("FILENAME_FRAGMENT_BAD_CONTROL_CHARS")?Topics.get(Topics.ERROR).publish(Strings.translateString("Control characters found in selected filename, will not process it")):t(new Attachment({filename:e,id:Math.floor(99999*Math.random()).toString(),mimetype:bg.get_mimetype_from_filename(e),bytes:r}))};return s(function(r){bg.addAttach(function(t){t.name&&t.name.length>0&&e(t.name,t.bytes,r)})})}(),LPProxy.openAttachment=s(function(e){LPPlatform.openAttachment(e)}),LPProxy.saveAttachment=s(function(e){LPPlatform.saveAttachment(e)}),LPProxy.openAll=function(e){for(var r=[],t=0,n=e.length;t<n;++t){var o=e[t];o instanceof Account&&r.push(o._data)}bg.openAllSites(r)},LPProxy.getDomain=function(e){return bg.lp_gettld_url(e)},LPProxy.addToFavorites=function(e,r,o){var a=c(e);LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"groups.php",data:{aids:a,newfavaids:a,xml:1},dataType:"text",success:n(o,{ok:r}),error:t(o)})},LPProxy.restoreDeletedSharedFolder=function(e){bg.BackgroundServer.sharing.folder.restoreDeleted(e)},LPProxy.purgeDeletedSharedFolder=function(e){bg.BackgroundServer.sharing.folder.purgeDeleted(e)};var W=function(e){for(var r=[],t=0,n=e.length;t<n;++t)r.push(e[t].getID());return r};LPProxy.changePasswords=function(e){bg.changePassword(e.params.password,W(e.params.items),!1,e.success,e.error)},LPProxy.inviteFriends=function(){var e={problems:function(e){dialogs.alert.open({title:Strings.Vault.ERROR,text:e})}};return function(r){bg.BackgroundServer.sharing.individual.inviteFriends($.extend(!0,r,{callbacks:e}))}}(),LPProxy.updateEmergencyAccessRecipient=function(){var e={enterprise:function(e,r){r.error(Strings.translateString("Sorry, LastPass Enterprise users can not act as emergency contacts."))}};return function(r){r.callbacks=e,bg.BackgroundServer.emergencyAccess.updateRecipient(r)}}(),LPProxy.addEmergencyAccessRecipient=function(){var e={invite:d,nosharingkeys:function(e,r){r.error(Strings.translateString("User is missing sharing keys, please ask them to login to become an emergency contact."))}};return function(r){r.callbacks=e,bg.BackgroundServer.emergencyAccess.addRecipient(r)}}(),LPProxy.revokeEmergencyAccessOffer=function(e){bg.BackgroundServer.emergencyAccess.removeRecipient(e)},LPProxy.getEmergencyAccessRecipientInfo=function(){var e=function(e){for(var r=[],t=0,n=e.length;t<n;++t){var o=e[t];if(o.username){var a=A[o.username];a?a.refresh(o):(a=new EmergencyAccessRecipient(o),LPProxy.addItem(a)),r.push(a.newDisplayObject())}}return r};return function(r,t){bg.BackgroundServer.emergencyAccess.getRecipientInfo({params:{email:bg.get("g_username")},success:function(t){r(e(t))},error:t})}}(),LPProxy.getEmergencyAccessSharerInfo=function(){var e=function(e){for(var r=[],t=0,n=e.length;t<n;++t){var o=e[t];if(o.username){var a=T[o.username];a?a.refresh(o):(a=new EmergencyAccessSharer(o),LPProxy.addItem(a)),r.push(a.newDisplayObject())}}return r};return l(function(r,t){bg.BackgroundServer.emergencyAccess.getSharerInfo({success:function(t){r(e(t))},error:t})})}(),LPProxy.acceptEmergencyAccessOffer=function(e){bg.BackgroundServer.emergencyAccess.acceptOffer(e)},LPProxy.declineEmergencyAccessOffer=function(e){bg.BackgroundServer.emergencyAccess.declineOffer(e)},LPProxy.requestEmergencyAccess=function(){var e={linked:function(e,r){r.error(Strings.translateString("This account is already linked"))},denied:function(e,r){r.error(Strings.translateString("You do not have permission to link this account"))},successLinked:function(e,r){Topics.get(Topics.SUCCESS).publish(Strings.translateString("Access granted")),r.success(e)},successGranted:function(e,r){Topics.get(Topics.SUCCESS).publish(Strings.translateString("Access will be granted on %1",new EmergencyAccessSharer(e).getAccessDateAsString())),r.success(e)}};return function(r){r.callbacks=e,bg.BackgroundServer.emergencyAccess.requestAccess(r)}}(),LPProxy.unlinkEmergencyAccessAccount=function(e){bg.BackgroundServer.emergencyAccess.unlinkAccount(e)},LPProxy.denyEmergencyAccess=function(e){bg.BackgroundServer.emergencyAccess.denyAccess(e)},LPProxy.getVersion=function(){return bg.lpversion||bg.get("lpversion")},LPProxy.generateSharingKeys=function(){var e=function(e,r,o){var a=bg.encode_public_key(e),i=bg.encode_private_key(e),s=LPProxy.getLocalKey(),c=bg.rsa_encrypt_privatekey(i,s);LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"uploadrsakeys_website.php",dataType:"text",data:{privatekeyenc:c,publickey:a,token:V,from:"generatesharingkeys.php",userkeyhexhash:bg.SHA256(bg.AES.bin2hex(s)),privatekeyenchexhash:bg.SHA256(c)},success:n(o,{ok:function(){bg.set("rsaprivatekeyhex",c),Topics.get(Topics.SUCCESS).publish(Strings.translateString("Sharing keys generated.")),r()}}),error:t(o)})};return l(function(r,t){var n=new bg.RSAKey;bg.generate_key(n,function(n){e(n,r,t)})})}(),LPProxy.deleteCreditMonitoringAlert=l(function(e,r,o){LPPlatform.ajax({type:"POST",url:LPProxy.getBaseURL()+"creditmon.php",dataType:"text",data:{src:"website",cmd:"deletealert",id:e,token:V,_dc:(new Date).getTime()},success:n(o,{ok:r}),error:t(o)})}),LPProxy.getSiteMeta=function(e,r,t){bg.LPServer.jsonRequest({type:"GET",url:"typeahead_addsite.php",data:{q:e},success:r,error:t})},LPProxy.getCustomNoteTemplates=function(){return bg.get("g_note_templates")},LPProxy.getCustomNoteTemplate=function(e){return LPProxy.getCustomNoteTemplates().find(function(r){return r.id==e})},LPProxy.saveCustomNoteTemplate=function(e){bg.BackgroundServer.sitesAndNotes.saveCustomNoteTemplate(e)},LPProxy.deleteCustomNoteTemplate=function(e){bg.BackgroundServer.sitesAndNotes.deleteCustomNoteTemplate(e)}}();