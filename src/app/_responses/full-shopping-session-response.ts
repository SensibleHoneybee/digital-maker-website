import { Deserializable } from '../_helpers/deserializable';
import { Instance } from '../_models/instance';
import { ShoppingSession } from '../_models/shopping-session';

export class FullShoppingSessionResponse implements Deserializable<FullShoppingSessionResponse> {
    instance: Instance;
    shoppingSession: ShoppingSession;

    deserialize(input: any) {
        this.instance = {
            instanceId: input.Instance.InstanceId,
            instanceName: input.Instance.InstanceName,
            instanceState: input.Instance.InstanceState,
            variables: input.Instance.Variables.map(function (variable: any) { return { name: variable.Name, variableType: variable.VariableType, value: variable.Value }}),
            inputEventHandlers: input.Instance.InputEventHandlers.map(function (ieh: any) { return { nameOfEvent: ieh.NameOfEvent, pythonCode: ieh.PythonCode }})
        };
        this.shoppingSession = {
            shoppingSessionId: input.ShoppingSession.ShoppingSessionId,
            instanceId: input.ShoppingSession.InstanceId,
            shopperName: input.ShoppingSession.ShopperName,
            variables: input.Instance.Variables.map(function (variable: any) { return { name: variable.Name, variableType: variable.VariableType, value: variable.Value }})
        };

        return this;
    }
}