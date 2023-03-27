import {ClientFunction, Selector} from 'testcafe';
const dataSet = require('./fixtures.json')

fixture('Search a car')
    .page('https://ab.onliner.by/')
    .skipJsErrors();

test('Search for a car', async t =>{})