import {Artigo} from '../model/table.model';
import {ArtigoRepositoryABC} from '../model/index.model';
import {ArtigoDto} from '../../guards/Dtos/artigo.dto';

export class ArtigoRepository extends ArtigoRepositoryABC {
  protected getAllByUsuario(id_usuario: number): Promise<Artigo[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const artigos: Artigo[] = await this.knex
          .select()
          .from('artigo')
          .innerJoin('NotaDeArtigo.id_artigo', 'artigo.id_artigo')
          .where('NotaDeArtigo.id_usuario', id_usuario)
          .first();

        resolve(artigos);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected getOne(id_artigo: number): Promise<Artigo> {
    return new Promise(async (resolve, reject) => {
      try {
        const artigo: Artigo = await this.knex
          .select()
          .from('artigo')
          .where('id_artigo', id_artigo)
          .first();
        if (!artigo) {
          throw 'esta artigo não existe';
        }

        resolve(artigo);
      } catch (error) {
        reject(error);
      }
    });
  }
  protected saveOneArtigo(artigo: ArtigoDto): Promise<Artigo> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await this.knex.insert(artigo).into('artigo');
        const res: Artigo = await this.getOne(response[0]);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  }
}
