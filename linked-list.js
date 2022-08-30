const nodeProto = {
  setValue: function(value){
    this._value = value;
  },
  value: function(){
    return this._value;
  },
  setNext: function(node){
    this._next = node;
  },
  next: function(){
    return this._next;
  }
}

function Node (value = null) {
  const node = Object.create(nodeProto);
  
  node._value = value;
  node._next = null;
  
  return node;
}

const linkedListProto = {
  append: function (value) {
    const newNode = Node(value);

    this.tail().setNext(newNode);
  },
  prepend: function (value) {
    const newNode = Node(value);

    newNode.setNext(this._head.next());
    this._head.setNext(newNode);
  },
  size: function () {
    let count = 0;
    let node = this._head;
    while (node.next() !== null){
      count += 1;
      node = node.next();
    }

    return count;
  },
  head: function(){
    return this._head;
  },
  tail: function(){
    let note = this._head;
    while (note.next() !== null){
      note = note.next();
    }

    return note;
  },
  at: function(index){
    if (index > this.size() - 1){
      return null;
    }

    let count = 0;
    let node = this._head;

    while ( count++ <= index && (node = node.next()) !== null ){}

    return node;
  },
  pop: function () {
    let newTail = this.at(this.size() - 2);
    let popped = newTail.next();

    newTail.setNext(null);
    return popped;  
  },
  contains: function(value){
    const size = this.size();
    let currentNode = this.head().next();
    for (let i = 0; i < size; i++){
      if(currentNode.value() === value){
        return true;
      }
      currentNode = currentNode.next();
    }

    return false;
  },
  find: function(value){
    const size = this.size();
    let currentNode = this.head().next();
    for (let i = 0; i < size; i++){
      if(currentNode.value() === value){
        return i;
      }
      currentNode = currentNode.next();
    }

    return null;
  },
  toString: function() {
    let currentNode = this.head();
    let string = '';
    while ((currentNode = currentNode.next()) !== null){
      string += `( ${currentNode.value()} ) -> `;
    }

    string += ' null';

    return string;
  },
  insertAt: function(value, index){
    const nodeBefore = this.at(index - 1);
    if (nodeBefore  === null){
      return null;
    }

    const newNode = Node(value);

    newNode.setNext(nodeBefore.next());
    nodeBefore.setNext(newNode);
  },
  removeAt: function(index){
    const nodeBefore = this.at(index - 1);
    if (nodeBefore  === null){
      return null;
    }

    nodeBefore.setNext(nodeBefore.next().next());
  }
}

function LinkedList() {
  const list = Object.create(linkedListProto);
  list._head = Node();

  return list;
}
