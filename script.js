var algodClient;
const enc = new TextEncoder();
let deployParams = {
  amount:10000,
  appIndex:101385905,
  approvalProgram: new Uint8Array([4,129,1]),
  assetIndex: 101385905,
  clearProgram: new Uint8Array([4,129,1]),
  decimals: 18,
  defaultFrozen: true,
  freeze: 'BHAUDYCEBOPDSA4LU3ZLY4W55HDIPUJMLN54RDMH3NKXRA6JKJSCHF2VRQ',
  freezeTarget: 'BHAUDYCEBOPDSA4LU3ZLY4W55HDIPUJMLN54RDMH3NKXRA6JKJSCHF2VRQ',
  from: 'BHAUDYCEBOPDSA4LU3ZLY4W55HDIPUJMLN54RDMH3NKXRA6JKJSCHF2VRQ',
  manager: 'BHAUDYCEBOPDSA4LU3ZLY4W55HDIPUJMLN54RDMH3NKXRA6JKJSCHF2VRQ',
  numGlobalInts: 5,
  numGlobalByteSlices: 5,
  numLocalInts: 5,
  numLocalByteSlices: 5,
  onComplete: 0,
  strictEmptyAddressChecking: false,
  to: '3SEDSWOE5TFHTNOGRYQKBJFCPMOHGLXOZSPHCYKZMEXRCNRZOQUFBORM4A',
  total: 10000
}

async function connect(){
  try{
    window.snapalgo = new SnapAlgo.Wallet();
    await window.algorand.enable();
    let algodClientParams = await window.algorand.getAlgodv2Client();
    algodClient = new algosdk.Algodv2(algodClientParams);
    document.getElementById('connectButton').style.display = 'none';
    document.getElementById('testScreen').style.display = 'block';
    updateAddress();
  } catch (err){
    alert(err.message);
  }
}

async function updateAddress(){
  deployParams.from = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: ["npm:algorand",{
          method: 'getAddress'
      }]
  });
  deployParams.freeze = deployParams.from;
  deployParams.freezeTarget = deployParams.from;
  deployParams.manager = deployParams.from;
  document.getElementById('fromAddress').innerHTML = 'sender: ' + deployParams.from;
  document.getElementById('toAddress').innerHTML = 'receiver: ' + deployParams.to;
}

async function signAndPost(txn){
  try{
    console.log(txn);
    const response = await window.algorand.EZsignAndPost(txn);
    if (typeof response === 'string' && response.length === 52){
      alert('Signed successful\ntxId: '+response);
    }
  } catch (err) {
    alert(err.message);
  }
}

async function applCall(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    onComplete:deployParams.onComplete,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationCallTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applCallFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    onComplete:deployParams.onComplete,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationCallTxnFromObject(tempParams);
  txn.appIndex=-5;
  signAndPost(txn);
}

async function applClearState(){
  let params =  await algodClient.getTransactionParams().do();
  console.log(params);
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationClearStateTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applClearStateFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationClearStateTxnFromObject(tempParams);
  txn.from=-5;
  signAndPost(txn);
}

async function applCloseOut(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationCloseOutTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applCloseOutFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationCloseOutTxnFromObject(tempParams);
  txn.from=-5;
  signAndPost(txn);
}

async function applCreate(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    approvalProgram:deployParams.approvalProgram,
    clearProgram:deployParams.clearProgram,
    from:deployParams.from,
    numGlobalByteSlices:deployParams.numGlobalByteSlices,
    numGlobalInts:deployParams.numGlobalInts,
    numLocalByteSlices:deployParams.numLocalByteSlices,
    numLocalInts:deployParams.numLocalInts,
    onComplete:deployParams.onComplete,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationCreateTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applCreateFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    approvalProgram:deployParams.approvalProgram,
    clearProgram:deployParams.clearProgram,
    from:deployParams.from,
    numGlobalByteSlices:deployParams.numGlobalByteSlices,
    numGlobalInts:deployParams.numGlobalInts,
    numLocalByteSlices:deployParams.numLocalByteSlices,
    numLocalInts:deployParams.numLocalInts,
    onComplete:deployParams.onComplete,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationCreateTxnFromObject(tempParams);
  txn.from=0;
  signAndPost(txn);
}

async function applDelete(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationDeleteTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applDeleteFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationDeleteTxnFromObject(tempParams);
  txn.appIndex=-5;
  signAndPost(txn);
}

async function applNoOp(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationNoOpTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applNoOpFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationNoOpTxnFromObject(tempParams);
  txn.appIndex=-5;
  signAndPost(txn);
}

async function applOptIn(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationOptInTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applOptInFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationOptInTxnFromObject(tempParams);
  txn.from=-5;
  signAndPost(txn);
}

async function applUpdate(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    approvalProgram:deployParams.approvalProgram,
    clearProgram:deployParams.clearProgram,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationUpdateTxnFromObject(tempParams);
  signAndPost(txn);
}

async function applUpdateFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    appIndex:deployParams.appIndex,
    approvalProgram:deployParams.approvalProgram,
    clearProgram:deployParams.clearProgram,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeApplicationUpdateTxnFromObject(tempParams);
  txn.appIndex=-5;
  signAndPost(txn);
}

async function assetConfig(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    assetIndex:deployParams.assetIndex,
    from:deployParams.from,
    strictEmptyAddressChecking:deployParams.strictEmptyAddressChecking,
    suggestedParams:params
  }
  let txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject(tempParams);
  signAndPost(txn);
}

async function assetConfigFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    assetIndex:deployParams.assetIndex,
    from:deployParams.from,
    strictEmptyAddressChecking:deployParams.strictEmptyAddressChecking,
    suggestedParams:params
  }
  let txn = algosdk.makeAssetConfigTxnWithSuggestedParamsFromObject(tempParams);
  txn.from=-5;
  signAndPost(txn);
}

