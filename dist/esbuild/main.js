(()=>{var H=Object.create;var T=Object.defineProperty;var M=Object.getOwnPropertyDescriptor;var V=Object.getOwnPropertyNames;var $=Object.getPrototypeOf,j=Object.prototype.hasOwnProperty;var h=(s=>typeof require!="undefined"?require:typeof Proxy!="undefined"?new Proxy(s,{get:(r,e)=>(typeof require!="undefined"?require:r)[e]}):s)(function(s){if(typeof require!="undefined")return require.apply(this,arguments);throw new Error('Dynamic require of "'+s+'" is not supported')});var q=(s,r,e,t)=>{if(r&&typeof r=="object"||typeof r=="function")for(let a of V(r))!j.call(s,a)&&a!==e&&T(s,a,{get:()=>r[a],enumerable:!(t=M(r,a))||t.enumerable});return s};var d=(s,r,e)=>(e=s!=null?H($(s)):{},q(r||!s||!s.__esModule?T(e,"default",{value:s,enumerable:!0}):e,s));var y=(s,r,e)=>new Promise((t,a)=>{var i=c=>{try{n(e.next(c))}catch(f){a(f)}},o=c=>{try{n(e.throw(c))}catch(f){a(f)}},n=c=>c.done?t(c.value):Promise.resolve(c.value).then(i,o);n((e=e.apply(s,r)).next())});var _=d(h("atob")),F=d(h("web3")),U=h("js-base64"),N=d(h("eth2-keystore-js"));var I;try{window.crypto,I=h("bls-eth-wasm/browser")}catch(s){I=h("bls-eth-wasm")}var u=I;var S=class{constructor(){this.validatorShares=[]}static get DEFAULT_SHARES_NUMBER(){return 4}static get DEFAULT_THRESHOLD_NUMBER(){return 3}create(a){return y(this,arguments,function*(r,e=S.DEFAULT_SHARES_NUMBER,t=S.DEFAULT_THRESHOLD_NUMBER){return new Promise((i,o)=>{try{u.init(u.BLS12_381).then(()=>{let n=[],c=[];this.validatorPrivateKey=u.deserializeHexStrToSecretKey(r),this.validatorPublicKey=this.validatorPrivateKey.getPublicKey(),n.push(this.validatorPrivateKey),c.push(this.validatorPublicKey);for(let l=1;l<t;l+=1){let p=new u.SecretKey;p.setByCSPRNG(),n.push(p);let m=p.getPublicKey();c.push(m)}for(let l=1;l<=e;l+=1){let p=new u.Id;p.setInt(l);let m=new u.SecretKey;m.share(n,p);let O=new u.PublicKey;O.share(c,p),this.validatorShares.push({privateKey:`0x${m.serializeToHexStr()}`,publicKey:`0x${O.serializeToHexStr()}`,id:p})}let f={validatorPrivateKey:`0x${this.validatorPrivateKey.serializeToHexStr()}`,validatorPublicKey:`0x${this.validatorPublicKey.serializeToHexStr()}`,shares:this.validatorShares};i(f)})}catch(n){o(n)}})})}},b=S;var v=h("js-base64");var A;try{window.crypto,A=h("jsencrypt").JSEncrypt}catch(s){A=h("node-jsencrypt")}var D=A;var K=class extends Error{constructor(e,t){super(t);this.operator=e}},g=class{constructor(r,e){this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE=RegExp(/------BEGIN RSA PUBLIC KEY-----/,"gmi");this.operators=r.map(t=>this.RAW_OPERATOR_PUBLIC_KEY_SIGNATURE.test(t)?t:(0,v.decode)(t)),this.shares=e}encrypt(){let r=[];return Object.keys(this.operators).forEach(e=>{let t=new D({});try{t.setPublicKey(this.operators[e])}catch(o){throw new K({rsa:this.operators[e],base64:(0,v.encode)(this.operators[e])},`Operator is not valid RSA Public Key: ${o}`)}let a=t.encrypt(this.shares[e].privateKey),i={operatorPublicKey:this.operators[e],privateKey:String(a),publicKey:this.shares[e].publicKey};return r.push(i),i}),r}};var E=class{constructor(){this.web3Instances={}}getWeb3(r=process.env.NODE_URL||""){return this.web3Instances[r]||(this.web3Instances[r]=new F.default(String(r||""))),this.web3Instances[r]}getPrivateKeyFromKeystoreData(r,e){return y(this,null,function*(){try{try{r=JSON.parse(r)}catch(a){}return yield new N.default(r).getPrivateKey(e).then(a=>a)}catch(t){return console.error(t),t}})}createThreshold(r){return y(this,null,function*(){try{return new b().create(r)}catch(e){return console.error(e),e}})}encryptShares(a,i){return y(this,arguments,function*(r,e,t=E.OPERATOR_FORMAT_BASE64){try{let o=r.map(n=>(n=(0,_.default)(n),t==E.OPERATOR_FORMAT_BASE64?String((0,U.encode)(n)):n));return new g(o,e).encrypt()}catch(o){return console.error(o),o}})}abiEncode(r,e){return r.map(t=>this.getWeb3().eth.abi.encodeParameter("string",Object(t)[e]))}buildPayload(r,e,t,a){return y(this,null,function*(){let i=yield this.createThreshold(r),o=t.map(c=>c.publicKey),n=this.abiEncode(t,"privateKey");return[i.validatorPublicKey,`[${e.join(",")}]`,o,n,a]})}},P=E;P.OPERATOR_FORMAT_BASE64="base64";var L=d(h("web3")),w=class{constructor(){this.contractAddress="";this.nodeUrl="";this.contracts={};this.web3Instances={}}getWeb3(r=process.env.NODE_URL||""){return this.web3Instances[r]||(this.web3Instances[r]=new L.default(String(r||""))),this.web3Instances[r]}getLiquidationCollateral(){return y(this,null,function*(){return this.getContract().methods.minimumBlocksBeforeLiquidation().call()})}getNetworkFee(){return y(this,null,function*(){return this.getContract().methods.networkFee().call()})}getContract(){return this.contracts[this.contractAddress]||(this.contracts[this.contractAddress]=this.getWeb3(this.nodeUrl)),this.contracts[this.contractAddress]}setContractAddress(r){this.contractAddress=r}setNodeUrl(r){this.nodeUrl=r}};w.BLOCKS_PER_YEAR=2398050;var R=d(h("crypto")),C=h("scrypt-js"),k=d(h("ethereumjs-wallet")),x=h("ethereumjs-util"),B=class{constructor(r){this.privateKey="";if(!r)throw new Error("Key store data should be JSON or string");if(this.keyStoreData=JSON.parse(String(r)),!this.keyStoreData.version)throw new Error("Invalid keystore file")}getPublicKey(){var r;if(this.keyStoreData)switch((r=this.keyStoreData.version)!=null?r:this.keyStoreData.Version){case 1:return this.keyStoreData.Address;case 3:return this.keyStoreData.id;case 4:return this.keyStoreData.pubkey}return""}getPrivateKey(r=""){return y(this,null,function*(){if(this.privateKey)return this.privateKey;switch(this.keyStoreData.version){case 1:this.wallet=yield k.default.fromV1(this.keyStoreData,r);break;case 3:this.wallet=yield k.default.fromV3(this.keyStoreData,r,!0);break;case 4:this.wallet=yield this.fromV4(this.keyStoreData,r);break}if(this.wallet&&(this.privateKey=this.wallet.getPrivateKey().toString("hex"),!this.privateKey))throw new Error("Invalid password");return this.privateKey})}fromV4(r,e){return y(this,null,function*(){let t=typeof r=="object"?r:JSON.parse(r);if(t.version!==4)throw new Error("Not a V4 wallet");let a,i;if(t.crypto.kdf.function==="scrypt")i=t.crypto.kdf.params,a=yield(0,C.scrypt)(Buffer.from(e),Buffer.from(i.salt,"hex"),i.n,i.r,i.p,i.dklen);else if(t.crypto.kdf.function==="pbkdf2"){if(i=t.crypto.kdf.params,i.prf!=="hmac-sha256")throw new Error("Unsupported parameters to PBKDF2");a=R.default.pbkdf2Sync(Buffer.from(e),Buffer.from(i.salt,"hex"),i.c,i.dklen,"sha256")}else throw new Error("Unsupported key derivation scheme");let o=Buffer.from(t.crypto.cipher.message,"hex"),n=Buffer.concat([Buffer.from(a.slice(16,32)),o]);if({keccak256:x.keccak256,sha256:x.sha256}[t.crypto.checksum.function](n).toString("hex")!==t.crypto.checksum.message)throw new Error("Invalid password");let p=R.default.createDecipheriv(t.crypto.cipher.function,a.slice(0,16),Buffer.from(t.crypto.cipher.params.iv,"hex")),m=this.runCipherBuffer(p,o);return new k.default(m)})}runCipherBuffer(r,e){return Buffer.concat([r.update(e),r.final()])}static toHexString(r){return Array.from(r,e=>`0${(e&255).toString(16)}`.slice(-2)).join("")}},W=B;})();
