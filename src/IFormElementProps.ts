import {IFormableTrait, MixinFormableTrait} from "./MixinFormableTrait";

export interface IFormElementProps {
    model: any
    propertyName: string
    parent: IFormableTrait
    namespace?: string
    ref?: (arg: any)=> void
    onChange?: ()=>any
    parseAsNumber?: boolean
    labelName?: string
    options?: {
        [id:string]:any
    }
}