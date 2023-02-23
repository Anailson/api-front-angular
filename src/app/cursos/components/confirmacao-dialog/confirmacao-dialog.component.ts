import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialog',
  templateUrl: './confirmacao-dialog.component.html',
  styleUrls: ['./confirmacao-dialog.component.scss']
})
export class ConfirmacaoDialogComponent implements OnInit{

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {}

  ngOnInit(): void {

  }

  onConfirm(result: boolean): void {
    this.dialogRef.close(result);
  }

}
