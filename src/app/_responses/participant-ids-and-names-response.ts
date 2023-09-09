import { Deserializable } from '../_helpers/deserializable';
import { ParticipantIdAndName } from '../_models/participant';

export class ParticipantIdsAndNamesResponse implements Deserializable<ParticipantIdsAndNamesResponse> {
    participantIdsAndNames: ParticipantIdAndName[];

    deserialize(input: any) {
        this.participantIdsAndNames = input.ParticipantIdsAndNames.map(function (p: any) { return { participantId: p.ParticipantName, participantIdd: p.ParticipantId }});
        return this;
    }
}