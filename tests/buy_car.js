import {ClientFunction, Selector} from 'testcafe';
const dataSet = require('./fixtures.json')

fixture('Search a car')
    .page('https://ab.onliner.by/')
    .skipJsErrors();

test('Search for a car', async t =>{
    //Set max window size before test
    await t.maximizeWindow()
    //Declare element selectors
    const country = Selector('.vehicle-form__input').withText('Все страны'),
          region = Selector('.vehicle-form__input').withText('Все области'),
          city = Selector('.vehicle-form__input').withText('Все города'),
          brand =  Selector('.vehicle-form__input').withText('Марка'),
          model = Selector('.vehicle-form__input').withText('Модель'),
          price_from = Selector('input').withAttribute('placeholder','от'),
          price_to = Selector('input').withAttribute('placeholder','до')
    //Country filter
    await t.click(country)
    await t.typeText(Selector('input').withAttribute('placeholder','Найти страну'),dataSet.car.country)
            .pressKey('down').pressKey('enter')
    //Region filter
    await t.click(region)
    await t.typeText(Selector('input').withAttribute('placeholder','Найти область'),dataSet.car.region)
            .pressKey('down').pressKey('enter')
    //City filter
    await t.click(city)
    await t.typeText(Selector('input').withAttribute('placeholder','Найти город'),dataSet.car.city)
            .pressKey('down').pressKey('enter')
    //Brand filter
    await t.click(brand)
    await t.typeText(Selector('input').withAttribute('placeholder','Найти марку'),dataSet.car.brand)
            .pressKey('down').pressKey('enter')
    await t.click(model)
    await t.typeText(Selector('input').withAttribute('placeholder','Найти модель'),dataSet.car.model)
    .pressKey('down').pressKey('enter')
    await t.typeText(price_from,dataSet.car.price_from)
    await t.typeText(price_to,dataSet.car.price_to).pressKey('tab')
    //Assert the title 
    const titles = Selector('.vehicle-form__link_primary-alter').innerText
    await t.expect(titles).contains('BMW')

    await t.click(Selector('.vehicle-form__link_primary-alter').nth(0))
    await t.wait(3000)
    //Assert that filters work correctly 
    const region_assertion = Selector('.vehicle-form__intro-item').withText('Минск').exists;

    await t.expect(region_assertion).ok()
        })