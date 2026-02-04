import { error } from '@core/utils/logger';

interface AudioState {
  volume: number;
  isMuted: boolean;
}

const LOG_TAG = 'Audio';
const VOLUME_MIN = -1;
const VOLUME_MAX = 4;

export class Audio {
  private state: AudioState;
  private audioContext?: AudioContext;
  private gainNode?: GainNode;

  constructor() {
    this.state = this.getDefaultState();
  }

  /**
   * Creates an audio context with an attached gain node for audio control.
   */
  public initialize() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = this.state.volume;
  }

  /**
   * Sets audio volume.
   *
   * @param volume Volume, in gain. Minimum -1, maximum 4.
   */
  public setVolume(volume: number) {
    if (!this.gainNode) throw new Error('Gain node not set');

    const adjustedVolume = Math.max(Math.min(volume, VOLUME_MAX), VOLUME_MIN);

    this.state.volume = adjustedVolume;
    this.gainNode.gain.value = adjustedVolume;
  }

  /**
   * Mutes all audio.
   */
  public mute() {
    if (!this.gainNode) throw new Error('Gain node not set');

    this.state.isMuted = true;
    this.gainNode.gain.value = -1;
  }

  /**
   * Unmutes all audio.
   */
  public unmute() {
    if (!this.gainNode) throw new Error('Gain node not set');

    this.state.isMuted = false;
    this.gainNode.gain.value = this.state.volume;
  }

  /**
   * Plays an audio buffer once.
   *
   * @param buffer The audio buffer to play once.
   * @returns Callback to stop the loop.
   */
  public playBuffer(buffer: AudioBuffer) {
    const source = this.createBufferSource(buffer);

    source.start();

    return () => {
      source.stop();
    };
  }

  /**
   * Plays an audio buffer on loop.
   *
   * @param buffer The audio buffer to play on loop.
   * @returns Callback to stop the loop.
   */
  public loopBuffer(buffer: AudioBuffer) {
    const source = this.createBufferSource(buffer);

    source.loop = true;
    source.start();

    return () => {
      source.stop();
    };
  }

  /**
   * Loads an audio file from the src/assets/audio directory as an audio buffer.
   *
   * @param fileName The file name, including the file extension.
   * @returns The audio file decoded as an audio buffer.
   */
  public async loadBuffer(fileName: string) {
    if (!this.audioContext) throw new Error('Audio context not set');

    try {
      const filePath = `/src/assets/audio/${fileName}`;
      const response = await fetch(filePath);

      return await this.audioContext.decodeAudioData(await response.arrayBuffer());
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? `Unable to load ${fileName}: ${err.message}`
          : `Unable to load ${fileName}`;

      error(LOG_TAG, errorMessage);
    }
  }

  private createBufferSource(buffer: AudioBuffer) {
    if (!this.audioContext) throw new Error('Audio context not set');

    const source = this.audioContext.createBufferSource();

    this.applyGain(source);

    source.buffer = buffer;
    source.connect(this.audioContext.destination);

    return source;
  }

  private applyGain(source: AudioBufferSourceNode) {
    if (!this.gainNode) throw new Error('Gain node not set');

    source.connect(this.gainNode);
  }

  private getDefaultState() {
    return {
      volume: 1,
      isMuted: false,
    };
  }
}
