"undefined"!=typeof LPPlatform&&LPPlatform.addEventListener(document,"keydown",function(e){try{switch(e.keyCode||e.which){case 13:"checkbox"!==e.target.type?Topics.get(Topics.ENTER).publish(e):e.target.checked=!e.target.checked;break;case 27:Topics.get(Topics.ESCAPE).publish(e);break;case 37:Topics.get(Topics.LEFT_ARROW).publish(e);break;case 38:Topics.get(Topics.UP_ARROW).publish(e);break;case 39:Topics.get(Topics.RIGHT_ARROW).publish(e);break;case 40:Topics.get(Topics.DOWN_ARROW).publish(e)}}catch(e){LPPlatform.logException(e)}}),LPTools={},function(e){var t=[];e.setDragItems=function(e){t=e},e.getDragItems=function(){return t},e.buildItemButton=function(t){var n=Constants.ACTION_BUTTONS[t];return e.createElement("button",{class:"itemButton "+n.css,vaultaction:t,title:Strings.Vault[n.title],allowmultiple:!1})},e.setupMiddleEllipsis=function(e){var t=e.find(".textOverflowContainer"),n=Math.ceil(t.get(0).children[0].getBoundingClientRect().width),i=n+Math.ceil(e.find(".textTail").get(0).getBoundingClientRect().width),o=i-n;t.css("max-width",i),t.css("padding-right",o),t.css("margin-right",-o)},e.requireBinary=function(e){bg.have_binary()?e():LPPlatform.supportsBinary()?dialogs.confirmation.open({title:Strings.translateString("Install Binary Component"),text:Strings.translateString("This feature requires the binary version of this browser extension. Would you like to install it now?"),handler:function(){bg.install_binary()}}):dialogs.alert.open({title:Strings.translateString("Not Supported"),text:Strings.translateString("This feature requires an external binary component, which is currently not supported on this platform.")})},e.isType=function(e,t){return Object.prototype.toString.call(e)==="[object "+t+"]"},e.getURLParams=function(){var e={},t=document.location.href.split("?");if(2===t.length)for(var n=t[1].split("&"),i=0;i<n.length;++i){var o=n[i].split("=");2===o.length&&(e[o[0]]=o[1])}return e},e.setContent=function(t,n){if(t.empty(),n)if("string"==typeof n){for(var i=n.indexOf("<br/>");i>-1;)t.append(document.createTextNode(n.substring(0,i))),t.append(document.createElement("br")),n=n.substring(i+5),i=n.indexOf("<br/>");t.append(document.createTextNode(n))}else if(e.isType(n,"Array"))for(var o=0,r=n.length;o<r;++o){var a=n[o];"string"==typeof a&&(a=e.createElement("p","dialogText",a)),t.append(a)}else t.append(n)},e.hideContextMenu=function(t){null!==t&&(t.removeClass("bottomAligned"),t.hide(),e.removeKeyBoardNavigation())},e.displayContextMenu=function(e,t){var n=$(t);return e.clientY>window.innerHeight/2?(n.addClass("bottomAligned"),n.css("bottom",window.innerHeight-e.clientY),n.css("top","")):(n.css("top",e.clientY),n.css("bottom","")),n.css("left",e.clientX),n.show(),n},e.getProperties=function(e){var t=[];for(var n in e)t.push(n);return t},e.openAlerts=function(){var t=function(t,n,i){return function(){"function"==typeof t&&t(),e.openAlerts(n,i)}};return function(e,n){if(e.length>0){var i=e.shift();$.extend(i,{handler:t(i.handler,e,n),closeHandler:t(i.closeHandler,e,n)}),dialogs[i.type].open(i)}else n&&n()}}(),e.buildDialogItemContainer=function(t){for(var n=e.createElement("div","dialogItemContainer noSelect"),i={display:VaultItemBaseDisplay.prototype.DISPLAY_LIST,allowDrag:!1,additionalItemClasses:"dialogItem noItemButtons"},o=0,r=t.length;o<r;++o){var a=t[o].newDisplayObject();n.appendChild(a.build(i))}return n},e.buildEmptyPlaceholder=function(t,n,i){return"ul"===i.tagName.toLocaleLowerCase()?e.createElement("li","emptyPlaceholder "+n,t):e.createElement("div","emptyPlaceholder "+n,t)},e.get_gmt_timestamp=function(){var e=new Date,t=e.getTime();return parseInt(t/1e3)},e.ContextMenuItem=function(t,n){this.getAction=function(){return t},this.build=function(i,o,r){var a=void 0!==n&&void 0!==n.divider&&n.divider,s=void 0!==n&&void 0!==n.submenu&&n.submenu,l=null;a&&(l="divider"),s&&(l+=" subMenuOption");var E=e.createElement("li",{class:l,vaultaction:t});if(void 0===n||void 0===n.text?E.textContent=Strings.Vault[Constants.CONTEXT_MENU_ITEMS[t]]:E.textContent=n.text,i.appendChild(E),s){E.appendChild(e.createElement("div"));var T=e.createElement("ul","subMenu");E.appendChild(T),function(t,n){var o=null,a=!1,s=function(){a&&(n.hide("fast"),e.addKeyBoardNavigation(i.children),Topics.get(Topics.LEFT_ARROW).unsubscribe(s))},l=function(e){a=!0,r(e),Topics.get(Topics.LEFT_ARROW).subscribe(s)};t.bind("click",l),t.bind("mouseenter",function(e){o=setTimeout(function(){l(e)},200)}),t.bind("mouseleave",function(){o&&clearTimeout(o),s()})}($(E),$(T))}else LPPlatform.addEventListener(E,"click",o)}},e.parseUserSpecificMenu=function(t,n){for(var i=t.firstElementChild;i;){var o=i.getAttribute("user");if(null!==o){for(var r=o.split("|"),a=!0,s=0,l=r.length;s<l;++s)if(n===r[s]){a=!1;break}a?$(i).hide():i.removeAttribute("style")}e.parseUserSpecificMenu(i,n),i=i.nextElementSibling}},e.buildSentShareItems=function(e,t){var n=[];if(t)for(var i=0,o=t.length;i<o;++i){var r=t[i];"1"===r.state?n.push(new AcceptedSentSharedItem(e,r)):"2"===r.state?n.push(new DeclinedSentSharedItem(e,r)):n.push(new PendingSentSharedItem(e,r))}return n},e.openShareDialog=function(t,n){if(t&&1===t.length&&void 0===n)return LPRequest.makeDataRequest(LPProxy.getSentShareData,{params:{id:t[0].getID()},requestSuccessOptions:{closeDialog:!1},success:function(n){e.openShareDialog(t,n)},error:function(){Topics.get(Topics.DIALOG_LOADED).publish()}}),void Topics.get(Topics.DIALOG_LOADING).publish();if(n&&!dialogs.share.loadedJS())return void dialogs.share.loadJS(function(){e.openShareDialog(t,n)});var i=n?e.buildSentShareItems(t[0],n.sent[t[0].getID()]):null,o=n?n.friends:null;dialogs.share.open(t,i,o)},e.objectsToArray=function(){for(var e=[],t=0,n=arguments.length;t<n;++t){var i=arguments[t];for(var o in i)e.push(i[o])}return e},e.createEventHandler=function(e){return function(t){e.handleEvent(t)}},e.getAttribute=function(e,t,n){for(var i=t.getAttribute(n);null===i&&t!==e&&null!==(t=t.parentElement);)i=t.getAttribute(n);return i},e.removeDOMChildren=function(e){if(e)for(var t=e.childNodes.length;t--;)e.removeChild(e.lastChild)},e.removeDOMChildrenFrom=function(e,t){if(e)for(;t;){var n=t;t=t.nextElementSibling,e.removeChild(n)}},e.createElement=function(){var e=function(e,t,n){n instanceof Array?e.setAttribute(t,n.join(" ")):e.setAttribute(t,n)};return function(t,n,i){var o=document.createElement(t);if(("string"==typeof n||n instanceof Array)&&(n={class:n}),"input"!==t&&"textarea"!==t||(n=$.extend(n,{spellcheck:!1})),"object"==typeof n)for(var r in n){var a=n[r];void 0!==a&&null!==a&&e(o,r,a)}return void 0!==i&&(o.textContent=i),o}}(),e.addClass=function(e,t){if(null!==e){t instanceof Array&&(t=t.join(" "));var n=e.getAttribute("class");n&&(t=n+" "+t),e.setAttribute("class",t)}},e.getOption=function(e,t,n){var i=n;return e&&void 0!==e[t]&&(i=e[t]),i},function(){var t=null,n=-1,i=null,o=null,r=null,a=null,s=null,l=function(e){return t&&e>-1&&e<t.length?t[e]:null},E=function(e,t){var i=l(n);i&&i.removeClass("hover"),n=e,(i=l(n))&&(i.addClass("hover"),t&&s&&s.focusHandler&&s.focusHandler(i))},T=function(e){return parseInt(e.closest("[navindex]").attr("navindex"))},c=function(e){a=!0,$(document.body).unbind("mousemove",c)};e.disableMouse=function(e){a&&(a=!1,$(document.body).bind("mousemove",c))};var u=function(e){if(a){var t=$(e.target);E(T(t))}},O=function(e){var t=e.offsetParent();t.scrollTop(Math.max(t.scrollTop()+t.height(),t.scrollTop()+e.position().top+e.outerHeight())-t.height())},_=function(e){var t=e.offsetParent();t.scrollTop(Math.min(t.scrollTop(),t.scrollTop()+e.position().top))},N=function(i){var o=null;n===t.length-1?(o=0,_(t[o])):(o=n+1,O(t[o])),E(o,!0),e.disableMouse(),i.preventDefault(),i.stopPropagation()},d=function(i){var o=null;n<1?(o=t.length-1,O(t[o])):(o=n-1,_(t[o])),E(o,!0),e.disableMouse(),i.preventDefault(),i.stopPropagation()},C=function(e){if(e){var t=new Event(i,{bubbles:!0});e.get(0).dispatchEvent(t)}},p=function(){var t=l(n);if(t){if(o){var i=t.find(o);i.length&&(t=i)}C(t),e.disableMouse()}return!1},A=function(){return C(l(n)),!1};e.setNavIndex=function(e){E(e);var t=l();t&&t.get(0).scrollIntoView()},e.getNavIndex=function(){return n},e.addKeyBoardNavigation=function(l,E){if(l.length>0){t=[],n=-1,null===a&&(a=!0),i=e.getOption(E,"mouseEvent","click"),o=e.getOption(E,"rightArrowSelector",null),r=e.getOption(E,"useRightArrow",!0),s=E;for(var T=0,c=l.length;T<c;++T){var O=$(l[T]);O.attr("navindex",T),O.unbind("mouseenter",u),O.bind("mouseenter",u),O.hasClass("hover")&&(n=T),t.push(O)}Topics.get(Topics.DOWN_ARROW).subscribe(N),Topics.get(Topics.UP_ARROW).subscribe(d),Topics.get(Topics.ENTER).subscribeFirst(A),r&&Topics.get(Topics.RIGHT_ARROW).subscribe(p),e.getOption(E,"selectFirst",!1)&&e.setNavIndex(0)}else e.removeKeyBoardNavigation()},e.removeKeyBoardNavigation=function(){t=null,Topics.get(Topics.DOWN_ARROW).unsubscribe(N),Topics.get(Topics.UP_ARROW).unsubscribe(d),Topics.get(Topics.RIGHT_ARROW).unsubscribe(p),Topics.get(Topics.ENTER).unsubscribe(A)}}(),e.addZebraStriping=function(e){for(var t=$(e).find("tr"),n=0,i=t.length;n<i;++n)n%2!=0?$(t[n]).addClass("odd"):$(t[n]).removeClass("odd")};var n=function(e){var t=e.target.previousElementSibling;t.checked=!t.checked};e.buildCheckbox=function(t,i){var o=i?i.checkboxAttributes:void 0;o=$.extend(o,{class:"checkbox",type:"checkbox"});var r=e.createElement("input",o),a=e.createElement("label",t,e.getOption(i,"text",void 0));e.getOption(i,"addClickHandler",!0)&&LPPlatform.addEventListener(a,"click",n);var s=e.createElement("div");return s.appendChild(r),s.appendChild(a),s},e.buildRadioButton=function(t,i,o){var r=e.createElement("input",{class:"radio",type:"radio",name:t}),a=e.createElement("label",i,o);LPPlatform.addEventListener(a,"click",n);var s=e.createElement("div");return s.appendChild(r),s.appendChild(a),s},e.hasProperties=function(e){if(e)for(var t in e)return!0;return!1},e.createSelectElement=function(t,n){var i=e.createElement("select",n);return $(i).addClass("dialogInput selectDropdown"),e.setSelectOptions(i,t),i},e.setSelectOptions=function(t,n){e.removeDOMChildren(t);for(var i=0,o=n.length;i<o;++i){var r=n[i],a="object"==typeof r?r.value:r,s="object"==typeof r&&r.label?r.label:a;t.appendChild(e.createElement("option",{value:a},s))}}}(LPTools),Constants={ACTION_OPEN_MOVE_TO_SUB_FOLDER_MENU:"openMoveToSubFolderMenu",ACTION_OPEN_MOVE_TO_FOLDER_MENU:"openMoveToFolderMenu",ACTION_MOVE_TO_FOLDER:"moveToFolder",ACTION_SAVE:"save",ACTION_DELETE:"delete",ACTION_SHARE:"share",ACTION_COPY_USERNAME:"copyUsername",ACTION_COPY_PASSWORD:"copyPassword",ACTION_COPY_URL:"copyURL",ACTION_EDIT:"edit",ACTION_LAUNCH:"launch",ACTION_GO_TO_URL:"goToURL",ACTION_TOGGLE_OPEN:"toggleOpen",ACTION_RENAME:"rename",ACTION_ACCEPT:"acceptShare",ACTION_REJECT:"rejectShare",ACTION_ENABLE:"enable",ACTION_TOGGLE_SELECT:"toggleSelect",ACTION_CREATE_SUB_FOLDER:"createSubFolder",ACTION_OPEN_ALL:"openAll",ACTION_OPEN_MORE_OPTIONS:"openMoreOptions",ACTION_COPY_NOTE:"copyNote",ACTION_FILL:"fillForm",ACTION_OPEN:"open",ACTION_REVOKE:"revoke",ACTION_EMAIL:"email",ACTION_CANCEL:"cancel",ACTION_REMOVE:"remove",ACTION_PURGE:"purge",ACTION_PURGE_SHARED_FOLDER:"purgeSharedFolder",ACTION_RESTORE:"restore",ACTION_RESTORE_SHARED_FOLDER:"restoreSharedFolder",ACTION_UNLINK:"unlink",ACTION_STOP_DOWNLOADING:"stopDownloading",ACTION_START_DOWNLOADING:"startDownloading",ACTION_FILL_SITE:"fillSite",ACTION_CLONE:"clone",ACTION_ADD:"add",ACTION_MANAGE:"manage",ACTION_ACCESS:"access",ACTION_COPY_KEY:"copyKey",ACTION_DASHBOARD:"dashboard",ACTION_UPGRADE:"upgrade",USER_FREE:"Free User",USER_PREMIUM:"Premium User",USER_ENTERPRISE:"Enterprise User",USER_ENTERPRISE_ADMIN:"Enterprise Admin",USER_ENTERPRISE_ROLE:"Enterprise Role User",USER_TEAMS:"Teams User",USER_TEAMS_ADMIN:"Teams Admin",USER_TEAMS_ROLE:"Teams Role User",USER_FAMILY:"Family User",USER_FAMILY_ADMIN:"Family Admin",USER_FAMILY_ROLE:"Family Role User",EmailAddressRegularExpression:/[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g},function(e){e.ACTION_BUTTONS={},e.ACTION_BUTTONS[e.ACTION_EDIT]={title:"EDIT",css:e.ACTION_EDIT},e.ACTION_BUTTONS[e.ACTION_SHARE]={title:"SHARE",css:e.ACTION_SHARE},e.ACTION_BUTTONS[e.ACTION_DELETE]={title:"DELETE",css:e.ACTION_DELETE},e.ACTION_BUTTONS[e.ACTION_ACCEPT]={title:"ACCEPT",css:e.ACTION_ACCEPT},e.ACTION_BUTTONS[e.ACTION_REJECT]={title:"REJECT",css:e.ACTION_REJECT},e.ACTION_BUTTONS[e.ACTION_LAUNCH]={title:"LAUNCH",css:null},e.ACTION_BUTTONS[e.ACTION_ENABLE]={title:"ENABLE",css:null},e.ACTION_BUTTONS[e.ACTION_ACCESS]={title:"REQUEST_ACCESS",css:null},e.ACTION_BUTTONS[e.ACTION_REVOKE]={title:"REVOKE",css:e.ACTION_REJECT},e.ACTION_BUTTONS[e.ACTION_EMAIL]={title:"RESEND",css:e.ACTION_EMAIL},e.ACTION_BUTTONS[e.ACTION_CANCEL]={title:"CANCEL_INVITE",css:e.ACTION_REJECT},e.ACTION_BUTTONS[e.ACTION_REMOVE]={title:"REMOVE",css:e.ACTION_REJECT},e.ACTION_BUTTONS[e.ACTION_PURGE]={title:"PURGE",css:e.ACTION_DELETE},e.ACTION_BUTTONS[e.ACTION_PURGE_SHARED_FOLDER]={title:"PURGE",css:e.ACTION_DELETE},e.ACTION_BUTTONS[e.ACTION_RESTORE]={title:"RESTORE",css:e.ACTION_RESTORE},e.ACTION_BUTTONS[e.ACTION_RESTORE_SHARED_FOLDER]={title:"RESTORE",css:e.ACTION_RESTORE},e.ACTION_BUTTONS[e.ACTION_MANAGE]={title:"MANAGE",css:e.ACTION_EDIT},e.ACTION_BUTTONS[e.ACTION_UNLINK]={title:"UNLINK",css:e.ACTION_DELETE},e.CONTEXT_MENU_ITEMS={},e.CONTEXT_MENU_ITEMS[e.ACTION_EDIT]="EDIT",e.CONTEXT_MENU_ITEMS[e.ACTION_SHARE]="SHARE",e.CONTEXT_MENU_ITEMS[e.ACTION_DELETE]="DELETE",e.CONTEXT_MENU_ITEMS[e.ACTION_GO_TO_URL]="GO_TO_URL",e.CONTEXT_MENU_ITEMS[e.ACTION_COPY_USERNAME]="COPY_USERNAME",e.CONTEXT_MENU_ITEMS[e.ACTION_COPY_PASSWORD]="COPY_PASSWORD",e.CONTEXT_MENU_ITEMS[e.ACTION_COPY_URL]="COPY_URL",e.CONTEXT_MENU_ITEMS[e.ACTION_OPEN_MOVE_TO_FOLDER_MENU]="MOVE_TO_FOLDER",e.CONTEXT_MENU_ITEMS[e.ACTION_OPEN_MOVE_TO_SUB_FOLDER_MENU]="MOVE_TO_SUB_FOLDER",e.CONTEXT_MENU_ITEMS[e.ACTION_ACCEPT]="ACCEPT",e.CONTEXT_MENU_ITEMS[e.ACTION_REJECT]="REJECT",e.CONTEXT_MENU_ITEMS[e.ACTION_ENABLE]="ENABLE",e.CONTEXT_MENU_ITEMS[e.ACTION_RENAME]="RENAME_FOLDER",e.CONTEXT_MENU_ITEMS[e.ACTION_CREATE_SUB_FOLDER]="CREATE_SUB_FOLDER",e.CONTEXT_MENU_ITEMS[e.ACTION_OPEN_ALL]="OPEN_ALL",e.CONTEXT_MENU_ITEMS[e.ACTION_COPY_NOTE]="COPY_NOTE",e.CONTEXT_MENU_ITEMS[e.ACTION_COPY_KEY]="COPY_KEY",e.CONTEXT_MENU_ITEMS[e.ACTION_FILL]="FILL",e.CONTEXT_MENU_ITEMS[e.ACTION_OPEN]="OPEN",e.CONTEXT_MENU_ITEMS[e.ACTION_SAVE]="SAVE",e.CONTEXT_MENU_ITEMS[e.ACTION_REVOKE]="REVOKE",e.CONTEXT_MENU_ITEMS[e.ACTION_EMAIL]="RESEND",e.CONTEXT_MENU_ITEMS[e.ACTION_CANCEL]="CANCEL_INVITE",e.CONTEXT_MENU_ITEMS[e.ACTION_REMOVE]="REMOVE",e.CONTEXT_MENU_ITEMS[e.ACTION_PURGE]="PURGE",e.CONTEXT_MENU_ITEMS[e.ACTION_PURGE_SHARED_FOLDER]="PURGE",e.CONTEXT_MENU_ITEMS[e.ACTION_RESTORE]="RESTORE",e.CONTEXT_MENU_ITEMS[e.ACTION_RESTORE_SHARED_FOLDER]="RESTORE",e.CONTEXT_MENU_ITEMS[e.ACTION_UNLINK]="UNLINK_PERSONAL",e.CONTEXT_MENU_ITEMS[e.ACTION_STOP_DOWNLOADING]="STOP_DOWNLOADING",e.CONTEXT_MENU_ITEMS[e.ACTION_START_DOWNLOADING]="START_DOWNLOADING",e.CONTEXT_MENU_ITEMS[e.ACTION_FILL_SITE]="AUTO_FILL",e.CONTEXT_MENU_ITEMS[e.ACTION_CLONE]="CLONE",e.CONTEXT_MENU_ITEMS[e.ACTION_MANAGE]="MANAGE_FOLDER",e.CONTEXT_MENU_ITEMS[e.ACTION_ACCESS]="REQUEST_ACCESS",e.CONTEXT_MENU_ITEMS[e.ACTION_DASHBOARD]="OPEN_DASHBOARD",e.CONTEXT_MENU_ITEMS[e.ACTION_UPGRADE]="UPGRADE_PREMIUM",e.HISTORY_TYPES={PASSWORD:0,USERNAME:1,NOTE:2}}(Constants),function(e){e.fn.extend({LP_show:function(){this.removeClass("displaynone")},LP_hide:function(){this.addClass("displaynone")},LP_removeAttr:function(e){for(var t=0,n=this.length;t<n;++t)this.get(t).removeAttribute(e)},LP_addSearchHandlers:function(t,n){var i=e(LPTools.createElement("div","searchInputContainer"));this.before(i),i.append(this);var o="searchCloseButton";t&&(o+=" "+t);var r=e(LPTools.createElement("div",{class:o,title:Strings.translateString("Clear Search")}));i.append(r);var a,s=function(e){e.length>0?i.addClass("populated"):i.removeClass("populated")},l=function(e){clearTimeout(a),a=setTimeout(function(){try{n(e)}catch(e){LPPlatform.logException(e)}},150)};return function(e){r.bind("click",function(t){e.val(""),t.stopPropagation(),t.preventDefault()})}(this),this.LP_input("search",function(e){s(e),l(e)}),this},LP_createToggle:function(){var e=function(e){if("INPUT"===e.nodeName&&"checkbox"===e.getAttribute("type")&&"LABEL"===e.nextElementSibling.nodeName){var t=LPTools.createElement("div","toggleButton");t.appendChild(LPTools.createElement("div")),e.nextElementSibling.appendChild(t)}};return function(){for(var t=0,n=this.length;t<n;++t)e(this.get(t));return this}}(),LP_addPasswordEye:function(){var t=function(e,t,n){e.passwordShown=!0,e.attr("type","text"),t.attr("title",Strings.Vault.HIDE_PASSWORD),t.addClass("selected"),n&&t.text(Strings.Vault.HIDE)},n=function(e,t,n){e.passwordShown=!1,e.attr("type","password"),t.attr("title",Strings.Vault.SHOW_PASSWORD),t.removeClass("selected"),n&&t.text(Strings.Vault.SHOW)},i=function(e,i,r){switch(e.attr("type")){case"password":t(e,i,r);break;case"text":n(e,i,r)}r&&o(e,i)},o=function(e,t){e.css("padding-right",t.outerWidth())};return function(t){this.addClass("password");var r=e(LPTools.createElement("div","relative"));this.before(r),r.append(this),r.css({margin:this.css("margin")}),this.css("margin","0");var a=e(LPTools.createElement("button",{class:"showPassword",title:Strings.Vault.SHOW_PASSWORD}));return r.append(a),function(s,l){function E(){0===s.val().length?a.addClass("displaynone"):a.removeClass("displaynone")}var T=LPTools.getOption(t,"textual",!1);if(T?(a.addClass("textual"),a.text(Strings.Vault.SHOW),s.one("focus",function(){o(s,a)})):a.addClass("iconButton"),a.bind("click",function(){"password"===s.attr("type")&&l?l(function(){i(s,a,T)}):i(s,a,T)}),s.hidePassword=function(){n(s,a,T)},LPTools.getOption(t,"includeGenerateButton",!1)){s.LP_input("passwordGenerate",function(e){e?r.removeClass("empty"):(s.hidePassword(),r.addClass("empty"))});var c=e(LPTools.createElement("button",{class:"generatePassword iconButton",title:Strings.Vault.GENERATE_PASSWORD}));r.append(c),c.bind("click",function(){(bg.get("LPContentScriptFeatures").better_generate_password_enabled?dialogs.betterGeneratePassword:dialogs.generatePassword).open({fillGenerated:!1,saveOptions:{source:"vault"}})})}LPTools.getOption(t,"showOnlyIfPopulated",!1)&&(E(),s.bind("keyup",E))}(this,LPTools.getOption(t,"checkPermissionHandler",null)),this.val(this.val()),this}}(),LP_reflow:function(){for(var e=0;e<this.length;++e)this.get(e).offsetHeight;return this},LP_scrollParent:function(){var t;if(1===this.length)for(var n=this.get(0).parentElement;n;){var i=e(n);if("auto"===i.css("overflow")&&i.css("max-height")){t=n;break}n=n.parentElement}return e(t)},LP_input:function(e,t){var n=this;e=e?"."+e:"",n.unbind("keypress"+e),n.unbind("keyup"+e),n.unbind("input"+e);var i=function(e){var i=e.which;i>31&&t(n.val()+String.fromCharCode(i))};n.bind("keypress"+e,i);var o=function(e){switch(e.keyCode||e.which){case 8:case 46:t(n.val())}};n.bind("keyup"+e,o);var r=function(){n.unbind("keypress"+e,i),n.unbind("keyup"+e,o),n.unbind("input"+e,r)};n.bind("input"+e,r),n.bind("input"+e,function(){t(n.val())}),n.val=function(e){return function(){return 1===arguments.length&&t(arguments[0]),e.apply(n,arguments)}}(this.val)}})}(jQuery),NotifyException=function(e){Topics.get(Topics.ERROR).publish(e),this.message=e,this.stack=(new Error).stack},NotifyException.prototype=Object.create(Error.prototype),NotifyException.prototype.name="InvalidArgumentException",NotifyException.prototype.constructor=NotifyException,AttachmentKeyException=function(){NotifyException.call(this,Strings.translateString("Could not decrypt attachment key."))},AttachmentKeyException.prototype=Object.create(NotifyException.prototype),AttachmentKeyException.prototype.name="AttachmentKeyException",AttachmentKeyException.prototype.constructor=AttachmentKeyException;