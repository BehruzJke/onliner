import {ClientFunction, Selector} from 'testcafe';

const dataSet = require('./fixtures.json')
fixture('Buy flat')
    .page('https://r.onliner.by/pk/')
    .skipJsErrors();


test('Apply filters', async t => {
    //Apply price filter
    const minprice = Selector('#search-filter-price-from')
    await t.typeText(minprice,dataSet.buy.min_price)
            .pressKey('tab')
            .wait(2000)
    var pricemin = await Selector('.classified__price-value_complementary').nth(0).find('span').nth(0).innerText
    pricemin = pricemin.replace(/\s/g, '');
    await t.expect(Number(pricemin)).gt(parseInt(Number(dataSet.buy.min_price)))
    //apply maximum price filter
    const maxprice = Selector('#search-filter-price-to')
    await t.typeText(maxprice, dataSet.buy.max_price)
           .pressKey('tab')
           .wait(2000)
    var pricemax = await Selector('.classified__price-value_complementary').nth(0).find('span').nth(0).innerText
    pricemax = pricemax.replace(/\s/g, '');
    await t.expect(Number(pricemax)).lt(parseInt(Number(dataSet.buy.max_price)))
    //apply rooms filter
    const roomsfilter = Selector('.filter__item.filter__item_25').withText(dataSet.buy.rooms)
    await t.click(roomsfilter)
            .wait(3000)
    await t.expect(Selector('.classified__caption-item_type-count').innerText).contains('3')
    //apply area filter
    const minarea = Selector('#search-filter-area-from')
    const maxarea = Selector ('#search-filter-area-to')
    await t.typeText(minarea, dataSet.buy.min_area)
            .pressKey('tab')
            .typeText(maxarea, dataSet.buy.max_area)
            .wait(3000)
    let area = await Selector('span').withAttribute('data-bind','text: apartment.area.total').nth(0).innerText
    await t.expect(parseInt(area))
            .gte(Number(dataSet.buy.min_area))
            // .lt(dataSet.buy.max_area)
    await t.expect(parseInt(area))
            .lte(Number(dataSet.buy.max_area))
    //Apply condition
    const condition = Selector('.filter__item-inner').withText(dataSet.buy.newness)
    await t.click(condition)
            .wait(4000)
    //Apply year filters
    const year_from = Selector('#search-filter-year-from')
    const year_to = Selector('#search-filter-year-to')
    await t.typeText(year_from, dataSet.buy.year_from)
            .pressKey('tab')
            .typeText(year_to, dataSet.buy.year_to)
            .pressKey('tab')
            .wait(2000)

    //Apply location filter
    await t.typeText(Selector('input').withAttribute('placeholder','Город, район, улица'), dataSet.buy.region)
            .wait(2000)
            .pressKey('enter')
            .wait(2000)
    
    //apply material filter
    await t.click(Selector('.dropdown_2'))
    await t.click(Selector('li').withText(dataSet.buy.wall_material)).wait(2000)

    //Open the result and assert details
    await t.click(Selector('.classified__handle').nth(0))
            .wait(5000)
    //assertions
    await t.expect(Selector('.apartment-options__item').nth(0).innerText).contains(dataSet.buy.newness)
    await t.expect(Selector('.apartment-options__item').nth(1).innerText).contains(dataSet.buy.wall_material)
});

// test('Sort results');


