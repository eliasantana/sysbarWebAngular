import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface ConfirmeDialogData{
  titulo:string;
  mensagem:string;
}

@Component({
  selector: 'app-confirme-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirme-dialog.html',
  styleUrl: './confirme-dialog.css',
})
export class ConfirmeDialog {

  public dialogRef=inject(MatDialogRef<ConfirmeDialog>);
  public data = inject<ConfirmeDialogData>(MAT_DIALOG_DATA);

  onCancelar():void {
    this.dialogRef.close(false);
  }

  onConfirmar():void{
    this.dialogRef.close(true);
  }

}
