import { clamp } from '../../utils/clamp';

/** A color which can be converted into a string. */
export class Color {
  private _r: number;
  private _g: number;
  private _b: number;
  private _a: number;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    this._r = r !== undefined ? this.clampColorComponent(r) : Color.COLOR_COMPONENT_MAX;
    this._g = g !== undefined ? this.clampColorComponent(g) : Color.COLOR_COMPONENT_MAX;
    this._b = b !== undefined ? this.clampColorComponent(b) : Color.COLOR_COMPONENT_MAX;
    this._a = a !== undefined ? this.clampAlphaComponent(a) : Color.ALPHA_COMPONENT_MAX;
  }

  /** The color's red value, ranging from 0 to 255 inclusive. */
  public get r() {
    return this._r;
  }

  public set r(r: number) {
    this._r = this.clampColorComponent(r);
  }

  /** The color's green value, ranging from 0 to 255 inclusive. */
  public get g() {
    return this._g;
  }

  public set g(g: number) {
    this._g = this.clampColorComponent(g);
  }

  /** The color's blue value, ranging from 0 to 255 inclusive. */
  public get b() {
    return this._b;
  }

  public set b(b: number) {
    this._b = this.clampColorComponent(b);
  }

  private clampColorComponent(value: number) {
    return clamp(value, Color.COLOR_COMPONENT_MIN, Color.COLOR_COMPONENT_MAX);
  }

  /** The color's alpha value, ranging from 0 to 1 inclusive. */
  public get a() {
    return this._a;
  }

  public set a(a: number) {
    this._a = this.clampAlphaComponent(a);
  }

  private clampAlphaComponent(value: number) {
    return clamp(value, Color.ALPHA_COMPONENT_MIN, Color.ALPHA_COMPONENT_MAX);
  }

  public toString() {
    return `rgba(${this._r},${this._g},${this._b},${this._a})`;
  }

  public static get RED() {
    return new Color(255, 0, 0, 1);
  }

  public static get GREEN() {
    return new Color(0, 255, 0, 1);
  }

  public static get BLUE() {
    return new Color(0, 0, 255, 1);
  }

  public static get WHITE() {
    return new Color(255, 255, 255, 1);
  }

  public static get BLACK() {
    return new Color(0, 0, 0, 1);
  }

  private static readonly COLOR_COMPONENT_MIN = 0;
  private static readonly COLOR_COMPONENT_MAX = 255;
  private static readonly ALPHA_COMPONENT_MIN = 0;
  private static readonly ALPHA_COMPONENT_MAX = 1;
}
