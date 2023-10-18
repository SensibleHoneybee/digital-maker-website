import { Deserializable } from '../_helpers/deserializable';

export class InstanceCreatedResponse implements Deserializable<InstanceCreatedResponse> {
    deserialize(input: any) {
        return this;
    }
}