import { IFormableTrait } from "./MixinFormableTrait";
export interface IFormElementProps {
    model: any;
    propertyName: string;
    parent: IFormableTrait;
    namespace?: string;
    ref?: (arg: any) => void;
    onChange?: () => any;
    parseAsNumber?: boolean;
    labelName?: string;
    options?: {
        [id: string]: any;
    };
}
//# sourceMappingURL=IFormElementProps.d.ts.map