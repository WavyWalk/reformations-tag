import {AnyConstructor} from "./AnyConstructor";
import {IFormElementProps} from "./IFormElementProps";

export interface IFormElementTrait {
    id: number | null
    props: IFormElementProps
    registerOnParent: ()=>void
    collect: ()=>void
    getValue: ()=>any
    clearValue: ()=>any
    cleanUpOnComponentWillUnmount?: ()=>any
}

export function MixinFormElementTrait<TBASE extends AnyConstructor>(Base: TBASE) {

    abstract class FormElement extends Base implements IFormElementTrait {

        id: number | null = null

        props!: IFormElementProps

        componentWillMount() {
            this.props.parent.registerInput(this as any, this.props.namespace)
        }

        registerOnParent(){
            this.props.parent.registerInput(this as any, this.props.namespace)
        }

        collect(){
            this.props.model[this.props.propertyName] = this.getValue()
        }

        abstract getValue(): any

        abstract clearValue(): void

    }

    return FormElement
}