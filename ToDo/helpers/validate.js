const Validator = require('validatorjs')

//const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;
const data = {
    name: 'John Doe',
    email: 'john@example.com',
    age: 25,
};
const rules = {
    name : "required|string ",
    email: "required|email",
    age: "required|numeric"
}
const validation = Validator(data, rules);
if (validation.passes()) {
    console.log('Validation passed');
} else {
    console.log('Validation failed');
    console.log(validation.errors.all());
}
//  const validator = async(body, rules, customMessages, callback) =>  {
//     const validation = new Validator(body, rules, customMessages);
//     validation.passes(() => callback(null, true));
//     validation.fails(() => callback(validation.errors, false))
// }

//validator('strict', value => passwordRegex.test(value),'password must contain at least one uppercase letter, one lowercase letter and one number');


//module.exports = validator;