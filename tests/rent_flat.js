import {ClientFunction, Selector} from 'testcafe';
const dataSet = require('./fixtures.json')

fixture('Rent flat')
    .page(`https://r.onliner.by/ak`)
    .skipJsErrors();

test('Apply filters', async t => {
//Declare inputs
const rent_type = Selector('.filter__item-inner').withText(dataSet.rent.type),
      size = Selector('.filter__item-inner').withText(dataSet.rent.rooms),
      price_from = Selector('#search-filter-price-from'),
      price_to = Selector('#search-filter-price-to'),
      metro_range = Selector('.dropdown_2'),
      region = Selector('input').withAttribute('placeholder','Город, улица')
//apply rent type
await t.click(rent_type)
//apply size filter
await t.click(size)
//apply price range filter
await t.typeText(price_from, dataSet.rent.price_from)
await t.typeText(price_to, dataSet.rent.price_to)
//Metro vicinity filter
await t.click(metro_range)
       .click(Selector('li').withText(dataSet.rent.metro))
//Region filter
await t.typeText(region, dataSet.rent.region)
        .wait(2000)
        .pressKey('enter')
        .wait(2000)
// test('Sort results');
await t.click(Selector('.classified').nth(0)).wait(2000)
//assert infornation correctness
let price = await Selector('.apartment-bar__price-value_complementary').innerText
price = Number(price.replace('$','').replace(/\s/g, ''))
//Assert the price
await t.expect(price).gte(Number(dataSet.rent.price_from))
await t.expect(price).lte(Number(dataSet.rent.price_to))

});

