var _ = require("underscore-node");
var WorkflowInstance = require("./workflowInstance");
var errors = require("../common/errors");
var asyncHelpers = require("./asyncHelpers");
var Promise = require("bluebird");

function WorkflowPersistence(impl)
{
    if (!_(impl).isObject()) throw new TypeError("Object argument expected.");

    this._impl = impl;
}

WorkflowPersistence.prototype.enterLock = function(lockName, enterLockTimeoutMs, inLockTimeoutMs)
{
    if (!_(lockName).isString()) throw new TypeError("Argument 'lockName' is not a string.");
    if (!_(enterLockTimeoutMs).isNumber()) throw new TypeError("Argument 'enterLockTimeoutMs' is not a number.");
    if (enterLockTimeoutMs < 1000) throw new Error("Argument 'enterLockTimeoutMs' have to be above 1000ms.");
    if (!_(inLockTimeoutMs).isNumber()) throw new TypeError("Argument 'inLockTimeoutMs' is not a number.");
    if (inLockTimeoutMs < 1000) throw new Error("Argument 'inLockTimeoutMs' have to be above 1000ms.");

    var self = this;
    return asyncHelpers.aggressiveRetry(
        self._enterLock(lockName, inLockTimeoutMs),
        function (lockInfo)
        {
            return lockInfo != null;
        },
        enterLockTimeoutMs,
        function ()
        {
            return new errors.WorkflowError("Entering lock '" + lockName + "' has timed out.");
        }
    );
}

WorkflowPersistence.prototype._enterLock = function (lockName, inLockTimeoutMs)
{
    return Promise.resolve(this._impl.enterLock(lockName, inLockTimeoutMs));
}

WorkflowPersistence.prototype.renameLock = function (lockId, lockName)
{
    return Promise.resolve(this._impl.renameLock(lockId, lockName));
}

WorkflowPersistence.prototype.renewLock = function (lockId, inLockTimeoutMs)
{
    return Promise.resolve(this._impl.renewLock(lockName, inLockTimeoutMs));
}

WorkflowPersistence.prototype.exitLock = function (lockId)
{
    return Promise.resolve(this._impl.exitLock(lockId));
}

WorkflowPersistence.prototype.getRunningInstanceIdPaths = function (workflowName, methodName)
{
    if (!_(workflowName).isString()) throw new TypeError("Argument 'workflowName' is not a string.");
    if (!_(methodName).isString()) throw new TypeError("Argument 'methodName' is not a string.");

    return Promise.resolve(this._impl.getRunningInstanceIdPaths(workflowName, methodName));
}

WorkflowPersistence.prototype.persistState = function (instance)
{
    if (!(instance instanceof WorkflowInstance)) throw new TypeError("WorkflowInstance argument expected.");

    var data = instance.getStateToPersist();
    return Promise.resolve(this._impl.persistState(data));
}

WorkflowPersistence.prototype.getRunningInstanceIdHeader = function (workflowName, instanceId, methodName)
{
    return Promise.resolve(this._impl.getRunningInstanceIdHeader(workflowName, instanceId, methodName));
}

WorkflowPersistence.prototype.loadState = function (workflowName, instanceId)
{
    // Without: idleMethods, promotions
    return Promise.resolve(this._impl.loadState(workflowName, instanceId));
}

WorkflowPersistence.prototype.removeState = function(workflowName, instanceId, succeeded, error)
{
    return Promise.resolve(this._impl.removeState(workflowName, instanceId, succeeded, error));
}

module.exports = WorkflowPersistence;