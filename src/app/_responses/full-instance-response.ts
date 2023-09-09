import { Deserializable } from '../_helpers/deserializable';
import { Instance } from '../_models/instance';

export class FullInstanceResponse implements Deserializable<FullInstanceResponse> {
    instance: Instance;

    deserialize(input: any) {
        this.instance = {
            instanceId: input.Instance.InstanceId,
            instanceName: input.Instance.InstanceName,
            instanceState: input.Instance.InstanceState,
            variables: input.Instance.Variables.map(function (variable: any) { return { name: variable.Name, variableType: variable.VariableType, value: variable.Value }}),
            inputEventHandlers: input.Instance.InputEventHandlers.map(function (ieh: any) { return { nameOfEvent: ieh.NameOfEvent, pythonCode: ieh.PythonCode }})
        };
        return this;
    }
}