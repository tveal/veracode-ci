import 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import VeracodeClient from '@jupiterone/veracode-client';

import Connector from '../../src/connector';

const VC_CLIENT = sinon.createStubInstance(VeracodeClient);
const env = { ...process.env };

describe('connector.js', () => {
  beforeEach(() => {
    process.env = {};
  });
  afterEach(() => {
    process.env = { ...env };
  });
  describe('Constructor', () => {
    it('should have default values for minimal env variables', () => {
      const robotId = 'test-robot-id';
      const robotKey = 'test-robot-key';

      process.env.VERA_ID = robotId;
      process.env.VERA_KEY = robotKey;

      const cx = new Connector();

      expect(cx.robotId).to.equal(robotId);
      expect(cx.robotKey).to.equal(robotKey);
      expect(cx.appId).to.equal(undefined);
      expect(cx.appName).to.equal(undefined);
      expect(cx.appVersion).to.equal(undefined);
      expect(cx.sandboxName).to.equal(undefined);
      expect(cx.excludes).to.deep.equal(['node_modules/**/*']);
      expect(cx.scanAllNonfatalTopLevelModules).to.equal(false);
      expect(cx.autoScan).to.equal(true);
    });
    it('should default appId to env variable', () => {
      const appId = 'test-app-id';

      process.env.VERA_ID = 'test-robot-id';
      process.env.VERA_KEY = 'test-robot-key';
      process.env.VERA_APP_ID = appId;

      const cx = new Connector();

      expect(cx.appId).to.equal(appId);
    });
    it('should default appName to env variable', () => {
      const appName = 'test-app-name';

      process.env.VERA_ID = 'test-robot-id';
      process.env.VERA_KEY = 'test-robot-key';
      process.env.VERA_APP_NAME = appName;

      const cx = new Connector();

      expect(cx.appName).to.equal(appName);
    });
    it('should default appVersion to env variable', () => {
      const appVersion = 'test-app-version';

      process.env.VERA_ID = 'test-robot-id';
      process.env.VERA_KEY = 'test-robot-key';
      process.env.npm_package_version = appVersion;

      const cx = new Connector();

      expect(cx.appVersion).to.equal(appVersion);
    });
    it('should default sandboxName to env variable', () => {
      const sandboxName = 'test-sandbox-name';

      process.env.VERA_ID = 'test-robot-id';
      process.env.VERA_KEY = 'test-robot-key';
      process.env.npm_package_name = sandboxName;

      const cx = new Connector();

      expect(cx.sandboxName).to.equal(sandboxName);
    });
    it('should set everything from options', () => {
      const options = {
        robotId: 'options robot id',
        robotKey: 'options robot key',
        appId: 'options app id',
        appName: 'options app name',
        appVersion: 'options app version',
        sandboxName: 'options sandbox name',
        excludes: ['lib'],
        scanAllNonfatalTopLevelModules: true,
        autoScan: false,
      };

      const cx = new Connector(options);

      expect(cx.robotId).to.equal(options.robotId);
      expect(cx.robotKey).to.equal(options.robotKey);
      expect(cx.appId).to.equal(options.appId);
      expect(cx.appName).to.equal(options.appName);
      expect(cx.appVersion).to.equal(options.appVersion);
      expect(cx.sandboxName).to.equal(options.sandboxName);
      expect(cx.excludes).to.deep.equal(options.excludes);
      expect(cx.scanAllNonfatalTopLevelModules).to.equal(true);
      expect(cx.autoScan).to.equal(false);
    });
    it('should throw error if no VERA_ID set', () => {
      process.env.VERA_KEY = 'test robotic key';

      let expectedError = null;
      try {
        // eslint-disable-next-line
        const cx = new Connector();
      } catch (err) {
        expectedError = err;
      }

      expect(expectedError.message).to.equal('Property robotId was not set. Cannot continue.');
    });
    it('should throw error if no VERA_KEY set', () => {
      process.env.VERA_ID = 'test robotic id';

      let expectedError = null;
      try {
        // eslint-disable-next-line
        const cx = new Connector();
      } catch (err) {
        expectedError = err;
      }

      expect(expectedError.message).to.equal('Property robotKey was not set. Cannot continue.');
    });
  });
});
