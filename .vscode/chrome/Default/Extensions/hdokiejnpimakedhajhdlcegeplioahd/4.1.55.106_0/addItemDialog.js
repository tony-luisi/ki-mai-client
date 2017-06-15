var AddItemDialog=function(t){Dialog.call(this,t,{dynamicHeight:!1,closeButtonEnabled:!0,overlayDialog:!0,hideButtons:!0,additionalHeaderClasses:["icon"]})};AddItemDialog.prototype=Object.create(Dialog.prototype),AddItemDialog.prototype.constructor=AddItemDialog,AddItemDialog.prototype.addCard=function(t){var e=LPTools.createElement("div","col-3"),n=LPTools.createElement("button",t.classes?[].concat("addItemCard",t.classes):"addItemCard");return e.appendChild(n),t.icon&&n.appendChild(t.icon),n.appendChild(LPTools.createElement("span","addItemCardName",t.name)),t.parent.append(e),n},AddItemDialog.prototype.initialize=function(){Dialog.prototype.initialize.apply(this,arguments);var t=this,e=$("#addItemOptions"),n=$("#addItemCustomOptionsContainer").slideUp(),a=$("#addItemCustomOptions"),o=$("#addItemCustomOptionsLabel"),i={postSetup:function(){t.close()}};o.bind("click",function(){n.slideToggle(),o.toggleClass("open")}),bg.get("RecordTypeConfig").types.forEach(function(n){n.composite||t.addCard({parent:e,name:n.name,classes:n.id}).addEventListener("click",function(){switch(n.recordType){case"Account":dialogs.site.open(i);break;default:dialogs.note.open($.extend(i,{title:Strings.translateString("Add %1",n.name),defaultData:{notetype:n.recordType}}))}})});var s=function(e){var n=t.addCard({parent:a,name:e.title,classes:"custom"}),o=LPTools.createElement("button","customTemplateDeleteButton");return o.appendChild(LPTools.createElement("i","fa fa-trash")),n.appendChild(o),n.addEventListener("click",function(){dialogs.note.open($.extend(i,{title:Strings.translateString("Add %1",e.title),defaultData:{notetype:"Custom_"+e.id}}))}),o.addEventListener("click",function(t){t.stopPropagation(),dialogs.confirmation.open({title:Strings.translateString("Confirm Deletion"),text:[Strings.translateString("Are you sure you want to delete %1?",e.title),Strings.translateString("Any notes you created using this template will not be deleted.")],nextButtonText:Strings.translateString("Continue"),backButtonText:Strings.translateString(Strings.Vault.CANCEL),handler:function(){LPRequest.makeRequest(LPProxy.deleteCustomNoteTemplate,{params:{id:e.id},success:function(){var t=n.parentElement;t.parentElement.removeChild(t)},requestSuccessOptions:{closeDialog:!1}})}})}),n};LPProxy.getCustomNoteTemplates().forEach(s),Topics.get(Topics.SECURENOTE_TEMPLATE_ADDED).subscribe(function(t){var e=s(t);setTimeout(function(){e.focus()},0)});var d=this.addCard({parent:a.parent(),name:Strings.translateString("New custom item type"),icon:LPTools.createElement("i","fa fa-plus")});$(d).addClass("customTemplateAddButton").bind("click",function(){dialogs.customNoteTemplate.open()})};