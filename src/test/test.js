function MyBindFunction(context, func) {
  return function () {
    func.call(context);
  };
}

function logPerson() {
  console.log(`Person : ${this.name}`);
}

const person1 = { name: "Max" };
const person2 = { name: "Joe" };

const bindedFunc = MyBindFunction(person1, logPerson);
bindedFunc();

//
const obj = new Object({ a: 1, b: "3" });
console.log(obj);
