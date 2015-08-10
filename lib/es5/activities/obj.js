"use strict";
"use strict";
var Activity = require("./activity");
var util = require("util");
var _ = require("lodash");
function Obj() {
  Activity.call(this);
}
util.inherits(Obj, Activity);
Obj.prototype.run = function(callContext, args) {
  callContext.schedule(args, "_argsGot");
};
Obj.prototype._argsGot = function(callContext, reason, result) {
  if (reason !== Activity.states.complete) {
    callContext.end(reason, result);
    return ;
  }
  var obj;
  if (result.length > 1) {
    obj = {};
    obj[result[0]] = result[1];
  }
  callContext.complete(obj);
};
module.exports = Obj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm9iai5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUFBLFdBQVcsQ0FBQztBQUVaLEFBQUksRUFBQSxDQUFBLFFBQU8sRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFlBQVcsQ0FBQyxDQUFDO0FBQ3BDLEFBQUksRUFBQSxDQUFBLElBQUcsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLE1BQUssQ0FBQyxDQUFDO0FBQzFCLEFBQUksRUFBQSxDQUFBLENBQUEsRUFBSSxDQUFBLE9BQU0sQUFBQyxDQUFDLFFBQU8sQ0FBQyxDQUFDO0FBRXpCLE9BQVMsSUFBRSxDQUFFLEFBQUQsQ0FBRztBQUNYLFNBQU8sS0FBSyxBQUFDLENBQUMsSUFBRyxDQUFDLENBQUM7QUFDdkI7QUFBQSxBQUVBLEdBQUcsU0FBUyxBQUFDLENBQUMsR0FBRSxDQUFHLFNBQU8sQ0FBQyxDQUFDO0FBRTVCLEVBQUUsVUFBVSxJQUFJLEVBQUksVUFBVSxXQUFVLENBQUcsQ0FBQSxJQUFHLENBQUc7QUFDN0MsWUFBVSxTQUFTLEFBQUMsQ0FBQyxJQUFHLENBQUcsV0FBUyxDQUFDLENBQUM7QUFDMUMsQ0FBQztBQUVELEVBQUUsVUFBVSxTQUFTLEVBQUksVUFBVSxXQUFVLENBQUcsQ0FBQSxNQUFLLENBQUcsQ0FBQSxNQUFLLENBQUc7QUFDNUQsS0FBSSxNQUFLLElBQU0sQ0FBQSxRQUFPLE9BQU8sU0FBUyxDQUFHO0FBQ3JDLGNBQVUsSUFBSSxBQUFDLENBQUMsTUFBSyxDQUFHLE9BQUssQ0FBQyxDQUFDO0FBQy9CLFdBQU07RUFDVjtBQUFBLEFBRUksSUFBQSxDQUFBLEdBQUUsQ0FBQztBQUNQLEtBQUksTUFBSyxPQUFPLEVBQUksRUFBQSxDQUFHO0FBQ25CLE1BQUUsRUFBSSxHQUFDLENBQUM7QUFDUixNQUFFLENBQUUsTUFBSyxDQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUksQ0FBQSxNQUFLLENBQUUsQ0FBQSxDQUFDLENBQUM7RUFDOUI7QUFBQSxBQUNBLFlBQVUsU0FBUyxBQUFDLENBQUMsR0FBRSxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELEtBQUssUUFBUSxFQUFJLElBQUUsQ0FBQztBQUFBIiwiZmlsZSI6ImFjdGl2aXRpZXMvb2JqLmpzIiwic291cmNlUm9vdCI6ImxpYi9lczYiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxubGV0IEFjdGl2aXR5ID0gcmVxdWlyZShcIi4vYWN0aXZpdHlcIik7XG5sZXQgdXRpbCA9IHJlcXVpcmUoXCJ1dGlsXCIpO1xubGV0IF8gPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuXG5mdW5jdGlvbiBPYmooKSB7XG4gICAgQWN0aXZpdHkuY2FsbCh0aGlzKTtcbn1cblxudXRpbC5pbmhlcml0cyhPYmosIEFjdGl2aXR5KTtcblxuT2JqLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoY2FsbENvbnRleHQsIGFyZ3MpIHtcbiAgICBjYWxsQ29udGV4dC5zY2hlZHVsZShhcmdzLCBcIl9hcmdzR290XCIpO1xufTtcblxuT2JqLnByb3RvdHlwZS5fYXJnc0dvdCA9IGZ1bmN0aW9uIChjYWxsQ29udGV4dCwgcmVhc29uLCByZXN1bHQpIHtcbiAgICBpZiAocmVhc29uICE9PSBBY3Rpdml0eS5zdGF0ZXMuY29tcGxldGUpIHtcbiAgICAgICAgY2FsbENvbnRleHQuZW5kKHJlYXNvbiwgcmVzdWx0KTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBvYmo7XG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIG9iaiA9IHt9O1xuICAgICAgICBvYmpbcmVzdWx0WzBdXSA9IHJlc3VsdFsxXTtcbiAgICB9XG4gICAgY2FsbENvbnRleHQuY29tcGxldGUob2JqKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqOyJdfQ==