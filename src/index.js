import './css/styles.css';

class PWAConfApp {
  constructor() {
    this.speakersDiv = document.querySelector('.speakers');
    this.scheduleDiv = document.querySelector('.schedule');
    this.faqDiv = document.querySelector('.faq');
    this.init();
  }

  async init() {
    await this.loadSpeakers();
    this.loadSchedule();
    this.loadFaq();

    document.querySelector("#speakers").style.display = "none";
    document.querySelector("#schedule").style.display = "none";
    document.querySelector("#code-of-conduct").style.display = "none";
    document.querySelector("#videos").style.display = "none";

    document.querySelector("#faq").style.display = "none";
    document.querySelector("#resources").style.display = "none";
    document.querySelector("#about").style.display = "none";    

    this.registerSW();
  }

  async loadSpeakers() {
    //this.speakers = await this.fetchJSON('./speakers.json');
    this.speakers = (await import('./data/speakers.json')).default;

    this.speakersDiv.innerHTML = this.speakers
      .map(this.toSpeakerBlock)
      .join('\n');
  }

  async loadSchedule() {
    //const rawSchedule = await this.fetchJSON('./schedule.json');
    //const rawSchedule = await this.fetchJSON('https://raw.githubusercontent.com/syedpeer/MyFiles/master/schedule.json');

    const rawSchedule = (await import('./data/schedule.json')).default;

    //const rawSchedule = (await fetch('https://github.com/syedpeer/MyFiles/blob/master/schedule.json?raw=tue')).default;
    //https://raw.githubusercontent.com/syedpeer/MyFiles/master/schedule.json
    //https://github.com/syedpeer/MyFiles/blob/master/schedule.json?raw=tue
    //
    // Add speaker details to array
    this.schedule = rawSchedule.map(this.addSpeakerDetails, this);
    this.scheduleDiv.innerHTML = this.schedule
      .map(this.toScheduleBlock)
      .join('\n');
  }

  async loadFaq() {
    //const rawSchedule = await this.fetchJSON('./schedule.json');
    //const rawSchedule = await this.fetchJSON('https://raw.githubusercontent.com/syedpeer/MyFiles/master/schedule.json');

    const rawFaq = (await import('./data/faq.json')).default;

    //const rawSchedule = (await fetch('https://github.com/syedpeer/MyFiles/blob/master/schedule.json?raw=tue')).default;
    //https://raw.githubusercontent.com/syedpeer/MyFiles/master/schedule.json
    //https://github.com/syedpeer/MyFiles/blob/master/schedule.json?raw=tue
    //
    // Add speaker details to array
    this.faq = rawFaq.map(this.addSpeakerDetails, this);
    this.faqDiv.innerHTML = this.faq
      .map(this.toScheduleBlock)
      .join('\n');
  }

/*
  async getJSON(path, callback) {
      return callback(await fetch(path).then(r => r.json()));
  }

  getJSON('https://raw.githubusercontent.com/syedpeer/MyFiles/master/schedule.json', info => console.log(info.title));
  */



  toSpeakerBlock(speaker) {
    return `
        <div class="speaker">
          <img src="${speaker.picture}" alt="${speaker.name}">
          <div>${speaker.name}</div>
        </div>`;
  }

  toScheduleBlock(scheduleItem) {
    return `
      <div class="schedule-item ${scheduleItem.category}">
        <div class="title-and-time">
          <div class="time">${scheduleItem.startTime}</div>
          <div class="title-and-speaker">
            <div class="title">${scheduleItem.title}</div>
            <div class="speaker">${
              scheduleItem.speaker ? scheduleItem.speaker.name : '&nbsp;'
            }</div>
          </div>
        </div>
        <p class="description">${scheduleItem.description}</p>
      </div>
    `;
  }

  addSpeakerDetails(item) {
    if (item.speakerId) {
      return Object.assign({}, item, {
        speaker: this.speakers.find(s => s.id === item.speakerId)
      });
    }
    return Object.assign({}, item);
  }

  async registerSW() {
    if ('serviceWorker' in navigator) {
      try {
        await navigator.serviceWorker.register('./sw.js');
      } catch (e) {
        alert('ServiceWorker registration failed. Sorry about that.');
      }
    } else {
      document.querySelector('.alert').removeAttribute('hidden');
    }
  }
}

window.addEventListener('load', e => {
  new PWAConfApp();
});
