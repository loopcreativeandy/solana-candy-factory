"use strict";
exports.id = 495;
exports.ids = [495];
exports.modules = {

/***/ 495:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vg": () => (/* binding */ awaitTransactionSignatureConfirmation),
/* harmony export */   "Qk": () => (/* binding */ getCandyMachineState),
/* harmony export */   "zU": () => (/* binding */ getNftsForOwner),
/* harmony export */   "CI": () => (/* binding */ mintOneToken),
/* harmony export */   "Xn": () => (/* binding */ shortenAddress),
/* harmony export */   "SZ": () => (/* binding */ mintMultipleToken)
/* harmony export */ });
/* unused harmony export CANDY_MACHINE_PROGRAM */
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6391);
/* harmony import */ var _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4541);
/* harmony import */ var _solana_spl_token__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _metaplex_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2342);
/* harmony import */ var _metaplex_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_metaplex_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2376);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2299);
/* harmony import */ var _hooks_use_hash_table__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7890);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







const CANDY_MACHINE_PROGRAM = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey("cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ");
const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey("ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL");
const TOKEN_METADATA_PROGRAM_ID = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const awaitTransactionSignatureConfirmation = async (txid, timeout, connection, commitment = "recent", queryStatus = false) => {
  let done = false;
  let status = {
    slot: 0,
    confirmations: 0,
    err: null
  };
  let subId = 0;
  status = await new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (done) {
        return;
      }

      done = true;
      console.log("Rejecting for timeout...");
      reject({
        timeout: true
      });
    }, timeout);

    try {
      subId = connection.onSignature(txid, (result, context) => {
        done = true;
        status = {
          err: result.err,
          slot: context.slot,
          confirmations: 0
        };

        if (result.err) {
          console.log("Rejected via websocket", result.err);
          reject(status);
        } else {
          console.log("Resolved via websocket", result);
          resolve(status);
        }
      }, commitment);
    } catch (e) {
      done = true;
      console.error("WS error in setup", txid, e);
    }

    while (!done && queryStatus) {
      // eslint-disable-next-line no-loop-func
      (async () => {
        try {
          const signatureStatuses = await connection.getSignatureStatuses([txid]);
          status = signatureStatuses && signatureStatuses.value[0];

          if (!done) {
            if (!status) {
              console.log("REST null result for", txid, status);
            } else if (status.err) {
              console.log("REST error for", txid, status);
              done = true;
              reject(status.err);
            } else if (!status.confirmations) {
              console.log("REST no confirmations for", txid, status);
            } else {
              console.log("REST confirmation for", txid, status);
              done = true;
              resolve(status);
            }
          }
        } catch (e) {
          if (!done) {
            console.log("REST connection error: txid", txid, e);
          }
        }
      })();

      await sleep(2000);
    }
  }); //@ts-ignore

  if (connection._signatureSubscriptions[subId]) {
    connection.removeSignatureListener(subId);
  }

  done = true;
  console.log("Returning status ", status);
  return status;
};

const createAssociatedTokenAccountInstruction = (associatedTokenAddress, payer, walletAddress, splTokenMintAddress) => {
  const keys = [{
    pubkey: payer,
    isSigner: true,
    isWritable: true
  }, {
    pubkey: associatedTokenAddress,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: walletAddress,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: splTokenMintAddress,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SystemProgram.programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SYSVAR_RENT_PUBKEY,
    isSigner: false,
    isWritable: false
  }];
  return new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.TransactionInstruction({
    keys,
    programId: SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID,
    data: Buffer.from([])
  });
};

const getCandyMachineState = async (anchorWallet, candyMachineId, connection) => {
  const provider = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.Provider(connection, anchorWallet, {
    preflightCommitment: "recent"
  });
  const idl = await _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.Program.fetchIdl(CANDY_MACHINE_PROGRAM, provider);
  const program = new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.Program(idl, CANDY_MACHINE_PROGRAM, provider);
  const candyMachine = {
    id: candyMachineId,
    connection,
    program
  };
  const state = await program.account.candyMachine.fetch(candyMachineId);
  const itemsAvailable = state.data.itemsAvailable.toNumber();
  const itemsRedeemed = state.itemsRedeemed.toNumber();
  const itemsRemaining = itemsAvailable - itemsRedeemed;
  let goLiveDate = state.data.goLiveDate.toNumber();
  goLiveDate = new Date(goLiveDate * 1000);
  return {
    candyMachine,
    itemsAvailable,
    itemsRedeemed,
    itemsRemaining,
    goLiveDate
  };
};