async function assetCreate(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    decimals:deployParams.decimals,
    defaultFrozen:deployParams.defaultFrozen,
    freeze:deployParams.freeze,
    from:deployParams.from,
    manager:deployParams.manager,
    suggestedParams:params,
    total:deployParams.total
  }
  let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(tempParams);
  signAndPost(txn);
}

async function assetCreateFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    decimals:deployParams.decimals,
    defaultFrozen:deployParams.defaultFrozen,
    freeze:deployParams.freeze,
    from:deployParams.from,
    manager:deployParams.manager,
    suggestedParams:params,
    total:deployParams.total
  }
  let txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject(tempParams);
  txn.assetDecimals=-5;
  signAndPost(txn);
}

async function assetDestroy(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    assetIndex:deployParams.assetIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject(tempParams);
  signAndPost(txn);
}

async function assetDestroyFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    assetIndex:deployParams.assetIndex,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeAssetDestroyTxnWithSuggestedParamsFromObject(tempParams);
  txn.from=-5;
  signAndPost(txn);
}

async function assetFreeze(){
  let freezeState = !document.getElementById('freezeToggle').checked;
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    assetIndex:deployParams.assetIndex,
    freezeState:freezeState,
    freezeTarget:deployParams.freezeTarget,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject(tempParams);
  signAndPost(txn);
}

async function assetFreezeFail(){
  let freezeState = !document.getElementById('freezeToggle').checked;
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    assetIndex:deployParams.assetIndex,
    freezeState:freezeState,
    freezeTarget:deployParams.freezeTarget,
    from:deployParams.from,
    suggestedParams:params
  }
  let txn = algosdk.makeAssetFreezeTxnWithSuggestedParamsFromObject(tempParams);
  txn.appFreezeState=-5;
  signAndPost(txn);
}

async function assetTransfer(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    amount:deployParams.amount,
    assetIndex:deployParams.assetIndex,
    from:deployParams.from,
    suggestedParams:params,
    to:deployParams.to
  }
  let txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(tempParams);
  signAndPost(txn);
}

async function assetTransferFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    amount:deployParams.amount,
    assetIndex:deployParams.assetIndex,
    from:deployParams.from,
    suggestedParams:params,
    to:deployParams.to
  }
  let txn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject(tempParams);
  txn.amount=-5;
  signAndPost(txn);
}

async function pay(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    amount:deployParams.amount,
    from:deployParams.from,
    suggestedParams:params,
    to:deployParams.to
  }
  let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject(tempParams);
  signAndPost(txn);
}

async function payFail(){
  let params =  await algodClient.getTransactionParams().do();
  let tempParams = {
    amount:deployParams.amount,
    from:deployParams.from,
    suggestedParams:params,
    to:deployParams.to
  }
  let txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject(tempParams);
  txn.to=0;
  signAndPost(txn);
}

function setAppIndex(){
  try{
  let appIndex = parseInt(document.getElementById('appIndexBox').value);
  document.getElementById('appIndex').innerHTML = 'appIndex: ' + appIndex;
  deployParams.appIndex = appIndex;
  } catch (err) {
    alert(err);
  }
}

function setAssetIndex(){
  try{
  let assetIndex = parseInt(document.getElementById('assetIndexBox').value);
  document.getElementById('assetIndex').innerHTML = 'assetIndex: ' + assetIndex;
  deployParams.assetIndex = assetIndex;
  } catch (err) {
    alert(err);
  }
}

document.getElementById("connectButton").addEventListener("click", connect);
document.getElementById("appIndexButton").addEventListener("click", setAppIndex);
document.getElementById("assetIndexButton").addEventListener("click", setAssetIndex);

document.getElementById("applCall").addEventListener("click", applCall);
document.getElementById("applCallFail").addEventListener("click", applCallFail);
document.getElementById("applClearState").addEventListener("click", applClearState);
document.getElementById("applClearStateFail").addEventListener("click", applClearStateFail);
document.getElementById("applCloseOut").addEventListener("click", applCloseOut);
document.getElementById("applCloseOutFail").addEventListener("click", applCloseOutFail);
document.getElementById("applCreate").addEventListener("click", applCreate);
document.getElementById("applCreateFail").addEventListener("click", applCreateFail);
document.getElementById("applDelete").addEventListener("click", applDelete);
document.getElementById("applDeleteFail").addEventListener("click", applDeleteFail);
document.getElementById("applNoOp").addEventListener("click", applNoOp);
document.getElementById("applNoOpFail").addEventListener("click", applNoOpFail);
document.getElementById("applOptIn").addEventListener("click", applOptIn);
document.getElementById("applOptInFail").addEventListener("click", applOptInFail);
document.getElementById("applUpdate").addEventListener("click", applUpdate);
document.getElementById("applUpdateFail").addEventListener("click", applUpdateFail);
document.getElementById("assetConfig").addEventListener("click", assetConfig);
document.getElementById("assetConfigFail").addEventListener("click", assetConfigFail);
document.getElementById("assetCreate").addEventListener("click", assetCreate);
document.getElementById("assetCreateFail").addEventListener("click", assetCreateFail);
document.getElementById("assetDestroy").addEventListener("click", assetDestroy);
document.getElementById("assetDestroyFail").addEventListener("click", assetDestroyFail);
document.getElementById("assetFreeze").addEventListener("click", assetFreeze);
document.getElementById("assetFreezeFail").addEventListener("click", assetFreezeFail);
document.getElementById("assetTransfer").addEventListener("click", assetTransfer);
document.getElementById("assetTransferFail").addEventListener("click", assetTransferFail);
document.getElementById("pay").addEventListener("click", pay);
document.getElementById("payFail").addEventListener("click", payFail);