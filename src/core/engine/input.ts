type KeyboardEventListener = (e: KeyboardEvent) => void;

class InputController {
  private keypressEventListeners = new Set<KeyboardEventListener>();
  private keydownEventListeners = new Set<KeyboardEventListener>();
  private keyupEventListeners = new Set<KeyboardEventListener>();

  private onKeypress = (e: KeyboardEvent) => {
    for (const eventListener of this.keypressEventListeners) eventListener(e);
  };

  private onKeydown = (e: KeyboardEvent) => {
    for (const eventListener of this.keydownEventListeners) eventListener(e);
  };

  private onKeyup = (e: KeyboardEvent) => {
    for (const eventListener of this.keyupEventListeners) eventListener(e);
  };

  /**
   * Adds an event listener for the 'keypress' event.
   *
   * @param eventListener The event listener to add.
   */
  public addKeypressEventListener(eventListener: KeyboardEventListener) {
    this.keypressEventListeners.add(eventListener);
  }

  /**
   * Removes an event listener for the 'keypress' event.
   *
   * @param eventListener The event listener to remove.
   */
  public removeKeypressEventListener(eventListener: KeyboardEventListener) {
    this.keypressEventListeners.delete(eventListener);
  }

  /**
   * Adds an event listener for the 'keydown' event.
   *
   * @param eventListener The event listener to add.
   */
  public addKeydownEventListener(eventListener: KeyboardEventListener) {
    this.keydownEventListeners.add(eventListener);
  }

  /**
   * Removes an event listener for the 'keydown' event.
   *
   * @param eventListener The event listener to remove.
   */
  public removeKeydownEventListener(eventListener: KeyboardEventListener) {
    this.keydownEventListeners.delete(eventListener);
  }

  /**
   * Adds an event listener for the 'keyup' event.
   *
   * @param eventListener The event listener to add.
   */
  public addKeyupEventListener(eventListener: KeyboardEventListener) {
    this.keyupEventListeners.add(eventListener);
  }

  /**
   * Removes an event listener for the 'keyup' event.
   *
   * @param eventListener The event listener to remove.
   */
  public removeKeyupEventListener(eventListener: KeyboardEventListener) {
    this.keyupEventListeners.delete(eventListener);
  }

  /**
   * Attaches event delegation listeners from the document.
   */
  public attachListeners() {
    document.addEventListener('keypress', this.onKeypress);
    document.addEventListener('keydown', this.onKeydown);
    document.addEventListener('keyup', this.onKeyup);
  }

  /**
   * Detaches event delegation listeners from the document.
   */
  public detachListeners() {
    document.removeEventListener('keypress', this.onKeypress);
    document.removeEventListener('keydown', this.onKeydown);
    document.removeEventListener('keyup', this.onKeyup);
  }
}

let inputController = new InputController();

export function useInput() {
  return inputController;
}

export function resetInput() {
  inputController = new InputController();
}
