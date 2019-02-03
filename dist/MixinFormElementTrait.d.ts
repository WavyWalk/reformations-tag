import { AnyConstructor } from "./AnyConstructor";
import { IFormElementProps } from "./IFormElementProps";
export interface IFormElementTrait {
    id: number | null;
    props: IFormElementProps;
    registerOnParent: () => void;
    collect: () => void;
    getValue: () => any;
    clearValue: () => any;
    cleanUpOnComponentWillUnmount?: () => any;
}
export declare function MixinFormElementTrait<TBASE extends AnyConstructor>(Base: TBASE): {
    new (...args: any[]): {
        id: number | null;
        props: IFormElementProps;
        componentWillMount(): void;
        registerOnParent(): void;
        collect(): void;
        getValue(): any;
        clearValue(): void;
    };
} & TBASE;
//# sourceMappingURL=MixinFormElementTrait.d.ts.map