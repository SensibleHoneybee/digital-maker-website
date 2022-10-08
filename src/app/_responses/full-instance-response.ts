import { Deserializable } from '../_helpers/deserializable';
import { InputEventHandler } from "../_models/input-event-handler";
import { Variable } from '../_models/variable';

export class FullGameResponse implements Deserializable<FullGameResponse> {
    instanceId: string;
    inputEventHandlers: InputEventHandler[];
    variables: Variable[];

    deserialize(input: any) {
        this.instanceId = input.InstanceId;
        this.inputEventHandlers = input.InputEventHandlers.map(
            function (inputEventHandler: any) {
                return { nameOfEvent: inputEventHandler.NameOfEvent, pythonCode: inputEventHandler.PythonCode }
            });
        this.variables = input.Variables.map(
            function (variable: any) {
                return { name: variable.Name, variableType: variable.VariableType, value: variable.Value }
            });
        return this;
    }
}