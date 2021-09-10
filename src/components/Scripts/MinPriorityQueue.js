export class MinPriorityQueue {
  constructor(comparator) {
    this.comparator = comparator;
    this.elements = [];
  }

  #getLeftIndex(pos) {
    return 2 * pos + 1;
  }
  #getRightIndex(pos) {
    return 2 * pos + 2;
  }
  #getParentIndex(pos) {
    return Math.floor((pos - 1) / 2);
  }
  #hasLeftChild(pos) {
    return this.#getLeftIndex(pos) < this.size();
  }
  #hasRightChild(pos) {
    return this.#getRightIndex(pos) < this.size();
  }
  #hasParent(pos) {
    return pos > 0;
  }
  #getParent(pos) {
    return this.#hasParent(pos)
      ? this.elements[this.#getParentIndex(pos)]
      : null;
  }
  #getLeft(pos) {
    return this.#hasLeftChild(pos)
      ? this.elements[this.#getLeftIndex(pos)]
      : null;
  }
  #getRight(pos) {
    return this.#hasRightChild(pos)
      ? this.elements[this.#getRightIndex(pos)]
      : null;
  }
  #swap(p1, p2) {
    let temp = this.elements[p1];
    this.elements[p1] = this.elements[p2];
    this.elements[p2] = temp;
    temp = null;
  }
  #heapifyDown() {
    let i = 0;
    while (this.#hasLeftChild(i)) {
      let smallerChildIndex = this.#getLeftIndex(i);
      if (this.#hasRightChild(i) && this.#getRight(i) < this.#getLeft(i)) {
        smallerChildIndex = this.#getRightIndex(i);
      }
      if (this.elements[i] < this.elements[smallerChildIndex]) break;
      this.#swap(i, smallerChildIndex);
      i = smallerChildIndex;
    }
  }
  #heapifyUp() {
    let i = this.size() - 1;
    while (this.#hasParent(i) && this.#getParent(i) > this.elements[i]) {
      this.#swap(i, this.#getParentIndex(i));
      i = this.#getParentIndex(i);
    }
  }

  size() {
    return this.elements.length;
  }
  /**
   * Gets top of heap but doesn't remove it
   */
  peek() {
    return this.size() ? this.elements[0] : null;
  }
  /**
   * Gets top of heap and removes it
   */
  remove() {
    if (this.size() === 0) return null;
    let ans = this.elements.shift();
    //Move last element to start
    if (this.size() === 0) return ans;
    this.elements.unshift(this.elements.pop());
    this.#heapifyDown();
    return ans;
  }
  heap() {
    return this.elements;
  }
  /**
   * Adds an element to the heap and heapifies the heap
   * @param {*} element Element to be added
   */
  add(element) {
    this.elements.push(element);
    this.#heapifyUp();
  }
}
