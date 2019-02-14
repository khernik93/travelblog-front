import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TabDTO } from '../../../../shared/clients/api/api.model';
import { Post } from '../../containers/addNewPost/addNewPost.model';

@Component({
  selector: 'addNewPost-component',
  templateUrl: './addNewPost.component.html',
  styleUrls: ['./addNewPost.component.scss']
})
export class AddNewPostComponent implements OnInit {

  @Input() tabs$: Observable<TabDTO[]>;

  selectedTab: number;
  content: string = ''; // wysiwyg
  addNewPostForm: FormGroup;

  @Output('onFormSubmit') formSubmitEmitter = new EventEmitter<Post>();

  ngOnInit() {
    this.buildAddNewPostForm();
  }

  private buildAddNewPostForm(): void {
    this.addNewPostForm = new FormGroup({
      tabId: new FormControl(0, Validators.min(1)),
      title: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });
  }

  synchronizeContent(content: string) {
    this.content = content;
  }
  
  addNewPost() {
    this.formSubmitEmitter.emit({ 
      ...this.addNewPostForm.value,
      tabId: +this.addNewPostForm.value.tabId,
      content: this.content 
    });
  }

  isInvalid(control: string): boolean {
    const isValid = this.addNewPostForm.get(control).valid;
    const isTouched = this.addNewPostForm.get(control).touched;
    return !isValid && isTouched;
  }

}
