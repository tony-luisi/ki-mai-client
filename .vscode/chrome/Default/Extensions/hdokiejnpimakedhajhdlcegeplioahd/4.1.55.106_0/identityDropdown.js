var IdentityDropdown=function(){var t=function(t){for(var n=[],o=0,e=t.length;o<e;++o){var i=t[o],p=i._data.deciname;n.push({value:p,label:p,identity:i})}return n};return function(n,o){DropdownInput.call(this,n,t(o)),this.setReadOnly(),this.setIdentities=function(n){this.setOptions(t(n))}}}();IdentityDropdown.prototype=Object.create(DropdownInput.prototype),IdentityDropdown.prototype.constructor=IdentityDropdown,IdentityDropdown.prototype.setValue=function(t,n){void 0===n||n?function(n){n.options[t].identity.enable({callback:function(){DropdownInput.prototype.setValue.call(n,t)}})}(this):DropdownInput.prototype.setValue.call(this,t)};