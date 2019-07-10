export const env = (key: string, defaultValue: any = "") => process.env[key] || defaultValue;

export const config = (key: string, defaultValue: any = ""): any => {
  const data = key.split('.');
  const name = data[0];
  data.splice(0, 1);
  const configArray = data.join('.');
  const path = `${__dirname}/../config/${name}`;

  try {
    const file = require(path).default;
    return configArray && configArray !== '' ? file[configArray] || defaultValue : file;
  } catch (e) {
    return defaultValue;
  }
};

export const wait = async (time: number = 500) => new Promise(resolve => setTimeout(resolve, time));

export const toBase64 = (str: string) => Buffer.from(str).toString('base64');
