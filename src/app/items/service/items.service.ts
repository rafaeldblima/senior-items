import { Injectable } from '@angular/core';
import { ItemModel } from '../model/item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  items: ItemModel[];
  private KEY = 'ITEMS';

  constructor() {
  }

  /**
   * Método para salvar item, checa se item já tem ID para fazer o create ou update
   * @param item - ItemModel
   */
  async save(item: ItemModel) {
    if (item.id) {
      this.update(item);
    } else {
      this.create(item);
    }
  }

  /**
   * Método para salvar um item novo no localStorage
   * @param item - ItemModel
   */
  async create(item: ItemModel) {
    const items = this.getStorageItems();
    item.id = new Date().getTime();
    items.push(item);
    this.saveItems(items);
  }

  /**
   * Método que remove um item da lista de itens salvos no localStorage
   * @param idItem - Id do item a ser removido
   */
  async delete(idItem) {
    const items = this.getStorageItems();
    const itemsFiltered = items.filter(item => item.id !== Number(idItem));
    localStorage.setItem(this.KEY, JSON.stringify(itemsFiltered));
  }

  /**
   * Método que realiza o update de um item já salvo no localStorage
   * @param item - ItemModel
   */
  async update(item: ItemModel) {
    const items = this.getStorageItems();
    items.map((itemStorage, index) => {
      if (itemStorage.id === Number(item.id)) {
        items[index] = item;
      }
    });
    this.saveItems(items);
  }

  /**
   * Método que retorna todos os items salvos no localStorage.
   * @return ItemModel[]
   */
  async getItems(): Promise<ItemModel[]> {
    this.items = this.getStorageItems();
    return this.items;
  }


  /**
   * Método que retorna um item, de acordo com seu ID
   * @return ItemModel
   */
  async getItemById(idItem): Promise<ItemModel> {
    const items = this.getStorageItems();
    const itemsFiltered = items.filter(item => (item.id) === Number(idItem));
    return itemsFiltered[0];
  }


  /**
   * Método que retorna todos os items salvos no localStorage, filtrados por nome.
   * @return ItemModel[]
   */
  async getByName(value): Promise<ItemModel[]> {
    const items = this.getStorageItems();
    return items.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
  }

  /**
   * Salva uma lista de items no localStorage
   * @param items - ItemModel[]
   */
  private saveItems(items: ItemModel[]): void {
    localStorage.setItem(this.KEY, JSON.stringify(items));
  }

  /**
   * Acessa o localStorage para pegar os items salvos
   * @return ItemModel[]
   */
  private getStorageItems(): ItemModel[] {
    let items = [];
    const itemsStorage = localStorage.getItem(this.KEY);
    if (itemsStorage) {
      items = JSON.parse(itemsStorage);
    }
    return items;
  }
}
