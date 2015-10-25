export default class Home implements ng.IDirective {
	//restrict = 'E';
	//require = 'ngModel';
	templateUrl = './components/home/home.html';
	replace = true;

	public static directiveName = 'home';
	public static $inject = ['$http'];
	constructor($http: ng.IHttpService) {
	}
}

//http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/
//http://stackoverflow.com/questions/26920055/define-angularjs-directive-using-typescript-and-inject-mechanism
//http://stackoverflow.com/questions/17944419/angularjs-typescript-directive
//http://stackoverflow.com/questions/23535994/implementing-angularjs-directives-as-classes-in-typescript