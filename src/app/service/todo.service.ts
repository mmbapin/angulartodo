import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FieldValue } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { map, retry } from 'rxjs/operators';
import { increment } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  constructor(private _afs: AngularFirestore, private toastr: ToastrService) {}

  saveTodo(id: string, data: any) {
    // console.log(Firestore);
    this._afs
      .collection('categories')
      .doc(id)
      .collection('todos')
      .add(data)
      .then((ref) => {
        this._afs.doc('categories/' + id).update({ todoCount: increment(1) });
        this.toastr.success('New Todo Saved Successfully.');
      });
  }

  loadTodos(id: string) {
    return this._afs
      .collection('categories')
      .doc(id)
      .collection('todos')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          return actions.map((todo) => {
            const data = todo.payload.doc.data();
            const id = todo.payload.doc.id;
            return { id, data };
          });
        })
      );
  }
}
