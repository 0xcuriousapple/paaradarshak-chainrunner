//   levelmap = {};

//   recursionLoop(start, end, tempmap) {
//     let breakpoint = pos[end] - pos[start];
//     if (tempmap.hasOwnProperty(breakpoint)) {
//       recursionLoop(start, breakpoint, tempmap);
//       recursionLoop(breakpoint, end, tempmap);
//     } else {
//       return breakpoint;
//     }
//   }
//   BestBreak(pos, ref) {
//     let i = 0;
//     let end = pos.length - 1;
//     let start = 0;

//     let tempmap = {}; //for o(1) check

//     for (i = 0; i < pos.length; i++) {
//       tempmap[pos[i]] = true;
//     }
//     let breakpoint = recursionLoop(start, end, tempmap, ref);
//   }

//   AnglePositionOfNode(level, ref) {
//     if (levelmap.hasOwnProperty(level)) {
//       presentPos = levelmap[level];
//       let bestbreakpoint = BestBreak(presentPos, ref);
//     } else {
//       levelmap[level] = [0, 360];
//     }
//   }

//   populate = (address, json, parent) => {
//     console.log(address);
//     console.log(relations[address]);
//     if (typeof relations[address] === "undefined") {
//       // json['name'] = 'demo'
//       // json['address'] = address;

//       json["name"] = ownerCompleteInfo[address].name;
//       json["value"] = ownerCompleteInfo[address].funds;
//       json["parent"] = parent;
//       console.log(json);
//       return json;
//     } else {
//       let arr = relations[address];
//       json["childern"] = [];
//       for (let i = 0; i < relations[address].length; i++) {
//         json["name"] = ownerCompleteInfo[address].name;
//         json["value"] = ownerCompleteInfo[address].funds;
//         json["parent"] = parent;
//         json["childern"].push(this.populate(arr[i], {}, address));
//         console.log(json);
//       }
//       return json;
//     }
//   };
