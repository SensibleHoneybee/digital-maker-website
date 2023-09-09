import { Deserializable } from "../_helpers/deserializable";

export class ErrorResponse implements Deserializable<ErrorResponse> {
    message: string;

    deserialize(input: any) {
        this.message = input.Message;
        return this;
    }
}