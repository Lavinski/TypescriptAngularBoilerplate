"use strict";

export default class DirectiveFactory {
	static GetFactoryFor<T extends ng.IDirective>(classType: Function): ng.IDirectiveFactory {
		var factory = (...args): T => {
			var directive = <any> classType;
			//return new directive(...args); //Typescript 1.6
			return new (directive.bind(directive, ...args));
		}
		factory.$inject = classType.$inject;
		return factory;
	}
}