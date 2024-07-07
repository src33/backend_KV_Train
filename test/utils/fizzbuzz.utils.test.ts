import FizzBuzz from "../../src/utils/fizzbuzz.utils";

describe("fizzbuzz test", () => {
   let fizzBuzz;
   beforeEach(() => {
      fizzBuzz = new FizzBuzz();
   });
   it('should return "fizz" for numbers divisble by 3', () => {
      expect(fizzBuzz.fizzBuzz(3)).toBe("Fizz");
      expect(fizzBuzz.fizzBuzz(6)).toBe("Fizz");
   });
   //    it("using mocks", () => {
   //       let mockFn = jest.fn(fizzBuzz.divisibleByThree).mockReturnValue(true);
   //       fizzBuzz.divisibleByThree = mockFn;
   //       expect(fizzBuzz.fizzBuzz(9).toBe("Fizz"));
   //       expect(mockFn).toHaveBeenCalledTimes(2);
   //    });
   //    it("using spy", () => {
   //       const spy = jest.spyOn(fizzBuzz, "divisibleByThree");
   //       expect(fizzBuzz.fizzBuzz(4).toBe(4));
   //       expect(spy).toHaveBeenCalledTimes(2);
   //       spy.mockRestore();
   //    });
});
