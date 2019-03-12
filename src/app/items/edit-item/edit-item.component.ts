import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService, SelectItem } from 'primeng/api';
import { ItemsService } from '../service/items.service';
import { ItemModel } from '../model/item.model';
import { UnitType } from '../constants/unit-type.constant';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {


  units: SelectItem[];
  itemForm: FormGroup;
  perishable = '';
  id = '';
  item: ItemModel = new ItemModel();
  toastStyle = {marginTop: '50px'};

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private itemService: ItemsService,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getItem();
    this.initForm();
    this.setUnits();
  }

  /**
   * Método que seta valores para o select de unidades
   */
  private setUnits() {
    this.units = UnitType;
  }

  /**
   * Método para iniciar formulário
   */
  private initForm() {
    this.itemForm = this.fb.group({
      'id': null,
      'name': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
      'unit': new FormControl(null, Validators.required),
      'quantity': new FormControl(null),
      'perishable': new FormControl(null, Validators.required),
      'price': new FormControl('', Validators.required),
      'fabricationDate': new FormControl(null, Validators.required),
      'dueDate': new FormControl(null)
    });
  }

  /**
   * Método para buscar item no serviço, caso haja um id na rota
   */
  getItem() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.itemService.getItemById(this.id)
        .then(item => {
          this.updateItemForm(item);
        })
        .catch(error => {
          console.error(error);
          this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Item não existente ou foi excluído.'});
        });
    }
  }

  /**
   * Método para salvar dados do formulário
   */
  onSubmit() {
    this.itemService.save(this.itemForm.value).then(() => {
      this.itemForm.reset();
      this.messageService.add({severity: 'success', summary: 'Sucesso', detail: 'Item salvo com sucesso!'});
    }).catch(error => {
      console.error(error);
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível salvar o item'});
    });
  }

  /**
   * Método para que quando o campo "perecícel" foi marcado como sim,
   * o campo data de validade seja obrigatório de preenchimento.
   */
  changePerishable(): void {
    const perishableCtrl: AbstractControl = this.itemForm.get('perishable');
    const dueDateCtrl: AbstractControl = this.itemForm.get('dueDate');

    if (perishableCtrl.value) {
      dueDateCtrl.setValidators(Validators.required);
    } else {
      dueDateCtrl.setValidators(null);
    }

    dueDateCtrl.updateValueAndValidity();
  }

  /**
   * Método para checar se item está vencido
   * @param date - data de validade do item
   * @return boolean - Informa se o item está vencido
   */
  isExpired(date: Date) {
    if (date) {
      return date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);
    } else {
      return false;
    }
  }

  /**
   * Método para ajudar a buscar o campo do formulário
   * @param control - nome do campo do formuláriol
   * @return AbstractControl
   */
  getFormControl(control: string): AbstractControl {
    return this.itemForm.get(control);
  }

  /**
   * Método para checar se input do formulário já foi utilizado, para mostrar a validação se necessário.
   * @param control - Nome do campo do formulário.
   * @return boolean - Se é ou não para mostrar erro do formulário.
   */
  showControlError(control: string): boolean {
    const formControl = this.getFormControl(control);
    return formControl.invalid && formControl.dirty && formControl.touched;
  }

  /**
   * Método para botar valores do item no formulário
   * @param item - ItemModel
   */
  private updateItemForm(item: ItemModel) {
    const dateValdiate = item.dueDate ? new Date(item.dueDate) : null;
    this.itemForm.patchValue({
      name: item.name,
      fabricationDate: new Date(item.fabricationDate),
      dueDate: dateValdiate,
      perishable: item.perishable,
      price: item.price,
      quantity: item.quantity,
      unit: item.unit,
      id: item.id
    });
  }
}
