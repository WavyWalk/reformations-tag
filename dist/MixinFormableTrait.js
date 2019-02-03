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
function MixinFormableTrait(Base) {
    var FormableTrait = /** @class */ (function (_super) {
        __extends(FormableTrait, _super);
        function FormableTrait() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.inputElementsId = -1;
            _this.inputs = {
                default: Object.create(null)
            };
            _this.removeFormElementFromRegisteredInputs = function (id, namespace) {
                var inputs = _this.inputs[namespace];
                if (inputs) {
                    if (inputs[id]) {
                        delete inputs[id];
                    }
                }
            };
            return _this;
        }
        FormableTrait.prototype.registerInput = function (formElement, namespace) {
            var _this = this;
            if (namespace === void 0) { namespace = "default"; }
            if (formElement.id) {
                return;
            }
            this.inputElementsId += 1;
            formElement.id = this.inputElementsId;
            if (!this.inputs[namespace]) {
                this.inputs[namespace] = Object.create(null);
            }
            this.inputs[namespace][formElement.id] = formElement;
            formElement.cleanUpOnComponentWillUnmount = function () { _this.removeFormElementFromRegisteredInputs(formElement.id, namespace); };
        };
        FormableTrait.prototype.collectInputs = function (namespace) {
            if (namespace === void 0) { namespace = "default"; }
            var keys = Object.keys(this.inputs[namespace]);
            for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
                var key = keys_1[_i];
                var formElement = this.inputs[namespace][key];
                if (formElement) {
                    formElement.collect();
                }
            }
        };
        return FormableTrait;
    }(Base));
    return FormableTrait;
}
exports.MixinFormableTrait = MixinFormableTrait;
