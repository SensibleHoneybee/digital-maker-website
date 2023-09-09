import { Deserializable } from "./_helpers/deserializable";

export class ResponseWrapper implements Deserializable<ResponseWrapper> {
    responseType: string;
    content: string;

    deserialize(input: any) {
        this.responseType = input.ResponseType;
        this.content = input.Content;
        return this;
    }
}