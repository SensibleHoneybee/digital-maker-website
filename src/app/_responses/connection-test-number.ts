import { Deserializable } from "../_helpers/deserializable";

export class ConnectionTestNumberResponse implements Deserializable<ConnectionTestNumberResponse> {
    instanceId: string;
    connectionTestNumber: string;

    deserialize(input: any) {
        this.instanceId = input.InstanceId;
        this.connectionTestNumber = input.ConnectionTestNumber;
        return this;
    }
}