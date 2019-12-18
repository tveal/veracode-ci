#!/usr/bin/env node

import { argv } from 'yargs';
import Connector from './connector';

const main = async () => {
  
  if (argv.sandbox) {
    console.log('Veracode: scanning in sandbox...');

    let excludes = null;
    if (argv.excludes) {
      excludes = argv.excludes.split(',');
    }
    const options = {
      appId: argv.appId,
      appName: argv.appName,
      excludes,
    };

    try {
      await new Connector(options).scanInSandbox();
    } catch (err) {
      console.log(`FAILED to trigger new veracode scan; ${err}`);
    }
  } else {
    console.log('Veracode: DO NOTHING; no --sandbox flag and nothing else implemented...');
  }

};

main();
