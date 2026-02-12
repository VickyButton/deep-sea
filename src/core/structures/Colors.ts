const RGB_VALUE_MAX = 255;
const RGB_VALUE_MIN = 0;

const ALPHA_VALUE_MAX = 1;
const ALPHA_VALUE_MIN = 0;

export class ColorRGB {
  protected _r: number;
  protected _g: number;
  protected _b: number;

  constructor(r = 0, g = 0, b = 0) {
    this._r = this.clampRgbValue(r);
    this._g = this.clampRgbValue(g);
    this._b = this.clampRgbValue(b);
  }

  public get r() {
    return this._r;
  }

  public set r(value: number) {
    this._r = this.clampRgbValue(value);
  }

  public get g() {
    return this._g;
  }

  public set g(value: number) {
    this._g = this.clampRgbValue(value);
  }

  public get b() {
    return this._b;
  }

  public set b(value: number) {
    this._b = this.clampRgbValue(value);
  }

  /**
   * Sets the RGB components of the color.
   * @param r The red component of the color.
   * @param g The green component of the color.
   * @param b The blue component of the color.
   */
  public set(r = 0, g = 0, b = 0) {
    this._r = this.clampRgbValue(r);
    this._g = this.clampRgbValue(g);
    this._b = this.clampRgbValue(b);
  }

  /**
   * Compares two colors for RGB equality.
   * @param color The color to compare.
   * @returns True if RGB values are equal, false if not.
   */
  public equalsRgb(color: ColorRGB) {
    return this.r === color.r && this.g === color.g && this.b === color.b;
  }

  /**
   * Converts the color into RGB string format.
   * @returns The color as an RGB string.
   */
  public toRgbString() {
    return `rgb(${this.r.toString()},${this.g.toString()},${this.b.toString()})`;
  }

  /**
   * Represents the color red.
   */
  public static get red() {
    return new ColorRGB(255, 0, 0);
  }

  /**
   * Represents the color orange.
   */
  public static get orange() {
    return new ColorRGB(255, 165, 0);
  }

  /**
   * Represents the color yellow.
   */
  public static get yellow() {
    return new ColorRGB(255, 255, 0);
  }

  /**
   * Represents the color green.
   */
  public static get green() {
    return new ColorRGB(0, 255, 0);
  }

  /**
   * Represents the color blue.
   */
  public static get blue() {
    return new ColorRGB(0, 0, 255);
  }

  /**
   * Represents the color indigo.
   */
  public static get indigo() {
    return new ColorRGB(75, 0, 130);
  }

  /**
   * Represents the color violet.
   */
  public static get violet() {
    return new ColorRGB(238, 130, 238);
  }

  /**
   * Represents the color black.
   */
  public static get black() {
    return new ColorRGB(0, 0, 0);
  }

  /**
   * Represents the color white.
   */
  public static get white() {
    return new ColorRGB(255, 255, 255);
  }

  protected clampRgbValue(value: number) {
    return Math.max(Math.min(value, RGB_VALUE_MAX), RGB_VALUE_MIN);
  }
}

export class ColorRGBA extends ColorRGB {
  private _a: number;

  constructor(r = 0, g = 0, b = 0, a = 1) {
    super(r, g, b);

    this._a = this.clampAlphaValue(a);
  }

  public get a() {
    return this._a;
  }

  public set a(value: number) {
    this._a = this.clampAlphaValue(value);
  }

  /**
   * Sets the RGBA components of the color.
   * @param r The red component of the color.
   * @param g The green component of the color.
   * @param b The blue component of the color.
   * @param a The alpha component of the color.
   */
  public set(r = 0, g = 0, b = 0, a = 1) {
    super.set(r, g, b);

    this._a = this.clampAlphaValue(a);
  }

  /**
   * Compares two colors for RGBA equality.
   * @param color The color to compare.
   * @returns True if RGBA values are equal, false if not.
   */
  public equalsRgba(color: ColorRGBA) {
    return this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a;
  }

  /**
   * Converts the color into RGBA string format.
   * @returns The color as an RGBA string.
   */
  public toRgbaString() {
    return `rgba(${this.r.toString()},${this.g.toString()},${this.b.toString()},${this.a.toString()})`;
  }

  public static get red() {
    return new ColorRGBA(255, 0, 0);
  }

  public static get orange() {
    return new ColorRGBA(255, 165, 0);
  }

  public static get yellow() {
    return new ColorRGBA(255, 255, 0);
  }

  public static get green() {
    return new ColorRGBA(0, 255, 0);
  }

  public static get blue() {
    return new ColorRGBA(0, 0, 255);
  }

  public static get indigo() {
    return new ColorRGBA(75, 0, 130);
  }

  public static get violet() {
    return new ColorRGBA(238, 130, 238);
  }

  public static get black() {
    return new ColorRGBA(0, 0, 0);
  }

  public static get white() {
    return new ColorRGBA(255, 255, 255);
  }

  private clampAlphaValue(value: number) {
    return Math.max(Math.min(value, ALPHA_VALUE_MAX), ALPHA_VALUE_MIN);
  }
}
