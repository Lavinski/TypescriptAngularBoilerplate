export default class Sample implements ng.IDirective {
	//restrict = 'E';
	//require = 'ngModel';
	templateUrl = './components/sample/sample.html';
	replace = true;

	public static directiveName = 'sample';
	public static $inject = ['$http'];
	constructor($http: ng.IHttpService) {
	}
}