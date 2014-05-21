var Workflow = require("../activities/workflow");
var _ = require("underscore-node");
var specStrings = require("../common/specStrings");
var BeginMethod = require("../activities/beginMethod");

function WorkflowRegistry()
{
    this._workflows = {};
}

WorkflowRegistry.prototype.register = function(workflow)
{
    if (workflow instanceof Workflow)
    {
        if (!_(workflow.name).isString()) throw new TypeError("Workflow name is not a string.");
        var name = workflow.name.trim();
        if (!name) throw new TypeError("Workflow name is empty.");
        if (!_(workflow.version).isNumber()) throw new TypeError("Workflow version is not a number.");
        var version = workflow.version;

        var entry = this._workflows[name];
        if (entry)
        {
            var inner = entry[version];
            if (inner)
            {
                throw new Error("Workflow " + name + " " + version + " already registered.");
            }
            else
            {
                entry[version] = this._createDesc(workflow, name, version);
            }
        }
        else
        {
            entry = {};
            entry[version] = this._createDesc(workflow, name, version);
            this._workflows[name] = entry;
        }
    }
    else
    {
        throw  new TypeError("Workflow instance argument expected.");
    }
}

WorkflowRegistry.prototype._createDesc = function (workflow, name, version)
{
    return {
        workflow: workflow,
        name: name,
        version: version,
        createInstanceMethods: this._collectCreateInstanceMethods(workflow)
    }
}

WorkflowRegistry.prototype._collectCreateInstanceMethods = function (workflow)
{
    var self = this;
    var result = {};
    workflow.forEachChild(function(child)
    {
        if (child instanceof BeginMethod)
        {
            var methodName = _(child.methodName).isString() ? child.methodName.trim() : null;
            var instanceIdPath = _(child.instanceIdPath).isString() ? child.instanceIdPath.trim() : null;
            if (methodName && instanceIdPath)
            {
                var entry = result[methodName];
                if (!entry)
                {
                    entry = {
                        activityIds: [ child.id ],
                        methodName: methodName,
                        instanceIdPath: instanceIdPath
                    };
                    result[methodName] = entry;
                }
                else
                {
                    if (entry.instanceIdPath != instanceIdPath)
                    {
                        throw new Error("There are BeginMethod activities those doesn't agree in their instanceIdPath property values.");
                    }
                    entry.activityIds.push(child.id);
                }
            }
        }
    });
    return result;
}

module.exports = WorkflowRegistry;
