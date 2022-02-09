'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = 20, address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*

///////////////////////////////////////
///////////////////////////////////////
// String Methods Practice

const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// 🔴 Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   🔴 Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🔴' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}

///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #4

Write a program that receives a list of variable names written in underscore_case and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below), and conversion will happen when the button is pressed.
THIS TEST DATA (pasted to textarea)
underscore_case
 first_name
Some_Variable 
  calculate_AGE
delayed_departure
SHOULD PRODUCE THIS OUTPUT (5 separate console.log outputs)
underscoreCase      ✅
firstName           ✅✅
someVariable        ✅✅✅
calculateAge        ✅✅✅✅
delayedDeparture    ✅✅✅✅✅
HINT 1: Remember which character defines a new line in the textarea 😉
HINT 2: The solution only needs to work for a variable made out of 2 words, like a_b
HINT 3: Start without worrying about the ✅. Tackle that only after you have the variable name conversion working 😉
HINT 4: This challenge is difficult on purpose, so start watching the solution in case you're stuck. Then pause and continue!
Afterwards, test with your own test data!
GOOD LUCK 😀
*/

/*
document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));
document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  const rows = text.split('\n');
  for (const [i, row] of rows.entries()) {
    const [first, second] = row.toLowerCase().trim().split('_');
    const output = `${first}${second.replace(
      second[0],
      second[0].toUpperCase()
    )}`;
    console.log(`${output.padEnd(20)}${'✅'.repeat(i + 1)}`);
  }
});

// Split and join
// Bunun uygulamasını gerçek hayatta şu şekilde görmek mümkndür.
// Bir mesajlaşma uygulaması yazıdğınızı düşünün. Gönderen kişi alıcıları virgülle ayırarak yazsın.
// Örneğin Ahmet, Mehmet, Muzaffer gibi. Fakat bizim için bunun bir dizi olması karakter dizisi olmasından daha kullanışlıdır.
//  Peki bu nasıl yapılmalı?
// str.split(delim) tam olarak bunu yapmaktadır.
// Karakterleri verilen delim e göre ayırır ve sonrasında bunları dizi olarak döner.
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schmedtmann'.split(' '));
const [firstName, lastName] = 'Jonas Schmedtmann'.split(' ');

// arr.join(str) split in tam tersini yapar. arr'den karakter dizileri yaratır.
const newName = ['Mr.', firstName, lastName.toUpperCase()].join('-----------');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];
  for (const n of names) {
    // arr.push(...items) – elemanları sona ekler,
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};
capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// Padding
// String belli bir karaktere kadar tamamlamanızı sağlar.
// boş karakterle mi / belli bir örüntü ile mi tamamlanacak.
// padStart/padEnd: doldurma işleminin başa mı/ sona mı ekleneceğini
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// Kredi kartı numarasını gizleme ************************************
const maskCreditCard = function (number) {
  const str = number + '';
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};
console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

/////////// Repeat
// str.repeat(n) – str'yi istendiği kadar tekrar eder…
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));
const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'🛩'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

/*
//////////////////////////////////////////
//////////////////////////////////////////
// Strings - Karakter Dizisi Part-2
const airline = 'TAP Air Portugal';

// Küçük harfe çevirmek için toLowerCase()
// büyük harfe çevirmek için toUpperCase() metodları kullanılabilir.
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAs'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = ' Hello@Jonas.Io \n ';

// str.trim() – başlangıç ve bitişteki boşlukları siler.
// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();
// console.log(trimmedEmail);
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

//str.repeat(n) – str'yi istendiği kadar tekrar eder…
// replacing
const priceGB = '288,97€';
const priceUS = priceGB.replace('€', '$').replace(',', '.');
console.log(priceUS);

const announcement = 'All passngers come to boarding door 23.Boarding door 23!';
console.log(announcement.replace('door', 'gate'));
console.log(announcement.replaceAll('door', 'gate'));

console.log(announcement.replace(/door/g, 'gate'));

// Booleans
// Modern özelliklerin içerisinde str.includes(substr, pos) true/false döndüren bir metod mulunmaktadır.
// Eğer sadece aradığınız karakterlerin var olup olmadığını kontrol etmek istiyorsanız
// ve pozisyonu sizin için önemli değilse bu metod kullanılabilir:
// str.includes un isteğe bağlı ikinci argümanı başlanacak pozisyonu belirtmenizi sağlar:
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.includes('Airb'));

// Aynı şekilde str.startsWith ve str.endsWith metodları söyledikleri gibi,
// aranan karakter dizilerinin başlangıç ve bitişlerine bakarlar.
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the NEW ARibus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife' || baggage.includes('gun'))) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Get some snacks and a gun for protection');


//////////////////////////////////////////
//////////////////////////////////////////
// Strings - Karakter Dizisi Part-1
const airline = 'TAP Air Portugal';
const plane = 'A320';

// İstediğiniz pozisyondaki karakteri alabilmek için köşeli parantez içerisinde pozisyonu neresiyse onu yazın [poz]
// veya bunun yerine str.charAt(pos) metodunu da kullanabilirsiniz. İlk karakter 0. pozisyondur
console.log(plane[0]);
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

// length özelliği karakter dizisinin uzunluğunu verir.
console.log(airline.length);
console.log('B737'.length);

// str.indexOf
// İlk metod str.indexOf(aranacak_karakterler, pozisyon)
// Aranmak istenen karakter dizisinde str aranacak_karakterler'i arar.
// Pozisyon ile istenen pozisyondan aramaya başlar,
// eğer bu karakter dizisini bulursa bulduğu pozisyonu, bulamaz ise -1 döndürür.
console.log(airline.indexOf());
console.log(airline.indexOf('r'));
console.log(airline.lastIndexOf('r'));
console.log(airline.indexOf('Portugal'));
console.log(airline.indexOf('portugal'));

// str.slice(basla [, bitir])
// Karakter dizisinin başla ile başlayan bitir(dahil değil)
// ile bitirilen aralıktaki karakterleri alır.
console.log(airline.slice(4));
console.log(airline.slice(4, 7));
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));
console.log(airline.slice(-2));
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are minddle seats
  const s = seat.slice(-1);
  if ((s === 'B', s === 'E')) console.log('You got the middle seat 🙄');
  else console.log('You got lucky 😎');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas'));
console.log(typeof new String('jonas'));

console.log(typeof new String('jonas').slice(1));

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////
// Coding Challenge #3

Let's continue with our football betting app! This time, we have a map with a log of the events that happened during the game. The values are the events themselves, and the keys are the minutes in which each event happened (a football game has 90 minutes plus some extra time).
1. Create an array 'events' of the different game events that happened (no duplicates)
2. After the game has finished, is was found that the yellow card from minute 64 was unfair. So remove this event from the game events log.
3. Print the following string to the console: "An event happened, on average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over the events and log them to the console, marking whether it's in the first half or second half (after 45 min) of the game, like this:
      [FIRST HALF] 17: ⚽️ GOAL
GOOD LUCK 😀


const gameEvents = new Map([
  [17, '⚽️ GOAL'],
  [36, '🔁 Substitution'],
  [47, '⚽️ GOAL'],
  [61, '🔁 Substitution'],
  [64, '🔶 Yellow card'],
  [69, '🔴 Red card'],
  [70, '🔁 Substitution'],
  [72, '🔁 Substitution'],
  [76, '⚽️ GOAL'],
  [80, '⚽️ GOAL'],
  [92, '🔶 Yellow card'],
]);


// 1.
const events = [...new Set(gameEvents.values())];
console.log(events);
// 2.
gameEvents.delete(64);
// 3.
console.log(
  `An event happened, on average, every ${90 / gameEvents.size} minutes`
);
const time = [...gameEvents.keys()].pop();
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
// 4.
for (const [min, event] of gameEvents) {
  const half = min <= 45 ? 'FIRST' : 'SECOND';
  console.log(`[${half} HALF] ${min}: ${event}`);
}

const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct '],
  [false, 'Try again!'],
]);
console.log(question);

// Convert object to map
// map.entries() – [key, value] girişleri için bir yinelenebilir
//  döndürür, for..of içinde varsayılan olarak kullanılır.
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

//  Quiz app
console.log(question.get('question'));
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}

const answer = 3;
// const answer = Number(prompt('Your answer:'));
console.log(answer);

console.log(question.get(question.get('correct') === answer));

// Convert map to array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]);
console.log([...question.values()]);
 
///////////////////////////////////////////////
///////////////////////////////////////////////
//////////////// MAPS
// new Map() – map yaratır.
const rest = new Map();

// map.set(key, value) – Anahtara değer atar.
rest.set('name', 'İskender Kebab');
rest.set(1, 'Kayhan Çarşısı, Bursa');
rest.set(2, 'Eyüp Sultan, İstanbul');
console.log(rest);

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open : D')
  .set(false, 'We are closed :(');

// map.get(key) – Anahtarın değerini döndürür. Eğer öyle bir anahtar yoksa undefined döndürür.
console.log(rest.get('name'));
console.log(rest.get(true));
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// map.has(key) – Eğer öyle bir anahtar varsa true yoksa false döndürür.
console.log(rest.has('categories'));

// map.delete(key) – Verilen anahtara ait değeri siler.
rest.delete(2);
console.log(rest);

// map.size – anlık eleman sayısını döndürür.
console.log(rest.size);

// map.clear() – Mapin içini temizler.
// rest.clear();

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1', 'Heading'));
console.log(rest);
console.log(rest.size);

console.log(rest.get(arr));
  
///////////////////////////////////////////////
///////////////////////////////////////////////
//////////////// SETS

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);

console.log(ordersSet);
// new Set(iterable) – set oluşturur, isteğe bağlı olarak değerler içeren diziden de oluşturulabilir.
console.log(new Set('Emre'));
// set.size – eleman sayısını döndürür.
console.log(ordersSet.size);
// set.has(value) – Eğer öyle bir değer varsa true yoksa false döndürür.
console.log(ordersSet.has('Pizza'));
console.log(ordersSet.has('Tost'));
// set.add(value) – bir değer ekler, set’in kendisini döndürür
console.log(ordersSet.add('Kıymalı Börek'));
// set.delete(value) – değeri siler. Eğer öyle bir değer varsa true yoksa false döndürür.
console.log(ordersSet.delete('Risotto'));
console.log(ordersSet.delete('Makarna'));
console.log(ordersSet);
// set.clear() – set’in içindeki her şeyi siler.
// ordersSet.clear();
console.log(ordersSet);

for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);
console.log(new Set('jonasandemreonal').size);
 
///////////////////////////////////////
// Coding Challenge #

Let's continue with our football betting app!
1. Loop over the game.scored array and print each player name to the console, along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exaclty like this:
      Odd of victory Bayern Munich: 1.33
      Odd of draw: 3.25
      Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them (except for "draw"). HINT: Note how the odds and the game objects have the same property names 😉
BONUS: Create an object called 'scorers' which contains the names of the players who scored as properties, and the number of goals as the value. In this game, it will look like this:
      {
        Gnarby: 1,
        Hummels: 1,
        Lewandowski: 2
      }
GOOD LUCK 😀

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// 1.
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);
// 2.
const odds = Object.values(game.odds);
let average = 0;
for (const odd of odds) average += odd;
average /= odds.length;
console.log(average);
// 3.
for (const [team, odd] of Object.entries(game.odds)) {
  const teamStr = team === 'x' ? 'draw' : `victory ${game[team]}`;
  console.log(`Odd of ${teamStr} ${odd}`);
}
// Odd of victory Bayern Munich: 1.33
// Odd of draw: 3.25
// Odd of victory Borrussia Dortmund: 6.5
// BONUS
// So the solution is to loop over the array, and add the array elements as object properties, and then increase the count as we encounter a new occurence of a certain element
const scorers = {};
for (const player of game.scored) {
  scorers[player] ? scorers[player]++ : (scorers[player] = 1);
}


///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries


// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);
// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

/////////////////////////////////////////////////////////////////////////////7
///////// Optional Chaining
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// WITH optional chaining  isteğe bağlı zincirleme
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours.mon?.open);

// Example
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// Methods
console.log(restaurant.orderKebabs?.(0, 1) ?? 'Method does not exit');

// Arrays
// const users = [{ name: 'Emre', email: 'test@gmail.com' }];
const users = [];
console.log(users[0]?.name ?? 'Kullanıcı dizisi boş');

if (users.length > 0) console.log(users[0].name);
else console.log('user array empty, kullanıcı dizisi boş');

/////////////////////////////////////////////////////////////////////////////////////////
///////////////The for-of loop///////////////////////////////////////////////////////////

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
for (const item of menu) console.log(item);

for (const [i, el] of menu.entries()) {
  // console.log(item);
  console.log(`${i + 1}: ${el}`);
}

// console.log([...menu.entries()]);

///////////////////////////////////////
// Coding Challenge #1

We're building a football betting app (soccer for my American friends 😅)!
Suppose we get data from a web service about a certain game (below). In this challenge we're gonna work with the data. So here are your tasks:
1. Create one player array for each team (variables 'players1' and 'players2')
2. The first player in any player array is the goalkeeper and the others are field players. For Bayern Munich (team 1) create one variable ('gk') with the goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10 field players
3. Create an array 'allPlayers' containing all players of both teams (22 players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a new array ('players1Final') containing all the original team1 players plus 'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called 'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player names (NOT an array) and prints each of them to the console, along with the number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which team is more likely to win, WITHOUT using an if/else statement or the ternary operator.
TEST DATA FOR 6: Use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'. Then, call the function again with players from game.scored
GOOD LUCK 😀
*/

