import type { Signal } from '../signal/Signal';
import type { SignalCallback } from '../signal/signal.types';

/** A controller used to delegate signal callbacks and toggle listening. */
export class SignalController {
  private readonly manager = new CallbackGroupManager(() => this.isListening);
  private _isListening = false;

  /** A flag indicating if the controller is listening for signals. */
  public get isListening() {
    return this._isListening;
  }

  /** Clears all signal delegators. */
  public clear() {
    this.manager.clear();
  }

  /**
   * Deregisters a callback from a signal delegator.
   * @param signal The signal the callback is grouped under.
   * @param callback The callback to deregister.
   */
  public deregister<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    this.manager.remove(signal, callback);
  }

  /**
   * Registers a callback to a signal delegator.
   * @param signal The signal the callback should be grouped under.
   * @param callback The callback to register.
   */
  public register<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    this.manager.add(signal, callback);
  }

  /** Starts listening for signals. */
  public startListening() {
    this.manager.registerDelegators();
    this._isListening = true;
  }

  /** Stops listening for signals. */
  public stopListening() {
    this.manager.deregisterDelegators();
    this._isListening = false;
  }
}

/** Sorts callbacks into signal-specific groups. */
class CallbackGroupManager {
  private readonly groups = new Map<Signal<unknown>, CallbackGroup<unknown>>();
  private readonly _isListening: () => boolean;

  constructor(isListening: () => boolean) {
    this._isListening = isListening;
  }

  private get isListening() {
    return this._isListening();
  }

  /**
   * Adds a callback to its signal-specific callback group.
   * @param signal The signal to group the callback under.
   * @param callback The callback to add.
   */
  public add<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    this.addToGroup(signal as Signal<unknown>, callback as SignalCallback<unknown>);
  }

  private addToGroup(signal: Signal<unknown>, callback: SignalCallback<unknown>) {
    const group = this.getOrCreateGroup(signal);

    group.add(callback);
  }

  private getOrCreateGroup(signal: Signal<unknown>) {
    return this.getGroup(signal) ?? this.createGroup(signal);
  }

  private getGroup(signal: Signal<unknown>) {
    return this.groups.get(signal) as CallbackGroup<unknown> | undefined;
  }

  private createGroup(signal: Signal<unknown>) {
    const group = new CallbackGroup<unknown>();

    this.setGroup(signal, group);

    if (this.isListening) {
      this.registerDelegator(signal, group.delegator);
    }

    return group;
  }

  private registerDelegator(signal: Signal<unknown>, delegator: SignalCallback<unknown>) {
    signal.listen(delegator);
  }

  private setGroup(signal: Signal<unknown>, group: CallbackGroup<unknown>) {
    this.groups.set(signal, group as CallbackGroup<unknown>);
  }

  public clear() {
    for (const [signal, group] of this.groups) {
      this.removeGroup(signal, group);
    }
  }

  private removeGroup(signal: Signal<unknown>, group: CallbackGroup<unknown>) {
    this.groups.delete(signal);

    if (this.isListening) {
      this.deregisterDelegator(signal, group.delegator);
    }
  }

  /** Deregisters group delegators from their respective signals. */
  public deregisterDelegators() {
    for (const [signal, group] of this.groups) {
      this.deregisterDelegator(signal, group.delegator);
    }
  }

  private deregisterDelegator(signal: Signal<unknown>, delegator: SignalCallback<unknown>) {
    signal.unlisten(delegator);
  }

  /** Registers group delegators to their respective signals. */
  public registerDelegators() {
    for (const [signal, group] of this.groups) {
      this.registerDelegator(signal, group.delegator);
    }
  }

  /**
   * Removes a callback from its signal-specific callback group.
   * @param signal The signal the callback is grouped under.
   * @param callback The callback to add.
   */
  public remove<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    this.removeFromGroup(signal as Signal<unknown>, callback as SignalCallback<unknown>);
  }

  private removeFromGroup(signal: Signal<unknown>, callback: SignalCallback<unknown>) {
    const group = this.getGroup(signal);

    if (group === undefined) {
      return;
    }

    group.remove(callback);

    if (group.isEmpty) {
      this.removeGroup(signal, group);
    }
  }
}

/** A group of callbacks for an individual signal. */
class CallbackGroup<CallbackData> {
  private readonly callbacks = new Set<SignalCallback<CallbackData>>();

  /** The delegator callback for the group. */
  public get delegator() {
    return this.executeAll;
  }

  private executeAll = (data: CallbackData) => {
    this.callbacks.forEach((callback) => callback(data));
  };

  /** Whether or not the group is empty. */
  public get isEmpty() {
    return this.callbacks.size === 0;
  }

  /**
   * Adds a callback to the group.
   * @param callback The callback to add to the group.
   */
  public add(callback: SignalCallback<CallbackData>) {
    this.callbacks.add(callback);
  }

  /**
   * Removes a callback from the group.
   * @param callback The callback to remove from the group.
   */
  public remove(callback: SignalCallback<CallbackData>) {
    this.callbacks.delete(callback);
  }
}
