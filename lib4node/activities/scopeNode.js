"use strict";
var util = require("util");
var _ = require("lodash");
var StrMap = require("backpack-node").collections.StrMap;
var is = require("../common/is");
var fast = require("fast.js");
function ScopeNode(id, scopePart) {
  this.id = id;
  this._parent = null;
  this._children = new StrMap();
  this._scopePart = scopePart;
  this._keys = [];
  for (var key in scopePart)
    this._keys.push(key);
}
Object.defineProperties(ScopeNode.prototype, {
  _keys: {
    value: null,
    writable: true,
    enumerable: false
  },
  parent: {
    get: function() {
      return this._parent;
    },
    set: function(value) {
      if (value !== null && !(value instanceof ScopeNode))
        throw new TypeError("Node argument expected.");
      if (this._parent !== null)
        throw new Error("Parent already defined.");
      value.addChild(this);
    }
  }
});
ScopeNode.prototype.forEachToRoot = function(f) {
  var current = this;
  while (current) {
    if (f.call(this, current) === false)
      return ;
    current = current._parent;
  }
};
ScopeNode.prototype.forEachChild = function(f) {
  this._children.forEachValue(f);
};
ScopeNode.prototype.addChild = function(childItem) {
  if (!(childItem instanceof ScopeNode))
    throw new TypeError("Node argument expected.");
  if (childItem._parent)
    throw new Error("Item has been already ha a parent node.");
  childItem._parent = this;
  this._children.add(childItem.id, childItem);
};
ScopeNode.prototype.removeChild = function(childItem) {
  if (!(childItem instanceof ScopeNode))
    throw new TypeError("Node argument expected.");
  if (childItem._parent !== this)
    throw new Error("Item is not a current node's child.");
  childItem._parent = null;
  this._children.remove(childItem.id);
};
ScopeNode.prototype.clearChildren = function() {
  this._children.clear();
};
ScopeNode.prototype.isPropertyExists = function(name) {
  return is.defined(this._scopePart[name]);
};
ScopeNode.prototype.getPropertyValue = function(name, canReturnPrivate) {
  if (canReturnPrivate) {
    return this._scopePart[name];
  } else if (!this._isPrivate(name)) {
    return this._scopePart[name];
  }
};
ScopeNode.prototype.setPropertyValue = function(name, value, canSetPrivate) {
  if (this._isPrivate(name)) {
    if (canSetPrivate) {
      if (!is.defined(this._scopePart[name]))
        this._keys.push(name);
      this._scopePart[name] = value;
      return true;
    }
  } else if (is.defined(this._scopePart[name])) {
    this._scopePart[name] = value;
    return true;
  }
  return false;
};
ScopeNode.prototype.createPropertyWithValue = function(name, value) {
  if (!is.defined(this._scopePart[name]))
    this._keys.push(name);
  this._scopePart[name] = value;
};
ScopeNode.prototype.deleteProperty = function(name, canDeletePrivate) {
  if (is.defined(this._scopePart[name])) {
    if (this._isPrivate(name)) {
      if (canDeletePrivate) {
        this._keys.splice(fast.indexOf(this._keys, name), 1);
        delete this._scopePart[name];
        return true;
      }
    } else {
      this._keys.splice(fast.indexOf(this._keys, name), 1);
      delete this._scopePart[name];
      return true;
    }
  }
  return false;
};
ScopeNode.prototype.enumeratePropertyNames = $traceurRuntime.initGeneratorFunction(function $__0(canEnumeratePrivate) {
  var i,
      key;
  return $traceurRuntime.createGeneratorInstance(function($ctx) {
    while (true)
      switch ($ctx.state) {
        case 0:
          $ctx.state = (canEnumeratePrivate) ? 6 : 16;
          break;
        case 6:
          i = 0;
          $ctx.state = 7;
          break;
        case 7:
          $ctx.state = (i < this._keys.length) ? 1 : -2;
          break;
        case 4:
          i++;
          $ctx.state = 7;
          break;
        case 1:
          $ctx.state = 2;
          return this._keys[i];
        case 2:
          $ctx.maybeThrow();
          $ctx.state = 4;
          break;
        case 16:
          i = 0;
          $ctx.state = 17;
          break;
        case 17:
          $ctx.state = (i < this._keys.length) ? 13 : -2;
          break;
        case 11:
          i++;
          $ctx.state = 17;
          break;
        case 13:
          key = this._keys[i];
          $ctx.state = 14;
          break;
        case 14:
          $ctx.state = (!this._isPrivate(key)) ? 8 : 11;
          break;
        case 8:
          $ctx.state = 9;
          return key;
        case 9:
          $ctx.maybeThrow();
          $ctx.state = 11;
          break;
        default:
          return $ctx.end();
      }
  }, $__0, this);
});
ScopeNode.prototype.forEachProperty = function(f) {
  var self = this;
  fast.forEach(self._keys, function(fn) {
    f(fn, self._scopePart[fn]);
  });
};
ScopeNode.prototype._isPrivate = function(key) {
  return key[0] === "_";
};
module.exports = ScopeNode;
//# sourceMappingURL=data:application/json;base64,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QXdIbUMsVUFBQSxFQUFFOzs7O2NBQzNCLENBQUEsSUFBRyxNQUFNLENBQUUsQ0FBQSxDQUFDOzs7O0FBMUhsQyxhQUFHLE1BQU0sRUFBSSxDQUFBLENBMkhHLENBQUMsSUFBRyxXQUFXLEFBQUMsQ0FBQyxHQUFFLENBQUMsQ0EzSEwsU0FBd0MsQ0FBQztBQUNoRSxlQUFJOzs7QUFEWixlQTJINkMsSUFBRSxDQTNIeEI7O0FBQXZCLGFBQUcsV0FBVyxBQUFDLEVBQUMsQ0FBQTs7OztBQUFoQixlQUFPLENBQUEsSUFBRyxJQUFJLEFBQUMsRUFBQyxDQUFBOztBQUNtQixFQUMvQixPQUE2QixLQUFHLENBQUMsQ0FBQztBQTRIdEMsQ0E5SHVELEFBOEh2RCxDQUFBO0FBRUEsUUFBUSxVQUFVLGdCQUFnQixFQUFJLFVBQVUsQ0FBQSxDQUFHO0FBQy9DLEFBQUksSUFBQSxDQUFBLElBQUcsRUFBSSxLQUFHLENBQUM7QUFDZixLQUFHLFFBQVEsQUFBQyxDQUFDLElBQUcsTUFBTSxDQUFHLFVBQVUsRUFBQyxDQUFHO0FBQ25DLElBQUEsQUFBQyxDQUFDLEVBQUMsQ0FBRyxDQUFBLElBQUcsV0FBVyxDQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUM7RUFDOUIsQ0FBQyxDQUFDO0FBQ04sQ0FBQTtBQUVBLFFBQVEsVUFBVSxXQUFXLEVBQUksVUFBVSxHQUFFLENBQUc7QUFDNUMsT0FBTyxDQUFBLEdBQUUsQ0FBRSxDQUFBLENBQUMsSUFBTSxJQUFFLENBQUM7QUFDekIsQ0FBQTtBQUVBLEtBQUssUUFBUSxFQUFJLFVBQVEsQ0FBQztBQUFBIiwiZmlsZSI6ImFjdGl2aXRpZXMvc2NvcGVOb2RlLmpzIiwic291cmNlUm9vdCI6IkM6L0dJVC93b3JrZmxvdy00LW5vZGUvbGliLyIsInNvdXJjZXNDb250ZW50IjpbInZhciB1dGlsID0gcmVxdWlyZShcInV0aWxcIik7XHJcbnZhciBfID0gcmVxdWlyZShcImxvZGFzaFwiKTtcclxudmFyIFN0ck1hcCA9IHJlcXVpcmUoXCJiYWNrcGFjay1ub2RlXCIpLmNvbGxlY3Rpb25zLlN0ck1hcDtcclxudmFyIGlzID0gcmVxdWlyZShcIi4uL2NvbW1vbi9pc1wiKTtcclxudmFyIGZhc3QgPSByZXF1aXJlKFwiZmFzdC5qc1wiKTtcclxuXHJcbmZ1bmN0aW9uIFNjb3BlTm9kZShpZCwgc2NvcGVQYXJ0KSB7XHJcbiAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICB0aGlzLl9wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5fY2hpbGRyZW4gPSBuZXcgU3RyTWFwKCk7XHJcbiAgICB0aGlzLl9zY29wZVBhcnQgPSBzY29wZVBhcnQ7XHJcbiAgICB0aGlzLl9rZXlzID0gW107XHJcbiAgICBmb3IgKHZhciBrZXkgaW4gc2NvcGVQYXJ0KSB0aGlzLl9rZXlzLnB1c2goa2V5KTtcclxufVxyXG5cclxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoU2NvcGVOb2RlLnByb3RvdHlwZSwge1xyXG4gICAgX2tleXM6IHtcclxuICAgICAgICB2YWx1ZTogbnVsbCxcclxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcclxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHBhcmVudDoge1xyXG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsICYmICEodmFsdWUgaW5zdGFuY2VvZiBTY29wZU5vZGUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm9kZSBhcmd1bWVudCBleHBlY3RlZC5cIik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLl9wYXJlbnQgIT09IG51bGwpIHRocm93IG5ldyBFcnJvcihcIlBhcmVudCBhbHJlYWR5IGRlZmluZWQuXCIpO1xyXG4gICAgICAgICAgICB2YWx1ZS5hZGRDaGlsZCh0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuU2NvcGVOb2RlLnByb3RvdHlwZS5mb3JFYWNoVG9Sb290ID0gZnVuY3Rpb24gKGYpIHtcclxuICAgIHZhciBjdXJyZW50ID0gdGhpcztcclxuICAgIHdoaWxlIChjdXJyZW50KSB7XHJcbiAgICAgICAgaWYgKGYuY2FsbCh0aGlzLCBjdXJyZW50KSA9PT0gZmFsc2UpIHJldHVybjtcclxuICAgICAgICBjdXJyZW50ID0gY3VycmVudC5fcGFyZW50O1xyXG4gICAgfVxyXG59XHJcblxyXG5TY29wZU5vZGUucHJvdG90eXBlLmZvckVhY2hDaGlsZCA9IGZ1bmN0aW9uIChmKSB7XHJcbiAgICB0aGlzLl9jaGlsZHJlbi5mb3JFYWNoVmFsdWUoZik7XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGRJdGVtKSB7XHJcbiAgICBpZiAoIShjaGlsZEl0ZW0gaW5zdGFuY2VvZiBTY29wZU5vZGUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm9kZSBhcmd1bWVudCBleHBlY3RlZC5cIik7XHJcbiAgICBpZiAoY2hpbGRJdGVtLl9wYXJlbnQpIHRocm93IG5ldyBFcnJvcihcIkl0ZW0gaGFzIGJlZW4gYWxyZWFkeSBoYSBhIHBhcmVudCBub2RlLlwiKTtcclxuICAgIGNoaWxkSXRlbS5fcGFyZW50ID0gdGhpcztcclxuICAgIHRoaXMuX2NoaWxkcmVuLmFkZChjaGlsZEl0ZW0uaWQsIGNoaWxkSXRlbSk7XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbiAoY2hpbGRJdGVtKSB7XHJcbiAgICBpZiAoIShjaGlsZEl0ZW0gaW5zdGFuY2VvZiBTY29wZU5vZGUpKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiTm9kZSBhcmd1bWVudCBleHBlY3RlZC5cIik7XHJcbiAgICBpZiAoY2hpbGRJdGVtLl9wYXJlbnQgIT09IHRoaXMpIHRocm93IG5ldyBFcnJvcihcIkl0ZW0gaXMgbm90IGEgY3VycmVudCBub2RlJ3MgY2hpbGQuXCIpO1xyXG4gICAgY2hpbGRJdGVtLl9wYXJlbnQgPSBudWxsO1xyXG4gICAgdGhpcy5fY2hpbGRyZW4ucmVtb3ZlKGNoaWxkSXRlbS5pZCk7XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUuY2xlYXJDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuX2NoaWxkcmVuLmNsZWFyKCk7XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUuaXNQcm9wZXJ0eUV4aXN0cyA9IGZ1bmN0aW9uIChuYW1lKSB7XHJcbiAgICByZXR1cm4gaXMuZGVmaW5lZCh0aGlzLl9zY29wZVBhcnRbbmFtZV0pO1xyXG59XHJcblxyXG5TY29wZU5vZGUucHJvdG90eXBlLmdldFByb3BlcnR5VmFsdWUgPSBmdW5jdGlvbiAobmFtZSwgY2FuUmV0dXJuUHJpdmF0ZSkge1xyXG4gICAgaWYgKGNhblJldHVyblByaXZhdGUpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2NvcGVQYXJ0W25hbWVdO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAoIXRoaXMuX2lzUHJpdmF0ZShuYW1lKSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9zY29wZVBhcnRbbmFtZV07XHJcbiAgICB9XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUuc2V0UHJvcGVydHlWYWx1ZSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgY2FuU2V0UHJpdmF0ZSkge1xyXG4gICAgaWYgKHRoaXMuX2lzUHJpdmF0ZShuYW1lKSkge1xyXG4gICAgICAgIGlmIChjYW5TZXRQcml2YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghaXMuZGVmaW5lZCh0aGlzLl9zY29wZVBhcnRbbmFtZV0pKSB0aGlzLl9rZXlzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Njb3BlUGFydFtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmIChpcy5kZWZpbmVkKHRoaXMuX3Njb3BlUGFydFtuYW1lXSkpIHtcclxuICAgICAgICB0aGlzLl9zY29wZVBhcnRbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuU2NvcGVOb2RlLnByb3RvdHlwZS5jcmVhdGVQcm9wZXJ0eVdpdGhWYWx1ZSA9IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFpcy5kZWZpbmVkKHRoaXMuX3Njb3BlUGFydFtuYW1lXSkpIHRoaXMuX2tleXMucHVzaChuYW1lKTtcclxuICAgIHRoaXMuX3Njb3BlUGFydFtuYW1lXSA9IHZhbHVlO1xyXG59XHJcblxyXG5TY29wZU5vZGUucHJvdG90eXBlLmRlbGV0ZVByb3BlcnR5ID0gZnVuY3Rpb24gKG5hbWUsIGNhbkRlbGV0ZVByaXZhdGUpIHtcclxuICAgIGlmIChpcy5kZWZpbmVkKHRoaXMuX3Njb3BlUGFydFtuYW1lXSkpIHtcclxuICAgICAgICBpZiAodGhpcy5faXNQcml2YXRlKG5hbWUpKSB7XHJcbiAgICAgICAgICAgIGlmIChjYW5EZWxldGVQcml2YXRlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9rZXlzLnNwbGljZShmYXN0LmluZGV4T2YodGhpcy5fa2V5cywgbmFtZSksIDEpO1xyXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3Njb3BlUGFydFtuYW1lXTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLl9rZXlzLnNwbGljZShmYXN0LmluZGV4T2YodGhpcy5fa2V5cywgbmFtZSksIDEpO1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fc2NvcGVQYXJ0W25hbWVdO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUuZW51bWVyYXRlUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uKiAoY2FuRW51bWVyYXRlUHJpdmF0ZSkge1xyXG4gICAgaWYgKGNhbkVudW1lcmF0ZVByaXZhdGUpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2tleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgeWllbGQgdGhpcy5fa2V5c1tpXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2tleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGtleSA9IHRoaXMuX2tleXNbaV07XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNQcml2YXRlKGtleSkpIHlpZWxkIGtleTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcblNjb3BlTm9kZS5wcm90b3R5cGUuZm9yRWFjaFByb3BlcnR5ID0gZnVuY3Rpb24gKGYpIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIGZhc3QuZm9yRWFjaChzZWxmLl9rZXlzLCBmdW5jdGlvbiAoZm4pIHtcclxuICAgICAgICBmKGZuLCBzZWxmLl9zY29wZVBhcnRbZm5dKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5TY29wZU5vZGUucHJvdG90eXBlLl9pc1ByaXZhdGUgPSBmdW5jdGlvbiAoa2V5KSB7XHJcbiAgICByZXR1cm4ga2V5WzBdID09PSBcIl9cIjtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTY29wZU5vZGU7Il19
