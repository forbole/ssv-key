import JSEncrypt from '../JSEncrypt';

import { IShares } from '../Threshold';

export class InvalidOperatorKeyException extends Error {
  public operator: any;

  constructor(operator: { rsa: string, base64: string }, message: string) {
    super(message);
    this.operator = operator;
  }
}

export interface EncryptShare {
    operatorPublicKey: string,
    privateKey: string,
    publicKey: string
}

export default class Encryption {
  private readonly operatorPublicKeys: string[];
  private readonly shares: IShares[];


  constructor(operatorPublicKeys: string[], shares: IShares[]) {
    this.operatorPublicKeys = [...operatorPublicKeys];
    this.shares = shares;
  }

  encrypt(): EncryptShare[] {
    const encryptedShares: EncryptShare[] = [];
    for (const [idx, operatorPublicKey] of this.operatorPublicKeys.entries()) {
      const jsEncrypt = new JSEncrypt({});
      jsEncrypt.setPublicKey(operatorPublicKey)
      const encryptedPrivateKey = jsEncrypt.encrypt(this.shares[idx].privateKey);
      const encryptedShare: EncryptShare = {
          operatorPublicKey,
          privateKey: encryptedPrivateKey,
          publicKey: this.shares[idx].publicKey,
      };
      encryptedShares.push(encryptedShare);
    }
    return encryptedShares;
  }
}
