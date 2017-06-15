Dialog=function(t,e){this.dialogConfig=t,this.options=$.extend(t.dialogOptions,e),this.adjustedView=!1,this.title=null,this.titleElement=null,this.headerElement=null,this.element=null,this.$element=null,this.dialogContent=null,this.previousDialog=null,this.previousFocus=null,this.pendingRefresh=!1,this.maximized=!1,this.currentViewElement=null,this.currentMenuElement=null,this.keyboardShown=!1,this.inputFields={},this.hiddenFields={},this.originalData={},this.containers={},this.passwordInputs=[],this.leftMenu=null,this.dynamicHeight=LPTools.getOption(this.options,"dynamicHeight",!1),this.responsive=LPTools.getOption(this.options,"responsive",!0),this.title=LPTools.getOption(this.options,"title",null),this.overlayDialog=LPTools.getOption(this.options,"overlayDialog",!1),this.inProcessOverlay=null,this.blurOverlay=null,this.buttonContainer=null,this.actionButtonContainer=null,this.nextButton=null,this.backButton=null,this.headerHeight=0,this.buttonHeight=0,this.excludedActions={};for(var i=LPTools.getOption(this.options,"excludedActions",[Constants.ACTION_EDIT]),o=0,n=i.length;o<n;++o)this.excludedActions[i[o]]=!0;this.setupComplete=!1,this.modalOverlayTabID=null,function(t){t.checkViewPasswordHandler=function(e){t.checkViewPassword(e)}}(this)},function(t){var e=!1,i=[],o=[],n=!1,s=function(t,e){for(var i=0,o=e.length;i<o;++i)if(t===e[i]){e.splice(i,1);break}},a=function(t){s(t,i),s(t,o)},l=function(t){i.push(t),LPTools.getOption(t.options,"submitDialog",!0)&&o.push(t)},r={},h=t.body,u=!1,d=$(t.body);Dialog.prototype.DIALOG_FIELD="dialogField",Dialog.prototype.RIGHT_ALIGN=0,Dialog.prototype.CENTER_ALIGN=1,Dialog.prototype.LEFT_ALIGN=2,t.body.appendChild(LPTools.createElement("div",{id:"dialogLoadingOverlay",class:"overlay"})),t.body.appendChild(function(){var t=LPTools.createElement("div",{id:"dialogOverlay",class:"overlay"});return $(t).bind("click",function(){Dialog.prototype.closeAllDialogs()}),t}()),Topics.get(Topics.ENTER).subscribe(function(t){o.length>0&&"TEXTAREA"!==t.target.nodeName&&"BUTTON"!==t.target.nodeName&&o[o.length-1].submit()});var p=function(t,e){for(var i=0;i<e.length;++i)for(var o=e[i]._views,n=0;n<o.length;++n)if(jQuery.contains(t,o[n].getElement()))return!0;return!1};Topics.get(Topics.REQUEST_START).subscribe(function(t){if(o.length>0&&LPTools.getOption(t,"dialogRequest",!0)){var e=o[o.length-1];t.hasOwnProperty("items")&&p(e.$element,t.items)||(e.showInProcessOverlay(),r[t.requestID]=e)}}),Topics.get(Topics.REQUEST_SUCCESS).subscribe(function(t){if(LPTools.getOption(t,"dialogRequest",!0)){var e=r[t.requestID];if(e){delete r[t.requestID];var i=!1;for(var o in r)if(r[o]===e){i=!0;break}i||(e.hideInProcessOverlay(),LPTools.getOption(t.requestSuccessOptions,"closeDialog",!0)&&e.closeOnSuccess())}}}),Topics.get(Topics.REQUEST_ERROR).subscribe(function(t){if(LPTools.getOption(t,"dialogRequest",!0)){var e=r[t.requestID];e&&(e.hideInProcessOverlay(),delete r[t.requestID])}}),function(){var t=function(){d.addClass("dialogLoading")},e=null;Topics.get(Topics.DIALOG_LOADING).subscribe(function(){u=!0,clearTimeout(e),e=setTimeout(function(){t()},250)}),Topics.get(Topics.DIALOG_LOADED).subscribe(function(){u=!1,d.removeClass("dialogLoading"),clearTimeout(e)})}(),Dialog.prototype.closeAllDialogs=function(t){for(var e="object"==typeof t&&t?t.forceClose:t,o=i.slice(),n=0;n<o.length;n++)o[n].close(e)},Dialog.prototype.getCurrentDialog=function(){return i.length>0?i[i.length-1]:null},Dialog.prototype.closeInProcessDialogs=function(){for(var t in r){r[t].close(!0)}},Dialog.prototype.refreshOpenDialogs=function(){for(var t=[],e=0,o=i.length;e<o;++e){var n=i[e],s=!1;for(var a in r)if(r[a]===n){s=!0;break}if(!s){var l=n.refresh();l&&t.push(l)}}LPTools.openAlerts(t)},Dialog.prototype.getDialogCount=function(){return i.length},Dialog.prototype.setIsDialogWindow=function(t){e=t},Dialog.prototype.isDialogWindow=function(){return e},Dialog.prototype.closeOnSuccess=function(){this.close(!0)},Dialog.prototype.refresh=function(){for(var t in this.inputFields){var e=this.inputFields[t];"function"==typeof e.refresh&&e.refresh()}},Dialog.prototype.inProcess=function(){for(var t in r)if(this===r[t])return!0;return!1},Dialog.prototype.showInProcessOverlay=function(){null===this.inProcessOverlay&&(this.inProcessOverlay=LPTools.createElement("div","dialogInProcessOverlay"),this.element.appendChild(this.inProcessOverlay)),this.$element.addClass("inProcess")},Dialog.prototype.hideInProcessOverlay=function(){this.$element.removeClass("inProcess")},Dialog.prototype.showBlurOverlay=function(){null===this.blurOverlay&&(this.blurOverlay=LPTools.createElement("div","dialogBlurOverlay"),this.element.appendChild(this.blurOverlay)),this.$element.addClass("blurred")},Dialog.prototype.hideBlurOverlay=function(){this.$element.removeClass("blurred")},Dialog.prototype.addHeaderButton=function(t,e,i){void 0===this.headerButtons&&(this.headerButtons=LPTools.createElement("div","dialogHeaderButtons"),t.append(this.headerButtons),t.addClass("dialogHeaderButtonsEnabled")),$(e).addClass("dialogHeaderButton"),LPPlatform.addEventListener(e,"click",i),this.headerButtons.appendChild(e)},Dialog.prototype.maximize=function(){this.$element.addClass("maximized"),this.maximizeButton.setAttribute("title",Strings.Vault.MINIMIZE),this.maximized=!0},Dialog.prototype.minimize=function(){this.$element.removeClass("maximized"),this.maximizeButton.setAttribute("title",Strings.Vault.MAXIMIZE),this.maximized=!1,this.setDynamicHeight()},Dialog.prototype.loadDialog=function(i){var o=this.dialogConfig.getID()+"Title";this.element=LPTools.createElement("div",{class:function(t){var i=["dialog"];return e&&!t.isOverlay()&&i.push("dialogWindow"),t.responsive&&i.push("responsive"),i.concat(LPTools.getOption(t.options,"additionalClasses",[]))}(this),role:"dialog","aria-labelledby":o}),this.$element=$(this.element);var n=["dialogHeader"];n=n.concat(LPTools.getOption(this.options,"additionalHeaderClasses",[])),this.headerElement=LPTools.createElement("div",n);var s=LPTools.createElement("div","dialogHeaderInner");this.titleElement=LPTools.createElement("span",{class:"dialogHeaderTitle",id:o}),s.appendChild(this.titleElement),this.headerElement.appendChild(s),this.element.appendChild(this.headerElement),this.titleElement=$(this.titleElement),this.headerElement=$(this.headerElement),!this.isOverlay()&&e||!LPTools.getOption(this.options,"maximizeButtonEnabled",!1)||(this.maximizeButton=LPTools.createElement("button",{title:Strings.Vault.MAXIMIZE,class:"dialogMaximizeButton"}),this.addHeaderButton(this.headerElement,this.maximizeButton,this.createHandler(function(){this.maximized?this.minimize():this.maximize(),Topics.get(Topics.DIALOG_RESIZE).publish(this)}))),!this.isOverlay()&&e||!LPTools.getOption(this.options,"closeButtonEnabled",!1)||this.addHeaderButton(this.headerElement,LPTools.createElement("button",{title:Strings.Vault.CLOSE,class:"dialogCloseButton"}),this.createHandler(this.close)),this.dialogContent=LPTools.createElement("div",LPTools.getOption(this.options,"buttonsInsideContent",!1)?"dialogContent":"dialogContent dialogContentFixed"),this.element.appendChild(this.dialogContent),this.dialogContent=$(this.dialogContent),this.dialogConfig.parentElementID?t.getElementById(this.dialogConfig.parentElementID).appendChild(this.element):h.appendChild(this.element),this.element.setAttribute("id",this.dialogConfig.getID()),this.dialogConfig.load(this.dialogContent,i)},Dialog.prototype.getNextViewButton=function(){return this.nextButton},Dialog.prototype.setupButtons=function(t){if(LPTools.getOption(this.options,"hideButtons",!1)||0!==t.find(".buttons").length)this.buttonContainer=$();else{var e=["buttons"];LPTools.getOption(this.options,"buttonsInsideContent",!1)||(e=e.concat(["buttonsFixed"])),this.buttonContainer=LPTools.createElement("div",e),this.buttonContainer=$(this.buttonContainer);var i=["nbtn"];LPTools.getOption(this.options,"largeButtons",!1)||i.push("btn_midi"),this.nextButton=LPTools.createElement("button",i.concat("rbtn"),LPTools.getOption(this.options,"nextButtonText",Strings.Vault.SAVE)),this.nextButton=$(this.nextButton);var o=LPTools.getOption(this.options,"views",null);if(o){this.views=o,this.currentViewIndex=0;var n=this.getNextViewButton();n!==this.nextButton&&n.bind("click",this.createHandler(this.showNextView))}this.nextButton.bind("click",this.createHandler(this.submit)),LPTools.getOption(this.options,"hideBackButton",!1)||(this.backButton=LPTools.createElement("button",i.concat("wbtn"),LPTools.getOption(this.options,"backButtonText",Strings.Vault.CANCEL)),this.backButton=$(this.backButton),this.backButton.bind("click",this.createHandler(this.close)),this.buttonContainer.append(this.backButton)),this.buttonContainer.append(this.nextButton);var s=LPTools.getOption(this.options,"buttonAlign",this.CENTER_ALIGN);s===this.RIGHT_ALIGN?this.buttonContainer.addClass("rightButtons"):s===this.CENTER_ALIGN&&this.buttonContainer.addClass("centerButtons"),LPTools.getOption(this.options,"buttonsInsideContent",!1)?this.dialogContent.append(this.buttonContainer):this.$element.append(this.buttonContainer)}},Dialog.prototype.applyToContainers=function(t){for(var e in this.containers){var i=this.containers[e];if(i)switch(typeof t){case"string":i[t].apply(i);break;case"function":t.call(this,i)}}},Dialog.prototype.destroyContainers=function(){this.applyToContainers("destruct");for(var t in this.containers)this.containers[t]=null},Dialog.prototype.createHandler=function(t){for(var e=[],i=1,o=arguments.length;i<o;++i)e.push(arguments[i]);return function(i){return function(){t.apply(i,e)}}(this)},Dialog.prototype.createDynamicHandler=function(t){return function(e){return function(){t.apply(e,arguments)}}(this)},Dialog.prototype.resetScroll=function(){this.$element.find(".dialogRightPane").scrollTop(0),this.dialogContent.scrollTop(0)},Dialog.prototype.leftMenuChange=function(t){},Dialog.prototype.setupLeftMenu=function(t){if(this.leftMenu=t.find(".dialogLeftMenu"),this.leftMenu.length>0)for(var e=t.find(".dialogLeftMenuView"),i=this.leftMenu.get(0).children,o=0,n=i.length;o<n;++o){var s=$(i[o]),a=function(t,e,i){return function(o){t.currentViewElement&&t.currentViewElement.removeClass("selected"),t.currentMenuElement&&t.currentMenuElement.removeClass("selected"),t.currentViewElement=i,t.currentMenuElement=e,t.currentViewElement.addClass("selected"),t.currentMenuElement.addClass("selected"),t.resetScroll(),t.leftMenuChange(e)}}(this,s,$(e[o]));s.bind("click",a)}},Dialog.prototype.selectFirstLeftMenuItem=function(){this.leftMenu&&this.leftMenu.find(":visible").first().trigger("click")},Dialog.prototype.addZebraStriping=function(t){for(var e=t.find(".settings"),i=0,o=e.length;i<o;++i)LPTools.addZebraStriping(e[i])},Dialog.prototype.show=function(){this.$element.show()},Dialog.prototype.hide=function(){this.$element.hide()},Dialog.prototype.initialize=function(t){Topics.get(Topics.CLEAR_DATA).subscribe(function(){bg.removeModalOverlay()}),t.find("input,textarea").prop("spellcheck",!1),this.setupButtons(t),this.addZebraStriping(t),this.setupLeftMenu(t),function(e){var i=t.find(".advancedOptionsLabel");i.length&&(i.attr("aria-expanded","false"),e.advancedOptionsLabel=i,e.advancedOptionsShown=!1),i.bind("click",e.createHandler(e.toggleAdvancedOptions)),t.bind("click",function(){e.applyToContainers("clearSelected")})}(this),t.find(".help").bind("click",function(t){bg.openhelp(t.target.getAttribute("help-section"))}),this.initializeInputObjects(t),this.intializeFocusHandlers(t),this.show(),LPTools.getOption(this.options,"buttonsInsideContent",!1)||(this.buttonHeight=this.buttonContainer.outerHeight(),this.dialogContent.css("bottom",this.buttonHeight)),this.headerHeight=this.headerElement?this.headerElement.outerHeight():0,this.responsiveTextAreas=[],this.responsiveTextAreasSelector=this.$element.find(".responsiveTextArea");for(var e=f(this.responsiveTextAreasSelector),i=0,o=this.responsiveTextAreasSelector.length;i<o;++i){var n=$(this.responsiveTextAreasSelector[i]);this.responsiveTextAreas.push({element:n,ratio:n.outerHeight()/e*100})}this.hide()},Dialog.prototype.toggleKeyboard=function(){this.keyboardShown?this.disableVirtualKeyboard():this.enableVirtualKeyboard()},Dialog.prototype.enableVirtualKeyboard=function(){var e=function(){this.focus(),this.$element.addClass("keyboard"),VirtualKeyboard.show(t.activeElement,h),this.keyboardShown=VirtualKeyboard.isOpen()};return function(){if("undefined"==typeof VirtualKeyboard){var i=LPTools.createElement("script",{type:"text/javascript",src:LPPlatform.getBaseURL()+"/js/virtualkeyboard/vk_loader.js?vk_layout=US%20US&vk_skin=air_small"});t.head.appendChild(i);var o=setInterval(this.createHandler(function(){"undefined"!=typeof VirtualKeyboard&&(e.call(this),this.keyboardShown&&(this.$element.find(".dialogInput").bind("focus",function(t){VirtualKeyboard.attachInput(t.target)}),clearInterval(o)))}),100)}else e.call(this)}}(),Dialog.prototype.disableVirtualKeyboard=function(){"undefined"!=typeof VirtualKeyboard&&(VirtualKeyboard.hide(),this.$element.removeClass("keyboard"),this.keyboardShown=!1)},Dialog.prototype.intializeFocusHandlers=function(){var t=function(t){var e=t.find(".dialogInput:visible,button:visible");return e.length>2?e:null};return function(e){var i=LPTools.createElement("button","focusCycler");LPPlatform.addEventListener(i,"focus",function(){var i=t(e);i&&i[1].focus()}),e.append(i);var o=LPTools.createElement("button","focusCycler");LPPlatform.addEventListener(o,"focus",function(){var i=t(e);i&&i[i.length-2].focus()}),e.prepend(o)}}(),Dialog.prototype.toggleAdvancedOptions=function(){this.advancedOptionsShown?this.hideAdvancedOptions():this.showAdvancedOptions()},Dialog.prototype.showAdvancedOptions=function(){this.advancedOptionsLabel.attr("aria-expanded","true"),this.advancedOptionsLabel.addClass("open"),this.advancedOptionsLabel.next().show(),this.setDynamicHeight(),this.advancedOptionsShown=!0},Dialog.prototype.hideAdvancedOptions=function(){this.advancedOptionsLabel.attr("aria-expanded","false"),this.advancedOptionsLabel.removeClass("open"),this.advancedOptionsLabel.next().hide(),this.setDynamicHeight(),this.advancedOptionsShown=!1},Dialog.prototype.showNextView=function(){this.performValidate({data:this.getData(),callback:function(t){t&&this.setNextView(this.currentViewIndex+1)}})},Dialog.prototype.setNextView=function(t){if(t>=0&&t<this.views.length&&t!==this.currentViewIndex){var e=this.views[t],i=this.views[this.currentViewIndex];void 0===i.title&&(i.title=this.getTitle()),LPTools.getOption(this.options,"hideBackButton",!1)||(void 0===i.cancelButtonText&&(i.cancelButtonText=this.backButton.text()),this.backButton.text(void 0===e.cancelButtonText?Strings.translateString("Back"):e.cancelButtonText)),$(i.selector).hide(),this.setTitle(e.title),e.nextButtonText&&this.nextButton.text(e.nextButtonText),$(e.selector).show(),LPTools.getOption(this.options,"hideBackButton",!1)||(0===t?(this.backButton.unbind("click"),this.backButton.bind("click",this.createHandler(this.close))):(this.backButton.unbind("click"),this.backButton.bind("click",this.createHandler(this.showPreviousView)))),this.currentViewIndex=t,LPTools.getOption(e,"dynamicHeight",!0)&&this.setDynamicHeight(),this.focus()}},Dialog.prototype.showPreviousView=function(){this.setNextView(this.currentViewIndex-1)},Dialog.prototype.initializeInputFields=function(t,e){for(var i=0,o=t.length;i<o;++i){var n=t[i],s=n.getAttribute(this.DIALOG_FIELD),a=this.inputFields[s];if(void 0===a)this.inputFields[s]=e.call(this,n,s);else if("radio"===n.getAttribute("type")){var l=n.getAttribute("name");l&&a.addRadioInput(l,n)}}};var c=function(t){var e=LPTools.createTimezoneSelect();return t.parentElement.insertBefore(e,t),t.parentElement.removeChild(t),new DialogInput.Input(e)},g=function(t,e){var i={};$(t).hasClass("monthYearDate")&&(i.includeDay=!1);var o=new DialogInput.NumericDateInput(i);return t.parentElement.insertBefore(o.buildInputElement(),t),t.parentElement.removeChild(t),o};Dialog.prototype.initializeInputObjects=function(t){this.initializeInputFields(t.find("input.selectDropdown"),function(t){return new DropdownInput(t,null,{dialog:this,additionalDropdownClasses:this.options.additionalDropdownClasses})}),this.initializeInputFields(t.find(".typeaheadDropdown"),function(t){return new TypeaheadDropdown(t,null,{dialog:this,additionalDropdownClasses:this.options.additionalDropdownClasses})}),this.initializeInputFields(t.find(".timezoneDropdown"),c),this.initializeInputFields(t.find(".stateDropdown"),function(t){var e=new StateDropdown({dialog:this});return t.parentElement.insertBefore(e.buildInputElement(),t),t.parentElement.removeChild(t),e}),this.initializeInputFields(t.find(".countryDropdown"),function(t){var e=LPTools.createCountrySelect();return t.parentElement.insertBefore(e,t),t.parentElement.removeChild(t),new DialogInput.Input(e)}),this.initializeInputFields(t.find(".phoneInput"),function(t){var e=new PhoneInput;return t.parentElement.insertBefore(e.buildInputElement(),t),t.parentElement.removeChild(t),e}),this.initializeInputFields(t.find(".dateInput"),g),this.initializeInputFields(t.find("select["+this.DIALOG_FIELD+"]"),function(t){return new DialogInput.Input(t,this)}),this.initializeInputFields(t.find("input["+this.DIALOG_FIELD+"],textarea["+this.DIALOG_FIELD+"]"),function(t){var e=new DialogInput.Input(t,this),i=e.getElement();return i.hasClass("passwordToggle")&&this.addPasswordEye(i),e})},Dialog.prototype.addPasswordEye=function(t){t.LP_addPasswordEye({checkPermissionHandler:this.checkViewPasswordHandler,includeGenerateButton:t.hasClass("generate")})},Dialog.prototype.checkViewPassword=function(t){t()},Dialog.prototype.close=function(e){return!LPTools.getOption(this.options,"confirmOnClose",!0)||void 0!==e&&e||!this.isModified()?(t.activeElement&&"INPUT"===t.activeElement.nodeName.toUpperCase()&&"password"===t.activeElement.type&&t.activeElement.blur(),this.clearFields(),this.destroyContainers(),this.hide(),a(this),this.disableVirtualKeyboard(),i.length>0?(this.focusPreviousDialog(),1!==i.length||i[0].isModal()||d.removeClass("dialogState")):(d.removeClass("dialogState"),d.css("min-width","")),this.previousFocus&&this.previousFocus.focus(),this.hideBlurOverlay(),this.hideInProcessOverlay(),this.setupComplete=!1,"function"==typeof this.data.onClose&&this.data.onClose.apply(this),Topics.get(Topics.DIALOG_CLOSE).publish(this),!0):(dialogs.confirmation.open({title:Strings.translateString("Discard Unsaved Changes?"),text:Strings.translateString("Changes will be lost if you close before saving."),nextButtonText:Strings.translateString("Discard"),backButtonText:Strings.Vault.CANCEL,handler:this.createHandler(this.close,!0)}),!1)},Dialog.prototype.differs=function(){var t=function(t){return null===t||void 0===t},e=function(e,i){return(!t(e)||!t(i))&&e!==i};return function(i,o){if(i&&o){for(var n in i){var s=i[n];if("object"==typeof s){if(this.differs(s,o[n]))return!0}else if(e(s,o[n]))return!0}for(var a in o)if(!t(o[a])&&!i.hasOwnProperty(a))return!0;return!1}return t(i)!==t(o)}}(),Dialog.prototype.getChanges=function(t){var e={};for(var i in t){var o=this.originalData[i],n=t[i];if("object"==typeof o){var s=this.getChanges(o,n);LPTools.hasProperties(s)&&(e[i]=s)}else o!==n&&(e[i]=n)}return e},Dialog.prototype.isModified=function(){var t=this.getData(),e=this.getOriginalData();return this.differs(e,t)},Dialog.prototype.getOriginalData=function(){return this.originalData},Dialog.prototype.clearFields=function(){for(var t in this.inputFields)this.inputFields[t].clear();this.clearErrors(),this.originalData={},this.originalFormData={},this.hiddenFields={}},Dialog.prototype.addError=function(t,e){this.inputFields[t].addError(e,this)},Dialog.prototype.populateFields=function(t){for(var e in t){var i=this.inputFields[e],o=t[e];"group"===e&&bg.get("g_nofolder_feature_enabled")&&(o!==Strings.Vault.NONE_GROUP&&o!==Strings.Consts.NONE_GROUP||(o="")),i?i.setValue(o):this.hiddenFields[e]=o}},Dialog.prototype.getData=function(){var t={};for(var e in this.inputFields)t[e]=this.inputFields[e].getValue();for(var i in this.hiddenFields)t[i]=this.hiddenFields[i];return $.extend(!0,{},t)},Dialog.prototype.initFunction=function(t){return function(e){return function(){Strings.translate(e.dialogContent.get(0)),e.initialize(e.$element),e.preSetup(t),e.setup(e.$element,t),e.postSetup(t)}}(this)},Dialog.prototype.open=function(t){l(this),this.data=t=t||{},null===this.element?this.loadDialog(this.initFunction(t)):(this.preSetup(t),this.setup(this.$element,t),this.postSetup(t))},Dialog.prototype.preSetup=function(t){var e=LPTools.getOption(t,"preSetup",null);"function"==typeof e&&e(this)},Dialog.prototype.postSetup=function(t){this.setupComplete=!0,this.originalData=this.getData(),t.virtualKeyboard&&this.enableVirtualKeyboard();var e=LPTools.getOption(t,"postSetup",null);"function"==typeof e&&e(this),this.adjustView()},Dialog.prototype.adjustView=function(t){if(!this.adjustedView||t){for(var e in this.inputFields){var i=this.inputFields[e];"function"==typeof i.adjustView&&i.adjustView()}this.adjustedView=!0}},Dialog.prototype.getZIndex=function(){var t=this.$element.css("z-index");return"auto"===t?0:parseInt(t)},Dialog.prototype.useDynamicHeignt=function(t){this.dynamicHeight&&!t&&this.element.removeAttribute("style"),this.dynamicHeight=t};var f=function(t){for(var e=0,i=0,o=t.length;i<o;++i)e+=$(t[i]).outerHeight();return e};Dialog.prototype.setDynamicHeight=function(){var t={height:window.outerHeight-window.innerHeight,width:window.outerWidth-window.innerWidth};return function(){if(this.dynamicHeight){this.show(),this.dialogContent.css("position","static");var i=this.dialogContent.outerHeight();!LPTools.getOption(this.options,"hideHeader",!1)&&this.headerHeight&&(i+=this.headerHeight),!LPTools.getOption(this.options,"hideButtons",!1)&&this.buttonHeight&&(i+=this.buttonHeight),this.$element.css(this.responsive?"max-height":"height",i);for(var o=this.dialogContent.height()-f(this.responsiveTextAreasSelector),n=0,s=this.responsiveTextAreas.length;n<s;++n){var a=this.responsiveTextAreas[n];a.element.css("height","calc("+a.ratio+"% - "+o+"px)")}this.dialogContent.css("position","")}this.responsive||!e||this.isOverlay()||(d.css("overflow","hidden"),LPPlatform.resizeTo(this.$element.outerWidth()+t.width,this.$element.outerHeight()+t.height),d.css("overflow","")),"function"==typeof this.data.onResize&&this.data.onResize.call(this,this.$element.outerHeight(),this.$element.outerWidth())}}(),Dialog.prototype.isOverlay=function(){return this.overlayDialog&&(i.length>0&&i[0]!==this||n)},Dialog.prototype.blurPreviousDialog=function(){this.previousDialog&&(this.isOverlay()?this.previousDialog.showBlurOverlay():this.previousDialog.hide())},Dialog.prototype.focusPreviousDialog=function(){this.previousDialog&&i.indexOf(this.previousDialog)>-1&&(this.isOverlay()?this.previousDialog.hideBlurOverlay():(this.previousDialog.show(),this.previousDialog.setMinWidth()),this.previousDialog.setDynamicHeight(),this.previousDialog=null)},Dialog.prototype.focus=function(){var t=this.$element.find(".dialogInput:visible").first();t.length>0?t.focus():this.nextButton&&this.nextButton.focus()},Dialog.prototype.isModal=function(){return LPTools.getOption(this.options,"isModal",!0)},Dialog.prototype.setup=function(e,o){LPTools.getOption(this.options,"hideHeader",!1)?(this.headerElement.LP_hide(),this.dialogContent.css("top","")):(this.dialogContent.css("top",this.headerHeight),this.headerElement.LP_show());var n=h;if(this.dialogConfig.parentElementID&&(n=t.getElementById(this.dialogConfig.parentElementID)),this.element.parentElement!==n&&n.appendChild(this.element),this.defaultFields(o),"undefined"!=typeof LPProxy&&LPTools.parseUserSpecificMenu(e.get(0),LPProxy.getAccountClass()),this.setTitle(o.title||this.title),this.views&&(this.views[0].title=o.title,this.setNextView(0)),this.setDynamicHeight(),this.previousFocus=t.activeElement,i.length>1){this.previousDialog=i[i.length-2];var s=this.previousDialog.getZIndex();e.css("z-index",s+1),this.blurPreviousDialog()}i.length>0&&this.isModal()&&d.addClass("dialogState"),LPTools.getOption(o,"show",!0)&&e.show(),this.focus(),this.setMinWidth(),this.resetScroll(),this.selectFirstLeftMenuItem(),u&&Topics.get(Topics.DIALOG_LOADED).publish(),Topics.get(Topics.DIALOG_OPEN).publish(this)},Dialog.prototype.setMinWidth=function(){var t=parseInt(this.$element.css("min-width"));t>0?d.css("min-width",t+40):d.css("min-width","")},Dialog.prototype.clearErrors=function(){for(var t in this.inputFields)this.inputFields[t].clearErrors();this.leftMenu&&this.leftMenu.children().removeClass("error")},Dialog.prototype.performValidate=function(t){this.validateOptions=t,this.clearErrors();var e=this.validate(t.data);this.postValidate(e),t.callback&&t.callback.call(this,e)},Dialog.prototype.postValidate=function(t){this.validateOptions=null;for(var e in this.inputFields){var i=this.inputFields[e];"function"==typeof i.postValidate&&i.postValidate()}if(!t&&(this.setDynamicHeight(),this.leftMenu.length>0))for(var e in this.inputFields){var o=this.inputFields[e];if(o.hasError()){var n=o.getElement().closest(".dialogLeftMenuView");if(n.length>0)for(var s=n.get(0),a=s.parentElement,l=0,r=a.children.length;l<r;++l)a.children[l]===s&&this.leftMenu.children().eq(l).addClass("error")}}},Dialog.prototype.validate=function(t){var e=!0;for(var i in this.inputFields){var o=this.inputFields[i];LPTools.getOption(this.validateOptions,"errorsOnly",!1)&&!o.hasError()||(e=o.validate(this,i,t[i])&&e)}return e},Dialog.prototype.submit=function(){try{if(this.getNextViewButton()===this.nextButton&&this.views&&this.currentViewIndex<this.views.length-1)this.showNextView();else{var t=this.getData();this.performValidate({data:t,callback:function(e){if(e){var i=LPTools.getOption(this.data,"handleSubmit",null);"function"==typeof i?i(t,this.data):this.handleSubmit(t,this.data)}}})}}catch(t){LPPlatform.logException(t)}},Dialog.prototype.getTitle=function(){return this.title},Dialog.prototype.setTitle=function(t){t&&(this.title=t,this.titleElement&&!LPTools.getOption(this.options,"hideHeaderTitle",!1)&&this.titleElement.text(t),this.titleElement.text().trim()?this.headerElement.addClass("titleEnabled"):this.headerElement.removeClass("titleEnabled"))},Dialog.prototype.defaultFields=function(t){for(var e in this.inputFields){var i=this.inputFields[e];"function"==typeof i.default?i.default():i.setValue("")}this.populateFields(LPTools.getOption(t,"defaultData",{}))},Dialog.prototype.getErrorOptions=function(){return{}},VaultItemDialog=function(t,e){Dialog.call(this,t,e),function(t){t.itemButtonHandler=function(e){var i=LPTools.getAttribute(t.actionButtonContainer.get(0),e.target,"vaultaction");t.vaultItem.handleClickEvent(i,{itemsForAction:[t.vaultItem],source:t.data.saveOptions&&t.data.saveOptions.source?t.data.saveOptions.source:"vault"})}}(this)},VaultItemDialog.prototype=Object.create(Dialog.prototype),VaultItemDialog.prototype.constructor=VaultItemDialog,function(){VaultItemDialog.prototype.refresh=function(){if(Dialog.prototype.refresh.apply(this,arguments),this.data.vaultItem&&!this.pendingRefresh){if(this.data.vaultItem.removed)return this.pendingRefresh=!0,function(t){return{type:"alert",title:Strings.translateString("Deleted"),text:Strings.translateString("%1 has been deleted. This dialog will be closed.",t.data.vaultItem.toString()),handler:function(){t.close(!0),t.pendingRefresh=!1}}}(this);var t=this.getFormData();if(this.differs(this.originalFormData,t))return this.pendingRefresh=!0,function(e){return{type:"confirmation",title:Strings.translateString("Updated"),text:Strings.translateString("%1 has been updated. Would you like to update this dialog with the latest data?",e.data.vaultItem.toString()),handler:function(){e.populateFields(t),e.originalData=e.getData(),e.pendingRefresh=!1}}}(this)}},VaultItemDialog.prototype.getDialogActions=function(t){var e=t.vaultItem.newDisplayObject();t.dialogActions=e.getDialogActions()},VaultItemDialog.prototype.open=function(t){t=t||{},t.saveOptions=$.extend({source:"vault"},t.saveOptions),"string"==typeof t.vaultItem&&"function"==typeof t.sourceFunction&&(t.vaultItem=t.sourceFunction(t.vaultItem),void 0===t.dialogActions&&this.getDialogActions(t)),t.vaultItem&&(t.actions=this.getItemButtonActions(t)),t.vaultItem?(n=!0,t.vaultItem.passwordProtect(this.createHandler(function(){n=!1,Dialog.prototype.open.call(this,t)}))):Dialog.prototype.open.call(this,t)},VaultItemDialog.prototype.getItemButtonActions=function(t){if(t.dialogActions){for(var e=[],i=0,o=t.dialogActions.length;i<o;++i){var n=t.dialogActions[i];void 0===this.excludedActions[n]&&e.push(n)}return e}},VaultItemDialog.prototype.handleSubmit=function(t){this.vaultItem?this.isModified()?this.save(this.vaultItem,t):this.close(!0):this.add(t)},VaultItemDialog.prototype.save=function(t,e){t.saveFromDialog(e,null,this.data.saveOptions)},VaultItemDialog.prototype.getFormData=function(){if(this.vaultItem){var t=$.extend(!0,DialogInput.getProperties(this.inputFields),DialogInput.getProperties(this.hiddenFields));return this.vaultItem.getFormData(t)}return{}},VaultItemDialog.prototype.setup=function(t,e){Dialog.prototype.setup.apply(this,arguments),this.vaultItem=LPTools.getOption(e,"vaultItem",void 0),this.vaultItem&&(this.originalFormData=this.getFormData(),this.populateFields(this.originalFormData)),this.buildActionButtons(LPTools.getOption(e,"actions",null))},VaultItemDialog.prototype.postSetup=function(t){Dialog.prototype.postSetup.apply(this,arguments),t.dialogData&&this.populateFields(t.dialogData)},VaultItemDialog.prototype.buildActionButtons=function(t){if(this.actionButtonContainer&&(this.actionButtonContainer.unbind("click"),this.actionButtonContainer.empty()),t){null===this.actionButtonContainer&&(this.actionButtonContainer=LPTools.createElement("div","dialogItemButtons"),this.actionButtonContainer=$(this.actionButtonContainer),this.buttonContainer.prepend(this.actionButtonContainer)),this.actionButtonContainer.bind("click",this.itemButtonHandler);for(var e=0,i=t.length;e<i;++e)this.actionButtonContainer.append(LPTools.buildItemButton(t[e]))}},VaultItemDialog.prototype.add=function(t){if(!this.options.type)throw"Dialog must provide a type for new item or override this function.";(new this.options.type).addFromDialog(t,null,this.data.saveOptions)}}()}(document);