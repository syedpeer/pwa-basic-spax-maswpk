
class PWASpeakers {
  constructor() {
    console.log('hello from speakers.js');
    this.speakersDiv = document.querySelector('.speakers');
    this.init();
  }

  async init() {
    console.log('hello from init..');
    await this.loadSpeakers();
  }

  async loadSpeakers() {
    console.log('hello from loadSpeakers..');
    //this.speakers = await this.fetchJSON('./speakers.json');
    this.speakers = (await import('./speakers.json')).default;

    this.speakersDiv.innerHTML = this.speakers
      .map(this.toSpeakerBlock)
      .join('\n');
  }

  toSpeakerBlock(speaker) {
    return `
        <div class="speaker">
          <img src="${speaker.picture}" alt="${speaker.name}">
          <div>${speaker.name}</div>
        </div>`;
  }

  addSpeakerDetails(item) {
    if (item.speakerId) {
      return Object.assign({}, item, {
        speaker: this.speakers.find(s => s.id === item.speakerId)
      });
    }
    return Object.assign({}, item);
  }
}

window.addEventListener('load', e => {
  new PWASpeakers();
});
