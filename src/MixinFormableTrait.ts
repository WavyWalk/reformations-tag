import {AnyConstructor} from "./AnyConstructor";
import {IFormElementTrait} from "./MixinFormElementTrait";

export interface IFormableTrait {
    inputElementsId: number
    inputs: {[id:string]:{[id:number]: IFormElementTrait}}
    registerInput: (formElement: IFormElementTrait, namespace: string | undefined) => void
    removeFormElementFromRegisteredInputs: (id: number, namespace: string) => void
    collectInputs: (namespace: string) => void
}

export function MixinFormableTrait<TBase extends AnyConstructor>(Base: TBase) {

    abstract class FormableTrait extends Base {
        
        inputElementsId: number = -1

        inputs: {[id:string]:{[id:number]: IFormElementTrait}} = {
            default: Object.create(null)
        }

        registerInput(formElement: IFormElementTrait, namespace: string | undefined = "default") {
            if (formElement.id) {
              return
            }

            this.inputElementsId += 1
            formElement.id = this.inputElementsId
            if (!this.inputs[namespace]) {
                this.inputs[namespace] = Object.create(null)
            }
            this.inputs[namespace][formElement.id] = formElement
            formElement.cleanUpOnComponentWillUnmount = ()=>{this.removeFormElementFromRegisteredInputs(formElement.id as number, namespace as string)}
        }

        removeFormElementFromRegisteredInputs = (id: number, namespace: string) => {
          let inputs = this.inputs[namespace]
          if (inputs) {
              if (inputs[id]) {
                  delete inputs[id]
              }
          }
        }

        collectInputs(namespace: string = "default") {
            let keys = Object.keys(this.inputs[namespace])
            for (let key of keys) {
                let formElement = this.inputs[namespace][key as any]
                if (formElement) {
                    formElement.collect()
                }
            }
        }

    }

    return FormableTrait

}