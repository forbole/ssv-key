export interface Shares {
    validatorPrivateKey: any;
    validatorPublicKey: any;
    signatures: any[];
    ids: any[];
}
export declare const sharesSignatures: (privateKey: string, operators: number[], message: string, isThreshold: boolean) => Promise<Shares>;
