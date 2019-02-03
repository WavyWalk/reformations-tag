"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
function MixinFormElementTrait(Base) {
    var FormElement = /** @class */ (function (_super) {
        __extends(FormElement, _super);
        function FormElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.id = null;
            return _this;
        }
        FormElement.prototype.componentWillMount = function () {
            this.props.parent.registerInput(this, this.props.namespace);
        };
        FormElement.prototype.registerOnParent = function () {
            this.props.parent.registerInput(this, this.props.namespace);
        };
        FormElement.prototype.collect = function () {
            this.props.model[this.props.propertyName] = this.getValue();
        };
        return FormElement;
    }(Base));
    return FormElement;
}
exports.MixinFormElementTrait = MixinFormElementTrait;
