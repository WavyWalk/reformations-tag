import { AnyConstructor } from "./AnyConstructor";
import { IFormElementTrait } from "./MixinFormElementTrait";
export interface IFormableTrait {
    inputElementsId: number;
    inputs: {
        [id: string]: {
            [id: number]: IFormElementTrait;
        };
    };
    registerInput: (formElement: IFormElementTrait, namespace: string | undefined) => void;
    removeFormElementFromRegisteredInputs: (id: number, namespace: string) => void;
    collectInputs: (namespace: string) => void;
}
export declare function MixinFormableTrait<TBase extends AnyConstructor>(Base: TBase): {
    new (...args: any[]): {
        inputElementsId: number;
        inputs: {
            [id: string]: {
                [id: number]: IFormElementTrait;
            };
        };
        registerInput(formElement: IFormElementTrait, namespace?: string | undefined): void;
        removeFormElementFromRegisteredInputs: (id: number, namespace: string) => void;
        collectInputs(namespace?: string): void;
    };
} & TBase;
//# sourceMappingURL=MixinFormableTrait.d.ts.map