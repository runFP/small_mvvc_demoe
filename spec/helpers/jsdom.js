import {JSDOM} from 'jsdom';
import fs from 'fs'
import path from 'path'

const htmlString = fs.readFileSync(path.resolve(__dirname, '../../src/home/home.html'));
const dom = new JSDOM(htmlString);

global.document = dom.window.document;
global.window = dom.window;
global.navigator = dom.window.navigator;
global.HTMLInputElement = dom.window.HTMLInputElement;
global.Event = dom.window.Event;
