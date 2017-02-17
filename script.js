var Nightmare = require('nightmare');       
var nightmare = Nightmare({ 
	show: true,
	gotoTimeout: 10000,
	waitTimeout: 10000
});

var numbers = [
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10
]

// numbers.reduce(function(accumulator, number) {
// 	return accumulator.then(function(results) {
// 		return nightmare
// 			.goto('https://embed-338334.secondstreetapp.com/embed/8d52ea1e-508c-493e-ad4e-f04105081473/gallery/55334793/')
// 			.wait('.vote')
// 			.wait(1000)
// 			.click('.vote')
// 			.wait(1000)
// 			.wait('[data-field-id="40"]')
// 			.type('[data-field-id="40"] input', 'Jason')
// 			.type('[data-field-id="41"] input', 'Statham')
// 			.type('[data-field-id="39"] input', 'bbobington8' + number + '@gmail.com')
// 			.type('[data-field-id="43"] input', '90210')
// 			.type('[data-field-id="44"] input', '02131985')
// 			.click('button[type="submit"]')
// 			.wait(5000)
// 			.end()
// 			.then(function (result) {
// 				console.log(result);
// 			})
// 			.catch(function (error) {
// 				console.error('Search failed:', error);	      
// 			});
// 	})
// }, Promise.resolve([])).then(function(results){
//     console.dir(results);
// });

nightmare
	.goto('https://embed-338334.secondstreetapp.com/embed/8d52ea1e-508c-493e-ad4e-f04105081473/gallery/55334793/')
	.wait('.vote')
	.wait(1000)
	.click('.vote')
	.wait(1000)
	.wait('[data-field-id="40"]')
	.type('[data-field-id="40"] input', 'Chris')
	.type('[data-field-id="41"] input', 'Coomer')
	.type('[data-field-id="39"] input', 'somename654@gmail.com')
	.type('[data-field-id="43"] input', '90210')
	.type('[data-field-id="44"] input', '02131985')
	.click('button[type="submit"]')
	.wait(5000)
	.end()
	.then(function (result) {
		console.log(result);
	})
	.catch(function (error) {
		console.error('Search failed:', error);	      
	});