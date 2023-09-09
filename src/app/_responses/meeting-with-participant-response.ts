import { Deserializable } from "../_helpers/deserializable";

export class MeetingWithParticipantResponse implements Deserializable<MeetingWithParticipantResponse> {
    meetingId: string;
    meetingName: string;
    participantId: string;
    participantNames: string;
    loginCipher: string;
    defaultInstanceId: string;

    deserialize(input: any) {
        this.meetingId = input.MeetingId;
        this.meetingName = input.MeetingName;
        this.participantId = input.ParticipantId;
        this.participantNames = input.ParticipantNames;
        this.loginCipher = input.LoginCipher;
        this.defaultInstanceId = input.DefaultInstanceId;
        return this;
    }
}