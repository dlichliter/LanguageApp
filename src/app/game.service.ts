import { Injectable } from '@angular/core';
import { Questions } from './mock-questions';

@Injectable ({
  providedIn: 'root',
})
export class GameService {
  private score = 0;
  private currentImages = [[], []];
  private currentQuestion = '';
  private showModal = true;
  private correctAnswer = true;
  private interval = null;
  private timerDuration = 1000 * 60;
  private timerSequence = 100;
  private timerChunk = 100 / this.timerDuration * this.timerSequence;
  private timeLeftPercent = 0;

  public getTimeLeftPercent(): number {
    return this.timeLeftPercent;
  }

  public getShowModal(): boolean {
    return this.showModal;
  }

  public getCorrectAnswer(): boolean {
    return this.correctAnswer;
  }

  public getScore(): number {
    return this.score;
  }

  public getCurrentImages(): string[][] {
    return this.currentImages;
  }

  public getCurrentQuestion(): string {
    return this.currentQuestion;
  }

  public startGame(): void {
    this.score = 0;
    this.currentQuestion = '';
    this.getRandomQuestions();

    this.interval = setInterval(() => {
      if (this.timeLeftPercent < 100) {
        this.timeLeftPercent += this.timerChunk;
      } else {
        clearInterval(this.interval);
        // TODO: end game
      }
    }, this.timerSequence);
  }

  private getRandomQuestions(): void {
    // randomize array
    Questions.sort(() => .5 - Math.random());
    // get first four images
    const randomImages = Questions.slice(0, 4);
    // pick random image to be the current question
    this.currentQuestion = randomImages[Math.floor(Math.random() * randomImages.length)];
    // update the images to be shown in the game
    this.currentImages = [[randomImages[0], randomImages[1]], [randomImages[2], randomImages[3]]];
  }
}