/*
// 1.
const [players1, players2] = game.players;
console.log(players1, players2);
// 2.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);
// 3.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);
// 4.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];
// 5.
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);
// 6.
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored`);
};
// printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
// printGoals('Davies', 'Muller');
printGoals(...game.scored);
// 7.
team1 < team2 && console.log('Team 1 is more likely to win');
team1 > team2 && console.log('Team 2 is more likely to win');

///////////////////////////////////////////////////////////////////////
// Logical Assignment Operators ///////////////////////////////////////
const rest1 = {
  name: 'Capri',
  // numGuests: 20,
  numGuests: 0,
};
const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};
// OR assignment operator
// rest1.numGuests = rest1.numGuests || 10;
// rest2.numGuests = rest2.numGuests || 10;
// rest1.numGuests ||= 10;
// rest2.numGuests ||= 10;
// nullish assignment operator (null or undefined)
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

// AND assignment operator
// rest1.owner = rest1.owner && '<ANONYMOUS>';
// rest2.owner = rest2.owner && '<ANONYMOUS>';
rest1.owner &&= '<ANONYMOUS>';
rest2.owner &&= '<ANONYMOUS>';
console.log(rest1);
console.log(rest2);

/////////////////////////////////////////////////////////////////////////////////////////
/////////// The Nullish Coalescing Operator ////////////////////////////////////////////
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null and undefined (NOT 0 or '')
// Nullish Coalesing operatörü ise sadece null veya undefined değerlerini yanlış (falsy),
// harici tüm değerleri doğru (truthy) kabul eder.
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

////////////////////////////////////////////////////////////////////////////////
// Short Circuiting && and  ||

console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting
console.log(3 || 'Jonas');
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || '' || 'Hello' || 23 || null);
console.log(undefined || 0 || '' || 23 || null);

restaurant.numGuests = 0;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('---- AND ----');
console.log(0 && 'Jonas');
console.log(7 && 'Jonas');
console.log('Hello' && 23 && null && 'jonas');
// Practical examples
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

/////////////////////////////////////////////////////////////////////////////////
////////////// Rest Pattern and Parameters //////////////////////////////////////
// 1-)  Destructuring

// SPREAD, because on RIGHT side of =  çünkü SAĞ tarafta
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of = çünkü SOL tarafta
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, risotto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2-) Functions
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);
add(8, 2, 5, 3, 2, 1, 4, 4, 5, 65, 77, 77, 8, 84, 5, 667, 8, 98);

const x = [23, 5, 7];
add(...x);

restaurant.orderPizza('zeytinli', 'pastirmali', 'sucuklu', 'peynirli');
restaurant.orderPizza('zeytinli');

/////////////////////////////////////////////////////////////////////////////////
//////////// The Spread Operator (...) Kullanımı //////////////////////////////////////
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

const newMenu = [...restaurant.mainMenu, 'Turkish Kebab'];
console.log(newMenu);

//  Copy Array Array Kopyalama
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 arrays birleştirmek
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Iterables: arrays, strings, maps, sets. NOT Objects // Genişletir.
const str = 'Jonas';
const letters = [...str, ' ', 'S.'];
console.log(letters);
console.log(...str);
console.log('j', 'o');
// console.log(`${...str} Scmedtmann`);

// Real-world example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt('Ingredient 2?'),
  // prompt('Ingredient 3?'),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Objects
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Capadocia';
console.log(restaurantCopy.name);
console.log(restaurant.name);

/////////////////////////////////////////////////////////////////////////////////////
////////////////// Destructing Objects /////////////////////////////////////////////

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

// Default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

// Mutating variables //Değişkenleri mutasyona uğratmak
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };

({ a, b } = obj);
console.log(a, b);

// Nested objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

/////////////////////////////////////////////////////////////////////////////////////////
////////////////// Destructing Arrays ///////////////////////////////////////////////////
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

const [x, y, z] = arr;
console.log(x, y, z);
console.log(arr);

let [main, , secondary] = restaurant.categories;
console.log(main, secondary);

// Switching Variables // Değişkenleri Değiştirme
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

[main, secondary] = [secondary, main];
console.log(main, secondary);

// console.log(restaurant.order(2, 0));
// Receive 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);
const [i, , [j, k]] = nested;
console.log(i, j, k);

// Default values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
 */
