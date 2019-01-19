export class SharedStubs {

  static getTransferHttpService () {
    return jasmine.createSpyObj('TransferHttpService', ['get']);
  }

};
