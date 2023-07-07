let fib = [0, 1];

const limit = 200;

for (let i = 0; i < limit; i++) {
  fib.push(
    fib[fib.length - 2] + fib[fib.length -1]
  );
}

for (let i = 0; i < fib.length; i++) {
  console.log(fib[i]);
}
