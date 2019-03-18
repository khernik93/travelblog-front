import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { TabDTO, Post, PostContentDTO } from '../../../../shared/clients/backend/backend.model';

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
  @Output('onFormSubmit') formSubmitEmitter = new EventEmitter<Post>();

  selectedTab: number;
  content: string = ''; // wysiwyg
  postForm: FormGroup;
  contentPlaceholder$ = new Subject<string>();

  private destroy$ = new Subject();

  constructor(
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.buildPostForm();
  }

  private buildPostForm(): void {
    this.postForm = new FormGroup({
      id: new FormControl(null),
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
        takeUntil(this.destroy$),
        filter((post: PostContentDTO) => !!post)
      )
      .subscribe((post: PostContentDTO) => {
        this.postForm.controls['id'].patchValue(post.id);
        this.postForm.controls['tabId'].patchValue(post.tab.id);
        this.postForm.controls['title'].patchValue(post.title);
        this.postForm.controls['tags'].patchValue(post.tags.join(','));
        this.synchronizeContent(post.content);
        this.contentPlaceholder$.next(post.content);
        this.ref.markForCheck();
      });
  }

  synchronizeContent(content: string) {
    this.content = content;
  }
  
  submit() {
    this.sanitizePostFormValues();
    this.formSubmitEmitter.emit({
      ...this.postForm.value,
      tabId: +this.postForm.value.tabId,
      content: this.content 
    });
  }

  private sanitizePostFormValues() {
    const v = this.postForm.value;
    for (let k in v) {
      if (v[k] === null || v[k] === undefined) {
        delete this.postForm.value[k];
      }
    }
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
