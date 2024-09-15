import {describe, expect, test} from '@jest/globals';
import App from '../src/App';

describe('app work proprely', () => {
  test('app container instance with no error', async () => {
    const app = await App.getInstance();
    expect(app).toBeInstanceOf(App);
    expect(app.services).toBeInstanceOf(Map);
    expect(app.services.size).toBeGreaterThan(0);
  });
});