import {MixinFormableTrait} from "./MixinFormableTrait";
import {Component, SyntheticEvent} from "react";
import * as React from "react";
import {IFormElementProps} from "./IFormElementProps";
import {MixinFormElementTrait} from "./MixinFormElementTrait";

class PlainInputElement extends MixinFormElementTrait(Component)<IFormElementProps> {

    state = {
        value: this.props.model[this.props.propertyName]
    }

    getValue(): any {
        return this.state.value
    }

    render(){
        return <div>
            this.renderErrorsIfNecessary()
            <label htmlFor="label">{this.props.propertyName}</label>
            <input type="text" value={this.state.value} onChange={this.onChange}/>
        </div>
    }

    renderErrorsIfNecessary = ()=>{
        let errors: Array<String> = this.props.model["errors"] && this.props.model[""][this.props.propertyName]
        if (errors) {
            return <div className="MAKEITREDASHELL">
                {errors.map((it)=>{
                    <p>INVALID: ${it}</p>
                })}
            </div>
        }
        return null
    }

    onChange = (e: any)=>{
        e.preventDefault()
        this.setState({value: e.target.value})
    }

    clearValue(){
        this.setState({value: undefined})
    }
}
