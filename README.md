# What's it
Don't handling forms feels like a stone age to you?

This lib tries to give you a solid base for implementing your own form elements.

# installation
Include a `reformations-tag` dependency in package.json

# how it works
Say for example you have this objects to be collected from form under one user:
```typescript
//simplified
class ContactType {
    name: string | null = null
}
class Contact {
    phoneNumber: number | null = null
    contactType: ContactType | null = null
}
class Avatar {
    file: File | null = null
}
class Credential {
    email: string | null = null
    contacts: Array<Contact> = []
    addContact() {
        this.contacts.push(new Contact())
    }
    removeContact(contact: Contact){
        this.contacts = this.contacts.filter((it)=>{
            return it !== contact
        })
    }
}
class User {
    name: string | null = null
    credential = new Credential()
    avatar = new Avatar()
    isFunky: boolean = false
}
```
How it can be done:
```jsx harmony
//simplified
import {MixinFormableTrait} from 'reformations-tag'
class UserFormComponent extends MixinFormableTrait(Component) {
    
    state = {
        user: new User()
    }
    
    render(){
        let user = this.state.user
        return <div>
            <FileInput model={user.avatar} propertyName={"file"} parent={this}/>
            <PlainInputElement model={user} propertyName={"name"} parent={this}/>
            <InHouseRadioButton model={user} propertyName={"isFunky"}/>
            <PlainInputElement model={user.credential} propertyName={"email"} parent={this}/>
            user.credential.contacts.map((it)=>{
                <div>
                    <PlainInputElement model={it} propertyName={"phoneNumber"} parent={this}/>
                    <DropdownSelect model={it.contactType} propertyName={"name"} feed={["home", "mobile", "work"]} parent={this}/>
                    <button onClick={()=>{it.removeContact(it); this.setState({user})}}>remove contact</button>
                </div>
            }) 
            <button onClick={()=>{user.credential.addContact(); this.setState({user})}}>add contact</button>
            <button onClick={this.submit}>submit</button>
        </div>
    }
    
    submit = ()=>{
        this.collectInputs() //all your form elements assign the inputted values to the sorresponding models and their properties
        if (!UserValidator.isValid(this.state.user)) {
            this.setState({user: this.state.user}) //rerender so errors be showed in form elements
            return
        }
        let formData = ObjectToFormDataSerializer.serialize(this.state.user)
        SomeXhrService.makeSomeRequestSendingForm("/api/user", user).then((user)=>{             
            UserService.makeRedirectToWelcomePage()
        })
    }
}
```
# How this lib makes it?
Your component (that contains your form) should mixin a FormableTrait, via extending `MixinFormableTrait(React.Component)` (multiple mixins possible).
This trait gives you some methods required to handle the FormElements.
It has only one public method you should use - `collectInputs(namespace: string = "default")` which will collect all values
from your form elements.

You implement your FormElements that you need for your application self,  it's pretty easy.

Your form elements should mixin FormElementTrait via extending `MixinFormElementTrait(React.Component)` and props should be typed with `IFormElementProps` interface.
You should implement only two methods on it for it to work: `getValue()` that will provide a value from your element, and `clearValue()` that'd reset it.

And of course there you should implement the input elements itself. let's see for example a simple text input element.
```jsx harmony
import {MixinFormElementTrait, IFormElementProps} from 'reformations-tag'
class PlainInputElement extends MixinFormElementTrait(Component)<IFormElementProps> {

    state = {
        value: this.props.model[this.props.propertyName]
    }
    
    //here you should implement how the value itself wurde from form an element be plucked
    //then value from this will be basically assigned to props.model[props.propertyName] = this.getValue()
    //when collectInputs() will be called from you formable component
    getValue(): any { 
        return this.state.value
    }
    
    render(){
        return <div>
            //for example you can implement how the errors be rendered
            this.renderErrorsIfNecessary()
            <label htmlFor="label">{this.props.propertyName}</label>
            <input type="text" value={this.state.value} onChange={this.onChange}/>
        </div>
    }

    renderErrorsIfNecessary = ()=>{
        let errors: Array<String> = this.props.model["errors"] && this.props.model["errors"][this.props.propertyName]
        if (errors) {
            return <div className="MAKEITREDASHELL">
                {errors.map((errorMessage)=>{
                    <p>INVALID: ${errorMessage}</p>
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
```
One thing is that you don't need to use html form elements, you can basically implement anything you want. For example instead of radio button element,
you can implement something similar:
```jsx harmony
class UnusualRadioButton {
    state = {
        toggled: false
    }
    
    getValue() {
        return this.state.toggled
    }
    
    clearValue(){
        //leave unimplmented
    }
    
    render(){
        return <div>
            <button onClick={()=>{this.setState({toggled: !this.state.toggled})}}>{this.state.toggled ? "V" : "X"}</button>
        </div>
    }
}
```
That approach really unchains you and you can make some really crazy form components.
# namespacing
You can mark some form elements under specific namespace (all form elements are under "default" namespace if not provided), this will allow to collect from those namespaces only.
```jsx harmony
render(){
    return <div>
        <PLainInputElement parent={this} model={this.state.firstUser} propertyName={"name"} namespace={"user1"}/>
        <button>submit 1st user</button>
        <PlainInputElement parent={this} model={this.state.secondUser} propertyName={"name"} namespace={"user2"}/>
        <button>submit 2nd user</button>
    </div>
}

submitFirstUser(){
    this.collectInputs("user1")
    //do something with state.firstUser
}
submitSecondUser(){
    this.collectInputs("user2")
    //do something with state.secondUser
}
```
This is some trivial example, but it namespacing really helps with conditionals, or where you have really complex uis where
multiple models involved.
# Models
Best used with [front-model](https://github.com/WavyWalk/front-model). Eases error rendering etc:
example of login form:
```jsx harmony
export class New extends MixinFormableTrait(BaseReactComponent) {
    state = {
        user: new User({account: {}})
    }

    render(){
        return <div className="sessions-new">
            <PlainInputElement model={this.state.user} propertyName="name" parent={this} optional={{placeholder: "name"}}/>
            <PlainInputElement model={this.state.user.account} propertyName="password" parent={this} optional={{placeholder: "password", isPassword: true}}/>
            <button onClick={this.submit}>login</button>
        </div>
    }

    @autobind
    submit(){
        let user = this.state.user
        this.collectInputs()
        user.validate()
        if(user.isValid()) {
            user.login().then((returnedUser: User)=>{
                if (returnedUser.isValid()) {
                    CurrentUser.instance.logIn(returnedUser)
                    this.props.history.goBack()
                    return
                } 
                this.setState({user: returnedUser}) //render errors that server has invalidated
            })
        }  
        this.setState({user})//render errors if not invalid
    }
}
``` 
# Making url encoded forms
Lib uses plain objects or plain classes with form inputs. It is implied that you serialize them ti JSON yourself and send to server.
In case you need to send url encoded form (say you want to send file on one of the properties via xhr), in this case you can use
`ObjectToFormDataSerializer`.

example:
```jsx harmony
submit = ()=>{
    this.collectInputs()
    user = this.state.userAgent
    userFormData = ObjectToFormDataSerializer.serialize(user)
    //make an xhr request supplied with FormData, on server process the incoming encoded form.
}
```
# Licence
MIT
