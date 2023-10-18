import { Deserializable } from '../_helpers/deserializable';

export class InstanceDoesNotExistResponse implements Deserializable<InstanceDoesNotExistResponse> {
    deserialize(input: any) {
        return this;
    }
}