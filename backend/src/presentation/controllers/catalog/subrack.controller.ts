import { Request, Response } from 'express';
import { SubrackRepository, CreateSubrackDTO, UpdateSubrackDTO, SubrackUseCase, SearchSubrackDTO } from '../../../domain';

export class SubrackController {
  constructor(private readonly subrackRepository: SubrackRepository) {}

  create = (req: Request, res: Response) => {
    const [error, subrackDTO] = CreateSubrackDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    new SubrackUseCase.CreateSubrack(this.subrackRepository)
      .execute(subrackDTO!)
      .then((subrack) => {
        const { id, partNumber, subrackFamily, subrackType, vendor, description, modelName } = subrack;
        res.json({
          status: 'success',
          msg: 'The Subrack has been registred successfully',
          payload: { id, partNumber, subrackFamily, subrackType, vendor, description, modelName },
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  getAll = (req: Request, res: Response) => {
    const search = SearchSubrackDTO.searchSubrack(req.query);
    new SubrackUseCase.GetSubracks(this.subrackRepository)
      .execute(search)
      .then((subracks) => res.json(subracks))
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  getById = (req: Request, res: Response) => {
    const { subrackid } = req.params;
    const search = SearchSubrackDTO.searchSubrack(req.query);
    new SubrackUseCase.GetSubrack(this.subrackRepository)
      .execute(subrackid, search)
      .then((subrack) => res.json(subrack))
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  updateById = (req: Request, res: Response) => {
    const { subrackid } = req.params;
    const [error, updateSubrackDTO] = UpdateSubrackDTO.update({ ...req.body, subrackid });
    if (error) return res.status(400).json({ error });
    new SubrackUseCase.UpdateSubrack(this.subrackRepository)
      .execute(updateSubrackDTO!)
      .then((subrack) => {
        const { id, partNumber, subrackFamily, subrackType, vendor, description, modelName } = subrack;
        res.json({
          msg: 'Subrack Information has been updated successfully',
          payload: { id, partNumber, subrackFamily, subrackType, vendor, description, modelName },
        });
      })
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  deleteById = (req: Request, res: Response) => {
    const { subrackid } = req.params;
    new SubrackUseCase.DeleteSubrack(this.subrackRepository)
      .execute(subrackid)
      .then(({ id, partNumber, subrackFamily, subrackType, vendor, description, modelName }) =>
        res.json({
          msg: 'The Subrack has been deleted, but your data is SAFE. You can restore it at any time',
          payload: { id, partNumber, subrackFamily, subrackType, vendor, description, modelName },
        })
      )
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  getAllDeleted = (req: Request, res: Response) => {
    new SubrackUseCase.GetDeletedSubracks(this.subrackRepository)
      .execute()
      .then((subracks) => res.json(subracks))
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message,
        })
      );
  };

  cleanById = (req: Request, res: Response) => {
    const { subrackid } = req.params;
    new SubrackUseCase.CleanSubrack(this.subrackRepository)
      .execute(subrackid)
      .then((subrack) =>
        res.json({
          msg: 'The Subrack has been permanently deleted. This action cannot be undone',
          payload: subrack,
        })
      )
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };
}
