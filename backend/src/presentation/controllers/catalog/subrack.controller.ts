import { Request, Response } from 'express';
import { SubrackRepository, CreateSubrackDTO, UpdateSubrackDTO, SubrackUseCase, SearchSubrackDTO } from '../../../domain';

export class SubrackController {
  constructor(private readonly subrackRepository: SubrackRepository) {}

  createSubrack = (req: Request, res: Response) => {
    const [error, subrackDTO] = CreateSubrackDTO.create(req.body);
    if (error) return res.status(400).json({ error });
    new SubrackUseCase.CreateSubrack(this.subrackRepository)
      .execute(subrackDTO!)
      .then((subrack) => {
        const { id, partNumber, subrackFamily, subrackType, vendor, description, modelName } = subrack
        res.json({
          status: 'success',
          msg: 'The Subrack has been registred successfully',
          payload: { id, partNumber, subrackFamily, subrackType, vendor, description, modelName },
        })
      })
      .catch((error) =>
        res.status(400).json({
          status: 'error',
          msg: error.message || error,
        })
      );
  };

  getAllSubracks = (req: Request, res: Response) => {
    const search = SearchSubrackDTO.searchBoard(req.query);
    new SubrackUseCase.GetSubracks(this.subrackRepository)
      .execute(search)
      .then((subracks) => res.json(subracks))
      .catch((error) => res.status(400).json({ error }));
  };

  getSubrackById = (req: Request, res: Response) => {
    const { subrackid } = req.params;
    new SubrackUseCase.GetSubrack(this.subrackRepository)
      .execute(subrackid)
      .then((subrack) => res.json(subrack))
      .catch((error) => res.status(400).json({ error }));
  };

  updateSubrackById = (req: Request, res: Response) => {
    const { subrackid } = req.params;
    const [error, updateSubrackDTO] = UpdateSubrackDTO.update({ ...req.body, subrackid });
    if (error) return res.status(400).json({ error });
    new SubrackUseCase.UpdateSubrack(this.subrackRepository)
      .execute(updateSubrackDTO!)
      .then((subrack) => res.json(subrack))
      .catch((error) => res.status(400).json({ error }));
  };

  deleteSubrackById = (req: Request, res: Response) => {
    const { subrackid } = req.params;

    new SubrackUseCase.DeleteSubrack(this.subrackRepository)
      .execute(subrackid)
      .then((subrack) => res.json(subrack))
      .catch((error) => res.status(400).json({ error }));
  };
}
