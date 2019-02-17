import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { TabDTO, Post, PostContentDTO } from '../../../../shared/clients/api/api.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'postForm-component',
  templateUrl: './postForm.component.html',
  styleUrls: ['../../admin.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {

  @Input() tabs$: Observable<TabDTO[]>;
  @Input() post$: Observable<PostContentDTO>;
  @Input() title: string;
  @Input() submitText: string;

  selectedTab: number;
  content: string = ''; // wysiwyg
  postForm: FormGroup;
  contentInitial$ = new Subject<string>();

  @Output('onFormSubmit') formSubmitEmitter = new EventEmitter<Post>();

  private postId: number;
  private destroy$ = new Subject();

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildPostForm();
  }

  private buildPostForm(): void {
    this.postForm = new FormGroup({
      tabId: new FormControl(0, Validators.min(1)),
      title: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required)
    });
    if (this.post$) {
      this.prefillValues();
    }
  }

  private prefillValues() {
    this.post$
      .pipe(
        filter((post: PostContentDTO) => !!post)
      )
      .subscribe((post: PostContentDTO) => {
        this.postId = post.id;
        this.postForm.controls['tabId'].patchValue(post.tab.id);
        this.postForm.controls['title'].patchValue(post.title);
        this.postForm.controls['tags'].patchValue(post.tags.join(','));
        this.content = post.content;
        this.contentInitial$.next(post.content);
        this.ref.markForCheck();
      });
  }

  synchronizeContent(content: string) {
    this.content = content;
  }
  
  submit() {
    this.formSubmitEmitter.emit({ 
      id: this.postId,
      ...this.postForm.value,
      tabId: +this.postForm.value.tabId,
      content: this.content 
    });
  }

  isInvalid(control: string): boolean {
    const isValid = this.postForm.get(control).valid;
    const isTouched = this.postForm.get(control).touched;
    return !isValid && isTouched;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
