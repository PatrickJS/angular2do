import {assert} from "rtts_assert/rtts_assert";
import {XHR} from 'angular2/src/core/compiler/xhr/xhr';
import {List,
  ListWrapper,
  Map,
  MapWrapper} from 'angular2/src/facade/collection';
import {isBlank,
  isPresent,
  normalizeBlank,
  BaseException} from 'angular2/src/facade/lang';
import {PromiseWrapper,
  Promise} from 'angular2/src/facade/async';
export class XHRMock extends XHR {
  constructor() {
    super();
    this._expectations = [];
    this._definitions = MapWrapper.create();
    this._requests = [];
  }
  get(url) {
    assert.argumentTypes(url, assert.type.string);
    var request = new _PendingRequest(url);
    ListWrapper.push(this._requests, request);
    return assert.returnType((request.getPromise()), assert.genericType(Promise, assert.type.string));
  }
  expect(url, response) {
    assert.argumentTypes(url, assert.type.string, response, assert.type.string);
    var expectation = new _Expectation(url, response);
    ListWrapper.push(this._expectations, expectation);
  }
  when(url, response) {
    assert.argumentTypes(url, assert.type.string, response, assert.type.string);
    MapWrapper.set(this._definitions, url, response);
  }
  flush() {
    if (this._requests.length === 0) {
      throw new BaseException('No pending requests to flush');
    }
    do {
      var request = ListWrapper.removeAt(this._requests, 0);
      this._processRequest(request);
    } while (this._requests.length > 0);
    this.verifyNoOustandingExpectations();
  }
  verifyNoOustandingExpectations() {
    if (this._expectations.length === 0)
      return ;
    var urls = [];
    for (var i = 0; i < this._expectations.length; i++) {
      var expectation = this._expectations[i];
      ListWrapper.push(urls, expectation.url);
    }
    throw new BaseException(`Unsatisfied requests: ${ListWrapper.join(urls, ', ')}`);
  }
  _processRequest(request) {
    assert.argumentTypes(request, _PendingRequest);
    var url = request.url;
    if (this._expectations.length > 0) {
      var expectation = this._expectations[0];
      if (expectation.url === url) {
        ListWrapper.remove(this._expectations, expectation);
        request.complete(expectation.response);
        return ;
      }
    }
    if (MapWrapper.contains(this._definitions, url)) {
      var response = MapWrapper.get(this._definitions, url);
      request.complete(normalizeBlank(response));
      return ;
    }
    throw new BaseException(`Unexpected request ${url}`);
  }
}
Object.defineProperty(XHRMock.prototype.get, "parameters", {get: function() {
    return [[assert.type.string]];
  }});
Object.defineProperty(XHRMock.prototype.expect, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
Object.defineProperty(XHRMock.prototype.when, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});
Object.defineProperty(XHRMock.prototype._processRequest, "parameters", {get: function() {
    return [[_PendingRequest]];
  }});
class _PendingRequest {
  constructor(url) {
    this.url = url;
    this.completer = PromiseWrapper.completer();
  }
  complete(response) {
    assert.argumentTypes(response, assert.type.string);
    if (isBlank(response)) {
      this.completer.reject(`Failed to load ${this.url}`);
    } else {
      this.completer.complete(response);
    }
  }
  getPromise() {
    return assert.returnType((this.completer.promise), assert.genericType(Promise, assert.type.string));
  }
}
Object.defineProperty(_PendingRequest.prototype.complete, "parameters", {get: function() {
    return [[assert.type.string]];
  }});
class _Expectation {
  constructor(url, response) {
    assert.argumentTypes(url, assert.type.string, response, assert.type.string);
    this.url = url;
    this.response = response;
  }
}
Object.defineProperty(_Expectation, "parameters", {get: function() {
    return [[assert.type.string], [assert.type.string]];
  }});

//# sourceMappingURL=/Users/patrick/Documents/open source/angular/modules/angular2/src/mock/xhr_mock.map

//# sourceMappingURL=./xhr_mock.map