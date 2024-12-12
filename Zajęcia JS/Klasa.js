class Person{
    name
    surname
    age
 
    constructor(name, surname, age) {
        this.name = name
        this.surname = surname
        this.age = age
    }
 
    getNameDetails(){
        return this.name + " " + this.surname + ", wiek: " + this.age;
    }
}
 
class Student extends Person{
    id
 
    constructor(id, name, surname, age){
        super(name, surname, age)
        this.id = id
    }
 
    getDetails(){
        return "Student ID: " + this.id + ", Imię i Nazwisko: " + this.getNameDetails();
    }
 
}
 
const s1 = new Student(21, "Karol", "Wojtyła", 37);
 
console.log(s1.getDetails())