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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var React = __importStar(require("react"));
var MixinFormElementTrait_1 = require("./MixinFormElementTrait");
var PlainInputElement = /** @class */ (function (_super) {
    __extends(PlainInputElement, _super);
    function PlainInputElement() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            value: _this.props.model[_this.props.propertyName]
        };
        _this.renderErrorsIfNecessary = function () {
            var errors = _this.props.model["errors"] && _this.props.model[""][_this.props.propertyName];
            if (errors) {
                return <div className="MAKEITREDASHELL">
                {errors.map(function (it) {
                    <p>INVALID: ${it}</p>;
                })}
            </div>;
            }
            return null;
        };
        _this.onChange = function (e) {
            e.preventDefault();
            _this.setState({ value: e.target.value });
        };
        return _this;
    }
    PlainInputElement.prototype.getValue = function () {
        return this.state.value;
    };
    PlainInputElement.prototype.render = function () {
        return <div>
            this.renderErrorsIfNecessary()
            <label htmlFor="label">{this.props.propertyName}</label>
            <input type="text" value={this.state.value} onChange={this.onChange}/>
        </div>;
    };
    PlainInputElement.prototype.clearValue = function () {
        this.setState({ value: undefined });
    };
    return PlainInputElement;
}(MixinFormElementTrait_1.MixinFormElementTrait(react_1.Component)));
