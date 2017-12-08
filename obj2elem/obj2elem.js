/**
 * Created by yangm11 on 8/11/2017.
 */
'use strict';

function obj2elems(obj, parentNode, tagName = 'div') {
  parentNode = parentNode || document.body;
  let div = document.createElement('div');
  div.classList.add('obj2elem-div');
  // if (parentNode.grouped) {
  //   div.classList.add('border-left-show');
  // }
  let subParent = parentNode.appendChild(div);
  subParent.classList.add('obj2elem-div');
  subParent._pairedObject = obj;
  let keys = Object.keys(obj);
  for (let i = 0; i < keys.length; i++) {
    let cur = obj[keys[i]];
    let child = subParent.appendChild(document.createElement('div'));
    child.classList.add('obj2elem-div');
    child._boundData = {
      object: obj,
      prop: keys[i]
    };
    switch (typeof cur) {
      case 'object':
        child.innerHTML = '<i class="expand-collapse-handler fa fa-minus-square-o">&nbsp;</i>' + '<span class="prop-name">' + (keys[i] + ': ') + '</span>';
        child.innerHTML += '<span class="control-panel">&#8198;&#8198;<i class="fa fa-plus"></i>&#8198;&#8198;&#8198;&#8198;<i class="fa fa-times"></i></span>';
        // if (Array.isArray(cur)) {
        //   array2elems(cur, child, tagName);
        // } else {
        //   obj2elems(cur, child, tagName);
        // }
        obj2elems(cur, child, tagName);
        break;
      default:
        // child.textContent = (keys[i] + ': ');
        child.innerHTML = '<span class="prop-name">' + keys[i] + ':</span>';
        value2element(cur, child, 'input');
        let ps = document.createElement('span');
        ps.classList.add('control-panel');
        ps.innerHTML = '&#8198;&#8198;<i class="fa fa-times"></i>';
        child.appendChild(ps);
    }
  }
}

// function array2elems(array, parentNode, tagName = 'div') {
//   parentNode = parentNode || document.body;
//   let div = document.createElement('div');
//   let subParent = parentNode.appendChild(div);
//   for (let i = 0; i < array.length; i++) {
//     let cur = array[i];
//     switch (typeof cur) {
//       case 'object':
//         if (Array.isArray(cur)) {
//           array2elems(cur, subParent, tagName);
//         } else {
//           subParent.grouped = true;
//           obj2elems(cur, subParent, tagName);
//         }
//         break;
//       default:
//         let child = document.createElement('div');
//         subParent.append(child);
//         child._boundData = {
//           object: array,
//           prop: i
//         };
//         value2element(cur, child, 'input');
//     }
//   }
// }

function value2element(v, parentNode, tagName = 'input') {
  parentNode = parentNode || document.body;
  // parentNode.classList.add('border-left-show');
  let child = document.createElement(tagName);
  child.classList.add('terminus-value');
  // child.type = 'text';
  // child.placeholder = v;
  child.value = v;
  parentNode.appendChild(child);
}