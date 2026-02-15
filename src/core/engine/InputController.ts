type KeyboardEventListener = (e: KeyboardEvent) => void;

export class InputController {
  private keypressEventListeners = new Set<KeyboardEventListener>();

  private onKeypress = (e: KeyboardEvent) => {
    for (const eventListener of this.keypressEventListeners) eventListener(e);
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
   * Attaches event delegation listeners from the document.
   */
  public attachListeners() {
    document.addEventListener('keypress', this.onKeypress);
  }

  /**
   * Detaches event delegation listeners from the document.
   */
  public detachListeners() {
    document.removeEventListener('keypress', this.onKeypress);
  }
}

let inputController = new InputController();

export function useInput() {
  return inputController;
}

export function resetInput() {
  inputController = new InputController();
}
