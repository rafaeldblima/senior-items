import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ItemsService } from './service/items.service';
import { ItemModel } from './model/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {


  items: ItemModel[] = [];
  inputSearch;

  constructor(
    private itemService: ItemsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
  }

  ngOnInit() {
    this.loadItems();
  }

  /**
   * Método para abrir um modal de confirmação para exclusão
   * @param item - ItemModel
   */
  dialogDelete(item: ItemModel) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir este item?',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      header: 'Confirmação',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteItem(item);
      },
      reject: () => {
      }
    });
  }

  /**
   * Método para buscar itens pelo nome
   * @param value - nome do item
   */
  getItemsByName(value) {
    this.itemService.getByName(value)
      .then(items => this.items = items)
      .catch(error => {
        console.error(error);
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os itens.'});
      });
  }

  /**
   * Método para carregar todos os itens salvos
   */
  private loadItems() {
    this.itemService.getItems()
      .then(items => {
        this.items = items;
        console.log(this.items);
      })
      .catch(error => {
        this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível carregar os itens.'});
      });
  }

  /**
   * Método para deletar um item
   * @param item - ItemModel
   */
  private deleteItem(item: ItemModel) {
    this.itemService.delete(item.id).then(() => {
      this.loadItems();
      this.messageService.add({severity: 'info', summary: 'Sucesso', detail: 'Item excluído com sucesso!'});
    }).catch(error => {
      this.messageService.add({severity: 'error', summary: 'Erro', detail: 'Não foi possível deletar o item.'});
    });
  }

}
