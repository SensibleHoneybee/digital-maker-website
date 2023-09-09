export class RejoinParticipantWithPasswordRequest {
    meetingId: string;
    meetingPassword: string;
    participantId: string;
    participantPassword: string;
    newLoginCipher: string;
}