/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// var ABI = require('ethereumjs-abi');
// var ethUtil = require('ethereumjs-util');
// var BigNumber = require('bignumber.js');
// var BN = require('bn.js');

// function solSHA3(args) {
//     var argTypes = [];
//     console.log(args);
//     args.forEach(function (arg, i) {

//         if (arg instanceof BigNumber) {
//             argTypes.push('uint256');
//             args[i] = new BN(arg.toString(10), 10);
//         } else if (typeof arg === "number") {
//             argTypes.push('uint8');
//         } else if (ethUtil.isValidAddress(arg)) {
//             argTypes.push('address');
//         } else if (typeof arg === "string") {
//             argTypes.push('string');
//         } else if (typeof arg === "boolean") {
//             argTypes.push('bool');
//         } else {
//             throw "Unable to guess arg type: " + arg;
//         }
//     });
//     console.log(argTypes);

//     return Promise.resolve(ABI.soliditySHA3(argTypes, args));
// }

// function isValidSignature(order) {
//     var v = order.v;
//     var r = order.r;
//     var s = order.s;
//     if (!v || !r || !s) {
//         throw 'Cannot call isValidSignature on unsigned order';
//     }
//     var hashBuffer = generateHashBuffer(order);
//     var msgHash = ethUtil.hashPersonalMessage(hashBuffer);
//     console.log("msgHash:", ethUtil.bufferToHex(msgHash));
//     try {
//         var pubKey = ethUtil.ecrecover(msgHash, v, ethUtil.toBuffer(r), ethUtil.toBuffer(s));
//         var recoveredAddress = ethUtil.bufferToHex(ethUtil.pubToAddress(pubKey));
//         console.log(recoveredAddress);
//         console.log(order.owner);
//         return Promise.resolve(recoveredAddress.toLowerCase() === order.owner.hex.toLowerCase());
//     } catch (err) {
//         return Promise.resolve(false);
//     }
// };

// function generateOrderHash(input) {
//     var buffer = this.generateHashBuffer(input);
//     input.hash = ethUtil.bufferToHex(buffer);
//     return Promise.resolve(input)
// };

// function generateHashBuffer(input) {
//     return Promise.resolve(solSHA3([
//         input.protocol.hex,
//         input.owner.hex,
//         input.tokenS,
//         input.tokenB,
//         new BigNumber(input.amountS),
//         new BigNumber(input.amountB),
//         new BigNumber(input.timestamp),
//         new BigNumber(input.ttl),
//         new BigNumber(input.salt),
//         new BigNumber(input.lrcFee),
//         input.buyNoMoreThanAmountB,
//         input.marginSplitPercentage
//     ]));
// };

/**
 * handle the order submit transaction
 * @param {org.loopring.relay.mesh.OrderReceived} orderReceived
 * @transaction
 */
function onOrderRecieve(orderReceived) {
    var assetRegistry;

    var NS = "org.loopring.relay.mesh.Order"
    var order = orderReceived.order

    // return isValidSignature(orderReceived.order)   
    //     .then(function(valid) {
    //         if (!valid) {
    //             throw "signature is not correct";
    //         }
    //     })
    //     .then(function() {
    //         order = generateOrderHash(o)
    //         return NS;
    //     })
    //     .then(getAssetRegistry(NS))
    //     .then(function(ar) {
    //         assetRegistry = ar;
    //         return assetRegistry.exists(orderHash);
    //     })
    //     .then(function(exists) {
    //         if (!exists) {
    //             var orderSubmittedEvent 
    //             orderSubmittedEvent.order = order
    //             emit(orderSubmittedEvent);
    //             return assetRegistry.add(order)
    //         } else {
    //             console.log("order has been submitted.not submit again");
    //             // return function(){}
    //         }
    //     }) 
    //     .catch(function (error) {
    //         console.log("error occors ", error)
    //     })

    return getAssetRegistry('org.loopring.relay.mesh.Order')
        .then(function(ar) {
            assetRegistry = ar;
            return assetRegistry.exists(order.hash);
        })
        .then(function(exists) {
            if (!exists) {
                var orderSubmittedEvent 
                orderSubmittedEvent.order = order
                emit(orderSubmittedEvent);
                return assetRegistry.add(order)
            } else {
                console.log("order has been submitted.not submit again");
                // return function(){}
            }
        });
}

