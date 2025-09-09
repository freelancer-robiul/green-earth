### 1) What is the difference between var, let, and const?

var: It is a function scope(or global if declared outside a function). We can re-declare and re-assign.

let: It is a block scope. We can not re-declare but we can re-assign.

const: It is a block scope. We can not re-declare and re-assign.

---

### 2) What is the difference between map(), forEach(), and filter()?

map() - We can return something from it. And we can also create a new array.

forEach() - We can not return a new array. It just loops through the array.

filter() - We can create a new array with elements that pass a condition. We can return true/false.

---

### 3) What are arrow functions in ES6?

Arrow function is a shorter way to write function in ES6. We can use it for small and simple functions.

Example: const addArr = (a, b) => a + b;

console.log(addArr(5, 3));

Ans: 8

---

### 4) How does destructuring assignment work in ES6?

Destructuring in ES6 is a simple way to extract values from arrays of objects and assign them directly to variables. It makes the code cleaner, shorter and easier.

---

### 5) Explain template literals in ES6. How are they different from string concatenation?

Template literals in ES6 use backticks instead of quotes and make it easy to insert variables with ${} as well as write multi-line strings.

Example:
const name = "Robi";
const age = 37;

// string concatenation
console.log("My name is " + name + " and I am " + age + " years old.");

// template literal
console.log(`My name is ${name} and I am ${age} years old.`);

---
