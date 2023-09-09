import { Variable } from "./variable";

export interface ShoppingSession {
    shoppingSessionId: string;
    instanceId: string;
    shopperName: string;
    variables: Variable[];
}