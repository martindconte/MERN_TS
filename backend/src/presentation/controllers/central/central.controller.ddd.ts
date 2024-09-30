// import { Request, Response } from "express";
// import { CentralRepository, CreateCentralDTO, UpdateCentralDTO } from "../../../domain";

// export class CentralController {

//     // DI
//     constructor(
//         private readonly centralRepository: CentralRepository
//     ) {}

//     createCentral = async ( req: Request, res: Response ) => {
//         const [ error, centralDTO ] = CreateCentralDTO.create( req.body )
//         if( error ) return res.status(400).json({ error })
//             const central = await this.centralRepository.create( centralDTO! )
//         res.json( central )
//     }

//     getAllCentrals = async ( req: Request, res: Response ) => {
//         const centrals = await this.centralRepository.getAll( req.query );
//         return res.json( centrals )
//     }

//     getCentralsById = async ( req: Request, res: Response ) => {
//         const { centralid } = req.params
//         try {
//             const central = await this.centralRepository.getById( centralid )
//             res.json( central )
//         } catch (error) {
//             res.status(400).json({ error })
//         }
//     }

//     updateCentral = async ( req: Request, res: Response ) => {
//         const { centralid } = req.params
//         const [ error, updateCentralDTO ] = UpdateCentralDTO.update({ id: centralid, ...req.body })
//         if( error ) return res.status(400).json({ error })
//         console.log(updateCentralDTO);
//         const centralUpdate = await this.centralRepository.updateById( updateCentralDTO! )
//         res.json( centralUpdate )
//     }

//     deleteCentral = async ( req: Request, res: Response ) => {
//         const { centralid } = req.params
//         console.log(centralid);
//         const centralDeleted = await this.centralRepository.delete( centralid )
//         res.json( centralDeleted );
//     }        
// }