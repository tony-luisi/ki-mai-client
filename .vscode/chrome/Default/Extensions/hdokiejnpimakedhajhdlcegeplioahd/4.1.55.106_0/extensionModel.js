!function(){var t=!1;VaultItemBase.prototype.reprompt=function(e){var i=function(t){return function(){t.apply(this,arguments),LPPlatform.closePopup()}};return function(o,s){t=e.call(this,i(o),s)}}(VaultItemBase.prototype.reprompt),VaultItemBaseDisplay.prototype.build=function(t){t=t||{};var e=["extensionMenuItem"];e=e.concat(this.getMenuItemClass()),t&&t.isZiggySet&&(e=e.concat("ziggyOverride"));var i=LPTools.createElement("li",e);t&&t.isOmarSet&&(t.useSquareIcon=!0),t&&t.additionalItemClasses&&LPTools.addClass(i,t.additionalItemClasses);var o=this.buildItemIconElement(t);null!==o&&i.appendChild(o);var s=this.buildItemInfoTextElements(t);s.length>0&&i.appendChild(s[0]);var n=this.buildMoreOptionsButtons(t);if(n)if(n instanceof Array)for(var a=0,l=n.length;a<l;++a)i.appendChild(n[a]);else i.appendChild(n);return i},VaultItemBaseDisplay.prototype.getMenuItemClass=function(){return"item"};var e=function(){var t=LPTools.createElement("div","fa fa-pencil fa-stack-1x pencil"),e=LPTools.createElement("div",{class:"fa fa-circle fa-stack-2x circle",vaultaction:Constants.ACTION_EDIT,title:Strings.Vault.EDIT}),i=LPTools.createElement("div","moreItem moreActions moreItem-override backgroundCircle fa-stack");return e.appendChild(t),i.appendChild(e),i};VaultItemBaseDisplay.prototype.buildMoreOptionsButtons=function(t){return t&&t.isZiggySet?e():LPTools.createElement("div",{class:"moreItem moreActions background",vaultaction:Constants.ACTION_OPEN_MORE_OPTIONS,title:Strings.Vault.MORE_OPTIONS})},VaultItemBaseDisplay.prototype.buildItemIconElement=function(t){var e=LPTools.createElement("div","itemIcon");return e.appendChild(this.getIconElement(t)),e.appendChild(LPTools.createElement("div","itemIconOverlay")),e},VaultItemBaseDisplay.prototype.buildItemMenuOption=function(t){var e=LPTools.createElement("li",{class:"extensionMenuItem",vaultaction:t});return e.textContent=Strings.Vault[Constants.CONTEXT_MENU_ITEMS[t]],LPPlatform.addEventListener(e,"click",this._eventHandler),e},VaultItemBaseDisplay.prototype.buildMoreOptions=function(t){var e=this.getContainer()._buildOptions;void 0===t&&(t=LPTools.getOption(e,"moreOptionsElement",this._element?this._element.parentElement:null)),LPTools.removeDOMChildren(t);var i=this.build(e);this.postBuild(i,e),t.appendChild(i),this._$_element.unbind("contextmenu");for(var o=this.getMoreOptions(),s=[],n=0,a=o.length;n<a;++n){var l=o[n];if(!this.isExcludedAction(l)){var p=this.buildItemMenuOption(l);s.push(p),t.appendChild(p)}}LPTools.addKeyBoardNavigation(s,{useRightArrow:!1,selectFirst:!0}),ExtensionDropdown.setGroupLabel(LPProxy.getGroupByName(this._model.getGroupName()))},VaultItemBaseDisplay.prototype.openMoreOptions=function(){this.pushState(LPTools.getOption(this.getContainer()._buildOptions,"moreOptionsState",void 0)),this.buildMoreOptions()},VaultItemBaseDisplay.prototype.pushState=function(t){t=t||ExtensionDropdown.State.GroupState,Topics.get(Topics.PUSH_STATE).publish(new t(this._parent))},VaultItemBaseDisplay.prototype.handleEvent=function(e,i){var o={source:"icon",approach:"nav"};switch(e.type){case"click":var s=this.getVaultAction(e.target);switch(this.handleClickEvent(s,o),s){case Constants.ACTION_OPEN_MORE_OPTIONS:case Constants.ACTION_TOGGLE_OPEN:t=!0}t&&(e.stopPropagation(),e.preventDefault(),t=!1);break;case"contextmenu":this.handleClickEvent(Constants.ACTION_OPEN_MORE_OPTIONS,o),e.stopPropagation(),e.preventDefault()}},VaultItemBaseDisplay.prototype.getType=function(){return"Vault Item"},GroupDisplay.prototype.getDisplayName=function(){return this._model.getGroupName()},GroupDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return e.setAttribute("vaultaction",Constants.ACTION_TOGGLE_OPEN),e},GroupDisplay.prototype.buildItemIconElement=function(){return null},GroupDisplay.prototype.getMenuItemClass=function(){return"group"},GroupDisplay.prototype.buildMoreOptionsButtons=function(){return LPTools.createElement("div","more")},GroupDisplay.prototype.setupListeners=function(t,e){$(t).bind("click",this._eventHandler)},GroupDisplay.prototype.toggleOpen=function(){this.pushState(),this.rebuildItems(this._element.parentElement),ExtensionDropdown.setGroupLabel(this._model)};var i=function(t,e){for(var i=0,o=t.length;i<o;++i)e.push(t[i]._element)};GroupDisplay.prototype.rebuildItems=function(t){var e=this.getContainer();if(t=t||e._element,0===this._subGroups.length&&1===this._items.length&&LPTools.getOption(e._buildOptions,"autoExpandSingleItem",!0))this._items[0].buildMoreOptions(t);else{LPTools.removeDOMChildren(t);var o=this.favoritesGroup&&!this.favoritesGroup.isEmpty();o&&this.buildItems([this.favoritesGroup],t,e._buildOptions);var s=0,n=[],a=null;if(bg.get("g_nofolder_feature_enabled"))for(var l=0,p=this._subGroups.length;l<p;l++)this._subGroups[l]instanceof DefaultGroupDisplay?(a=this._subGroups[l],s=a._items?a._items.length:0):n.push(this._subGroups[l]);var r=a?n:this._subGroups;this.buildItems(r,t,e._buildOptions),this.buildItems(this._items,t,e._buildOptions),a&&s>0&&this.buildItems(a._items,t,e._buildOptions),r.length>0&&(this._items.length>0||s>0)&&r[r.length-1]._$_element.removeClass("last");var u=[];o&&u.push(this.favoritesGroup._element),i(r,u),i(this._items,u),a&&s>0&&i(a._items,u),LPTools.addKeyBoardNavigation(u,{rightArrowSelector:".moreItem",selectFirst:!0}),LPTools.getOption(e._buildOptions,"addLastClass",!0)||$(u[u.length-1]).removeClass("last");var c=LPTools.getOption(e._buildOptions,"currentType",!1);LPTools.getOption(e._buildOptions,"omarItems",!1)&&c&&e.applyFilter({showEmptyGroups:!1,func:function(t){return t instanceof GroupDisplay||t instanceof DefaultGroupDisplay||t instanceof DummyGroupDisplay||t.getType()===c||"application"===t.getType()&&"Account"===c}})}},GroupDisplay.prototype.getItemContainer=function(){return this.getContainer()._element},GroupDisplay.prototype.getSubFolderContainer=GroupDisplay.prototype.getItemContainer,AccountDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return ExtensionDropdown.isMatchingSite(this._model.getID())?(e.setAttribute("vaultaction",Constants.ACTION_FILL_SITE),e.setAttribute("title",Strings.Vault.FILL+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.FILL)):(e.setAttribute("vaultaction",Constants.ACTION_LAUNCH),e.setAttribute("title",Strings.Vault.LAUNCH+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.LAUNCH)),e},AccountDisplay.prototype.setupListeners=function(t,e){VaultItemBaseDisplay.prototype.setupListeners.apply(this,arguments)},AccountDisplay.prototype.getMoreOptions=function(){var t=[Constants.ACTION_COPY_USERNAME,Constants.ACTION_COPY_PASSWORD,Constants.ACTION_COPY_URL,Constants.ACTION_GO_TO_URL,Constants.ACTION_EDIT,Constants.ACTION_DELETE];return ExtensionDropdown.isMatchingSite(this._model.getID())&&t.unshift(Constants.ACTION_FILL_SITE),t},AccountDisplay.prototype.getType=function(){return"Account"},NoteDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return LPTools.addClass(e,"note"),e.setAttribute("vaultaction",Constants.ACTION_EDIT),e.setAttribute("title",Strings.Vault.EDIT+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.EDIT),e},NoteDisplay.prototype.getMoreOptions=function(){var t=[];return this._model.hasUsername()&&t.push(Constants.ACTION_COPY_USERNAME),this._model.hasPassword()&&t.push(Constants.ACTION_COPY_PASSWORD),t.push(Constants.ACTION_COPY_NOTE),this._model.hasPrivateKey()&&t.push(Constants.ACTION_COPY_KEY),t.push(Constants.ACTION_EDIT),t.push(Constants.ACTION_DELETE),t},NoteDisplay.prototype.setupListeners=function(t,e){VaultItemBaseDisplay.prototype.setupListeners.apply(this,arguments)},FormFillDisplay.prototype.getMoreOptions=function(){return[Constants.ACTION_EDIT,Constants.ACTION_FILL]},FormFillDisplay.prototype.setupListeners=function(t,e){VaultItemBaseDisplay.prototype.setupListeners.apply(this,arguments)},FormFillDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return LPTools.addClass(e,"formFill"),e.setAttribute("vaultaction",Constants.ACTION_FILL),e.setAttribute("title",Strings.Vault.FILL+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.FILL),e},FormFillDisplay.prototype.includeCreditInfo=function(){return!1},FormFillDisplay.prototype.getType=function(){return"formfill"},IdentityDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return e.setAttribute("vaultaction",Constants.ACTION_ENABLE),e.setAttribute("title",Strings.Vault.ENABLE+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.ENABLE),e},AllIdentityDisplay.prototype.build=IdentityDisplay.prototype.build,IdentityDisplay.prototype.buildMoreOptionsButtons=function(){return null},IdentityDisplay.prototype.openMoreOptions=function(){},IdentityDisplay.prototype.getType=function(){return"identity"},MatchingAccountDisplay=function(t){AccountDisplay.call(this,t)},MatchingAccountDisplay.prototype=Object.create(AccountDisplay.prototype),MatchingAccountDisplay.prototype.constructor=MatchingAccountDisplay,MatchingAccountDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return e.setAttribute("vaultaction",Constants.ACTION_FILL_SITE),e.setAttribute("title",Strings.Vault.FILL+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.FILL),LPTools.addClass(e,"matchingSite"),e},MatchingAccountDisplay.prototype.buildMoreOptionsButtons=function(t){var i=[];return this.isExcludedAction(Constants.ACTION_COPY_USERNAME)||i.push(LPTools.createElement("div",{class:"moreItem copyUsername",title:Strings.Vault.COPY_USERNAME,vaultaction:Constants.ACTION_COPY_USERNAME})),this.isExcludedAction(Constants.ACTION_COPY_PASSWORD)||i.push(LPTools.createElement("div",{class:"moreItem copyPassword",title:Strings.Vault.COPY_PASSWORD,vaultaction:Constants.ACTION_COPY_PASSWORD})),t&&t.isZiggySet?i.push(e()):i.push(LPTools.createElement("div",{class:"moreItem background",title:Strings.Vault.MORE_OPTIONS,vaultaction:Constants.ACTION_OPEN_MORE_OPTIONS})),i},MatchingAccountDisplay.prototype.handleClickEvent=function(t,e){void 0===e&&(e={}),bg.get("LPContentScriptFeatures").ziggy?e.approach="match":e.approach="nav",AccountDisplay.prototype.handleClickEvent.apply(this,arguments)},MatchingNoteDisplay=function(t){NoteDisplay.call(this,t)},MatchingNoteDisplay.prototype=Object.create(NoteDisplay.prototype),MatchingNoteDisplay.prototype.constructor=MatchingNoteDisplay,MatchingNoteDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return LPTools.addClass(e,"matchingSite matchingNote"),e.setAttribute("vaultaction",Constants.ACTION_FILL),e.setAttribute("title",Strings.Vault.FILL+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.FILL),e},MatchingNoteDisplay.prototype.buildMoreOptionsButtons=function(){var t=[];return t.push(LPTools.createElement("div",{class:"moreItem",title:Strings.Vault.MORE_OPTIONS,vaultaction:Constants.ACTION_OPEN_MORE_OPTIONS})),t},MatchingNoteDisplay.prototype.handleClickEvent=function(t,e){void 0===e&&(e={}),bg.get("LPContentScriptFeatures").ziggy?e.approach="match":e.approach="nav",NoteDisplay.prototype.handleClickEvent.apply(this,arguments)},ApplicationDisplay.prototype.getMoreOptions=function(){return[Constants.ACTION_EDIT,Constants.ACTION_COPY_USERNAME,Constants.ACTION_COPY_PASSWORD,Constants.ACTION_DELETE]},ApplicationDisplay.prototype.build=function(t){var e=VaultItemBaseDisplay.prototype.build.apply(this,arguments);return LPFeatures.allowLaunchApplication()&&(e.setAttribute("vaultaction",Constants.ACTION_LAUNCH),e.setAttribute("title",Strings.Vault.LAUNCH+" "+this.getDisplayName()),this.setPrimaryActionText(Strings.Vault.LAUNCH)),e},ApplicationDisplay.prototype.getType=function(){return"application"}}();