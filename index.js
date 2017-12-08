/**
 * Created by yangm11 on 12/8/2017.
 */
'use strict';

window.onload =() => {
  let fragment = document.createDocumentFragment();
  obj2elems(json, fragment);
  document.body.appendChild(fragment);
  expand_collapase_handler();
  value_modification_handler();
  control_icon_handler();
};

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}