class Tracker {
  private sendTimeout = 1000; // ms
  private buffer: IEvent[] = [];
  private timer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    window.addEventListener("unload", () => this.send(true));
  }

  track(event: string, ...tags: string[]): void {
    // @ts-ignore
    this.buffer.push({
      event,
      tags,
      url: this.getUrl(),
      title: this.getPageTitle(),
      ts: this.getTime(),
    });

    this.send();
  }

  private getUrl(): string {
    return location.href;
  }

  private getPageTitle(): string {
    return document.title;
  }

  private getTime(): string {
    return new Date().toISOString();
  }

  private send(force: boolean = false): void {
    const sendEvents = (byTimer: boolean) => {
      if (this.buffer.length > 0) {
        let bufferFallback: IEvent[] = this.buffer;

        fetch("http://localhost:8001/track", {
          method: "POST",
          body: JSON.stringify(this.buffer),
        }).catch((e) => {
          console.log("buffer send error", e, bufferFallback);
          this.buffer = [...this.buffer, ...bufferFallback];
        });

        console.log(
          "events sent" + (byTimer ? " by timer" : ""),
          this.buffer.map((event) => event.event)
        );

        this.buffer = [];
      }
    };

    if (!this.timer || this.buffer.length >= 3 || force) {
      sendEvents(false);

      this.timer = setTimeout(() => {
        sendEvents(true);
        this.timer = null;
      }, this.sendTimeout);
    }
  }
}

const tracker = new Tracker();
