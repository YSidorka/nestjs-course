export interface Repository {
  findOne(id: string);
  findAll();
  create(content: string);
}
