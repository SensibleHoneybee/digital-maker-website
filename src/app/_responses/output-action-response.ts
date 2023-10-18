import { Deserializable } from '../_helpers/deserializable';

export class OutputActionResponse implements Deserializable<OutputActionResponse> {
    instanceId: string;
    outputName: string;
    data: string;

    deserialize(input: any) {
        this.instanceId = input.InstanceId;
        this.outputName = input.OutputName;
        this.data = input.Data;
        return this;
    }
}