const getMasterEdition = async mint => {
  return (await _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey.findProgramAddress([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer(), Buffer.from("edition")], TOKEN_METADATA_PROGRAM_ID))[0];
};

const getMetadata = async mint => {
  return (await _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey.findProgramAddress([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()], TOKEN_METADATA_PROGRAM_ID))[0];
};

const getTokenWallet = async (wallet, mint) => {
  return (await _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey.findProgramAddress([wallet.toBuffer(), _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID))[0];
};

async function getNftsForOwner(connection, ownerAddress) {
  const allMintsCandyMachine = await (0,_hooks_use_hash_table__WEBPACK_IMPORTED_MODULE_5__/* .fetchHashTable */ .T$)("BjdvWas2hrf8BsruLtsbvEbLDb9t6FNbMW3PZBL4bRM4");
  const allTokens = [];
  const tokenAccounts = await connection.getParsedTokenAccountsByOwner(ownerAddress, {
    programId: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID
  });

  for (let index = 0; index < tokenAccounts.value.length; index++) {
    const tokenAccount = tokenAccounts.value[index];
    const tokenAmount = tokenAccount.account.data.parsed.info.tokenAmount;

    if (tokenAmount.amount == "1" && tokenAmount.decimals == "0" && allMintsCandyMachine.includes(tokenAccount.account.data.parsed.info.mint)) {
      let [pda] = await _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey.findProgramAddress([Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), new _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.PublicKey(tokenAccount.account.data.parsed.info.mint).toBuffer()], TOKEN_METADATA_PROGRAM_ID);
      const accountInfo = await connection.getParsedAccountInfo(pda);
      const metadata = new _metaplex_js__WEBPACK_IMPORTED_MODULE_2__.Metadata(ownerAddress.toString(), accountInfo.value);
      const {
        data
      } = await axios__WEBPACK_IMPORTED_MODULE_3___default().get(metadata.data.data.uri);
      console.log(data);

      const entireData = _objectSpread(_objectSpread({}, data), {}, {
        id: Number(data.name.replace(/^\D+/g, '').split(' - ')[0])
      });

      allTokens.push(_objectSpread({}, entireData));
    }

    allTokens.sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });
  }

  return allTokens;
}
const mintOneToken = async (candyMachine, config, payer, treasury) => {
  const mint = _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.Keypair.generate();
  const token = await getTokenWallet(payer, mint.publicKey);
  const {
    connection,
    program
  } = candyMachine;
  const metadata = await getMetadata(mint.publicKey);
  const masterEdition = await getMasterEdition(mint.publicKey);
  const rent = await connection.getMinimumBalanceForRentExemption(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.MintLayout.span);
  return await program.rpc.mintNft({
    accounts: {
      config,
      candyMachine: candyMachine.id,
      payer: payer,
      wallet: treasury,
      mint: mint.publicKey,
      metadata,
      masterEdition,
      mintAuthority: payer,
      updateAuthority: payer,
      tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
      tokenProgram: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID,
      systemProgram: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SystemProgram.programId,
      rent: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SYSVAR_RENT_PUBKEY,
      clock: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SYSVAR_CLOCK_PUBKEY
    },
    signers: [mint],
    instructions: [_project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint.publicKey,
      space: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.MintLayout.span,
      lamports: rent,
      programId: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID
    }), _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.Token.createInitMintInstruction(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID, mint.publicKey, 0, payer, payer), createAssociatedTokenAccountInstruction(token, payer, payer, mint.publicKey), _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.Token.createMintToInstruction(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID, mint.publicKey, token, payer, [], 1)]
  });
};
const shortenAddress = (address, chars = 4) => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const mintMultipleToken = async (candyMachine, config, payer, treasury, quantity = 2) => {
  const signersMatrix = [];
  const instructionsMatrix = [];

  for (let index = 0; index < quantity; index++) {
    const mint = _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.Keypair.generate();
    const token = await getTokenWallet(payer, mint.publicKey);
    const {
      connection
    } = candyMachine;
    const rent = await connection.getMinimumBalanceForRentExemption(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.MintLayout.span);
    const instructions = [_project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SystemProgram.createAccount({
      fromPubkey: payer,
      newAccountPubkey: mint.publicKey,
      space: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.MintLayout.span,
      lamports: rent,
      programId: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID
    }), _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.Token.createInitMintInstruction(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID, mint.publicKey, 0, payer, payer), createAssociatedTokenAccountInstruction(token, payer, payer, mint.publicKey), _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.Token.createMintToInstruction(_solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID, mint.publicKey, token, payer, [], 1)];
    const masterEdition = await getMasterEdition(mint.publicKey);
    const metadata = await getMetadata(mint.publicKey);
    instructions.push(await candyMachine.program.instruction.mintNft({
      accounts: {
        config,
        candyMachine: candyMachine.id,
        payer: payer,
        wallet: treasury,
        mint: mint.publicKey,
        metadata,
        masterEdition,
        mintAuthority: payer,
        updateAuthority: payer,
        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
        tokenProgram: _solana_spl_token__WEBPACK_IMPORTED_MODULE_1__.TOKEN_PROGRAM_ID,
        systemProgram: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SystemProgram.programId,
        rent: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SYSVAR_RENT_PUBKEY,
        clock: _project_serum_anchor__WEBPACK_IMPORTED_MODULE_0__.web3.SYSVAR_CLOCK_PUBKEY
      }
    }));
    const signers = [mint];
    signersMatrix.push(signers);
    instructionsMatrix.push(instructions);
  }

  return await (0,_utility__WEBPACK_IMPORTED_MODULE_4__/* .sendTransactions */ .zt)(candyMachine.program.provider.connection, candyMachine.program.provider.wallet, instructionsMatrix, signersMatrix);
};

