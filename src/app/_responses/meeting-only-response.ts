import { Deserializable } from "../_helpers/deserializable";

export class MeetingOnlyResponse implements Deserializable<MeetingOnlyResponse> {
    meetingId: string;
    meetingName: string;

    deserialize(input: any) {
        this.meetingId = input.MeetingId;
        this.meetingName = input.MeetingName;
        return this;
    }
}