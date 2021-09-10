import { MinPriorityQueue } from "./MinPriorityQueue";
const min = new MinPriorityQueue((a, b) => {
  if (a < b) return -1;
  if (b > a) return 1;
  return 0;
});
test("Empty heap . . .", () => {
  expect(min.heap()).toEqual([]);
});
test("Add a value . . .", () => {
  min.add(5);
  expect(min.heap()).toEqual([5]);
});
test("peep value . . .", () => {
  expect(min.peek()).toBe(5);
  expect(min.size()).toBe(1);
  expect(min.heap()).toEqual([5]);
});
test("remove top . . .", () => {
  expect(min.remove()).toBe(5);
  expect(min.heap()).toEqual([]);
});
test("adding then removing several values 5 6 7 3 2 4 . . .", () => {
  min.add(5);
  min.add(6);
  min.add(7);
  min.add(3);
  min.add(2);
  min.add(4);
  expect(min.size()).toBe(6);
  expect(min.peek()).toBe(2);
  expect(min.remove()).toBe(2);
  expect(min.size()).toBe(5);
  expect(min.peek()).toBe(3);
  expect(min.remove()).toBe(3);
  expect(min.size()).toBe(4);
  expect(min.peek()).toBe(4);
  expect(min.remove()).toBe(4);
  expect(min.size()).toBe(3);
  expect(min.peek()).toBe(5);
  expect(min.remove()).toBe(5);
  expect(min.size()).toBe(2);
  expect(min.peek()).toBe(6);
  expect(min.remove()).toBe(6);
  expect(min.size()).toBe(1);
  expect(min.peek()).toBe(7);
  expect(min.remove()).toBe(7);
  expect(min.size()).toBe(0);
  expect(min.peek()).toBe(null);
  expect(min.remove()).toBe(null);
  expect(min.size()).toBe(0);
});
