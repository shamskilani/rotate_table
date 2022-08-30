const { should } = require('chai');
const chai = require('chai');
const expect = chai.expect;
var validator = require("./function_test");
describe("validator split_rows() and table_is_valid()", () => {
	it("should return an array", ()=> {
		expect(validator.split_rows([39,3,8,8])).to.be.an('array')
	})
	it("should return an array", ()=> {
		expect(validator.split_rows([39,3,8,8,9])).to.be.an('array')
	})
	it("should return an array", ()=> {
		expect(validator.split_rows([39,3,8,'j','k',8,9])).to.be.an('array')
	})
	it("should return an array", ()=> {
		expect(validator.split_rows([39,88888888888888888888888888888888888888883,8,'','j','k',8,9])).to.be.an('array')
	})

	it("should return false", ()=> {
		expect(validator.table_is_valid([39,3,8,'','j','k',8,9])).to.be.false
	})
	it("should return false", ()=> {
		expect(validator.table_is_valid([39,3,8,'','j','k',8,9,0,8])).to.be.false
	})
	it("should return false", ()=> {
		expect(validator.table_is_valid([39,3,8,'','j','k',8,9,0,0,0,0,0,0,0,00,000,00,0,00,0,0000000000000000000000])).to.be.false
	})
	it("should return false", ()=> {
		expect(validator.table_is_valid([39,3,8,'','j','k',8,9,0,8,77777,'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'])).to.be.false
	})

	it("should return true", ()=> {
		expect(validator.table_is_valid([1])).to.be.true;
	})

	it("should return true", ()=> {
		expect(validator.table_is_valid([1,2,3,4])).to.be.true;
	})
	it("should return true", ()=> {
		expect(validator.table_is_valid([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])).to.be.true;
	})
	it("should return true", ()=> {
		expect(validator.table_is_valid([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666])).to.be.true;
	})
	
})