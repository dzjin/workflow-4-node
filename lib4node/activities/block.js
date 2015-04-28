"use strict";
var Activity = require("./activity");
var util = require("util");
var Declarator = require("./declarator");
function Block() {
  Declarator.call(this);
}
util.inherits(Block, Declarator);
Block.prototype.varsDeclared = function(callContext, args) {
  var todo = [];
  this.set("_todo", todo);
  if (args.length) {
    for (var i = args.length - 1; i >= 1; i--) {
      todo.push(args[i]);
    }
    callContext.schedule(args[0], "_argGot");
  } else {
    callContext.end(Activity.states.complete, null);
  }
};
Block.prototype._argGot = function(callContext, reason, result) {
  var todo = this.get("_todo");
  if (reason === Activity.states.complete) {
    if (todo.length === 0) {
      callContext.complete(result);
    } else {
      callContext.schedule(todo.pop(), "_argGot");
    }
  } else {
    callContext.end(reason, result);
  }
};
module.exports = Block;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJsb2NrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQUEsQUFBSSxFQUFBLENBQUEsUUFBTyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsWUFBVyxDQUFDLENBQUM7QUFDcEMsQUFBSSxFQUFBLENBQUEsSUFBRyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsTUFBSyxDQUFDLENBQUM7QUFDMUIsQUFBSSxFQUFBLENBQUEsVUFBUyxFQUFJLENBQUEsT0FBTSxBQUFDLENBQUMsY0FBYSxDQUFDLENBQUM7QUFFeEMsT0FBUyxNQUFJLENBQUUsQUFBRCxDQUFHO0FBQ2IsV0FBUyxLQUFLLEFBQUMsQ0FBQyxJQUFHLENBQUMsQ0FBQztBQUN6QjtBQUFBLEFBRUEsR0FBRyxTQUFTLEFBQUMsQ0FBQyxLQUFJLENBQUcsV0FBUyxDQUFDLENBQUM7QUFFaEMsSUFBSSxVQUFVLGFBQWEsRUFBSSxVQUFVLFdBQVUsQ0FBRyxDQUFBLElBQUcsQ0FBRztBQUN4RCxBQUFJLElBQUEsQ0FBQSxJQUFHLEVBQUksR0FBQyxDQUFDO0FBQ2IsS0FBRyxJQUFJLEFBQUMsQ0FBQyxPQUFNLENBQUcsS0FBRyxDQUFDLENBQUM7QUFDdkIsS0FBSSxJQUFHLE9BQU8sQ0FBRztBQUNiLFFBQVMsR0FBQSxDQUFBLENBQUEsRUFBSSxDQUFBLElBQUcsT0FBTyxFQUFJLEVBQUEsQ0FBRyxDQUFBLENBQUEsR0FBSyxFQUFBLENBQUcsQ0FBQSxDQUFBLEVBQUUsQ0FBRztBQUN2QyxTQUFHLEtBQUssQUFBQyxDQUFDLElBQUcsQ0FBRSxDQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ3RCO0FBQUEsQUFDQSxjQUFVLFNBQVMsQUFBQyxDQUFDLElBQUcsQ0FBRSxDQUFBLENBQUMsQ0FBRyxVQUFRLENBQUMsQ0FBQztFQUM1QyxLQUNLO0FBQ0QsY0FBVSxJQUFJLEFBQUMsQ0FBQyxRQUFPLE9BQU8sU0FBUyxDQUFHLEtBQUcsQ0FBQyxDQUFDO0VBQ25EO0FBQUEsQUFDSixDQUFBO0FBRUEsSUFBSSxVQUFVLFFBQVEsRUFBSSxVQUFVLFdBQVUsQ0FBRyxDQUFBLE1BQUssQ0FBRyxDQUFBLE1BQUssQ0FBRztBQUM3RCxBQUFJLElBQUEsQ0FBQSxJQUFHLEVBQUksQ0FBQSxJQUFHLElBQUksQUFBQyxDQUFDLE9BQU0sQ0FBQyxDQUFDO0FBQzVCLEtBQUksTUFBSyxJQUFNLENBQUEsUUFBTyxPQUFPLFNBQVMsQ0FBRztBQUNyQyxPQUFJLElBQUcsT0FBTyxJQUFNLEVBQUEsQ0FBRztBQUNuQixnQkFBVSxTQUFTLEFBQUMsQ0FBQyxNQUFLLENBQUMsQ0FBQztJQUNoQyxLQUNLO0FBQ0QsZ0JBQVUsU0FBUyxBQUFDLENBQUMsSUFBRyxJQUFJLEFBQUMsRUFBQyxDQUFHLFVBQVEsQ0FBQyxDQUFDO0lBQy9DO0FBQUEsRUFDSixLQUNLO0FBQ0QsY0FBVSxJQUFJLEFBQUMsQ0FBQyxNQUFLLENBQUcsT0FBSyxDQUFDLENBQUM7RUFDbkM7QUFBQSxBQUNKLENBQUE7QUFFQSxLQUFLLFFBQVEsRUFBSSxNQUFJLENBQUM7QUFBQSIsImZpbGUiOiJhY3Rpdml0aWVzL2Jsb2NrLmpzIiwic291cmNlUm9vdCI6IkM6L0dJVC93b3JrZmxvdy00LW5vZGUvbGliLyIsInNvdXJjZXNDb250ZW50IjpbInZhciBBY3Rpdml0eSA9IHJlcXVpcmUoXCIuL2FjdGl2aXR5XCIpO1xyXG52YXIgdXRpbCA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xyXG52YXIgRGVjbGFyYXRvciA9IHJlcXVpcmUoXCIuL2RlY2xhcmF0b3JcIik7XHJcblxyXG5mdW5jdGlvbiBCbG9jaygpIHtcclxuICAgIERlY2xhcmF0b3IuY2FsbCh0aGlzKTtcclxufVxyXG5cclxudXRpbC5pbmhlcml0cyhCbG9jaywgRGVjbGFyYXRvcik7XHJcblxyXG5CbG9jay5wcm90b3R5cGUudmFyc0RlY2xhcmVkID0gZnVuY3Rpb24gKGNhbGxDb250ZXh0LCBhcmdzKSB7XHJcbiAgICB2YXIgdG9kbyA9IFtdO1xyXG4gICAgdGhpcy5zZXQoXCJfdG9kb1wiLCB0b2RvKTtcclxuICAgIGlmIChhcmdzLmxlbmd0aCkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBhcmdzLmxlbmd0aCAtIDE7IGkgPj0gMTsgaS0tKSB7XHJcbiAgICAgICAgICAgIHRvZG8ucHVzaChhcmdzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY2FsbENvbnRleHQuc2NoZWR1bGUoYXJnc1swXSwgXCJfYXJnR290XCIpO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2FsbENvbnRleHQuZW5kKEFjdGl2aXR5LnN0YXRlcy5jb21wbGV0ZSwgbnVsbCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkJsb2NrLnByb3RvdHlwZS5fYXJnR290ID0gZnVuY3Rpb24gKGNhbGxDb250ZXh0LCByZWFzb24sIHJlc3VsdCkge1xyXG4gICAgdmFyIHRvZG8gPSB0aGlzLmdldChcIl90b2RvXCIpO1xyXG4gICAgaWYgKHJlYXNvbiA9PT0gQWN0aXZpdHkuc3RhdGVzLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgaWYgKHRvZG8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNhbGxDb250ZXh0LmNvbXBsZXRlKHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjYWxsQ29udGV4dC5zY2hlZHVsZSh0b2RvLnBvcCgpLCBcIl9hcmdHb3RcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgY2FsbENvbnRleHQuZW5kKHJlYXNvbiwgcmVzdWx0KTtcclxuICAgIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBCbG9jazsiXX0=
