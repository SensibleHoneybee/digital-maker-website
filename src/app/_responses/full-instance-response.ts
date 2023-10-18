import { Deserializable } from '../_helpers/deserializable';
import { Instance } from '../_models/instance';

export class FullInstanceResponse implements Deserializable<FullInstanceResponse> {
    instance: Instance;

    deserialize(input: any) {
        this.instance = {
            instanceId: input.Instance.InstanceId,
            participantNames: input.Instance.ParticipantNames,
            inputEventHandlers: input.Instance.InputEventHandlers.map(function (ieh: any) { return { nameOfEvent: ieh.NameOfEvent, pythonCode: ieh.PythonCode }}),
            outputReceivers: input.Instance.OutputReceivers.map(function (x: any) { return { outputReceiverName: x.OutputReceiverName, connectionId: x.ConnectionId }}),
            isRunning: input.Instance.IsRunning
        };
        return this;
    }
}