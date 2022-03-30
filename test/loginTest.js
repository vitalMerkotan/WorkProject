const {Builder,By,Key, until, Capabilities} = require("selenium-webdriver");
const assert=require("assert");

const correctName="vitalii";
const correctPassword="Faad67A$";
const incorrectName="vital";
const incorrectPassword="Faad67A";


async function positivLoginTest(){

const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {args: ['--headless']});
let driver = await new Builder().forBrowser("chrome").withCapabilities(chromeCapabilities).build();


await driver.get("https://demoqa.com/books");

await driver.findElement(By.xpath('//button[@id="login"]')).click();
await driver.findElement(By.xpath('//input[@id="userName"]')).sendKeys(correctName);
await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys(correctPassword);
await driver.findElement(By.xpath('//button[@id="login"]')).click();
await driver.wait(until.elementLocated(By.xpath('//label[@id="userName-value"]'),100000));
const userNameElement=await driver.findElement(By.xpath('//label[@id="userName-value"]'));
const userNameValue = await userNameElement.getText();
assert.strictEqual(userNameValue, "vitalii");

await driver.quit();
};
positivLoginTest();

async function negativLoginTestInvalidName(){

    const chromeCapabilities = Capabilities.chrome();
    chromeCapabilities.set('chromeOptions', {args: ['--headless']});
    let driver = await new Builder().forBrowser("chrome").withCapabilities(chromeCapabilities).build();

await driver.get("https://demoqa.com/books");

await driver.findElement(By.xpath('//button[@id="login"]')).click();
await driver.findElement(By.xpath('//input[@id="userName"]')).sendKeys(incorrectName);
await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys(correctPassword);
await driver.findElement(By.xpath('//button[@id="login"]')).click();
await driver.wait(until.elementLocated(By.xpath('//p[@id="name"]'),100000));
const isElementDisplayed = await driver.findElement(By.xpath('//p[@id="name"]')).isDisplayed();
assert.strictEqual(isElementDisplayed, true);

await driver.quit();
};
negativLoginTestInvalidName();

async function negativLoginTestInvalidPassword(){

const chromeCapabilities = Capabilities.chrome();
chromeCapabilities.set('chromeOptions', {args: ['--headless']});
let driver = await new Builder().forBrowser("chrome").withCapabilities(chromeCapabilities).build();

await driver.get("https://demoqa.com/books");

await driver.findElement(By.xpath('//button[@id="login"]')).click();
await driver.findElement(By.xpath('//input[@id="userName"]')).sendKeys(correctName);
await driver.findElement(By.xpath('//input[@id="password"]')).sendKeys(incorrectPassword);
await driver.findElement(By.xpath('//button[@id="login"]')).click();
await driver.wait(until.elementLocated(By.xpath('//p[@id="name"]'),100000));
const isElementDisplayed = await driver.findElement(By.xpath('//p[@id="name"]')).isDisplayed();
assert.strictEqual(isElementDisplayed, true);

await driver.quit();

};
negativLoginTestInvalidPassword();
