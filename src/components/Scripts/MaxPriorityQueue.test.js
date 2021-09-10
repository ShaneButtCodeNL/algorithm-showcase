import { MaxPriorityQueue } from "./MaxPriorityQueue";
const max = new MaxPriorityQueue((a, b) => {
  if (a < b) return 1;
  if (b > a) return -1;
  return 0;
});
test("Empty heap . . .", () => {
  expect(max.heap()).toEqual([]);
});
test("Add a value . . .", () => {
  max.add(5);
  expect(max.heap()).toEqual([5]);
});
test("peep value . . .", () => {
  expect(max.peek()).toBe(5);
  expect(max.size()).toBe(1);
  expect(max.heap()).toEqual([5]);
});
test("remove top . . .", () => {
  expect(max.remove()).toBe(5);
  expect(max.heap()).toEqual([]);
});
test("adding then removing several values 5 6 7 3 2 4 . . .", () => {
  max.add(5);
  max.add(6);
  max.add(7);
  max.add(3);
  max.add(2);
  max.add(4);
  expect(max.size()).toBe(6);
  expect(max.peek()).toBe(7);
  expect(max.remove()).toBe(7);
  expect(max.size()).toBe(5);
  expect(max.peek()).toBe(6);
  expect(max.remove()).toBe(6);
  expect(max.size()).toBe(4);
  expect(max.peek()).toBe(5);
  expect(max.remove()).toBe(5);
  expect(max.size()).toBe(3);
  expect(max.peek()).toBe(4);
  expect(max.remove()).toBe(4);
  expect(max.size()).toBe(2);
  expect(max.peek()).toBe(3);
  expect(max.remove()).toBe(3);
  expect(max.size()).toBe(1);
  expect(max.peek()).toBe(2);
  expect(max.remove()).toBe(2);
  expect(max.size()).toBe(0);
  expect(max.peek()).toBe(null);
  expect(max.remove()).toBe(null);
  expect(max.size()).toBe(0);
});
