import { InputEventHandler } from "./input-event-handler";
import { OutputReceiver } from "./output-receiver";

export interface Instance {
    instanceId: string;
    participantNames: string;
    inputEventHandlers: InputEventHandler[];
    outputReceivers: OutputReceiver[];
    isRunning: boolean;
}