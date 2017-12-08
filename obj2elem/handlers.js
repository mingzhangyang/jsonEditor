/**
 * Created by yangm11 on 8/15/2017.
 */
'use strict';

// add click handler to expand-collapse-handler class

function expand_collapase_handler(node) {
  node = node || document;
  let ics = node.getElementsByClassName('expand-collapse-handler');

  for (let i = 0; i < ics.length; i++) {
    let ic =ics[i];
    ic.addEventListener('click', function () {
      let elem = this.parentNode.lastChild;
      let b = this.classList.contains('fa-plus-square-o');
      if (b) {
        this.classList.remove('fa-plus-square-o');
        this.classList.add('fa-minus-square-o');
        // elem.style.display = 'block';
        elem.classList.remove('hidden-nodes');
      } else {
        this.classList.remove('fa-minus-square-o');
        this.classList.add('fa-plus-square-o');
        // elem.style.display = 'none';
        elem.classList.add('hidden-nodes');
      }
    });
  }
}

expand_collapase_handler();

// add change handler to input elements

function value_modification_handler(node) {
  node = node || document;
  let inps = node.getElementsByClassName('terminus-value');

  for (let i = 0; i < inps.length; i++) {
    let inp = inps[i];
    inp.addEventListener('change', function () {
      this.classList.add('value-modified');
      let pnd = this.parentNode._boundData;
      pnd.object[pnd.prop] = this.value;
    });
  }
}

value_modification_handler();

// add 'add' and 'remove' handler to icons

function control_icon_handler(node) {
  node = node || document;

  let pluses = node.getElementsByClassName('fa-plus');

  let insertedTemplate = '<div id="input-panel" class="obj2elem-div"><div><span class="input-description">Name:</span><input name="_name" id="_name"><span class="input-description">Value:</span><input name="_value" id="_value"></div><div id="confirm-panel"><input id="add-button" type="button" value="Add"><span>&#8198;&#8198;</span><input id="cancel-button" type="button" value="Cancel"></div></div>';

  for (let i = 0; i < pluses.length; i++) {
    let plus = pluses[i];
    plus.addEventListener('click', function () {
      delete_input_panel();

      let cNode = this.parentNode.parentNode;
      let ref = cNode.lastChild.firstChild;
      let div = cNode.lastChild.insertBefore(document.createElement('div'), ref);
      div.innerHTML = insertedTemplate;

      let data = cNode._boundData;
      if (Array.isArray(data.object[data.prop])) {
        document.getElementById('_name').value = data.object[data.prop].length;
        document.getElementById('_name').readOnly = true;
      }

      let cancelButton = document.getElementById('cancel-button');
      cancelButton.addEventListener('click', function () {
        delete_input_panel();
      });
      let addButton = document.getElementById('add-button');
      addButton.addEventListener('click', function () {
        let prop = document.getElementById('_name').value;
        let val = document.getElementById('_value').value;

        let o;
        try {
          o = JSON.parse(val);
        } catch (err) {
          // nothing needed to do
        }

        if (!o) {
          // if user input a value, ...
          cNode.lastChild._pairedObject[prop] = val;
        } else {
          // if user input a JSON string, ...
          cNode.lastChild._pairedObject[prop] = o;
        }

        let obj = cNode.lastChild._pairedObject;
        cNode.removeChild(cNode.lastChild);

        updateNode(obj, cNode);
        delete_input_panel();

        let newNode = cNode.lastChild.lastChild;
        newNode.classList.add('new-node-created');
        newNode.scrollIntoView(false);
        setTimeout(function () {
          newNode.classList.remove('new-node-created');
        }, 2000);

      });
    });
  }

  let minuses = node.getElementsByClassName('fa-times');
  for (let i = 0; i < minuses.length; i++) {
    let minus = minuses[i];
    minus.addEventListener('click', function () {
      let cNode = this.parentNode.parentNode;
      let data = cNode._boundData;
      if (Array.isArray(data.object)) {
        data.object.splice(data.prop, 1);
        let sibs = cNode.parentNode.childNodes;
        for (let j = 0; j < sibs.length; j++) {
          let propName = sibs[j].getElementsByClassName('prop-name')[0];
          let idx = +propName.textContent.split(':')[0];
          if (idx > +(data.prop)) {
            // console.log(propName);
            propName.textContent = idx - 1 + ':';
            sibs[j]._boundData.prop -= 1; // This is important!!!
          }
        }
        cNode.parentNode.removeChild(cNode);
      } else {
        delete data.object[data.prop];
        cNode.parentNode.removeChild(cNode);
      }
    });
  }
}

control_icon_handler();


// function for update node

function updateNode(obj, node) {
  obj2elems(obj, node);
  expand_collapase_handler(node);
  value_modification_handler(node);
  control_icon_handler(node);
}

// function for delete input-panel

function delete_input_panel() {
  let p = document.getElementById('input-panel');
  if (p !== null) {
    p.parentNode.remove(p);
  }
}