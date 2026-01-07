const object = { a: 1, b: 2, c: 3 };
const testError = new Error("test", {
  cause: new TypeError("test type error"),
});

Object.assign(object, {
  error: {
    name: testError.name,
    message: testError.message,
    cause: testError.cause,
    stack: testError.stack,
  },
});
console.log(object);

try {
  const json = JSON.stringify(object, null, 2);
  console.log(json);
} catch (error) {
  console.log(error);
}
