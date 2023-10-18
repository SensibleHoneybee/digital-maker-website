import { Deserializable } from '../_helpers/deserializable';

export class NoInputHandlerResponse implements Deserializable<NoInputHandlerResponse> {
    instanceId: string;
    inputName: string;

    deserialize(input: any) {
        this.instanceId = input.InstanceId;
        this.inputName = input.InputName;
        return this;
    }
}