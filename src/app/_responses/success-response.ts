import { Deserializable } from "../_helpers/deserializable";

export class SuccessResponse implements Deserializable<SuccessResponse> {
    message: string;

    deserialize(input: any) {
        this.message = input.Message;
        return this;
    }
}