import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PostContentDTO, CommentDTO } from '../../../../shared/clients/backend/backend.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Comment } from '../../containers/comments/comments.model';

@Component({
  selector: 'comments-component',
  styleUrls: ['./comments.component.scss'],
  templateUrl: './comments.component.html'
})
export class CommentsComponent {

  @Input() post$: Observable<PostContentDTO>;
  @Input() comments$: Observable<CommentDTO[]>;
  @Input() addNewCommentForm: FormGroup;

  @Output('onFormSubmit') addNewCommentEmitter = new EventEmitter<Comment>();

  ngOnInit() {
    this.buildAddNewCommentForm();
  }

  private buildAddNewCommentForm(): void {
    this.addNewCommentForm = new FormGroup({
      name: new FormControl(''),
      content: new FormControl('', Validators.required),
      email: new FormControl('')
    });
  }

  addNewComment() {
    this.addNewCommentEmitter.emit(this.addNewCommentForm.value);
  }

  isInvalid(control: string): boolean {
    const isValid = this.addNewCommentForm.get(control).valid;
    const isTouched = this.addNewCommentForm.get(control).touched;
    return !isValid && isTouched;
  }

}