/***/ }),

/***/ 2299:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zt": () => (/* binding */ sendTransactions),
/* harmony export */   "_v": () => (/* binding */ sleep)
/* harmony export */ });
/* unused harmony exports getErrorForTransaction, SequenceType, sendTransaction, sendTransactionWithRetry, getUnixTs, sendSignedTransaction */
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5681);
/* harmony import */ var _solana_web3_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_solana_web3_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4637);


const getErrorForTransaction = async (connection, txid) => {
  // wait for all confirmation before geting transaction
  await connection.confirmTransaction(txid, 'max');
  const tx = await connection.getParsedConfirmedTransaction(txid);
  const errors = [];

  if (tx !== null && tx !== void 0 && tx.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach(log => {
      const regex = /Error: (.*)/gm;
      let m;

      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        if (m.length > 1) {
          errors.push(m[1]);
        }
      }
    });
  }

  return errors;
};
let SequenceType;

(function (SequenceType) {
  SequenceType[SequenceType["Sequential"] = 0] = "Sequential";
  SequenceType[SequenceType["Parallel"] = 1] = "Parallel";
  SequenceType[SequenceType["StopOnFailure"] = 2] = "StopOnFailure";
})(SequenceType || (SequenceType = {}));

const sendTransactions = async (connection, wallet, instructionSet, signersSet, sequenceType = SequenceType.Parallel, commitment = 'singleGossip', block) => {
  if (!wallet.publicKey) throw new _solana_wallet_adapter_base__WEBPACK_IMPORTED_MODULE_1__/* .WalletNotConnectedError */ .oS();
  const unsignedTxns = [];

  if (!block) {
    block = await connection.getRecentBlockhash(commitment);
  }

  for (let i = 0; i < instructionSet.length; i++) {
    const instructions = instructionSet[i];
    const signers = signersSet[i];

    if (instructions.length === 0) {
      continue;
    }

    let transaction = new _solana_web3_js__WEBPACK_IMPORTED_MODULE_0__.Transaction();
    instructions.forEach(instruction => transaction.add(instruction));
    transaction.recentBlockhash = block.blockhash;
    transaction.setSigners( // fee payed by the wallet owner
    wallet.publicKey, ...signers.map(s => s.publicKey));

    if (signers.length > 0) {
      transaction.partialSign(...signers);
    }

    unsignedTxns.push(transaction);
  }

  const signedTxns = await wallet.signAllTransactions(unsignedTxns);
  const pendingTxns = [];
  let breakEarlyObject = {
    breakEarly: false,
    i: 0
  };
  console.log('Signed txns length', signedTxns.length, 'vs handed in length', instructionSet.length);
  const txIds = [];

  for (let i = 0; i < signedTxns.length; i++) {
    const signedTxnPromise = sendSignedTransaction({
      connection,
      signedTransaction: signedTxns[i]
    });

    try {
      const {
        txid
      } = await signedTxnPromise;
      txIds.push(txid);
    } catch (error) {
      console.error(error); // @ts-ignore

      failCallback(signedTxns[i], i);

      if (sequenceType === SequenceType.StopOnFailure) {
        breakEarlyObject.breakEarly = true;
        breakEarlyObject.i = i;
      }
    }

    if (sequenceType !== SequenceType.Parallel) {
      try {
        await signedTxnPromise;
      } catch (e) {
        console.log('Caught failure', e);

        if (breakEarlyObject.breakEarly) {
          console.log('Died on ', breakEarlyObject.i);
          return breakEarlyObject.i; // Return the txn we failed on by index
        }
      }
    } else {
      pendingTxns.push(signedTxnPromise);
    }
  }

  if (sequenceType !== SequenceType.Parallel) {
    await Promise.all(pendingTxns);
  }

  return txIds;
};
const sendTransaction = async (connection, wallet, instructions, signers, awaitConfirmation = true, commitment = 'singleGossip', includesFeePayer = false, block) => {
  if (!wallet.publicKey) throw new WalletNotConnectedError();
  let transaction = new Transaction();
  instructions.forEach(instruction => transaction.add(instruction));
  transaction.recentBlockhash = (block || (await connection.getRecentBlockhash(commitment))).blockhash;

  if (includesFeePayer) {
    transaction.setSigners(...signers.map(s => s.publicKey));
  } else {
    transaction.setSigners( // fee payed by the wallet owner
    wallet.publicKey, ...signers.map(s => s.publicKey));
  }

  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }

  if (!includesFeePayer) {
    transaction = await wallet.signTransaction(transaction);
  }

  const rawTransaction = transaction.serialize();
  let options = {
    skipPreflight: true,
    commitment
  };
  const txid = await connection.sendRawTransaction(rawTransaction, options);
  let slot = 0;

  if (awaitConfirmation) {
    const confirmation = await awaitTransactionSignatureConfirmation(txid, DEFAULT_TIMEOUT, connection, commitment);
    if (!confirmation) throw new Error('Timed out awaiting confirmation on transaction');
    slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;

    if (confirmation !== null && confirmation !== void 0 && confirmation.err) {
      const errors = await getErrorForTransaction(connection, txid);
      console.log(errors);
      throw new Error(`Raw transaction ${txid} failed`);
    }
  }

  return {
    txid,
    slot
  };
};
const sendTransactionWithRetry = async (connection, wallet, instructions, signers, commitment = 'singleGossip', includesFeePayer = false, block, beforeSend) => {
  if (!wallet.publicKey) throw new WalletNotConnectedError();
  let transaction = new Transaction();
  instructions.forEach(instruction => transaction.add(instruction));
  transaction.recentBlockhash = (block || (await connection.getRecentBlockhash(commitment))).blockhash;

  if (includesFeePayer) {
    transaction.setSigners(...signers.map(s => s.publicKey));
  } else {
    transaction.setSigners( // fee payed by the wallet owner
    wallet.publicKey, ...signers.map(s => s.publicKey));
  }

  if (signers.length > 0) {
    transaction.partialSign(...signers);
  }

  if (!includesFeePayer) {
    transaction = await wallet.signTransaction(transaction);
  }

  if (beforeSend) {
    beforeSend();
  }

  const {
    txid,
    slot
  } = await sendSignedTransaction({
    connection,
    signedTransaction: transaction
  });
  return {
    txid,
    slot
  };
};
const getUnixTs = () => {
  return new Date().getTime() / 1000;
};
const DEFAULT_TIMEOUT = 15000;
async function sendSignedTransaction({
  signedTransaction,
  connection,
  timeout = DEFAULT_TIMEOUT
}) {
  const rawTransaction = signedTransaction.serialize();
  const startTime = getUnixTs();
  let slot = 0;
  const txid = await connection.sendRawTransaction(rawTransaction, {
    skipPreflight: true
  });
  console.log('Started awaiting confirmation for', txid);
  let done = false;

  (async () => {
    while (!done && getUnixTs() - startTime < timeout) {
      connection.sendRawTransaction(rawTransaction, {
        skipPreflight: true
      });
      await sleep(500);
    }
  })();

  try {
    const confirmation = await awaitTransactionSignatureConfirmation(txid, timeout, connection, 'recent', true);
    if (!confirmation) throw new Error('Timed out awaiting confirmation on transaction');

    if (confirmation.err) {
      console.error(confirmation.err);
      throw new Error('Transaction failed: Custom instruction error');
    }

    slot = (confirmation === null || confirmation === void 0 ? void 0 : confirmation.slot) || 0;
  } catch (err) {
    console.error('Timeout Error caught', err);

    if (err.timeout) {
      throw new Error('Timed out awaiting confirmation on transaction');
    }

    let simulateResult = null;

    try {
      simulateResult = (await simulateTransaction(connection, signedTransaction, 'single')).value;
    } catch (e) {}

    if (simulateResult && simulateResult.err) {
      if (simulateResult.logs) {
        for (let i = simulateResult.logs.length - 1; i >= 0; --i) {
          const line = simulateResult.logs[i];

          if (line.startsWith('Program log: ')) {
            throw new Error('Transaction failed: ' + line.slice('Program log: '.length));
          }
        }
      }

      throw new Error(JSON.stringify(simulateResult.err));
    } // throw new Error('Transaction failed');

  } finally {
    done = true;
  }

  console.log('Latency', txid, getUnixTs() - startTime);
  return {
    txid,
    slot
  };
}

