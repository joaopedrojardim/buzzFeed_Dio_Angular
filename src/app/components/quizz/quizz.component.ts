import { Component, OnInit } from '@angular/core';
import quizz_questions from './../../../assets/data/quizz-questions.json'
import { exhaustAll } from 'rxjs';

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.scss']
})
export class QuizzComponent implements OnInit{

  title:string = ''
  questions:any
  questionSelected:any
  answers:string[] = []
  answerSelected:string = ''
  questionIndex:number = 0
  questionMaxIndex:number = 0
  finished:boolean = false

  constructor(){}

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title
      this.questions = quizz_questions
      this.questionSelected = quizz_questions.questions[this.questionIndex]
      this.questionIndex = 0
      this.questionMaxIndex = this.questions.questions.length

    }
  }

  escolha(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+= 1
    if(this.questionMaxIndex > this.questionIndex){
      this.questionSelected = this.questions.questions[this.questionIndex]
    }else{
      this.finished = true
      const finalResult:string = await this.checkResult(this.answers)
      this.answerSelected = quizz_questions.results[finalResult as keyof  typeof quizz_questions.results]
    }
  }

  async checkResult(anwsers:string[]){
    const result = anwsers.reduce((previus, current, i, arr) =>{
      if(arr.filter(item => item ===  previus).length > arr.filter(item => item ===  current).length){
        return previus
      }else{
        return current
      }
    })
    return result
  }
}
