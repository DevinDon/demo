const randomID = () => BigInt(Math.round(Math.random() * 31));

export class SnowFlake {

  private readonly twepoch = 1548988646430n;

  /** 标识 ID */
  private readonly workerIDBits: bigint = 5n;
  /** 机器 ID */
  private readonly dataCenterIDBits: bigint = 5n;
  /** 序列 ID */
  private readonly sequenceBits: bigint = 12n;

  private readonly maxWorkerID: bigint = -1n ^ (-1n << this.workerIDBits);
  private readonly maxDataCenterID: bigint = -1n ^ (-1n << this.dataCenterIDBits);
  private readonly sequenceMask: bigint = -1n ^ (-1n << this.sequenceBits);

  private readonly workerIDShift: bigint = this.sequenceBits;
  private readonly dataCenterIDShift: bigint = this.sequenceBits + this.workerIDBits;
  private readonly timestampLeftShift: bigint = this.dataCenterIDShift + this.dataCenterIDBits;

  private sequence: bigint = 0n;
  private lastTimestamp: bigint = -1n;

  private readonly workerID: bigint;
  private readonly dataCenterID: bigint;

  constructor(workerID: bigint = randomID(), dataCenterID: bigint = randomID()) {
    if (workerID > this.maxWorkerID || workerID < 0n) {
      throw new Error(
        `workerID can't be greater than ${this.maxWorkerID} or less than 0`,
      );
    }
    if (dataCenterID > this.maxDataCenterID || dataCenterID < 0n) {
      throw new Error(
        `dataCenterID can't be greater than ${this.maxDataCenterID} or less than 0`,
      );
    }
    this.workerID = workerID;
    this.dataCenterID = dataCenterID;
  }

  public nextID(): bigint {
    let timestamp = this.currentTime();
    const diff = timestamp - this.lastTimestamp;

    if (diff < 0n) {
      throw new Error(
        `Clock moved backwards. Refusing to generate id for ${-diff} milliseconds`,
      );
    }

    if (diff === 0n) {
      this.sequence = (this.sequence + 1n) & this.sequenceMask;
      if (this.sequence == 0n) {
        timestamp = this.nextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }

    this.lastTimestamp = timestamp;

    return (
      ((timestamp - this.twepoch) << this.timestampLeftShift) |
      (this.dataCenterID << this.dataCenterIDShift) |
      (this.workerID << this.workerIDShift) |
      this.sequence
    );
  }

  private nextMillis(lastTimeStamp: bigint): bigint {
    let timestamp: bigint = this.currentTime();
    while (timestamp <= lastTimeStamp) {
      timestamp = this.currentTime();
    }
    return timestamp;
  }

  private currentTime(): bigint {
    return BigInt(Date.now());
  }

}
