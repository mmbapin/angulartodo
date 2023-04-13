import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import {map} from 'rxjs/operators'

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


  getCategories(){
    return this._afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        console.log("Action", actions);
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }


  updateCategory(id: string, updateData: any){
    this._afs.doc('categories/'+ id).update({category: updateData}).then(() =>{
      console.log("Updated");
      this.toastr.success('Category Edit Successfully.');
    })
  }


  deleteCategory(id: string, category: string){
    this._afs.doc('categories/'+ id).delete().then(() => {
      console.log(category + "Deleted");
      this.toastr.error(`${category} Deleted Successfully`);
    })
  }
}
