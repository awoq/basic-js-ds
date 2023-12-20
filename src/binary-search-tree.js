const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this.node = null;
  }
  
  root() {
    return this.node;
  }

  add(data) {
    let current = this.root();
    if(current === null){
      this.node = new Node(data);
      return;
    } else {
      const searchTree = function(current) {
        if (data < current.data) {
            if (current.left === null) {
                current.left = new Node(data);
                return;
            } else if (current.left !== null) {
                return searchTree(current.left);
            }
        } else if (data > current.data) {
            if (current.right === null) {
                current.right = new Node(data);
                return;
            } else if (current.right !== null) {
                return searchTree(current.right);
            }
        } else {
            return null;
        }
    }
    return searchTree(current);
    } 
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.root();
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) {
                return null;
            }
        }
        return current;
  }

  remove(data) {
    if (this.has(data)) {
      this.node = removeNode(this.node, data);
      function removeNode(node, data) {
        if (node.data == data) {
          if (node.left === null && node.right === null) {
            return null;
          } else if (node.left === null) {
            node = node.right;
            return node;
          } else if (node.right === null) {
            node = node.left;
            return node;
          } else {
            let tempNode = node.right;
            if (tempNode.left === null) {
              node.data = tempNode.data;
              node.right = tempNode.right;
              return node;
            }
            function findLeft(node) {
              while (node.left) {
                node = node.left;
              }
              return node;
            } 
            let nodeToRemove = findLeft(node.right);
            node = removeNode(node, nodeToRemove.data);
            node.data = nodeToRemove.data;
            return node;
          }
        }
        if (node.data < data) {
          node.right = removeNode(node.right, data);
          return node;
        } else {
          node.left = removeNode(node.left, data);
          return node;
        }
      }
    }
  }

  min() {
    let current = this.root();
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.root();
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
}

module.exports = {
  BinarySearchTree
};