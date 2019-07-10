import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { Provider } from '../App/Providers/Provider';
import { providers } from './kernal';
dotenv.config();

export function loadProviders() {
  const proms: Promise<{ default: Provider }>[] = [];

  providers.forEach(provider => {
    const file = __dirname + '/../' + provider + '.ts';
    if (fs.existsSync(file)) {
      proms.push(import(file).then(instance => instance.default));
    } else {
      console.log("Provider", provider, "not found.", "\nFile", file);
    }
  });

  return Promise.all(proms).then(data => {
    data.forEach(provider => {
      if (provider instanceof Provider) {
        provider.boot();
      } else {
        console.log("Provider", provider.constructor.name, "is not valid.");
      }
    });
    return data;
  }).then(data => {
    data.forEach(provider => {
      if (provider instanceof Provider) {
        provider.register();
      }
    });
  });
};



export default function bootstrap(): Promise<any> {
  return loadProviders();
}
