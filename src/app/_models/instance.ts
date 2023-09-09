import { InputEventHandler } from "./input-event-handler";
import { Variable } from "./variable";

export interface Instance {
    instanceId: string;
    instanceName: string;
    instanceState: string;
    variables: Variable[];
    inputEventHandlers: InputEventHandler[];
}