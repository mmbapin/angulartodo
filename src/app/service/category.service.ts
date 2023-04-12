import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private _afs: AngularFirestore, private toastr: ToastrService) {}

  saveCategory(data: any) {
    this._afs
      .collection('categories')
      .add(data)
      .then((ref) => {
        this.toastr.success('New Category Saved Successfully.');
      });
  }
}
