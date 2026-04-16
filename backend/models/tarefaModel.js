import { randomUUID } from "crypto";

export class Tarefa {
  constructor({ id, titulo, descricao, categoria, finalizada }) {
    this.id = id || randomUUID();
    this.titulo = titulo;
    this.descricao = descricao;
    this.categoria = categoria;
    this.finalizada = finalizada || false;
  }
}
