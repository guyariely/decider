
class Person {

  constructor(name = "anonymous", age = 0) {
    this.name = name;
    this.age = age;
  }

  getGreeting() {
    return `Hi! my name is ${this.name}.`;
  }

  getDescription() {
    return `${this.name} is ${this.age} years old.`;
  }
}

class Student extends Person {

  constructor(name, age, major) {
    super(name, age);
    this.major = major;
  }

  hasMajor() {
    return !!this.major;
  }

  getDescription() {
    let description = super.getDescription();

    if (this.hasMajor()) {
      description += ` Their major is in ${this.major}.`;
    }

    return description;
  }
}

class Traveler extends Person {

  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }

  getGreeting() {
    let description = super.getGreeting();

    if (this.homeLocation) {
      description += ` I am visiting ${this.homeLocation}.`;
    }

    return description;
  }
}

const guy = new Person("Guy Arieli", 21);
const amit = new Student("Amit amrosi", 20, "Law");
const stana = new Traveler("Stana Stark", 21, "King's Landing");

console.log(guy.getDescription()); 
console.log(amit.getDescription()); 

console.log(guy.getGreeting()); 
console.log(stana.getGreeting());
