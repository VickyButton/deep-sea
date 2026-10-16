import type { SignalController } from './signalController.types';
import type { Signal, SignalCallback } from '../../signal/signal.types';

/** The main implementation of the SignalController interface. */
export class SignalController_Main implements SignalController {
  private readonly manager = new CallbackGroupManager(() => this.isListening);
  private _isListening = false;

  public get isListening() {
    return this._isListening;
  }

  public clear() {
    this.manager.clear();
  }

  public deregister<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    this.manager.remove(signal, callback);
  }

  public register<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    this.manager.add(signal, callback);
  }

  public startListening() {
    this.manager.registerDelegators();
    this._isListening = true;
  }

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
    this.addToGroup(signal, callback);
  }

  private addToGroup<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    const group = this.getOrCreateGroup<CallbackData>(signal);

    group.add(callback);
  }

  private getOrCreateGroup<CallbackData>(signal: Signal<CallbackData>) {
    return this.getGroup<CallbackData>(signal) ?? this.createGroup<CallbackData>(signal);
  }

  private getGroup<CallbackData>(signal: Signal<CallbackData>) {
    return this.groups.get(signal) as CallbackGroup<CallbackData> | undefined;
  }

  private createGroup<CallbackData>(signal: Signal<CallbackData>) {
    const group = new CallbackGroup<CallbackData>();

    this.setGroup(signal, group);

    if (this.isListening) {
      this.registerDelegator(signal, group.delegator);
    }

    return group;
  }

  private registerDelegator<CallbackData>(signal: Signal<CallbackData>, delegator: SignalCallback<CallbackData>) {
    signal.listen(delegator);
  }

  private setGroup<CallbackData>(signal: Signal<CallbackData>, group: CallbackGroup<CallbackData>) {
    this.groups.set(signal, group as CallbackGroup<unknown>);
  }

  public clear() {
    for (const [signal, group] of this.groups) {
      this.removeGroup(signal, group);
    }
  }

  private removeGroup<CallbackData>(signal: Signal<CallbackData>, group: CallbackGroup<CallbackData>) {
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

  private deregisterDelegator<CallbackData>(signal: Signal<CallbackData>, delegator: SignalCallback<CallbackData>) {
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
    this.removeFromGroup(signal, callback);
  }

  private removeFromGroup<CallbackData>(signal: Signal<CallbackData>, callback: SignalCallback<CallbackData>) {
    const group = this.getGroup<CallbackData>(signal);

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
