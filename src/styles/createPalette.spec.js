// @flow

import { assert } from 'chai';
import createPalette, { dark, light } from './createPalette';
import { indigo, pink, deepOrange, green } from '../colors';
import consoleErrorMock from '../../test/utils/consoleErrorMock';
import { lighten, darken } from '../styles/colorManipulator';

describe('createPalette()', () => {
  before(() => {
    consoleErrorMock.spy();
  });

  after(() => {
    consoleErrorMock.reset();
  });

  it('should create a material design palette according to spec', () => {
    const palette = createPalette({});
    assert.strictEqual(
      palette.primary.main,
      indigo[500],
      'should use indigo[500] as the default primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      indigo[300],
      'should use indigo[300] as the default primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      indigo[700],
      'should use indigo[700] as the default primary dark color',
    );
    assert.strictEqual(
      palette.primary.contrastText,
      dark.text.primary,
      'should use dark.text.primary as the default primary contrastText color',
    );
    assert.strictEqual(
      palette.secondary.main,
      pink.A400,
      'should use pink.A400 as the default secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      pink.A200,
      'should use pink.A200 as the default secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      pink.A700,
      'should use pink.A700 as the default secondary dark color',
    );
    assert.strictEqual(
      palette.secondary.contrastText,
      dark.text.primary,
      'should use dark.text.primary as the default secondary contrastText color',
    );
    assert.strictEqual(
      palette.text,
      light.text,
      'should use light theme text for a light theme by default',
    );
  });

  it('should create a palette with custom colors', () => {
    const palette = createPalette({
      primary: {
        main: deepOrange[500],
        light: deepOrange[300],
        dark: deepOrange[700],
        contrastText: '#ffffff',
      },
      secondary: {
        main: green.A400,
        light: green.A200,
        dark: green.A700,
        contrastText: '#000000',
      },
    });
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      deepOrange[300],
      'should use deepOrange[300] as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      deepOrange[700],
      'should use deepOrange[700] as the primary dark color',
    );
    assert.strictEqual(
      palette.primary.contrastText,
      '#ffffff',
      'should use #ffffff as the secondary contrastText color',
    );
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      green.A200,
      'should use green.A200 as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      green.A700,
      'should use green.A700 as the secondary dark color',
    );
    assert.strictEqual(
      palette.secondary.contrastText,
      '#000000',
      'should use #000000 as the secondary contrastText color',
    );
    assert.strictEqual(palette.text, light.text, 'should use light theme text');
  });

  it('should calculate light and dark colors if not provided', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
      secondary: { main: green.A400 },
    });
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      lighten(deepOrange[500], 0.2),
      'should use lighten(deepOrange[500], 0.2) as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      darken(deepOrange[500], 0.3),
      'should use darken(deepOrange[500], 0.3) as the primary dark color',
    );
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      lighten(green.A400, 0.2),
      'should use lighten(green.A400, 0.2) as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      darken(green.A400, 0.3),
      'should use darken(green.A400, 0.3) as the secondary dark color',
    );
  });

  it('should calculate light and dark colors using the provided tonalOffset', () => {
    const palette = createPalette({
      primary: { main: deepOrange[500] },
      secondary: { main: green.A400 },
      tonalOffset: 0.1,
    });
    assert.strictEqual(
      palette.primary.main,
      deepOrange[500],
      'should use deepOrange[500] as the primary main color',
    );
    assert.strictEqual(
      palette.primary.light,
      lighten(deepOrange[500], 0.1),
      'should use lighten(deepOrange[500], 0.1) as the primary light color',
    );
    assert.strictEqual(
      palette.primary.dark,
      darken(deepOrange[500], 0.15),
      'should use darken(deepOrange[500], 0.1) as the primary dark color',
    );
    assert.strictEqual(
      palette.secondary.main,
      green.A400,
      'should use green.A400 as the secondary main color',
    );
    assert.strictEqual(
      palette.secondary.light,
      lighten(green.A400, 0.1),
      'should use lighten(green.A400, 0.1) as the secondary light color',
    );
    assert.strictEqual(
      palette.secondary.dark,
      darken(green.A400, 0.15),
      'should use darken(green.A400, 0.1) as the secondary dark color',
    );
  });

  it('should calculate contrastText using the provided contrastThreshold', () => {
    const palette = createPalette({ contrastThreshold: 7 });
    assert.strictEqual(
      palette.primary.contrastText,
      light.text.primary,
      'should use dark.text.primary as the default primary contrastText color',
    );
    assert.strictEqual(
      palette.secondary.contrastText,
      light.text.primary,
      'should use dark.text.primary as the default secondary contrastText color',
    );
  });

  it('should create a dark palette', () => {
    const palette = createPalette({ type: 'dark' });
    assert.strictEqual(
      palette.primary.main,
      indigo[500],
      'should use indigo as the default primary color',
    );
    assert.strictEqual(
      palette.secondary.main,
      pink.A400,
      'should use pink as the default secondary color',
    );
    assert.strictEqual(palette.text, dark.text, 'should use dark theme text');
    assert.strictEqual(consoleErrorMock.callCount(), 0);
  });

  it('should throw an exception when an invalid type is specified', () => {
    assert.throw(() => {
      createPalette({ type: 'foo' });
    });
    assert.strictEqual(consoleErrorMock.callCount(), 1);
    assert.match(
      consoleErrorMock.args()[0][0],
      /Material-UI: the palette type `foo` is not supported/,
    );
  });
});