async function simulateTransaction(connection, transaction, commitment) {
  // @ts-ignore
  transaction.recentBlockhash = await connection._recentBlockhash( // @ts-ignore
  connection._disableBlockhashCaching);
  const signData = transaction.serializeMessage(); // @ts-ignore

  const wireTransaction = transaction._serialize(signData);

  const encodedTransaction = wireTransaction.toString('base64');
  const config = {
    encoding: 'base64',
    commitment
  };
  const args = [encodedTransaction, config]; // @ts-ignore

  const res = await connection._rpcRequest('simulateTransaction', args);

  if (res.error) {
    throw new Error('failed to simulate transaction: ' + res.error.message);
  }

  return res.result;
}

async function awaitTransactionSignatureConfirmation(txid, timeout, connection, commitment = 'recent', queryStatus = false) {
  let done = false;
  let status = {
    slot: 0,
    confirmations: 0,
    err: null
  };
  let subId = 0;
  status = await new Promise(async (resolve, reject) => {
    setTimeout(() => {
      if (done) {
        return;
      }

      done = true;
      console.log('Rejecting for timeout...');
      reject({
        timeout: true
      });
    }, timeout);

    try {
      subId = connection.onSignature(txid, (result, context) => {
        done = true;
        status = {
          err: result.err,
          slot: context.slot,
          confirmations: 0
        };

        if (result.err) {
          console.log('Rejected via websocket', result.err);
          reject(status);
        } else {
          console.log('Resolved via websocket', result);
          resolve(status);
        }
      }, commitment);
    } catch (e) {
      done = true;
      console.error('WS error in setup', txid, e);
    }

    while (!done && queryStatus) {
      // eslint-disable-next-line no-loop-func
      (async () => {
        try {
          const signatureStatuses = await connection.getSignatureStatuses([txid]);
          status = signatureStatuses && signatureStatuses.value[0];

          if (!done) {
            if (!status) {
              console.log('REST null result for', txid, status);
            } else if (status.err) {
              console.log('REST error for', txid, status);
              done = true;
              reject(status.err);
            } else if (!status.confirmations) {
              console.log('REST no confirmations for', txid, status);
            } else {
              console.log('REST confirmation for', txid, status);
              done = true;
              resolve(status);
            }
          }
        } catch (e) {
          if (!done) {
            console.log('REST connection error: txid', txid, e);
          }
        }
      })();

      await sleep(2000);
    }
  }); //@ts-ignore

  if (connection._signatureSubscriptions[subId]) connection.removeSignatureListener(subId);
  done = true;
  console.log('Returning status', status);
  return status;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/***/ })

};
;