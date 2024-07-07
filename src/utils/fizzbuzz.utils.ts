import { IsDivisibleBy } from "class-validator";

class FizzBuzz {
   public fizzBuzz(num) {
      if (this.divisibleByThree(num)&& num % 5 == 0) {
         return "FizzBuzz";
      }
      if (this.divisibleByThree(num)) {
         return "Fizz";
      }
      if (num % 5 == 0) {
         return "Buzz";
      }

      return num;
   }
   divisibleByThree = (num) => {
      return num % 3 == 0 ? true : false;
   };
}


const fizzBuzz = new FizzBuzz();
for (let i = 0; i < 20; i++) {
   console.log(fizzBuzz.fizzBuzz(i));
}

export default FizzBuzz;
