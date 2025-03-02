// test.js
import { getBalance } from './contractFunctions.js';

async function test() {
  const account = '0xcc1D5d698AfFfa8A594d41BD5a71c66Aaa1D7e4E';
  const balance = await getBalance(account);
  console.log(`Balance: ${balance}`);
}

test();