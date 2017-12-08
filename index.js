/**
 * Created by yangm11 on 12/8/2017.
 */
'use strict';

window.onload =() => {
  let _data = document.getElementById('plain-input-data').value;
  let _d;
  if (_data) {
    try {
      _d = JSON.parse(_data);
    } catch (err) {
      alert('Failed to parse the input data!');
    }
  }
  if (!_d) {
    _d = json;
    let s = JSON.stringify(_d, null, '    ');
    document.getElementById('plain-input-data').value = s;
    document.getElementById('plain-input-data').rows = s.split('\n').length + 10;
  }
  let fragment = document.createDocumentFragment();
  obj2elems(_d, fragment);
  let editor = document.getElementById('json-editor');
  editor.appendChild(fragment);
  expand_collapase_handler();
  value_modification_handler();
  control_icon_handler();
};

document.getElementById('to-right').addEventListener('click', () => {
  let pid = document.getElementById('plain-input-data');
  let _data = pid.value;
  let _d;
  if (_data) {
    try {
      _d = JSON.parse(_data);
    } catch (err) {
      alert('Failed to parse the input data!\n' + err);
    }
  }
  if (!_d) {
    _d = json;
    let s = JSON.stringify(_d, null, '    ');
    document.getElementById('plain-input-data').value = s;
    document.getElementById('plain-input-data').rows = s.split('\n').length + 10;
  }
  let fragment = document.createDocumentFragment();
  obj2elems(_d, fragment);
  let editor = document.getElementById('json-editor');
  editor.removeChild(editor.lastChild);
  editor.appendChild(fragment);
  expand_collapase_handler();
  value_modification_handler();
  control_icon_handler();
});

document.getElementById('to-left').addEventListener('click', () => {
  let editor = document.getElementById('json-editor');
  let obj = editor.lastChild._pairedObject;
  let s = JSON.stringify(obj, null, '    ');
  document.getElementById('plain-input-data').value = s;
  document.getElementById('plain-input-data').rows = s.split('\n').length + 10;
});

if (typeof module !== 'undefined' && module.parent) {

} else {
  // test code go here
}