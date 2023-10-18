import { Deserializable } from "../_helpers/deserializable";

export class UserMessageResponse implements Deserializable<UserMessageResponse> {
    instanceId: string;
    message: string;

    deserialize(input: any) {
        this.instanceId = input.InstanceId;
        this.message = input.Message;
        return this;
    }
}