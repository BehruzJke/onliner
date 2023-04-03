import {ClientFunction, Selector} from 'testcafe';
const dataSet = require('./fixtures.json')

fixture('Forum')
    .page('https://forum.onliner.by/')
    .skipJsErrors();

test('Search for topic and message', async t =>{
    const topic_seach = Selector('.fast-search__input'),
    message_search = Selector('#search_keywords'),
    messages = Selector('.content')
    await t.typeText(topic_seach, dataSet.forum.topic).wait(3000)
    //Assert the result
    await t.switchToIframe(Selector('.modal-iframe'))
    await t.expect(Selector('.result__item_forum').nth(0).innerText).contains(dataSet.forum.topic)
           .click(Selector('.result__item_forum').nth(0))
           .wait(3000)
    await t.switchToMainWindow()
    await t.typeText(message_search, dataSet.forum.message)
           .pressKey('enter')
           .wait(3000)
    await t.expect(messages.innerText).contains('bmw'|'BMW')
})